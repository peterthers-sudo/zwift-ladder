"""
emea_teams.py
Udtraekker holdnavne fra OPPONENT_LIBRARY og gemmer dem i emea_teams.json.
Bruges af simulate.py til at filtrere AMER/APAC-loeb fra.
"""

import json
import os
import re

BASE = os.path.dirname(os.path.abspath(__file__))
# OPPONENT_LIBRARY laa tidligere i index.html, men blev flyttet til data/.
SOURCE = os.path.join(BASE, "data", "opponents.js")
OUTPUT = os.path.join(BASE, "emea_teams.json")

with open(SOURCE, encoding="utf-8", errors="replace") as f:
    content = f.read()

idx = content.find("OPPONENT_LIBRARY = {")
if idx == -1:
    raise SystemExit(f"FEJL: OPPONENT_LIBRARY ikke fundet i {SOURCE}")

# Ingen laengdebegraensning her - filen er stoerre end de 500 KB der
# tidligere blev laest, saa en fast graense taber hold i den sidste del.
blocks = re.split(r'"VIEW_SOURCE_[^"]+"\s*:\s*{', content[idx:])

names = []
for b in blocks:
    if "ladderPosition" in b and "name:" in b:
        m = re.search(r'name:\s*"([^"]+)"', b)
        if m:
            n = re.sub(r'&#\d+;', '', m.group(1))
            n = n.replace("&amp;", "&").replace("&nbsp;", " ").strip()
            names.append(n)

names = sorted(set(names))
with open(OUTPUT, "w", encoding="utf-8") as f:
    json.dump(names, f, ensure_ascii=False, indent=2)

print("OK: " + str(len(names)) + " EMEA hold gemt")
