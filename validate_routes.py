"""
validate_routes.py
Validates ZWIFT_ROUTES in index.html for internal consistency and flags anomalies.

Checks:
  1. Required fields present and correct types
  2. flatKm <= distance
  3. Valid type values
  4. Elevation-to-distance ratios plausible
  5. Duplicate route names
  6. flatKm plausibility given elevation/punches
  7. Mismatched reverse-route pairs (distance/elevation should match)
  8. Routes where punches > 0 but flatKm == distance (impossible)
"""

import re
import sys
import io
from collections import defaultdict

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

INDEX_FILE = "index.html"

VALID_TYPES  = {"tt", "sprint", "punch", "climb"}
VALID_WORLDS = {"Watopia", "London", "France", "Paris", "Innsbruck", "Bologna",
                "Makuri", "New York", "Richmond", "Scotland", "Crit City", "Yorkshire"}

# ── Extract routes ────────────────────────────────────────────────────────────

def extract_routes(path):
    with open(path, encoding="utf-8") as f:
        html = f.read()

    # Find the ZWIFT_ROUTES array content
    m = re.search(r'const ZWIFT_ROUTES\s*=\s*\[(.*?)\];', html, re.DOTALL)
    if not m:
        sys.exit("ERROR: ZWIFT_ROUTES not found in index.html")

    block = m.group(1)

    # Parse each route object
    pattern = re.compile(
        r"\{\s*name:\s*'([^']+)'"
        r",\s*world:\s*'([^']+)'"
        r",\s*distance:\s*([\d.]+)"
        r",\s*elevation:\s*([\d.]+)"
        r",\s*punches:\s*([\d.]+)"
        r",\s*flatKm:\s*([\d.]+)"
        r",\s*type:\s*'([^']+)'\s*\}"
    )

    routes = []
    for m in pattern.finditer(block):
        routes.append({
            "name":      m.group(1),
            "world":     m.group(2),
            "distance":  float(m.group(3)),
            "elevation": float(m.group(4)),
            "punches":   int(m.group(5)),
            "flatKm":    float(m.group(6)),
            "type":      m.group(7),
        })
    return routes


# ── Validation rules ──────────────────────────────────────────────────────────

