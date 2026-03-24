@echo off
title Zwift Ladder Data Update (brug eksisterende source-filer)
set PROJECT_DIR=C:\zwiftpower-api-main
set LOG_FILE=%PROJECT_DIR%\update_data_only_log.txt

:: Fix unicode encoding
set PYTHONIOENCODING=utf-8
chcp 65001 > nul

:: ZwiftPower login
set ZWIFTPOWER_USERNAME=peterthers@gmail.com
set ZWIFTPOWER_PASSWORD=kopenHagen17A

:: Start log
python -c "open(r'%LOG_FILE%', 'w', encoding='utf-8').write('==========================================\n   ZWIFT LADDER DATA UPDATE (ingen scraping)\n   %DATE% %TIME%\n==========================================\n')"

echo ==========================================
echo    ZWIFT LADDER DATA UPDATE
echo    (bruger eksisterende source-filer)
echo    %DATE% %TIME%
echo ==========================================
echo.

:: Tjek at source_code mappen ikke er tom
set SOURCE_DIR=%PROJECT_DIR%\source_code
dir "%SOURCE_DIR%\*.html" > nul 2>&1
if errorlevel 1 (
    echo FEJL: source_code mappen er tom - kør full_update.bat først.
    exit /b 1
)
echo OK: source_code mappe fundet og ikke tom.
echo.

:: TRIN 1: Start API + hent rider-data
echo [1/3] Starter API og henter rider-data (get_data.py)...
echo       Dette tager ca. 2 timer...
python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('[1/3] Starter API...\n')"
start "Zwift API (Motor)" cmd /k "set ZWIFTPOWER_USERNAME=peterthers@gmail.com&& set ZWIFTPOWER_PASSWORD=kopenHagen17A&& cd /d %PROJECT_DIR%&& uvicorn main:app --reload"
echo Venter 30 sekunder pa API-opstart...
timeout /t 30 /nobreak > nul
python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('OK: API klar.\n')"
echo OK: API klar. Starter data-indsamling...
echo.
cd /d %PROJECT_DIR%
python get_data.py >> "%LOG_FILE%" 2>&1
python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('OK: Rider-data hentet.\n')"
echo OK: Rider-data hentet.
echo.

:: Luk API
echo Lukker API...
taskkill /fi "WINDOWTITLE eq Zwift API (Motor)" /f > nul 2>&1
python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('OK: API lukket.\n')"
echo.

:: TRIN 2: Opdater emea_teams.json
echo [2/3] Opdaterer emea_teams.json...
python emea_teams.py >> "%LOG_FILE%" 2>&1
echo OK: emea_teams.json opdateret.
echo.

:: TRIN 3: Git commit + push
echo [3/3] Uploader til GitHub...
python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('[3/3] Uploader til GitHub...\n')"
cd /d %PROJECT_DIR%

echo --- git status --- >> "%LOG_FILE%"
git status >> "%LOG_FILE%" 2>&1

git add index.html app.js data/my_teams.js data/opponents.js data/fixtures.js data/ladder_races.js data/other_races.js data/rider_bios.js CNAME >> "%LOG_FILE%" 2>&1

git commit -m "Data update (no scrape): %DATE% %TIME%" >> "%LOG_FILE%" 2>&1

git rebase --abort >> "%LOG_FILE%" 2>&1
git pull --no-rebase -X ours >> "%LOG_FILE%" 2>&1

git push >> "%LOG_FILE%" 2>&1
if errorlevel 1 (
    echo FEJL: git push fejlede! Se log: %LOG_FILE%
    python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('FEJL: git push.\n')"
    timeout /t 60 /nobreak > nul
    exit /b 1
)

python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('OK: Uploadet til GitHub.\n')"
echo OK: index.html uploadet til GitHub.
echo.

python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('==========================================\n   ALT FAERDIGT: %DATE% %TIME%\n==========================================\n')"
echo ==========================================
echo    ALT FAERDIGT!
echo    Log gemt i: %LOG_FILE%
echo ==========================================