import os
import re
import requests

# ==============================================================
# KONFIGURATION
# ==============================================================
SOURCE_DIR  = r"C:\zwiftpower-api-main\source_code"
MY_TEAM_DIR = r"C:\zwiftpower-api-main\my_team"
DATA_DIR    = r"C:\zwiftpower-api-main\data"
API_URL     = "http://127.0.0.1:8000/rider"
INDEX_FILE  = r"C:\zwiftpower-api-main\index.html"

# ==============================================================
# HJÆLPEFUNKTIONER
# ==============================================================

def decode_view_source(raw):
    if 'class="line-content"' in raw:
        lines = re.findall(r'<td class="line-content">(.*?)</td>', raw, flags=re.DOTALL)
        decoded = []
        for line in lines:
            plain = re.sub(r'<[^>]+>', '', line)
            plain = (plain.replace('&lt;','<').replace('&gt;','>').replace('&amp;','&')
                         .replace('&quot;','"').replace('&#39;',"'").replace('&nbsp;',' '))
            decoded.append(plain)
        return '\n'.join(decoded)
    return raw

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return decode_view_source(f.read())

def extract_exact_roster_ids(file_path):
    content = read_file(file_path)
    match = re.search(r'roster["\']?\s*:\s*{\s*["\']?ids["\']?\s*:\s*\[([\d, ]+)\]', content)
    if not match:
        match = re.search(r'roster&quot;:{&quot;ids&quot;:\[([\d, ]+)\]', content)
    if match:
        return [rid.strip() for rid in match.group(1).split(',') if rid.strip()]
    return []

def extract_team_name(file_path, filename):
    """Trækker holdnavn fra <title> tag, falder tilbage på filnavn."""
    try:
        content = read_file(file_path)
        match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
        if match:
            name = re.sub(r'<[^>]+>', '', match.group(1)).strip()
            if name and name != 'Team Power Profile Comparison':
                return name
    except Exception:
        pass
    # Fallback: filnavn
    return (filename
            .replace("view-source_https___ladder.cycleracing.club_teamView_", "")
            .replace("view-source_https___ladder_cycleracing_club_teamView_", "")
            .replace(".html", "").replace("%20", " ").replace("_", " ").strip())

def extract_captains(file_path):
    content = read_file(file_path)
    result = {'captains': [], 'vice_captains': []}
    cap_sections = re.findall(r'capDetails.*?</table>', content, flags=re.DOTALL | re.IGNORECASE)
    for section in cap_sections:
        names = re.findall(r'<td[^>]*fw-bold[^>]*>(.*?)</td>', section, flags=re.DOTALL | re.IGNORECASE)
        for name in names:
            clean = re.sub(r'<[^>]+>', '', name).strip()
            if clean:
                result['captains'].append(clean)
    vice_section = re.search(r'viceNotify(.*?)(?:col-lg|$)', content, flags=re.DOTALL | re.IGNORECASE)
    src = vice_section.group(1) if vice_section else content
    for name in re.findall(r'<div class="d-inline">(.*?)</div>', src, flags=re.DOTALL):
        clean = re.sub(r'<[^>]+>', '', name).strip()
        if clean:
            result['vice_captains'].append(clean)
    return result

def build_captains_html(captains_data):
    caps  = captains_data.get('captains', [])
    vices = captains_data.get('vice_captains', [])
    if not caps and not vices:
        return ""
    cap_items  = "".join(f'<span style="color:var(--accent2);font-weight:700">&#11088; {c}</span>' for c in caps)
    vice_items = "".join(f'<span style="color:var(--accent3)">{v}</span>' for v in vices)
    return (
        '<div style="display:flex;gap:16px;flex-wrap:wrap;padding:10px 14px;'
        'background:var(--surface2);border:1px solid var(--border);'
        "font-family:'JetBrains Mono',monospace;font-size:0.72rem;"
        'margin-bottom:12px;align-items:center;">'
        '<div style="display:flex;flex-direction:column;gap:4px;flex:1;min-width:120px">'
        '<span style="font-size:0.55rem;letter-spacing:2px;color:var(--text-dim);text-transform:uppercase">Captain</span>'
        f'<div style="display:flex;flex-wrap:wrap;gap:8px">{cap_items}</div>'
        '</div>'
        '<div style="display:flex;flex-direction:column;gap:4px;flex:2;min-width:160px">'
        '<span style="font-size:0.55rem;letter-spacing:2px;color:var(--text-dim);text-transform:uppercase">Vice Captains</span>'
        f'<div style="display:flex;flex-wrap:wrap;gap:8px">{vice_items}</div>'
        '</div></div>'
    )

