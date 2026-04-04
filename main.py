import os
import time
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from zpdatafetch import ZPCyclistFetch, ZPTeamFetch
from zrdatafetch import ZRRiderFetch

# =========================
# Group ride filter
# =========================

def _load_group_ride_filters():
    path = os.path.join(os.path.dirname(__file__), "group_ride_filters.txt")
    try:
        with open(path, "r", encoding="utf-8") as f:
            return [line.strip().lower() for line in f if line.strip() and not line.startswith("#")]
    except Exception:
        return []

def _is_group_ride(title: str, filters: list) -> bool:
    t = title.lower()
    return any(f in t for f in filters)

# =========================
# Environment login setup
# =========================

@asynccontextmanager
async def lifespan(app: FastAPI):
    username = os.getenv("ZWIFTPOWER_USERNAME")
    password = os.getenv("ZWIFTPOWER_PASSWORD")

    if not username or not password:
        raise RuntimeError(
            "Missing environment variables:\n"
            "ZWIFTPOWER_USERNAME\n"
            "ZWIFTPOWER_PASSWORD"
        )

    os.environ["ZPDATAFETCH_USERNAME"] = username
    os.environ["ZPDATAFETCH_PASSWORD"] = password
    yield

app = FastAPI(title="Zwift Racing API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

# =========================
# Response Model
# =========================

class RiderPerformance(BaseModel):
    name: str
    weight: float
    watt: int
    wkg: float

    w5s: int; w10s: int; w15s: int; w30s: int
    w1min: int; w2min: int; w5min: int; w10min: int; w20min: int; w30min: int

    wkg5s: float; wkg10s: float; wkg15s: float; wkg30s: float
    wkg1min: float; wkg2min: float; wkg5min: float; wkg10min: float
    wkg20min: float; wkg30min: float

    # Ladder-only PR (kun "Club Ladder" races, 90 dage)
    ladder_w5s: int; ladder_w10s: int; ladder_w15s: int; ladder_w30s: int
    ladder_w1min: int; ladder_w2min: int; ladder_w5min: int; ladder_w10min: int
    ladder_w20min: int; ladder_w30min: int
    ladder_wkg5s: float; ladder_wkg10s: float; ladder_wkg15s: float; ladder_wkg30s: float
    ladder_wkg1min: float; ladder_wkg2min: float; ladder_wkg5min: float; ladder_wkg10min: float
    ladder_wkg20min: float; ladder_wkg30min: float
    ladder_race_count: int

# =========================
# Rider Endpoint (90 dages PR)
# =========================

@app.get("/rider/{zwift_id}", response_model=RiderPerformance)
async def get_rider(zwift_id: int):
    try:
        fetcher = ZPCyclistFetch()
        cyclists = await fetcher.afetch(zwift_id)
        cyclist = cyclists.get(zwift_id)
        
        if not cyclist:
            raise HTTPException(status_code=404, detail="Rider not found")
        
        full_res = cyclist.asdict()
        all_races = full_res.get("data", [])
        
        # Tidsgrænse: 90 dage (Unix timestamp)
        ninety_days_ago = time.time() - (90 * 24 * 60 * 60)
        
        # Beholdere til bedste værdier
        intervals = ["w5", "w10", "w15", "w30", "w60", "w120", "w300", "w600", "w1200", "w1800"]
        best_watts = {k: 0 for k in intervals}
        best_wkgs = {f"wkg{k[1:]}": 0.0 for k in intervals}
        latest_weight = 0.0
        found_recent = False

        # Ladder-only beholdere
        ladder_watts = {k: 0 for k in intervals}
        ladder_wkgs = {f"wkg{k[1:]}": 0.0 for k in intervals}
        ladder_race_count = 0

        # FORBEDRET hjælpefunktion: Håndterer lister, strenge og None
        def clean_num(val):
            if isinstance(val, list) and len(val) > 0:
                val = val[0]
            if val is None or val == "":
                return 0
            try:
                return float(val)
            except (ValueError, TypeError):
                return 0

        # Gennemløb alle løb for at finde 90-dages PR
        for race in all_races:
            # Tving race_date til float før sammenligning med ninety_days_ago
            race_date = clean_num(race.get("event_date", 0))
            
            if race_date > ninety_days_ago:
                found_recent = True
                
                # Opdater vægt fra det nyeste løb
                race_weight = clean_num(race.get("weight", 0))
                if race_weight > 0:
                    latest_weight = race_weight

                # Tjek hvert watt-interval
                for key in intervals:
                    race_val = clean_num(race.get(key, 0))
                    if race_val > best_watts[key]:
                        best_watts[key] = int(race_val)
                        wkg_key = f"wkg{key[1:]}"
                        best_wkgs[wkg_key] = clean_num(race.get(wkg_key, 0))

                # Ladder-only: kun Club Ladder races
                event_title = race.get("event_title", "")
                if "Club Ladder" in event_title:
                    ladder_race_count += 1
                    for key in intervals:
                        race_val = clean_num(race.get(key, 0))
                        if race_val > ladder_watts[key]:
                            ladder_watts[key] = int(race_val)
                            wkg_key = f"wkg{key[1:]}"
                            ladder_wkgs[wkg_key] = clean_num(race.get(wkg_key, 0))

        # FALLBACK: Hvis ingen nylige løb
        if not found_recent:
            data_entry = all_races[0] if all_races else {}
            profile = data_entry.get("profile_data", {})
            for key in intervals:
                best_watts[key] = int(clean_num(profile.get(key, 0)))
                wkg_key = f"wkg{key[1:]}"
                best_wkgs[wkg_key] = clean_num(profile.get(wkg_key, 0))
            
            if best_wkgs["wkg1200"] > 0:
                latest_weight = round(best_watts["w1200"] / best_wkgs["wkg1200"], 1)

        return {
            "name": all_races[0].get("name", "Unknown") if all_races else "Unknown",
            "weight": latest_weight,
            "watt": best_watts["w1200"],
            "wkg": best_wkgs["wkg1200"],
            
            "w5s": best_watts["w5"], "w10s": best_watts["w10"], "w15s": best_watts["w15"], "w30s": best_watts["w30"],
            "w1min": best_watts["w60"], "w2min": best_watts["w120"], "w5min": best_watts["w300"], 
            "w1min": best_watts["w60"], "w2min": best_watts["w120"], "w5min": best_watts["w300"], 
            "w10min": best_watts["w600"], "w20min": best_watts["w1200"], "w30min": best_watts["w1800"],
            
            "wkg5s": best_wkgs["wkg5"], "wkg10s": best_wkgs["wkg10"], "wkg15s": best_wkgs["wkg15"], "wkg30s": best_wkgs["wkg30"],
            "wkg1min": best_wkgs["wkg60"], "wkg2min": best_wkgs["wkg120"], "wkg5min": best_wkgs["wkg300"],
            "wkg10min": best_wkgs["wkg600"], "wkg20min": best_wkgs["wkg1200"], "wkg30min": best_wkgs["wkg1800"],

            # Ladder-only PR
            "ladder_w5s": ladder_watts["w5"], "ladder_w10s": ladder_watts["w10"],
            "ladder_w15s": ladder_watts["w15"], "ladder_w30s": ladder_watts["w30"],
            "ladder_w1min": ladder_watts["w60"], "ladder_w2min": ladder_watts["w120"],
            "ladder_w5min": ladder_watts["w300"], "ladder_w10min": ladder_watts["w600"],
            "ladder_w20min": ladder_watts["w1200"], "ladder_w30min": ladder_watts["w1800"],
            "ladder_wkg5s": ladder_wkgs["wkg5"], "ladder_wkg10s": ladder_wkgs["wkg10"],
            "ladder_wkg15s": ladder_wkgs["wkg15"], "ladder_wkg30s": ladder_wkgs["wkg30"],
            "ladder_wkg1min": ladder_wkgs["wkg60"], "ladder_wkg2min": ladder_wkgs["wkg120"],
            "ladder_wkg5min": ladder_wkgs["wkg300"], "ladder_wkg10min": ladder_wkgs["wkg600"],
            "ladder_wkg20min": ladder_wkgs["wkg1200"], "ladder_wkg30min": ladder_wkgs["wkg1800"],
            "ladder_race_count": ladder_race_count
        }
    except Exception as e:
        print(f"FEJL: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# =========================
# Ladder Races Endpoint
# =========================

@app.get("/rider/{zwift_id}/ladder_races")
async def get_ladder_races(zwift_id: int, days: int = 0):
    try:
        fetcher = ZPCyclistFetch()
        cyclists = await fetcher.afetch(zwift_id)
        cyclist = cyclists.get(zwift_id)

        if not cyclist:
            raise HTTPException(status_code=404, detail="Rider not found")

        full_res = cyclist.asdict()
        all_races = full_res.get("data", [])

        cutoff = (time.time() - (days * 24 * 60 * 60)) if days > 0 else 0

        def clean_num(val):
            if isinstance(val, list) and len(val) > 0:
                val = val[0]
            if val is None or val == "":
                return None
            try:
                return float(val)
            except (ValueError, TypeError):
                return None

        gr_filters = _load_group_ride_filters()

        ladder_races = []
        other_races = []
        for race in all_races:
            title = race.get("event_title", "")
            event_date = race.get("event_date", 0)
            if isinstance(event_date, list):
                event_date = event_date[0] if event_date else 0
            try:
                event_date = float(event_date)
            except (ValueError, TypeError):
                event_date = 0

            entry = {
                "zid":         race.get("zid"),
                "rt":          race.get("rt"),
                "event_title": title,
                "event_date":  event_date,
                "distance":    race.get("distance"),
                "pos":         race.get("pos"),
                "pos_in_cat":  race.get("position_in_cat"),
                "category":    race.get("category"),
                "weight":      clean_num(race.get("weight")),
                "avg_wkg":     clean_num(race.get("avg_wkg")),
                "avg_watts":   clean_num(race.get("avg_power")),
                "np":          clean_num(race.get("np")),
                "ftp":         clean_num(race.get("ftp")),
                "time":        clean_num(race.get("time")),
                "avg_hr":      clean_num(race.get("avg_hr")),
                "max_hr":      clean_num(race.get("max_hr")),
                "wkg5":        clean_num(race.get("wkg5")),
                "wkg15":       clean_num(race.get("wkg15")),
                "wkg30":       clean_num(race.get("wkg30")),
                "wkg60":       clean_num(race.get("wkg60")),
                "wkg120":      clean_num(race.get("wkg120")),
                "wkg300":      clean_num(race.get("wkg300")),
                "wkg600":      clean_num(race.get("wkg600")),
                "wkg1200":     clean_num(race.get("wkg1200")),
                "w5":          clean_num(race.get("w5")),
                "w15":         clean_num(race.get("w15")),
                "w30":         clean_num(race.get("w30")),
                "w60":         clean_num(race.get("w60")),
                "w120":        clean_num(race.get("w120")),
                "w300":        clean_num(race.get("w300")),
                "w600":        clean_num(race.get("w600")),
                "w1200":       clean_num(race.get("w1200")),
            }

            ft = race.get("f_t", "")
            is_race = "TYPE_RACE" in ft or "TYPE_TIME_TRIAL" in ft or "TYPE_TEAM_TIME_TRIAL" in ft

            if "Club Ladder" in title:
                ladder_races.append(entry)
            elif is_race and not _is_group_ride(title, gr_filters) and (cutoff == 0 or event_date >= cutoff):
                entry["tname"] = race.get("tname")
                other_races.append(entry)

        ladder_races.sort(key=lambda r: r["event_date"] or 0, reverse=True)
        other_races.sort(key=lambda r: r["event_date"] or 0, reverse=True)

        name = all_races[0].get("name", "Unknown") if all_races else "Unknown"
        return {"zwift_id": zwift_id, "name": name, "races": ladder_races, "other_races": other_races}

    except Exception as e:
        print(f"FEJL ladder_races: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# =========================
# Other Races Endpoint
# =========================

@app.get("/rider/{zwift_id}/other_races")
async def get_other_races(zwift_id: int, days: int = 365):
    try:
        fetcher = ZPCyclistFetch()
        cyclists = await fetcher.afetch(zwift_id)
        cyclist = cyclists.get(zwift_id)

        if not cyclist:
            raise HTTPException(status_code=404, detail="Rider not found")

        full_res = cyclist.asdict()
        all_races = full_res.get("data", [])

        cutoff = time.time() - (days * 24 * 60 * 60)

        def clean_num(val):
            if isinstance(val, list) and len(val) > 0:
                val = val[0]
            if val is None or val == "":
                return None
            try:
                return float(val)
            except (ValueError, TypeError):
                return None

        gr_filters = _load_group_ride_filters()

        other_races = []
        for race in all_races:
            title = race.get("event_title", "")
            if "Club Ladder" in title:
                continue

            ft = race.get("f_t", "")
            if not ("TYPE_RACE" in ft or "TYPE_TIME_TRIAL" in ft or "TYPE_TEAM_TIME_TRIAL" in ft):
                continue

            if _is_group_ride(title, gr_filters):
                continue

            event_date = race.get("event_date", 0)
            if isinstance(event_date, list):
                event_date = event_date[0] if event_date else 0
            try:
                event_date = float(event_date)
            except (ValueError, TypeError):
                event_date = 0

            if event_date < cutoff:
                continue

            other_races.append({
                "zid":         race.get("zid"),
                "rt":          race.get("rt"),
                "event_title": title,
                "tname":       race.get("tname"),
                "event_date":  event_date,
                "distance":    race.get("distance"),
                "pos":         race.get("pos"),
                "pos_in_cat":  race.get("position_in_cat"),
                "category":    race.get("category"),
                "weight":      clean_num(race.get("weight")),
                "avg_wkg":     clean_num(race.get("avg_wkg")),
                "avg_watts":   clean_num(race.get("avg_power")),
                "np":          clean_num(race.get("np")),
                "ftp":         clean_num(race.get("ftp")),
                "time":        clean_num(race.get("time")),
                "avg_hr":      clean_num(race.get("avg_hr")),
                "max_hr":      clean_num(race.get("max_hr")),
                "wkg5":        clean_num(race.get("wkg5")),
                "wkg15":       clean_num(race.get("wkg15")),
                "wkg30":       clean_num(race.get("wkg30")),
                "wkg60":       clean_num(race.get("wkg60")),
                "wkg120":      clean_num(race.get("wkg120")),
                "wkg300":      clean_num(race.get("wkg300")),
                "wkg600":      clean_num(race.get("wkg600")),
                "wkg1200":     clean_num(race.get("wkg1200")),
                "w5":          clean_num(race.get("w5")),
                "w15":         clean_num(race.get("w15")),
                "w30":         clean_num(race.get("w30")),
                "w60":         clean_num(race.get("w60")),
                "w120":        clean_num(race.get("w120")),
                "w300":        clean_num(race.get("w300")),
                "w600":        clean_num(race.get("w600")),
                "w1200":       clean_num(race.get("w1200")),
            })

        other_races.sort(key=lambda r: r["event_date"] or 0, reverse=True)

        name = all_races[0].get("name", "Unknown") if all_races else "Unknown"
        return {"zwift_id": zwift_id, "name": name, "races": other_races}

    except Exception as e:
        print(f"FEJL other_races: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# =========================
# Rides Endpoint
# =========================

@app.get("/rider/{zwift_id}/rides")
async def get_rides(zwift_id: int):
    try:
        fetcher = ZPCyclistFetch()
        cyclists = await fetcher.afetch(zwift_id)
        cyclist = cyclists.get(zwift_id)

        if not cyclist:
            raise HTTPException(status_code=404, detail="Rider not found")

        full_res = cyclist.asdict()
        all_activities = full_res.get("data", [])

        def clean_num(val):
            if isinstance(val, list) and len(val) > 0:
                val = val[0]
            if val is None or val == "":
                return None
            try:
                return float(val)
            except (ValueError, TypeError):
                return None

        rides = []
        for activity in all_activities:
            ft = activity.get("f_t", "")
            if "TYPE_RIDE" not in ft or "TYPE_RACE" in ft or "TYPE_WORKOUT" in ft:
                continue

            title = activity.get("event_title", "")
            event_date = activity.get("event_date", 0)
            if isinstance(event_date, list):
                event_date = event_date[0] if event_date else 0
            try:
                event_date = float(event_date)
            except (ValueError, TypeError):
                event_date = 0

            dist = activity.get("distance")
            try:
                dist = float(dist) if dist not in (None, "") else None
            except (ValueError, TypeError):
                dist = None

            rides.append({
                "zid":         activity.get("zid"),
                "rt":          activity.get("rt"),
                "event_title": title,
                "event_date":  event_date,
                "distance":    dist,
                "weight":      clean_num(activity.get("weight")),
                "avg_wkg":     clean_num(activity.get("avg_wkg")),
                "avg_watts":   clean_num(activity.get("avg_power")),
                "np":          clean_num(activity.get("np")),
                "ftp":         clean_num(activity.get("ftp")),
                "time":        clean_num(activity.get("time")),
                "avg_hr":      clean_num(activity.get("avg_hr")),
                "max_hr":      clean_num(activity.get("max_hr")),
                "wkg5":        clean_num(activity.get("wkg5")),
                "wkg15":       clean_num(activity.get("wkg15")),
                "wkg30":       clean_num(activity.get("wkg30")),
                "wkg60":       clean_num(activity.get("wkg60")),
                "wkg120":      clean_num(activity.get("wkg120")),
                "wkg300":      clean_num(activity.get("wkg300")),
                "wkg600":      clean_num(activity.get("wkg600")),
                "wkg1200":     clean_num(activity.get("wkg1200")),
                "w5":          clean_num(activity.get("w5")),
                "w15":         clean_num(activity.get("w15")),
                "w30":         clean_num(activity.get("w30")),
                "w60":         clean_num(activity.get("w60")),
                "w120":        clean_num(activity.get("w120")),
                "w300":        clean_num(activity.get("w300")),
                "w600":        clean_num(activity.get("w600")),
                "w1200":       clean_num(activity.get("w1200")),
            })

        rides.sort(key=lambda r: r["event_date"] or 0, reverse=True)

        name = all_activities[0].get("name", "Unknown") if all_activities else "Unknown"
        return {"zwift_id": zwift_id, "name": name, "rides": rides}

    except Exception as e:
        print(f"FEJL rides: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# =========================
# vELO2 Endpoints
# =========================

@app.get("/rider/{zwift_id}/velo")
async def get_velo(zwift_id: int):
    try:
        fetcher = ZRRiderFetch()
        riders = await fetcher.afetch(zwift_id)
        rider = riders.get(zwift_id)
        if not rider:
            raise HTTPException(status_code=404, detail="Rider not found in ZR")
        return {
            "zwift_id":       zwift_id,
            "name":           rider.name,
            "velo_sprint":    rider.velo_sprint,
            "velo_punch":     rider.velo_punch,
            "velo_climb":     rider.velo_climb,
            "velo_pursuit":   rider.velo_pursuit,
            "velo_endurance": rider.velo_endurance,
            "velo_tt":        rider.velo_time_trial,
            "velo_race":      rider.velo_race,
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"FEJL velo {zwift_id}: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/velo/batch")
async def get_velo_batch(zwift_ids: list[int]):
    try:
        fetcher = ZRRiderFetch()
        riders = await fetcher.afetch_batch(*zwift_ids)
        result = {}
        for zid, rider in riders.items():
            result[str(zid)] = {
                "zwift_id":       zid,
                "name":           rider.name,
                "velo_sprint":    rider.velo_sprint,
                "velo_punch":     rider.velo_punch,
                "velo_climb":     rider.velo_climb,
                "velo_pursuit":   rider.velo_pursuit,
                "velo_endurance": rider.velo_endurance,
                "velo_tt":        rider.velo_time_trial,
                "velo_race":      rider.velo_race,
            }
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# =========================
# Team Members Endpoint
# =========================

@app.get("/team/{team_id}")
async def get_team_members(team_id: int, max_rank: int = 599):
    try:
        fetcher = ZPTeamFetch()
        teams = await fetcher.afetch(team_id)
        team = teams.get(team_id)
        if not team:
            raise HTTPException(status_code=404, detail="Team not found")

        def clean_team(val):
            if val is None or val == "":
                return None
            try:
                return float(val)
            except (ValueError, TypeError):
                return None

        members = []
        for m in team.aslist():
            try:
                rank_val = float(m.get('rank') or 9999)
            except (ValueError, TypeError):
                rank_val = 9999
            if rank_val == 0 or rank_val > max_rank:
                continue

            members.append({
                "zwift_id":     m.get('zwift_id'),
                "name":         m.get('name', '').strip(),
                "rank":         int(rank_val),
                "h_15_wkg":     clean_team(m.get('h_15_wkg')),
                "h_15_watts":   clean_team(m.get('h_15_watts')),
                "h_1200_wkg":   clean_team(m.get('h_1200_wkg')),
                "h_1200_watts": clean_team(m.get('h_1200_watts')),
                "skill_race":   clean_team(m.get('skill_race')),
                "skill_seg":    clean_team(m.get('skill_seg')),
                "skill_power":  clean_team(m.get('skill_power')),
                "distance":     clean_team(m.get('distance')),
                "climbed":      clean_team(m.get('climbed')),
            })

        members.sort(key=lambda x: x["name"])
        return members
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))