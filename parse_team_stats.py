"""
Zwift Ladder — Parse teamStats-sider til team_activity.js

Læser alle gemte
  source_code/view-source_ladder_cycleracing_club_teamStats_<id>.html
-sider, parser race-tabellen og producerer per-hold, per-rytter statistik
for de seneste X dage (default 60 = ca. 2 måneder).

Output:  data/team_activity.js   (som const TEAM_ACTIVITY = {...})

Brug:
    python parse_team_stats.py                # default 60 dage
    python parse_team_stats.py --days 30      # andet vindue
    python parse_team_stats.py --also-season  # inkluder season totals per rytter

Kræver: pip install beautifulsoup4
"""

import os, re, json, argparse, sys, html
from datetime import datetime, timezone, timedelta
from bs4 import BeautifulSoup

PROJECT_DIR = r"C:\zwiftpower-api-main"
SOURCE_DIR  = os.path.join(PROJECT_DIR, "source_code")
DATA_DIR    = os.path.join(PROJECT_DIR, "data")
OUTPUT_FILE = os.path.join(DATA_DIR, "team_activity.js")

TEAMVIEW_PREFIX  = "view-source_ladder_cycleracing_club_teamView_"
TEAMSTATS_PREFIX = "view-source_ladder_cycleracing_club_teamStats_"


def log(msg, level="INFO"):
    prefix = {"INFO": "  ", "OK": "\u2713 ", "WARN": "\u26a0 ", "ERR": "\u2717 "}.get(level, "  ")
    print(f"{prefix}{msg}", flush=True)