def fetch_rider(rid, retries=3):
    for attempt in range(retries):
        try:
            response = requests.get(f"{API_URL}/{rid}", timeout=30)
            if response.status_code == 200:
                return response.json()
            else:
                print(f"    HTTP {response.status_code} for rider {rid}")
                return None
        except Exception as e:
            if attempt < retries - 1:
                print(f"    Retry {attempt+1}/{retries-1} for {rid} ({type(e).__name__})")
            else:
                print(f"    EXCEPTION: {type(e).__name__}: {e}")
    return None

def fetch_velo(rid, retries=2):
    for attempt in range(retries):
        try:
            response = requests.get(f"{API_URL}/{rid}/velo", timeout=20)
            if response.status_code == 200:
                return response.json()
            return None
        except Exception as e:
            if attempt < retries - 1:
                continue
            print(f"    VELO FEJL for {rid}: {e}")
    return None

def fetch_velo_batch(rids):
    """Henter velo for alle rids i ét API-kald. Returnerer dict {str(zwift_id): velo_dict}."""
    try:
        ids = [int(r) for r in rids]
        base_url = API_URL.replace('/rider', '')
        response = requests.post(f"{base_url}/velo/batch", json=ids, timeout=60)
        if response.status_code == 200:
            data = response.json()
            print(f"    VELO BATCH OK: {len(data)}/{len(ids)} ryttere hentet")
            return data
        else:
            print(f"    VELO BATCH FEJL: HTTP {response.status_code} — {response.text[:200]}")
    except Exception as e:
        print(f"    VELO BATCH FEJL: {e}")
    return {}

def rider_to_my_team_js(d, rider_id, velo=None):
    name      = d.get('name', 'Unknown').replace("'", '')
    weight    = d.get('weight') or 70
    watt      = d.get('w20min', 0)
    twentyMin = d.get('wkg20min', 0)
    sprint    = d.get('wkg5s',   0)
    oneMin    = d.get('wkg1min', 0)
    fiveMin   = d.get('wkg5min', 0)
    w5s    = d.get('w5s',   'null')
    w10s   = d.get('w10s',  'null')
    w15s   = d.get('w15s',  'null')
    w30s   = d.get('w30s',  'null')
    w1min  = d.get('w1min', 'null')
    w2min  = d.get('w2min', 'null')
    w5min  = d.get('w5min', 'null')
    w10min = d.get('w10min','null')
    w20min = d.get('w20min','null')
    w30min = d.get('w30min','null')
    v = velo or {}
    vs  = v.get('velo_sprint',    'null')
    vpu = v.get('velo_punch',     'null')
    vcl = v.get('velo_climb',     'null')
    vpr = v.get('velo_pursuit',   'null')
    ven = v.get('velo_endurance', 'null')
    vtt = v.get('velo_tt',        'null')
    return (
        f"      {{ id:{rider_id}, zwift_id:{d.get('zwift_id', 'null')}, name:'{name}', "
        f"sprint:{sprint}, oneMin:{oneMin}, fiveMin:{fiveMin}, twentyMin:{twentyMin}, "
        f"watt:{watt}, weight:{weight}, selected: false, "
        f"w5s:{w5s}, w10s:{w10s}, w15s:{w15s}, w30s:{w30s}, "
        f"w1min:{w1min}, w2min:{w2min}, w5min:{w5min}, w10min:{w10min}, "
        f"w20min:{w20min}, w30min:{w30min}, "
        f"velo_sprint:{vs}, velo_punch:{vpu}, velo_climb:{vcl}, "
        f"velo_pursuit:{vpr}, velo_endurance:{ven}, velo_tt:{vtt} }}"
    )

def rider_to_opponent_js(d, velo=None):
    opp_name = d.get('name', 'Unknown').replace('"', '').replace("'", '')
    v = velo or {}
    vs  = v.get('velo_sprint',    'null')
    vpu = v.get('velo_punch',     'null')
    vcl = v.get('velo_climb',     'null')
    vpr = v.get('velo_pursuit',   'null')
    ven = v.get('velo_endurance', 'null')
    vtt = v.get('velo_tt',        'null')
    return (
        f"      {{ id: {d.get('zwift_id')}, name: \"{opp_name}\", weight: {d.get('weight')}, watt: {d.get('w20min')}, wkg: {d.get('wkg20min')}, "
        f"w5s: {d.get('w5s')}, w10s: {d.get('w10s')}, w15s: {d.get('w15s')}, w30s: {d.get('w30s')}, w1min: {d.get('w1min')}, "
        f"w2min: {d.get('w2min')}, w5min: {d.get('w5min')}, w10min: {d.get('w10min')}, w20min: {d.get('w20min')}, w30min: {d.get('w30min')}, "
        f"wkg5s: {d.get('wkg5s')}, wkg10s: {d.get('wkg10s')}, wkg15s: {d.get('wkg15s')}, wkg30s: {d.get('wkg30s')}, wkg1min: {d.get('wkg1min')}, "
        f"wkg2min: {d.get('wkg2min')}, wkg5min: {d.get('wkg5min')}, wkg10min: {d.get('wkg10min')}, wkg20min: {d.get('wkg20min')}, wkg30min: {d.get('wkg30min')}, "
        f"velo_sprint: {vs}, velo_punch: {vpu}, velo_climb: {vcl}, "
        f"velo_pursuit: {vpr}, velo_endurance: {ven}, velo_tt: {vtt} }}"
    )

