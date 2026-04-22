"""
Zwift Ladder — Auto Download Team Stats Pages

Læser alle gemte teamView-filer i source_code/, trækker teamStats-ID'et
ud af hver (href="/teamStats/<id>"), logger ind på ladder.cycleracing.club
og gemmer teamStats-siderne som
  source_code/view-source_ladder_cycleracing_club_teamStats_<id>.html

Brug:
    python fetch_team_stats.py                  # hent alle
    python fetch_team_stats.py --sample 1       # test med 1 hold
    python fetch_team_stats.py --only Tourmalet # hent kun hold hvis filnavn matcher
    python fetch_team_stats.py --skip-existing  # spring allerede downloadede over

Kræver: pip install selenium webdriver-manager
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager
import os, re, time, argparse, subprocess, sys

# ==============================================================
# KONFIGURATION
# ==============================================================
USERNAME   = "peterthers@gmail.com"
PASSWORD   = "kopenHagen17A"
SOURCE_DIR = r"C:\zwiftpower-api-main\source_code"
BASE_URL   = "https://ladder.cycleracing.club"
# ==============================================================

TEAMVIEW_PREFIX = "view-source_ladder_cycleracing_club_teamView_"
TEAMSTATS_PREFIX = "view-source_ladder_cycleracing_club_teamStats_"


def log(msg, level="INFO"):
    prefix = {"INFO": "  ", "OK": "\u2713 ", "WARN": "\u26a0 ", "ERR": "\u2717 "}.get(level, "  ")
    print(f"{prefix}{msg}", flush=True)


def extract_team_stats_id(html_path):
    """Læs en teamView HTML og returnér teamStats-ID (int) eller None."""
    try:
        with open(html_path, encoding="utf-8", errors="replace") as f:
            # Vi behøver ikke hele filen — ID'et ligger typisk omkring linje 500-700.
            # Læs første 300 KB for hastighed.
            text = f.read(300_000)
    except Exception as e:
        log(f"Kan ikke læse {html_path}: {e}", "WARN")
        return None

    m = re.search(r'/teamStats/(\d+)', text)
    return int(m.group(1)) if m else None


def collect_team_ids(source_dir, only_substr=None):
    """Scan source_dir og returnér [(team_id, teamview_filename), ...]."""
    results = []
    if not os.path.isdir(source_dir):
        log(f"source_dir findes ikke: {source_dir}", "ERR")
        return results

    for name in sorted(os.listdir(source_dir)):
        if not name.startswith(TEAMVIEW_PREFIX) or not name.endswith(".html"):
            continue
        if only_substr and only_substr.lower() not in name.lower():
            continue
        full = os.path.join(source_dir, name)
        team_id = extract_team_stats_id(full)
        if team_id is None:
            log(f"Intet teamStats-ID i {name}", "WARN")
            continue
        results.append((team_id, name))
    return results


def wait_for_page(driver, seconds=4):
    time.sleep(seconds)
    try:
        WebDriverWait(driver, 10).until(
            lambda d: d.execute_script("return document.readyState") == "complete"
        )
    except Exception:
        pass


def click_element(driver, element):
    driver.execute_script("arguments[0].click();", element)


def build_driver():
    log("Bygger Chrome driver...")
    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_argument("--disable-infobars")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--no-first-run")
    options.add_argument("--no-default-browser-check")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option("useAutomationExtension", False)

    driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()),
        options=options,
    )
    driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
        "source": """
            Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
            Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
            Object.defineProperty(navigator, 'plugins',   { get: () => [1,2,3,4,5] });
        """
    })
    log("Chrome driver klar.", "OK")
    return driver


def kill_chrome():
    log("Lukker Chrome-processer...")
    subprocess.call(
        "taskkill /f /im chrome.exe /t",
        shell=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    time.sleep(2)


def login(driver):
    log("Logger ind...")
    driver.get(f"{BASE_URL}/signin")
    wait_for_page(driver, 3)

    inputs = driver.find_elements(By.TAG_NAME, "input")
    email_field = next(
        (i for i in inputs if "email" in (i.get_attribute("type") or "").lower()
         or "email" in (i.get_attribute("name") or "").lower()),
        None,
    )
    pass_field = next(
        (i for i in inputs if "password" in (i.get_attribute("type") or "").lower()),
        None,
    )
    if not email_field or not pass_field:
        log("Kunne ikke finde login-felter.", "ERR")
        return False

    email_field.send_keys(USERNAME)
    pass_field.send_keys(PASSWORD)
    submit = next(
        (b for b in driver.find_elements(By.TAG_NAME, "button")
         if b.get_attribute("type") == "submit"),
        None,
    )
    if submit:
        click_element(driver, submit)
        wait_for_page(driver, 5)

    if "signin" in driver.current_url or "login" in driver.current_url:
        log(f"Login fejlede — {driver.current_url}", "ERR")
        return False

    log(f"Login OK — {driver.current_url}", "OK")
    return True


def fetch_and_save(driver, team_id, out_path):
    url = f"{BASE_URL}/teamStats/{team_id}"
    driver.get(url)
    wait_for_page(driver, 3)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(driver.page_source)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sample", type=int, default=0,
                    help="Hent kun N hold (til test)")
    ap.add_argument("--only", type=str, default=None,
                    help="Hent kun hold hvis teamView-filnavn indeholder denne substring")
    ap.add_argument("--skip-existing", action="store_true",
                    help="Spring hold over hvis teamStats-fil allerede findes")
    args = ap.parse_args()

    log("=" * 60)
    log("ZWIFT LADDER TEAM STATS DOWNLOADER")
    log("=" * 60)

    os.makedirs(SOURCE_DIR, exist_ok=True)

    teams = collect_team_ids(SOURCE_DIR, only_substr=args.only)
    log(f"Fandt {len(teams)} teamStats-ID'er i source_code/.", "OK")
    if not teams:
        log("Ingen hold at hente — afslutter.", "WARN")
        return 1

    if args.skip_existing:
        before = len(teams)
        teams = [
            (tid, name) for (tid, name) in teams
            if not os.path.exists(os.path.join(SOURCE_DIR, f"{TEAMSTATS_PREFIX}{tid}.html"))
        ]
        log(f"Springer {before - len(teams)} allerede-downloadede over.", "INFO")

    if args.sample and args.sample > 0:
        teams = teams[: args.sample]
        log(f"SAMPLE-mode: henter kun {len(teams)} hold", "INFO")

    if not teams:
        log("Intet at hente.", "OK")
        return 0

    kill_chrome()
    driver = build_driver()

    success, failed = 0, 0
    try:
        if not login(driver):
            log("Afbryder — login fejlede.", "ERR")
            return 2

        log(f"\nDownloader {len(teams)} teamStats-sider...\n")
        for i, (team_id, teamview_name) in enumerate(teams, 1):
            out_name = f"{TEAMSTATS_PREFIX}{team_id}.html"
            out_path = os.path.join(SOURCE_DIR, out_name)
            try:
                fetch_and_save(driver, team_id, out_path)
                log(f"[{i}/{len(teams)}] id={team_id}  ({teamview_name[:60]})", "OK")
                success += 1
            except Exception as e:
                log(f"[{i}/{len(teams)}] FEJL id={team_id}: {e}", "ERR")
                failed += 1

        log(f"\n{'='*60}")
        log(f"Færdig! {success} sider gemt, {failed} fejlede.", "OK")
        log(f"Filer gemt i: {SOURCE_DIR}")

    finally:
        driver.quit()

    return 0 if failed == 0 else 3


if __name__ == "__main__":
    sys.exit(main())