def clean_name(s):
    """Ryd whitespace og HTML-entities i rytternavne."""
    if s is None:
        return ""
    s = html.unescape(s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def build_id_to_key_map(source_dir):
    """
    Scan teamView-filer og byg map:
        teamStats_id (int) -> (opponent_library_key, teamview_filename, team_name)

    opponent_library_key følger konventionen i data/opponents.js, fx
        "VIEW_SOURCE_LADDER_CYCLERACING_CLUB_TEAMVIEW_LEQP_TOURMALET"
    """
    mapping = {}
    for name in sorted(os.listdir(source_dir)):
        if not name.startswith(TEAMVIEW_PREFIX) or not name.endswith(".html"):
            continue
        full = os.path.join(source_dir, name)
        try:
            with open(full, encoding="utf-8", errors="replace") as f:
                head = f.read(300_000)
        except Exception:
            continue
        m = re.search(r'/teamStats/(\d+)', head)
        if not m:
            continue
        team_id = int(m.group(1))

        # Uddrag holdnavn fra h2/title hvis muligt
        mm = re.search(r'<title[^>]*>([^<]+)</title>', head)
        team_name = clean_name(mm.group(1)) if mm else name.replace(TEAMVIEW_PREFIX, "").replace(".html", "")

        # Nøgle: samme som index.html/opponents.js-konventionen.
        # Erstat alle ikke-alfanumeriske tegn (inkl. &, %, ö m.fl.) med _.
        stem = name.replace(".html", "")
        key = re.sub(r'[^A-Z0-9_]', '_', stem.replace("-", "_").upper())

        mapping[team_id] = {
            "opponent_key": key,
            "teamview_file": name,
            "team_name": team_name,
        }
    return mapping


def parse_team_stats_file(path, cutoff_ms, include_season=False):
    """
    Returnér dict med:
        team_name, record, season_label,
        cutoff_days, scraped_at, total_races_in_window,
        riders: { zwift_id: { name, races, points, wins, last_race, last_pos_best } },
        season_totals (hvis include_season): { zwift_id: { name, points, races, wins, rank30 } }
    """
    with open(path, encoding="utf-8", errors="replace") as f:
        src = f.read()
    soup = BeautifulSoup(src, "html.parser")

    # Team name + season header
    h2 = soup.select_one("section.titleStuff h2")
    team_name = clean_name(h2.get_text(" ", strip=True)) if h2 else ""
    season_div = soup.select_one("section.titleStuff .season")
    season_label = clean_name(season_div.get_text(" ", strip=True)) if season_div else ""

    # Race-tabellen: første <section class="container"> UDEN totals.
    race_section = None
    for sec in soup.find_all("section"):
        cls = sec.get("class") or []
        if "container" in cls and "totals" not in cls and sec.find("table"):
            # Første med en rigtig race-tabel (data-date celler)
            if sec.find("td", attrs={"data-date": True}):
                race_section = sec
                break

    riders = {}
    total_races_in_window = 0
    results = []  # "W" or "L" per race, newest first (HTML table order)

    if race_section:
        for tr in race_section.select("tbody tr"):
            date_td = tr.find("td", attrs={"data-date": True})
            if not date_td:
                continue
            try:
                date_ms = int(date_td["data-date"])
            except (TypeError, ValueError):
                continue
            if date_ms < cutoff_ms:
                continue  # for gammel

            total_races_in_window += 1
            race_date = datetime.fromtimestamp(date_ms / 1000, tz=timezone.utc).date().isoformat()
            race_won = False  # True if any team rider finished 1st

            # Alle openRider-celler i denne række
            for rtd in tr.find_all("td"):
                td_classes = rtd.get("class") or []
                if "openRider" not in td_classes:
                    continue
                zid = rtd.get("data-open")
                if not zid:
                    continue

                name_div = rtd.select_one(".riderName")
                pos_div  = rtd.select_one(".riderPos")
                pts_div  = rtd.select_one(".riderPts")

                rname = clean_name(name_div.get_text(" ", strip=True)) if name_div else ""
                pos_txt = clean_name(pos_div.get_text(" ", strip=True)) if pos_div else ""
                pts_txt = clean_name(pts_div.get_text(" ", strip=True)) if pts_div else ""

                # Position: "1st","DQ","2nd",...
                pos_num = None
                m = re.match(r"(\d+)", pos_txt)
                if m:
                    pos_num = int(m.group(1))

                pts_num = 0
                try:
                    pts_num = int(pts_txt)
                except ValueError:
                    pts_num = 0  # DQ viser "-"

                if pos_num == 1:
                    race_won = True

                r = riders.setdefault(zid, {
                    "name": rname,
                    "races": 0,
                    "points": 0,
                    "wins": 0,
                    "last_race": None,
                    "best_pos": None,
                })
                r["races"] += 1
                r["points"] += pts_num
                if pos_num == 1:
                    r["wins"] += 1
                if pos_num is not None and (r["best_pos"] is None or pos_num < r["best_pos"]):
                    r["best_pos"] = pos_num
                if r["last_race"] is None or race_date > r["last_race"]:
                    r["last_race"] = race_date
                # Foretrukket navn: det længste rene
                if rname and len(rname) > len(r["name"]):
                    r["name"] = rname

            results.append("W" if race_won else "L")

    result = {
        "team_name": team_name,
        "season_label": season_label,
        "total_races_in_window": total_races_in_window,
        "results": results,
        "riders": riders,
    }

    if include_season:
        # Season totals-tabellen
        totals_section = soup.find("section", class_=lambda c: c and "totals" in c)
        season_totals = {}
        if totals_section:
            for tr in totals_section.select("tbody tr"):
                rider_td = tr.find("td", class_=lambda c: c and "openRider" in c)
                if not rider_td:
                    continue
                zid = rider_td.get("data-open")
                if not zid:
                    continue
                rname = clean_name(rider_td.get_text(" ", strip=True))

                tds = tr.find_all("td", recursive=False)
                # struktur: [#, navn, rank(2 tal), points, races, wins, pts/race]
                def _num(td):
                    try:
                        return float(clean_name(td.get_text(" ", strip=True)))
                    except Exception:
                        return None
                def _int(td):
                    try:
                        return int(clean_name(td.get_text(" ", strip=True)))
                    except Exception:
                        return None

                points = races = wins = None
                if len(tds) >= 7:
                    points = _int(tds[3])
                    races  = _int(tds[4])
                    wins   = _int(tds[5])

                season_totals[zid] = {
                    "name": rname,
                    "points": points,
                    "races": races,
                    "wins": wins,
                }
        result["season_totals"] = season_totals

    return result


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--days", type=int, default=60,
                    help="Vindue i dage (default 60 = ~2 måneder)")
    ap.add_argument("--also-season", action="store_true",
                    help="Inkludér season-totaler i output")
    ap.add_argument("--source-dir", default=SOURCE_DIR)
    ap.add_argument("--output", default=OUTPUT_FILE)
    args = ap.parse_args()

    log("=" * 60)
    log("PARSE TEAM STATS")
    log("=" * 60)

    if not os.path.isdir(args.source_dir):
        log(f"source_dir findes ikke: {args.source_dir}", "ERR")
        return 1

    cutoff_dt = datetime.now(tz=timezone.utc) - timedelta(days=args.days)
    cutoff_ms = int(cutoff_dt.timestamp() * 1000)
    scraped_at = datetime.now(tz=timezone.utc).isoformat(timespec="seconds")
    log(f"Vindue: sidste {args.days} dage (fra {cutoff_dt.date().isoformat()})")

    id_map = build_id_to_key_map(args.source_dir)
    log(f"Byggede mapping for {len(id_map)} hold fra teamView-filer.", "OK")

    # Find alle teamStats-filer
    stats_files = [
        f for f in os.listdir(args.source_dir)
        if f.startswith(TEAMSTATS_PREFIX) and f.endswith(".html")
    ]
    log(f"Fandt {len(stats_files)} teamStats-filer.", "OK")
    if not stats_files:
        log("Kør fetch_team_stats.py først.", "WARN")
        return 2

    output = {}
    parsed = 0
    skipped = 0

    for fname in sorted(stats_files):
        m = re.search(r"teamStats_(\d+)\.html$", fname)
        if not m:
            log(f"Kan ikke udtrække ID fra {fname}", "WARN")
            continue
        team_id = int(m.group(1))
        info = id_map.get(team_id)
        if not info:
            log(f"id={team_id}: intet matchende teamView — skipper", "WARN")
            skipped += 1
            continue

        path = os.path.join(args.source_dir, fname)
        try:
            data = parse_team_stats_file(path, cutoff_ms, include_season=args.also_season)
        except Exception as e:
            log(f"id={team_id}: parser-fejl: {e}", "ERR")
            continue

        output[info["opponent_key"]] = {
            "team_stats_id": team_id,
            "team_view_file": info["teamview_file"],
            "team_name": data["team_name"] or info["team_name"],
            "season_label": data["season_label"],
            "cutoff_days": args.days,
            "scraped_at": scraped_at,
            "total_races_in_window": data["total_races_in_window"],
            "results": data["results"],
            "riders": data["riders"],
            **({"season_totals": data["season_totals"]} if args.also_season else {}),
        }
        parsed += 1

    log(f"Parsede {parsed} hold ({skipped} sprunget over).", "OK")

    os.makedirs(os.path.dirname(args.output), exist_ok=True)
    payload = json.dumps(output, ensure_ascii=False, indent=2, sort_keys=True)
    with open(args.output, "w", encoding="utf-8") as f:
        f.write("// TEAM_ACTIVITY_START\n")
        f.write("// Auto-genereret af parse_team_stats.py — rediger ikke manuelt.\n")
        f.write(f"// Genereret: {scraped_at}  Vindue: sidste {args.days} dage\n")
        f.write("const TEAM_ACTIVITY = ")
        f.write(payload)
        f.write(";\n// TEAM_ACTIVITY_END\n")

    log(f"Gemt: {args.output}", "OK")
    return 0


if __name__ == "__main__":
    sys.exit(main())