def filename_to_key(filename):
    name = (filename
            .replace("view-source_https___ladder.cycleracing.club_teamView_", "")
            .replace("view-source_https___ladder_cycleracing_club_teamView_", "")
            .replace(".html", "").replace("%20", " ").strip())
    return re.sub(r'[^A-Z0-9]', '_', name.upper())

# Global liste over fejlede riders til retry
_failed_riders = []

# Cache over hentede rider-dicts til bio-generering (zwift_id str -> dict)
_rider_cache = {}

# ==============================================================
# BIO-GENERERING
# ==============================================================

def _classify_rider(d):
    """Returnerer liste af typer: 'climber', 'puncheur', 'sprinter', 'diesel'."""
    wkg20 = d.get('wkg20min', 0) or 0
    wkg1  = d.get('wkg1min',  0) or 0
    wkg5s = d.get('wkg5s',    0) or 0
    weight = d.get('weight',  70) or 70
    labels = []
    if wkg20 > 0 and wkg5s / wkg20 > 2.8:  labels.append('sprinter')
    if wkg20 > 0 and wkg1  / wkg20 > 1.7:  labels.append('puncheur')
    if weight < 70 and wkg20 > 3.8:         labels.append('climber')
    if not labels:                           labels.append('diesel')
    return labels

def generate_rider_bio(d, races):
    """
    Genererer en 2-3 sætningers rytter-bio fra power-data og race-historik.
    Bruger random.choice for variation mellem kørsler.
    """
    import random
    pick = lambda arr: random.choice(arr)

    first  = (d.get('name', '') or '').split()[0] or 'Rytteren'
    weight = d.get('weight',   70) or 70
    wkg20  = d.get('wkg20min', 0)  or 0
    wkg5   = d.get('wkg5min',  0)  or 0
    wkg1   = d.get('wkg1min',  0)  or 0
    wkg5s  = d.get('wkg5s',    0)  or 0
    w20    = d.get('w20min',   0)  or 0

    if not wkg20:
        return ''

    parts = []
    labels = _classify_rider(d)

    # --- Sætning 1: ryttertype + kernestat ---
    if 'climber' in labels:
        parts.append(pick([
            f"At {weight:.0f}kg with {wkg20:.2f} W/kg over 20 minutes, {first} is a natural climber who gets harder to follow the longer the road goes up.",
            f"Lightweight climber at {weight:.0f}kg — {wkg20:.2f} W/kg FTP means sustained ascents are where {first} does the most damage.",
            f"{first} weighs {weight:.0f}kg and produces {wkg20:.2f} W/kg at FTP pace. Long climbs are a natural hunting ground.",
            f"Pure climber profile: {weight:.0f}kg and {wkg20:.2f} W/kg FTP. The longer the gradient, the more this rider hurts the opposition.",
        ]))
    elif 'sprinter' in labels:
        parts.append(pick([
            f"{first} carries serious sprint power — {wkg5s:.1f} W/kg over 5 seconds off a {wkg20:.2f} W/kg base. Flat finishes are the strongest card.",
            f"Sprint-oriented profile: {wkg5s:.1f} W/kg in 5 seconds. Get {first} to the line in a bunch and the result usually takes care of itself.",
            f"A sprinter's ratio: {wkg5s:.1f} W/kg peak power versus {wkg20:.2f} W/kg FTP. {first} is built for bunch finishes on flat terrain.",
        ]))
        # Hvis også puncheur: nævn 1min som ekstra kvalitet
        if 'puncheur' in labels and wkg1 > 0:
            parts.append(pick([
                f"The 1-minute number ({wkg1:.2f} W/kg) adds punch to the sprint — can go early and still hold it to the line.",
                f"Not just a sprinter: {wkg1:.2f} W/kg at 1 minute means {first} can also win on punchy finishes, not just flat bunch sprints.",
                f"With {wkg1:.2f} W/kg over 1 minute alongside the sprint power, {first} is dangerous on both flat and punchy terrain.",
            ]))
    elif 'puncheur' in labels:
        parts.append(pick([
            f"{first} is a punchy, explosive rider — {wkg1:.2f} W/kg over 1 minute off a {wkg20:.2f} W/kg FTP base makes repeated short climbs dangerous.",
            f"Strong short-effort numbers: {wkg1:.2f} W/kg at 1 minute from a {wkg20:.2f} W/kg base. {first} excels where the road kicks up sharply.",
            f"With {wkg1:.2f} W/kg at 1 minute, {first} can accelerate out of corners and over punchy rises in a way that quickly creates gaps.",
            f"Puncheur profile: {wkg1:.2f} W/kg at 1 minute. {first} is at their best on courses with repeated short climbs and accelerations.",
        ]))
    else:
        parts.append(pick([
            f"{first} is a diesel — {wkg20:.2f} W/kg at 20 minutes and {w20:.0f}W absolute, consistent across durations without a standout explosive peak.",
            f"An all-round engine: {wkg20:.2f} W/kg FTP and {w20:.0f}W absolute. {first} is hard to drop on any terrain and rarely gets surprised by tempo changes.",
            f"Balanced power profile at {wkg20:.2f} W/kg FTP. {first} holds a steady pace everywhere and is reliable across different course types.",
            f"Consistent diesel rider at {wkg20:.2f} W/kg FTP ({w20:.0f}W). No single explosive weapon, but rarely out of contention on any course type.",
        ]))

    # --- Sætning 2: 5min-tal hvis det siger noget ekstra ---
    if wkg5 > 0 and wkg20 > 0:
        ratio = wkg5 / wkg20
        if ratio > 1.15:
            parts.append(pick([
                f"The 5-minute number ({wkg5:.2f} W/kg) stands out — medium-length climbs of 3-8 minutes suit this profile particularly well.",
                f"{wkg5:.2f} W/kg over 5 minutes is a strong figure that directly translates to performance on any climb lasting a few minutes.",
                f"Strong at 5 minutes ({wkg5:.2f} W/kg), which means repeated medium climbs are where {first} can repeatedly stress the group.",
            ]))
        elif ratio < 1.05:
            parts.append(pick([
                f"The 5-minute number ({wkg5:.2f} W/kg) sits close to FTP, suggesting a profile that favours long sustained efforts over short punchy climbs.",
                f"Flat power curve — {wkg5:.2f} W/kg at 5 minutes isn't far above FTP, which suits TT-style efforts and long gradients more than punchy terrain.",
            ]))

    # --- Sætning 3: ladder race historik ---
    if races:
        valid_pos = [r for r in races if r.get('pos') is not None]
        podiums   = sum(1 for r in valid_pos if int(r['pos']) <= 3)
        top5      = sum(1 for r in valid_pos if int(r['pos']) <= 5)
        n_races   = len(valid_pos)
        recent5   = valid_pos[:5]
        avg_recent_pos = sum(int(r['pos']) for r in recent5) / len(recent5) if recent5 else None

        # FTP-trend: sammenlign wkg1200 i nyeste vs ældste løb
        wkg_over_time = [r.get('wkg1200') for r in valid_pos if r.get('wkg1200')]
        trend = None
        if len(wkg_over_time) >= 4:
            recent_avg = sum(wkg_over_time[:2]) / 2
            older_avg  = sum(wkg_over_time[-2:]) / 2
            if recent_avg - older_avg > 0.12:   trend = 'up'
            elif older_avg - recent_avg > 0.12: trend = 'down'

        if n_races == 0:
            pass
        elif podiums >= 3:
            parts.append(pick([
                f"Ladder record is impressive — {podiums} podiums from {n_races} starts. A proven performer at this level.",
                f"{podiums} podium finishes across {n_races} ladder races. Consistently at the sharp end of the field.",
                f"Strong ladder history: {podiums} podiums in {n_races} races. Opponents need to mark this rider from the gun.",
            ]))
        elif podiums >= 1:
            parts.append(pick([
                f"Has found the podium {podiums} time{'s' if podiums > 1 else ''} in {n_races} ladder starts — capable of mixing it at the front on the right course.",
                f"{n_races} ladder races, {podiums} podium{'s' if podiums > 1 else ''}. The results show a rider who can challenge when conditions suit.",
                f"Podium experience across {n_races} ladder outings. {first} knows how to race at this level.",
            ]))
        elif avg_recent_pos and avg_recent_pos <= 5:
            parts.append(pick([
                f"Solid recent ladder form — averaging inside the top 5 over the last {len(recent5)} races.",
                f"Consistently finishing near the front recently. {len(recent5)} races with an average position of {avg_recent_pos:.1f}.",
            ]))
        else:
            parts.append(pick([
                f"Across {n_races} ladder races, a steady presence in the field. The power numbers suggest more results are possible.",
                f"{n_races} ladder starts in the data. Consistent finisher who could threaten with the right course selection.",
            ]))

        # Tilføj trend-sætning hvis relevant
        if trend == 'up':
            parts.append(pick([
                f"Race FTP data points upward — form appears to be improving.",
                f"Recent race W/kg is tracking higher than earlier in the season. Worth watching.",
            ]))
        elif trend == 'down':
            parts.append(pick([
                f"Race FTP numbers have dipped slightly compared to earlier this season — one to monitor.",
                f"Slightly lower W/kg in recent races compared to earlier outings. May be carrying fatigue.",
            ]))

    return ' '.join(parts)


