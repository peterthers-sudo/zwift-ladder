"""
fetch_zwift_insider_routes.py
Henter rutetabellen fra Zwift Insider og fletter manglende ruter ind i
ZWIFT_ROUTES i app.js.

Baggrund: ZWIFT_ROUTES er et hardkodet array i app.js, oprindeligt samlet
manuelt fra to ZwiftRacing-eksporter. ZwiftRacings API svarer 401, saa
velo-vaegtene (sprint/punch/climb/pursuit/endurance) kan ikke hentes
automatisk. Nye ruter tilfoejes derfor uden vaegte; app.js falder tilbage
til det beregnede fingerprint i getCourseFingerprint().

Eksisterende linjer roeres ikke - nye tilfoejes i bunden af arrayet, saa
haandjusterede vaegte bevares og diffen bliver laesbar.

Brug:
    python fetch_zwift_insider_routes.py            # vis hvad der mangler
    python fetch_zwift_insider_routes.py --write    # skriv til app.js
"""

import argparse
import os
import re
import sys

import requests
from bs4 import BeautifulSoup

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

BASE = os.path.dirname(os.path.abspath(__file__))
APP_JS = os.path.join(BASE, "app.js")
INDEX_URL = "https://zwiftinsider.com/routes/"
UA = {"User-Agent": "Mozilla/5.0 (ZwiftIQ route sync)"}

# Profil ud fra hoejdemeter pr. km. Graenserne er midtpunkter mellem
# medianerne i de eksisterende data (Flat 5.1, Rolling 9.0, Hilly 12.1,
# Mountainous 20.9 m/km). Kategorierne overlapper i virkeligheden, saa det
# er et estimat - ZwiftRacings egen profil er mere praecis, hvis den
# nogensinde bliver tilgaengelig.
PROFILE_BOUNDS = [(7.05, "Flat"), (10.55, "Rolling"), (16.5, "Hilly")]

# Andel af ruten der er flad, pr. profil. Uden flatKm saetter fallback-formlen
# i getCourseFingerprint() flatRatio til 0, hvilket nulstiller tt og sprint og
# faar enhver ny rute til at score som klatrerute. Medianerne er maalt paa de
# 20 ruter i ROUTE_DB i simulate.py, som har rigtige flatKm-vaerdier.
FLAT_RATIO = {"Flat": 0.84, "Rolling": 0.60, "Hilly": 0.44, "Mountainous": 0.29}


def log(msg, level="INFO"):
    mark = {"INFO": " ", "OK": "OK", "WARN": "!", "ERR": "X"}.get(level, " ")
    print(f"{mark} {msg}")


# -- Zwift Insider -----------------------------------------------------------

def _num(txt):
    """'12.4km (7.7 miles)' -> 12.4 ; '1,009m (3,310)' -> 1009.0"""
    if not txt:
        return None
    m = re.search(r"([\d,]+(?:\.\d+)?)", txt.replace(",", ""))
    return float(m.group(1)) if m else None


def fetch_routes():
    r = requests.get(INDEX_URL, headers=UA, timeout=45)
    r.raise_for_status()
    table = BeautifulSoup(r.text, "html.parser").find("table")
    if not table:
        raise SystemExit("FEJL: ingen tabel fundet paa " + INDEX_URL)

    out, skipped_run = [], 0
    for tr in table.find_all("tr")[1:]:
        td = [c.get_text(strip=True) for c in tr.find_all("td")]
        if len(td) < 5:
            continue
        name, world, length, elev, leadin = td[0], td[1], td[2], td[3], td[4]
        restriction = td[5] if len(td) > 5 else ""

        # Run Only er loeberuter, ikke cykelruter. De mangler ogsaa
        # konsekvent hoejdemeter i tabellen.
        if "run only" in restriction.lower():
            skipped_run += 1
            continue

        d, e, li = _num(length), _num(elev), _num(leadin)
        if not name or not world or d is None or e is None:
            log(f"springer over (ufuldstaendig): {world} / {name}", "WARN")
            continue
        out.append({"name": name, "world": world, "distance": d,
                    "elevation": e, "leadIn": li if li is not None else 0.0})
    log(f"Hentede {len(out)} cykelruter fra Zwift Insider "
        f"({skipped_run} Run Only sprunget over).", "OK")
    return out


# -- app.js ------------------------------------------------------------------

ARRAY_RE = re.compile(rb"(const ZWIFT_ROUTES = \[\r?\n)(.*?)(\r?\n\];)", re.S)

