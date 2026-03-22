"""
Zwift Ladder — Auto Download Team Source Pages
Kræver: pip install selenium webdriver-manager
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import os, time, re, subprocess

# ==============================================================
# KONFIGURATION
# ==============================================================
USERNAME   = "peterthers@gmail.com"
PASSWORD   = "kopenHagen17A"
OUTPUT_DIR = r"C:\zwiftpower-api-main\source_code"
BASE_URL   = "https://ladder.cycleracing.club"
DIVISION   = "EMEA"   # EMEA, AMER, APAC eller WOMENS

# Chrome-profil med gemt Google-session — undgår OAuth-login problem.
# Første gang: åbn Chrome normalt, log ind på ladder.cycleracing.club via Google,
# luk Chrome helt, og kør derefter dette script. Profilen genbruges automatisk.
CHROME_PROFILE_DIR = r"C:\Users\peter\AppData\Local\Google\Chrome\User Data"
CHROME_PROFILE     = "Default"  # eller "Profile 1" etc.
# ==============================================================

def log(msg, level="INFO"):
    prefix = {"INFO": "  ", "OK": "✓ ", "WARN": "⚠ ", "ERR": "✗ "}.get(level, "  ")
    print(f"{prefix}{msg}")

def sanitize_filename(team_url):
    path = team_url.replace("https://", "").replace("http://", "")
    path = path.replace("/", "_").replace(".", "_").replace("%20", "_").replace(" ", "_")
    path = re.sub(r'[<>:"|?*]', '', path)
    return f"view-source_{path}.html"

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

def dump_page_state(driver, label=""):
    """Logger udførlig info om den aktuelle side — hjælper med fejlfinding."""
    log(f"--- PAGE STATE: {label} ---")
    log(f"URL   : {driver.current_url}")
    log(f"Title : {driver.title}")

    # Tjek for synlige fejlbeskeder på siden
    error_texts = driver.execute_script("""
        var candidates = document.querySelectorAll(
            '.error, .alert, .warning, .message, [class*="error"], [class*="alert"], [role="alert"]'
        );
        var msgs = [];
        for (var i = 0; i < candidates.length; i++) {
            var t = candidates[i].innerText.trim();
            if (t.length > 0 && t.length < 300) msgs.push(t);
        }
        return msgs;
    """)
    if error_texts:
        log(f"Synlige fejlbeskeder på siden:", "WARN")
        for e in error_texts:
            log(f"  >> {e}", "WARN")

    # Log body-tekst (første 500 tegn)
    body_snippet = driver.execute_script("return document.body ? document.body.innerText.trim().slice(0, 500) : '(tom)'")
    log(f"Body (første 500 tegn):\n{body_snippet}")

    # Log cookies
    cookies = driver.get_cookies()
    log(f"Cookies ({len(cookies)} stk): {[c['name'] for c in cookies]}")
    log("---")

def get_team_urls_on_page(driver):
    urls = driver.execute_script("""
        var links = document.querySelectorAll('a[href*="teamView"]');
        var result = [];
        for (var i = 0; i < links.length; i++) {
            result.push({
                href: links[i].href,
                text: links[i].innerText.trim()
            });
        }
        return result;
    """)
    return urls or []

def build_driver():
    log("Bygger Chrome driver (ingen profil — direkte login)...")
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
        options=options
    )

    driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
        "source": """
            Object.defineProperty(navigator, 'webdriver', {
                get: () => undefined
            });
            Object.defineProperty(navigator, 'languages', {
                get: () => ['en-US', 'en']
            });
            Object.defineProperty(navigator, 'plugins', {
                get: () => [1, 2, 3, 4, 5]
            });
        """
    })

    log("Chrome driver klar.", "OK")
    return driver

def kill_chrome():
    log("Lukker eventuelle Chrome-processer så profilen er fri...")
    subprocess.call("taskkill /f /im chrome.exe /t", shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2)

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    log("=" * 60)
    log("ZWIFT LADDER TEAM DOWNLOADER")
    log("=" * 60)

    kill_chrome()
    driver = build_driver()

    try:
        # ── LOGIN med brugernavn/password ──────────────────────
        log(f"\nLogger ind med brugernavn/password...")
        driver.get(f"{BASE_URL}/signin")
        wait_for_page(driver, 3)
        inputs = driver.find_elements(By.TAG_NAME, "input")
        email_field = next((i for i in inputs if "email" in (i.get_attribute("type") or "").lower()
                            or "email" in (i.get_attribute("name") or "").lower()), None)
        pass_field  = next((i for i in inputs if "password" in (i.get_attribute("type") or "").lower()), None)
        if email_field and pass_field:
            email_field.send_keys(USERNAME)
            pass_field.send_keys(PASSWORD)
            submit = next((b for b in driver.find_elements(By.TAG_NAME, "button")
                           if b.get_attribute("type") == "submit"), None)
            if submit:
                click_element(driver, submit)
                wait_for_page(driver, 5)
        if "signin" in driver.current_url or "login" in driver.current_url:
            log("Login fejlede! Tjek credentials eller log manuelt ind via Google på siden først.", "ERR")
            dump_page_state(driver, "LOGIN FEJL")
            return
        else:
            log(f"Login OK — {driver.current_url}", "OK")

                # ── GÅ TIL /rungs ─────────────────────────────────────
        log(f"\nNavigerer til {BASE_URL}/rungs")
        driver.get(f"{BASE_URL}/rungs")
        wait_for_page(driver, 4)
        dump_page_state(driver, "RUNGS SIDE")

        # Klik division
        clicked_div = driver.execute_script(f"""
            var els = document.querySelectorAll('a, button');
            for (var i = 0; i < els.length; i++) {{
                if (els[i].innerText.trim() === '{DIVISION}') {{
                    els[i].click();
                    return els[i].innerText;
                }}
            }}
            return null;
        """)
        if clicked_div:
            log(f"Division klikket: {clicked_div}", "OK")
            wait_for_page(driver, 2)
        else:
            log(f"Division '{DIVISION}' ikke fundet — fortsætter med default", "WARN")

        # ── SAML ALLE HOLD ─────────────────────────────────────
        all_teams = {}
        rung_num = 1

        while True:
            log(f"\nRung {rung_num} — {driver.current_url}")
            wait_for_page(driver, 2)

            teams_on_page = get_team_urls_on_page(driver)
            added = 0
            for t in teams_on_page:
                href = t.get('href', '')
                name = t.get('text', '') or href.split('/')[-1]
                if href and href not in all_teams:
                    all_teams[href] = name
                    added += 1

            log(f"{added} nye hold fundet (total: {len(all_teams)})", "OK" if added > 0 else "WARN")

            next_url = driver.execute_script("""
                var els = document.querySelectorAll('a');
                for (var i = 0; i < els.length; i++) {
                    var txt = els[i].innerText.trim().toLowerCase();
                    if (txt.includes('next rung') || txt.includes('next »') || txt === '»') {
                        return els[i].href;
                    }
                }
                return null;
            """)

            if not next_url or next_url == driver.current_url or '#' in next_url:
                log("Ingen flere rungs — færdig med at samle hold.")
                break

            driver.get(next_url)
            rung_num += 1

        log(f"\nTotal: {len(all_teams)} unikke hold fundet", "OK")

        if len(all_teams) == 0:
            log("INGEN HOLD FUNDET!", "ERR")
            dump_page_state(driver, "INGEN HOLD")
            log("Venter 30 sek — tjek manuelt i Chrome om siden ser rigtig ud", "WARN")
            time.sleep(30)
            return

        # ── GEM KILDEKODE ──────────────────────────────────────
        log("\nDownloader kildekode for hvert hold...\n")
        teams_list = list(all_teams.items())
        success, failed = 0, 0

        for i, (url, name) in enumerate(teams_list, 1):
            try:
                driver.get(url)
                wait_for_page(driver, 2)

                filename = sanitize_filename(url)
                filepath = os.path.join(OUTPUT_DIR, filename)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(driver.page_source)

                log(f"[{i}/{len(teams_list)}] {name}", "OK")
                success += 1
            except Exception as e:
                log(f"[{i}/{len(teams_list)}] FEJL: {name}: {e}", "ERR")
                failed += 1

        log(f"\n{'='*60}")
        log(f"Færdig! {success} hold gemt, {failed} fejlede.", "OK")
        log(f"Filer gemt i: {OUTPUT_DIR}")

        # ── HE N T FIXTURES SUMMARY ──────────────────────────────
        log("\nHenter fixtures summary...")
        try:
            driver.get(f"{BASE_URL}/summary")
            wait_for_page(driver, 4)
            fixtures_path = os.path.join(OUTPUT_DIR, "fixtures.html")
            with open(fixtures_path, 'w', encoding='utf-8') as f:
                f.write(driver.page_source)
            log("fixtures.html gemt.", "OK")
        except Exception as e:
            log(f"Kunne ikke hente fixtures: {e}", "WARN")

    finally:
        driver.quit()

if __name__ == "__main__":
    main()