def update_bios():
    """Genererer rytterbios fra _rider_cache + ladder_races.js og skriver data/rider_bios.js."""
    import json, re as _re, random
    random.seed()  # Sikrer ny tilfældig tekst ved hver kørsel

    ladder_js_path = os.path.join(DATA_DIR, "ladder_races.js")
    ladder_data = {}
    try:
        with open(ladder_js_path, 'r', encoding='utf-8') as f:
            src = f.read()
        # Parse "{zwift_id}: {name:'...', races:[...]}" blokke
        for m in _re.finditer(r'(\d+):\s*\{name:\'[^\']*\',\s*races:(\[.*?\])\s*\}', src, _re.DOTALL):
            zid, races_json = m.group(1), m.group(2)
            try:
                ladder_data[zid] = json.loads(races_json)
            except Exception:
                ladder_data[zid] = []
    except Exception as e:
        print(f"[BIOS] Kunne ikke læse {ladder_js_path}: {e}")

    bios = {}
    for zid, d in _rider_cache.items():
        races = ladder_data.get(str(zid), [])
        bio = generate_rider_bio(d, races)
        if bio:
            bios[zid] = bio

    lines = [f'  "{zid}": {json.dumps(bio, ensure_ascii=False)}' for zid, bio in bios.items()]
    js = "// RIDER_BIOS_START\nconst RIDER_BIOS = {\n" + ",\n".join(lines) + "\n};\n// RIDER_BIOS_END\n"

    bios_path = os.path.join(DATA_DIR, "rider_bios.js")
    with open(bios_path, 'w', encoding='utf-8') as f:
        f.write(js)
    print(f"[BIOS] Genereret {len(bios)} rytterbeskrivelser → {bios_path}")