def validate(routes):
    errors   = []  # definite bugs
    warnings = []  # suspicious but not always wrong

    names_seen = defaultdict(list)
    for i, r in enumerate(routes):
        n   = r["name"]
        loc = f"[{i+1:03d}] {n!r}"

        # 1. Valid world
        if r["world"] not in VALID_WORLDS:
            errors.append(f"{loc} — unknown world: {r['world']!r}")

        # 2. Valid type
        if r["type"] not in VALID_TYPES:
            errors.append(f"{loc} — invalid type: {r['type']!r}  (valid: {sorted(VALID_TYPES)})")

        # 3. flatKm must not exceed distance
        if r["flatKm"] > r["distance"]:
            errors.append(
                f"{loc} — flatKm ({r['flatKm']}) > distance ({r['distance']})"
            )

        # 4. Positive values only
        for field in ("distance", "elevation", "punches", "flatKm"):
            if r[field] < 0:
                errors.append(f"{loc} — negative {field}: {r[field]}")

        # 5. flatKm == distance but punches > 0 (impossible: can't be all-flat with punches)
        if r["punches"] > 0 and r["flatKm"] >= r["distance"]:
            errors.append(
                f"{loc} — flatKm ({r['flatKm']}) == distance ({r['distance']}) "
                f"but punches={r['punches']} (contradictory)"
            )

        # 6. Elevation per km: flag extremes
        elev_per_km = r["elevation"] / r["distance"] if r["distance"] > 0 else 0
        if elev_per_km > 120:
            warnings.append(
                f"{loc} — very high elevation/km: {elev_per_km:.1f}m/km "
                f"(elev={r['elevation']}, dist={r['distance']})"
            )
        if elev_per_km < 3 and r["type"] in {"climb", "punch"}:
            warnings.append(
                f"{loc} — type={r['type']!r} but only {elev_per_km:.1f}m/km elevation "
                f"(elev={r['elevation']}, dist={r['distance']})"
            )

        # 7. TT/sprint with high elevation
        # Threshold is 40m/km (not lower) — TT routes like Bologna have one hard climb
        # segment but are still ridden as time trials, so a moderate average gradient is fine.
        if r["type"] == "tt" and elev_per_km > 40:
            warnings.append(
                f"{loc} — type='tt' but {elev_per_km:.1f}m/km elevation — should this be 'climb'?"
            )
        if r["type"] == "sprint" and elev_per_km > 25:
            warnings.append(
                f"{loc} — type='sprint' but {elev_per_km:.1f}m/km elevation — should this be 'punch'?"
            )

        # 8. Climb type but very low elevation
        if r["type"] == "climb" and r["elevation"] < 100:
            warnings.append(
                f"{loc} — type='climb' but elevation only {r['elevation']}m"
            )

        # 9. Distance sanity
        if r["distance"] < 1:
            warnings.append(f"{loc} — very short distance: {r['distance']}km")
        if r["distance"] > 200:
            warnings.append(f"{loc} — very long distance: {r['distance']}km")

        names_seen[n].append(i + 1)

    # 10. Duplicate names
    for name, indices in names_seen.items():
        if len(indices) > 1:
            errors.append(f"Duplicate route name {name!r} at positions {indices}")

    # 11. Reverse-route pairs: distance and elevation should match
    reverse_suffixes = [" Reverse", " CCW", " Reverse Loop"]
    for r in routes:
        for suffix in reverse_suffixes:
            if r["name"].endswith(suffix):
                base_name = r["name"][: -len(suffix)]
                base = next((x for x in routes if x["name"] == base_name), None)
                if base:
                    dist_diff  = abs(r["distance"]  - base["distance"])
                    elev_diff  = abs(r["elevation"]  - base["elevation"])
                    # Allow small differences for lead-in variations (≤ 2km / 30m)
                    if dist_diff > 2.0:
                        warnings.append(
                            f"{r['name']!r} vs {base_name!r} — "
                            f"distance differs by {dist_diff:.1f}km "
                            f"({r['distance']} vs {base['distance']})"
                        )
                    if elev_diff > 50:
                        warnings.append(
                            f"{r['name']!r} vs {base_name!r} — "
                            f"elevation differs by {elev_diff:.0f}m "
                            f"({r['elevation']} vs {base['elevation']})"
                        )

    return errors, warnings


# ── Report ────────────────────────────────────────────────────────────────────

def main():
    routes = extract_routes(INDEX_FILE)
    print(f"Loaded {len(routes)} routes from {INDEX_FILE}\n")

    errors, warnings = validate(routes)

    # Summary by world
    by_world = defaultdict(int)
    for r in routes:
        by_world[r["world"]] += 1
    print("── Routes by world ──────────────────────────────")
    for world, count in sorted(by_world.items()):
        print(f"  {world:<14} {count:>3}")
    print()

    # Type distribution
    by_type = defaultdict(int)
    for r in routes:
        by_type[r["type"]] += 1
    print("── Routes by type ───────────────────────────────")
    for t, count in sorted(by_type.items()):
        marker = "" if t in VALID_TYPES else "  ← INVALID"
        print(f"  {t:<10} {count:>3}{marker}")
    print()

    # Errors
    if errors:
        print(f"── ERRORS ({len(errors)}) ─────────────────────────────────")
        for e in errors:
            print(f"  ✗ {e}")
        print()
    else:
        print("── ERRORS ───────────────────────────────────────")
        print("  ✓ No errors found")
        print()

    # Warnings
    if warnings:
        print(f"── WARNINGS ({len(warnings)}) ──────────────────────────────")
        for w in warnings:
            print(f"  ⚠ {w}")
        print()
    else:
        print("── WARNINGS ─────────────────────────────────────")
        print("  ✓ No warnings")
        print()

    # Exit code
    if errors:
        print(f"Result: FAILED — {len(errors)} error(s), {len(warnings)} warning(s)")
        sys.exit(1)
    else:
        print(f"Result: OK — 0 errors, {len(warnings)} warning(s)")


if __name__ == "__main__":
    main()