# Kendetegn paa at scriptet allerede har skrevet sin kommentarblok.
HEADER_MARK = b"Tilfoejet automatisk af fetch_zwift_insider_routes.py"


def read_app():
    """Returnerer (raw_bytes, match, eol) - binaert, saa CRLF bevares."""
    raw = open(APP_JS, "rb").read()
    m = ARRAY_RE.search(raw)
    if not m:
        raise SystemExit("FEJL: ZWIFT_ROUTES-arrayet blev ikke fundet i app.js")
    eol = b"\r\n" if b"\r\n" in m.group(1) else b"\n"
    return raw, m, eol


def existing_routes(block_text):
    """Navne staar i enten enkelt- eller dobbeltcitationstegn: filen bruger
    dobbelt naar navnet selv indeholder en apostrof ("Suki's Playground").
    Laeses kun enkeltcitationstegn, forsvinder de seks ruter ud af
    sammenligningen og bliver tilfoejet igen som dubletter."""
    routes = []
    for line in block_text.splitlines():
        m = re.search(r"""name:\s*(['"])(.*?)\1""", line)
        if not m:
            continue
        w = re.search(r"""world:\s*(['"])(.*?)\1""", line)
        d = re.search(r"distance:\s*([\d.]+)", line)
        e = re.search(r"elevation:\s*([\d.]+)", line)
        routes.append({
            "name": m.group(2),
            "world": w.group(2) if w else "",
            "distance": float(d.group(1)) if d else None,
            "elevation": float(e.group(1)) if e else None,
        })
    return routes


def norm(s):
    """Navnenormalisering. Zwift Insider og ZwiftRacing staver forskelligt:
    'Rev' vs 'Reverse', '2022 Gran Fondo' vs 'Zwift Gran Fondo 2022'."""
    s = s.lower().replace("’", "'")
    s = re.sub(r"\brev\b", "reverse", s)
    s = re.sub(r"\b(uci|the|zwift)\b", " ", s)
    return re.sub(r"[^a-z0-9]", "", s)


def _is_reverse(name):
    return bool(re.search(r"\b(reverse|rev)\b", name, re.I))


def _tokens(name):
    s = re.sub(r"\b(uci|the|zwift|a|of)\b", " ", name.lower().replace("’", "'"))
    return {t for t in re.split(r"[^a-z0-9]+", s) if t}


def same_route(a, b, km_tol=0.25, m_tol=6):
    """Fanger omdoebninger: 'Time Trial Lap' og 'Bologna Time Trial' er
    samme rute.

    Maal og verden alene raekker ikke: en reverse-rute har per definition
    samme laengde og hoejdemeter som sin forlaens udgave, og vidt
    forskellige ruter kan tilfaeldigvis ligne hinanden ('Urumaze' vs
    'Turf N Surf'). Derfor kraeves ogsaa navneslaegtskab, og reverse
    skal stemme paa begge sider.
    """
    if a["world"] != b["world"]:
        return False
    if None in (a["distance"], b["distance"], a["elevation"], b["elevation"]):
        return False
    if _is_reverse(a["name"]) != _is_reverse(b["name"]):
        return False
    if (abs(a["distance"] - b["distance"]) > km_tol
            or abs(a["elevation"] - b["elevation"]) > m_tol):
        return False

    na, nb = norm(a["name"]), norm(b["name"])
    if na in nb or nb in na:
        return True
    ta, tb = _tokens(a["name"]), _tokens(b["name"])
    if not ta or not tb:
        return False
    return len(ta & tb) / min(len(ta), len(tb)) >= 0.5


def classify(distance, elevation):
    if not distance:
        return "Rolling"
    per_km = elevation / distance
    for bound, label in PROFILE_BOUNDS:
        if per_km < bound:
            return label
    return "Mountainous"


VERSION_RE = re.compile(rb"(const APP_VERSION = 'v\d+\.\d+\.)(\d+)(';)")


def bump_version(raw):
    """Haever patch-nummeret i APP_VERSION.

    Scriptet aendrer app.js, og versionen er cache-noegle for
    zwift_courses_version i localStorage. Uden bump ser tilbagevendende
    brugere deres gamle cachede rutevalg som aktuelt.
    """
    m = VERSION_RE.search(raw)
    if not m:
        log("APP_VERSION ikke fundet - springer versionsbump over.", "WARN")
        return raw, None
    new = str(int(m.group(2)) + 1).encode()
    return VERSION_RE.sub(m.group(1) + new + m.group(3), raw, count=1), new.decode()