def retry_failed_riders():
    import time
    if not _failed_riders:
        print("\nIngen fejlede ryttere at genforsøge.")
        return
    print(f"\n{'='*50}")
    print(f"RETRY: {len(_failed_riders)} fejlede ryttere genforsøges efter 15 sek pause...")
    print(f"{'='*50}")
    time.sleep(15)
    still_failed = []
    for entry in _failed_riders:
        rid, kind, idx, riders_js, *extra = entry
        velo = extra[0] if extra else None
        d = fetch_rider(rid, retries=5)
        if not velo:
            velo = fetch_velo(rid)
        if d:
            if kind == 'my':
                d['zwift_id'] = rid
                riders_js.append(rider_to_my_team_js(d, idx, velo=velo))
            else:
                d['zwift_id'] = rid
                riders_js.append(rider_to_opponent_js(d, velo=velo))
            print(f"  RETRY OK: {d.get('name')} ({rid})")
        else:
            print(f"  RETRY FEJL: {rid} -- opgiver")
            still_failed.append(rid)
    if still_failed:
        print(f"\nADVARSEL: {len(still_failed)} rytter(e) kunne stadig ikke hentes: {still_failed}")
    else:
        print(f"\nAlle fejlede ryttere hentet succesfuldt.")



def update_my_teams(content):
    if not os.path.exists(MY_TEAM_DIR):
        print(f"WARNING: my_team mappe mangler: {MY_TEAM_DIR}")
        return content

    files = sorted([f for f in os.listdir(MY_TEAM_DIR) if f.endswith(".html")])
    if not files:
        print(f"WARNING: Ingen HTML-filer i {MY_TEAM_DIR}")
        return content

    print(f"\nFandt {len(files)} hold i my_team mappen")

    team_blocks = []
    team_options = []
    first_key = None

    for filename in files:
        file_path = os.path.join(MY_TEAM_DIR, filename)
        team_key  = filename_to_key(filename)
        team_name = extract_team_name(file_path, filename)
        if not first_key:
            first_key = team_key

        print(f"\n  Hold: {team_name} ({team_key})")

        # Kaptajner
        captains_data = extract_captains(file_path)
        caps  = captains_data.get('captains', [])
        vices = captains_data.get('vice_captains', [])
        print(f"    Kaptajn(er):   {', '.join(caps) or 'ingen'}")
        print(f"    Vicekaptajner: {', '.join(vices) or 'ingen'}")
        captains_html = build_captains_html(captains_data)
        # Escape backticks for JS template literal
        captains_html_escaped = captains_html.replace('`', '\\`').replace('${', '\\${')

        # Ryttere
        rider_ids = extract_exact_roster_ids(file_path)
        velo_map = fetch_velo_batch(rider_ids)
        riders_js = []
        for i, rid in enumerate(rider_ids, start=1):
            d = fetch_rider(rid)
            velo = velo_map.get(str(rid)) or velo_map.get(rid)
            if d:
                d['zwift_id'] = rid
                _rider_cache[str(rid)] = d
                riders_js.append(rider_to_my_team_js(d, i, velo=velo))
                print(f"    OK: {d.get('name')}{' [vELO]' if velo else ''}")
            else:
                print(f"    WARNING: Kunne ikke hente rytter {rid} -- tilfojer til retry-liste")
                _failed_riders.append((rid, 'my', i, riders_js, velo))

        team_block = (
            f'  "{team_key}": {{\n'
            f'    name: "{team_name}",\n'
            f'    captainsHTML: `{captains_html_escaped}`,\n'
            f'    riders: [\n'
            + ",\n".join(riders_js) + "\n"
            f'    ]\n'
            f'  }}'
        )
        team_blocks.append(team_block)
        team_options.append(f'<option value="{team_key}">● {team_name}</option>')

    js_content = (
        "// MY_TEAMS_START\n"
        "// Auto-generated by get_data.py — do not edit manually\n"
        "const MY_TEAMS = {\n"
        + ",\n".join(team_blocks) + "\n"
        "};\n"
        f'let activeMyTeamKey = "{first_key}";\n'
        "let riders = MY_TEAMS[activeMyTeamKey].riders;\n"
        "// MY_TEAMS_END\n"
    )
    my_teams_js_path = os.path.join(DATA_DIR, "my_teams.js")
    with open(my_teams_js_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    print(f"\n  OK: MY_TEAMS skrevet til {my_teams_js_path} ({len(team_blocks)} hold, {sum(b.count('id:') for b in team_blocks)} ryttere total)")

    # Update dropdown options in badge select (replace existing <option> tags inside #my-team-select)
    options_html = "\n          ".join(team_options)
    content = re.sub(
        r'(id="my-team-select"[^>]*>)\s*(?:<option[^>]*>.*?</option>\s*)+',
        lambda m: m.group(1) + "\n          " + options_html + "\n        ",
        content,
        flags=re.DOTALL
    )

    # Also update captains block for first/active team
    if team_blocks and first_key:
        first_team = [t for t in team_blocks if f'"{first_key}"' in t]
        if first_team:
            cap_html = build_captains_html(extract_captains(os.path.join(MY_TEAM_DIR, files[0])))
            new_cap = (
                "  <!-- MY_CAPTAINS_START -->\n"
                "  <!-- Auto-generated by get_data.py — do not edit manually -->\n"
                + (cap_html + "\n" if cap_html else "")
                + "  <!-- MY_CAPTAINS_END -->"
            )
            cap_pattern = r'<!-- MY_CAPTAINS_START -->.*?<!-- MY_CAPTAINS_END -->'
            if re.search(cap_pattern, content, flags=re.DOTALL):
                content = re.sub(cap_pattern, new_cap, content, flags=re.DOTALL)

    return content

# ==============================================================
# DEL 2 — OPDATER MODSTANDERE (OPPONENT_LIBRARY)
# ==============================================================


def extract_rung(file_path, filename):
    """
    Extracts the rung number from the teamView HTML page.

    Strategy:
    1. Parse Ladder.positions to find which region this team competes in and
       their position within that region.
    2. Parse the regions data (let regions = [...]) to find how many teams
       per rung exist for that region.
    3. Calculate: rung = (position - 1) // teams_per_rung + 1
    """
    import json
    try:
        raw = read_file(file_path)

        # 1. Get the team's ladder position per region
        #    Ladder.positions = {"1":{position:168, name:"EMEA"}, "2":{...}, ...}
        pos_match = re.search(r'Ladder\.positions\s*=\s*(\{[^;]+\});', raw)
        if not pos_match:
            return 1, None, None

        positions = json.loads(pos_match.group(1))
        if not isinstance(positions, dict):
            return 1, None, None  # Ladder.positions was not an object (e.g. = 1)

        # Find the first region where the team has a valid position (> 0)
        region_id = None
        position = None
        for rid, data in positions.items():
            if not isinstance(data, dict):
                continue
            pos = data.get('position', -1)
            if pos > 0:
                region_id = rid
                position = pos
                break
            elif pos == 0:
                # Belt holder: position=0 means rank #1, use positionOne
                pos_one = data.get('positionOne', -1)
                if pos_one > 0:
                    region_id = rid
                    position = pos_one
                    break

        if region_id is None or position is None:
            return 1, None, None  # team is not on any regional ladder

        # 2. Parse regions to get teams_per_rung for this region
        #    regions = [{id:1, settings:{rungs:{teams:18, number:10}}, ...}, ...]
        reg_match = re.search(r'let regions\s*=\s*(\[[^\]]+\]);', raw)
        if not reg_match:
            reg_match = re.search(r'Ladder\.regions\s*=\s*(\[[^\]]+\]);', raw)

        teams_per_rung = 18  # sensible fallback (EMEA default)
        if reg_match:
            try:
                regions = json.loads(reg_match.group(1))
                for region in regions:
                    if str(region.get('id', '')) == str(region_id):
                        rungs_cfg = (region.get('settings') or {}).get('rungs', {})
                        teams_per_rung = rungs_cfg.get('teams', 18)
                        break
            except Exception:
                pass

        # 3. Calculate rung (1 = top/best, higher numbers = lower rungs)
        rung = min((position - 1) // teams_per_rung + 1, 10)
        # Position within rung (1 = top of rung)
        position_in_rung = (position - 1) % teams_per_rung + 1
        return rung, position, position_in_rung

    except Exception as e:
        print(f"    Warning: extract_rung failed for {filename}: {e}")
        return 1, None, None  # fallback

def update_opponents(content):
    if not os.path.exists(SOURCE_DIR):
        print(f"WARNING: source_code folder missing: {SOURCE_DIR}")
        return content

    files = sorted([f for f in os.listdir(SOURCE_DIR) if f.endswith(".html") and f != "fixtures.html"])
    all_teams = []
    all_options = []

    for filename in files:
        file_path = os.path.join(SOURCE_DIR, filename)
        team_key  = filename_to_key(filename)
        team_name = extract_team_name(file_path, filename)

        all_options.append(f'          <option value="{team_key}">{team_name}</option>')
        print(f"\nHenter modstander: {team_name}")

        rider_ids = extract_exact_roster_ids(file_path)
        velo_map = fetch_velo_batch(rider_ids)
        riders_js = []
        for rid in rider_ids:
            d = fetch_rider(rid)
            velo = velo_map.get(str(rid)) or velo_map.get(rid)
            if d:
                d['zwift_id'] = rid
                riders_js.append(rider_to_opponent_js(d, velo=velo))
                print(f"  OK: {d.get('name')}{' [vELO]' if velo else ''}")
            else:
                print(f"  WARNING: Could not fetch rider {rid} -- tilfojer til retry-liste")
                _failed_riders.append((rid, 'opp', None, riders_js, velo))

        rung, ladder_pos, pos_in_rung = extract_rung(file_path, filename)
        pos_field      = f"\n    ladderPosition: {ladder_pos},"  if ladder_pos  is not None else ""
        pos_rung_field = f"\n    positionInRung: {pos_in_rung}," if pos_in_rung is not None else ""
        all_teams.append(
            f'  "{team_key}": {{\n    rung: {rung},{pos_field}{pos_rung_field}\n    name: "{team_name}",\n    riders: [\n'
            + ",\n".join(riders_js) + "\n    ]\n  }"
        )

    # Write to data/opponents.js
    full_library = (
        "// DATA_LIBRARY_START\nconst OPPONENT_LIBRARY = {\n"
        + ",\n".join(all_teams) + "\n};\n// DATA_LIBRARY_END\n"
    )
    opponents_js_path = os.path.join(DATA_DIR, "opponents.js")
    with open(opponents_js_path, 'w', encoding='utf-8') as f:
        f.write(full_library)
    print(f"\nOK: Opponents skrevet til {opponents_js_path} ({len(all_teams)} teams).")

    return content

# ==============================================================
# MAIN
# ==============================================================



def update_fixtures(content):
    """Henter summary-siden via Playwright og injecter LEQP_FIXTURES i index.html."""
    import json, re as _re
    from datetime import datetime
    from playwright.sync_api import sync_playwright

    SUMMARY_URL = 'https://ladder.cycleracing.club/summary'
    today = datetime.now().strftime('%Y-%m-%d')

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto(SUMMARY_URL, wait_until='networkidle', timeout=30000)
            raw = page.content()
            browser.close()
        print(f"[FIXTURES] Hentet {SUMMARY_URL} via Playwright ({len(raw)} bytes).")
    except Exception as e:
        print(f"[FIXTURES] Playwright fejl: {e} — springer over.")
        return content

    fixtures = []
    current_date = None

    for row in _re.finditer(r'<tr[^>]*>(.*?)</tr>', raw, _re.DOTALL):
        cells = _re.findall(r'<td[^>]*>(.*?)</td>', row.group(1), _re.DOTALL)
        if not cells:
            continue

        def clean(s):
            s = _re.sub(r'<[^>]+>', ' ', s)
            s = s.replace('&amp;', '&').replace('&nbsp;', ' ').replace('&lt;', '<').replace('&gt;', '>').strip()
            return _re.sub(r'\s+', ' ', s).strip()

        c = [clean(cell) for cell in cells]

        if len(c) == 1:
            d = c[0].strip()
            if d.lower() == 'today':
                current_date = today
            elif _re.match(r'\d{4}-\d{2}-\d{2}', d):
                current_date = d[:10]
            continue

        if len(c) >= 3 and current_date:
            tid = c[0].strip()
            if not _re.match(r'\d{2}:\d{2}', tid):
                continue
            home = c[1].strip() if len(c) > 1 else ''
            away = c[2].strip() if len(c) > 2 else ''
            route = c[3].strip() if len(c) > 3 else ''
            powerups_raw = c[4].strip() if len(c) > 4 else ''
            powerups = [p for p in powerups_raw.split() if p.isupper() and len(p) > 2]

            if 'LEQP' not in home and 'LEQP' not in away:
                continue
            if current_date < today:
                continue

            fixtures.append({
                'date': current_date,
                'time': tid,
                'home': home,
                'away': away,
                'route': route,
                'powerups': powerups
            })

    print(f"[FIXTURES] Fandt {len(fixtures)} kommende LEQP kampe.")

    js_block = '// LEQP_FIXTURES_START\nconst LEQP_FIXTURES = ' + json.dumps(fixtures, ensure_ascii=False) + ';\n// LEQP_FIXTURES_END\n'

    fixtures_js_path = os.path.join(DATA_DIR, "fixtures.js")
    with open(fixtures_js_path, 'w', encoding='utf-8') as f:
        f.write(js_block)
    print(f"[FIXTURES] Skrevet til {fixtures_js_path}.")
    return content

def update_ladder_races(content):
    """Henter ladder race historik for LEQP ryttere (MY_TEAMS) og skriver til data/ladder_races.js."""
    import json, re as _re

    # Læs rider IDs fra data/my_teams.js (ikke fra content/index.html)
    riders = {}  # zwift_id -> name
    my_teams_js_path = os.path.join(DATA_DIR, "my_teams.js")
    try:
        with open(my_teams_js_path, 'r', encoding='utf-8') as f:
            my_teams_src = f.read()
        for m in _re.finditer(r"zwift_id:(\d+),\s*name:'([^']+)'", my_teams_src):
            zid, name = m.group(1), m.group(2)
            riders[zid] = name
    except Exception as e:
        print(f"[LEQP RIDERS] Kunne ikke læse {my_teams_js_path}: {e}")

    print(f"\n[LEQP RIDERS] Henter races for {len(riders)} LEQP ryttere...")

    ladder_data = {}
    for zid, name in riders.items():
        try:
            resp = requests.get(f"{API_URL}/{zid}/ladder_races", timeout=20)
            if resp.status_code == 200:
                data = resp.json()
                races = data.get('races', [])
                ladder_data[zid] = {'name': name, 'races': races}
                print(f"  OK: {name} — {len(races)} races")
            else:
                ladder_data[zid] = {'name': name, 'races': []}
                print(f"  SKIP: {name} (HTTP {resp.status_code})")
        except Exception as e:
            ladder_data[zid] = {'name': name, 'races': []}
            print(f"  FEJL: {name} ({e})")

    # Byg JS streng
    lines = []
    for zid, entry in ladder_data.items():
        races_js = json.dumps(entry['races'], ensure_ascii=False)
        name_safe = entry['name'].replace("'", "\\'")
        lines.append(f"  {zid}: {{name:'{name_safe}', races:{races_js}}}")

    js_block = "// LADDER_RACES_START\nconst LADDER_RACES = {\n" + ",\n".join(lines) + "\n};\n// LADDER_RACES_END\n"

    ladder_races_js_path = os.path.join(DATA_DIR, "ladder_races.js")
    with open(ladder_races_js_path, 'w', encoding='utf-8') as f:
        f.write(js_block)
    print(f"[LEQP RIDERS] Skrevet {len(ladder_data)} LEQP ryttere til {ladder_races_js_path}.")
    return content

def main():
    try:
        with open(INDEX_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"ERROR: Could not read {INDEX_FILE}: {e}")
        return

    content = update_my_teams(content)
    content = update_opponents(content)
    content = update_fixtures(content)
    content = update_ladder_races(content)
    update_bios()

    # Genforsøg fejlede ryttere
    retry_failed_riders()

    # Inject last-updated timestamp
    from datetime import datetime
    now = datetime.now()
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    timestamp = f"Last updated: {months[now.month-1]} {now.day}, {now.year} · {now.strftime('%H:%M')}"
    content = re.sub(r'<!-- LAST_UPDATED_START -->.*?<!-- LAST_UPDATED_END -->', f'<!-- LAST_UPDATED_START -->{timestamp}<!-- LAST_UPDATED_END -->', content, flags=re.DOTALL)

    # Inject teams-updated flag (skrevet af full_update.bat)
    teams_flag_file = os.path.join(os.path.dirname(INDEX_FILE), 'teams_updated.txt')
    teams_updated = 'yes'
    if os.path.exists(teams_flag_file):
        teams_updated = open(teams_flag_file, encoding='utf-8').read().strip()
    content = re.sub(r'<!-- TEAMS_UPDATED_START -->.*?<!-- TEAMS_UPDATED_END -->', f'<!-- TEAMS_UPDATED_START -->{teams_updated}<!-- TEAMS_UPDATED_END -->', content, flags=re.DOTALL)

    try:
        with open(INDEX_FILE, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"\nSUCCESS! {INDEX_FILE} er fuldt opdateret.")
    except Exception as e:
        print(f"FEJL: Kunne ikke skrive: {e}")

if __name__ == "__main__":
    main()