def js_str(s):
    """Foelg filens egen konvention: dobbeltcitationstegn naar teksten
    indeholder en apostrof, ellers enkelt."""
    s = s.replace("’", "'")
    if "'" in s:
        return '"' + s.replace('"', '\\"') + '"'
    return "'" + s + "'"


def format_entry(r):
    prof = classify(r["distance"], r["elevation"])
    return ("  {{ name: {name}, world: {world}, distance: {d}, "
            "elevation: {e}, leadIn: {li}, profile: '{p}', flatKm: {f} }},").format(
        name=js_str(r["name"]),
        world=js_str(r["world"]),
        d=round(r["distance"], 1),
        e=int(round(r["elevation"])),
        li=round(r["leadIn"], 1),
        p=prof,
        f=round(r["distance"] * FLAT_RATIO[prof], 1),
    )


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--write", action="store_true",
                    help="skriv de nye ruter til app.js")
    args = ap.parse_args()

    log("=" * 60)
    log("ZWIFT INSIDER ROUTE SYNC")
    log("=" * 60)

    scraped = fetch_routes()
    raw, m, eol = read_app()
    block = m.group(2).decode("utf-8")
    have = existing_routes(block)
    log(f"app.js indeholder {len(have)} ruter.")

    have_norm = {norm(r["name"]) for r in have}
    scraped_norm = {norm(r["name"]) for r in scraped}

    # En rute i app.js der allerede har et praecist navnematch i de skrabede
    # data kan ikke samtidig vaere omdoebningsmaal for en anden rute.
    # Uden den regel blev 'Twilight Crit' parret med 'Neokyo Crit Course',
    # selvom Zwift Insider har dem begge som selvstaendige ruter med naesten
    # identiske maal.
    rename_targets = [h for h in have if norm(h["name"]) not in scraped_norm]

    new, renamed = [], []
    for r in scraped:
        if norm(r["name"]) in have_norm:
            continue
        dup = next((h for h in rename_targets if same_route(r, h)), None)
        if dup:
            renamed.append((r["name"], dup["name"]))
            continue
        new.append(r)

    if renamed:
        log(f"{len(renamed)} ruter findes allerede under et andet navn:", "WARN")
        for zi_name, app_name in renamed:
            log(f"    Zwift Insider '{zi_name}'  =  app.js '{app_name}'")

    if not new:
        log("Ingen nye ruter - app.js er ajour.", "OK")
        return

    log(f"{len(new)} nye ruter:", "OK")
    ordered = sorted(new, key=lambda x: (x["world"], x["name"]))
    for r in ordered:
        log(f"    {r['world']:<18} {r['name']:<34} "
            f"{r['distance']:>6.1f} km  {int(r['elevation']):>5} m  "
            f"{classify(r['distance'], r['elevation'])}")

    if not args.write:
        log("Koer med --write for at skrive dem til app.js.")
        return

    eol_s = eol.decode()

    # Sidste eksisterende rute mangler ofte det afsluttende komma, fordi den
    # var arrayets sidste element. Uden komma bliver JS-syntaksen ugyldig
    # saa snart der tilfoejes en linje efter den.
    tail = m.group(2).rstrip()
    lead = "," if not tail.endswith(b",") else ""

    # Headeren skrives kun foerste gang. Scriptet koerer hver nat, og uden
    # den her kontrol ville arrayet samle en ny ens kommentarblok hver gang
    # der dukkede nye ruter op.
    header = [
        "  // --- Tilfoejet automatisk af fetch_zwift_insider_routes.py ---",
        "  // Uden velo-vaegte: app.js beregner fingerprint ud fra distance/hoejdemeter.",
    ]
    already = HEADER_MARK in m.group(2)
    lines = ([] if already else header) + [format_entry(r) for r in ordered]
    addition = (lead + eol_s + eol_s.join(lines)).encode("utf-8")

    out = raw[:m.end(2)] + addition + raw[m.end(2):]
    out, new_patch = bump_version(out)
    open(APP_JS, "wb").write(out)
    if new_patch:
        log(f"APP_VERSION bumpet (patch -> {new_patch}).", "OK")

    check = open(APP_JS, "rb").read()
    crlf = check.count(b"\r\n")
    lf = check.count(b"\n") - crlf
    log(f"Skrevet til app.js. Linjeskift: CRLF={crlf} bare LF={lf}", "OK")
    if eol == b"\r\n" and lf:
        log("ADVARSEL: filen indeholder nu bare LF-linjer!", "ERR")


if __name__ == "__main__":
    main()
