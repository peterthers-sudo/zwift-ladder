@echo off
title Zwift Ladder Full Update
set PROJECT_DIR=C:\zwiftpower-api-main
set LOG_FILE=%PROJECT_DIR%\full_update_log.txt

:: Fix unicode encoding
set PYTHONIOENCODING=utf-8
chcp 65001 > nul

:: ZwiftPower login
set ZWIFTPOWER_USERNAME=peterthers@gmail.com
set ZWIFTPOWER_PASSWORD=kopenHagen17A

:: Start log
python -c "open(r'%LOG_FILE%', 'w', encoding='utf-8').write('==========================================\n   ZWIFT LADDER FULL UPDATE\n   %DATE% %TIME%\n==========================================\n')"

echo ==========================================
echo    ZWIFT LADDER FULL UPDATE
echo    %DATE% %TIME%
echo ==========================================
echo.

:: TRIN 1: Hent kildekode (fortsætter med eksisterende filer hvis fejl)
echo [1/6] Henter kildekode for alle hold (download_teams.py)...
echo       Dette kan tage 10-15 minutter...
python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('[1/6] Henter kildekode...\n')"
cd /d %PROJECT_DIR%
python download_teams.py >> "%LOG_FILE%" 2>&1
if errorlevel 1 (
    echo ADVARSEL: download_teams.py fejlede - fortsætter med eksisterende source-filer
    python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('ADVARSEL: download_teams fejlede, bruger eksisterende filer.\n')"
    echo no > "%PROJECT_DIR%\teams_updated.txt"
) else (
    python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('OK: Kildekode hentet.\n')"
    echo OK: Kildekode hentet.
    echo yes > "%PROJECT_DIR%\teams_updated.txt"
    echo Kopierer LEQP hold fra source_code til my_team...
    for %%f in ("%PROJECT_DIR%\source_code\*LEQP*.html") do (
        copy "%%f" "%PROJECT_DIR%\my_team\" > nul
    )
    python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('OK: LEQP hold kopieret.\n')"
    echo OK: LEQP hold kopieret.
)
echo.

:: TRIN 1b: Hent teamStats-sider (per-hold race log til aktivitetsberegning)
echo [1b/6] Henter teamStats-sider (fetch_team_stats.py)...
echo        Dette tager ca. 5-10 minutter...
python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('[1b/6] Henter teamStats...\n')"
python fetch_team_stats.py --skip-existing >> "%LOG_FILE%" 2>&1
if errorlevel 1 (
    echo ADVARSEL: fetch_team_stats.py fejlede - fortsætter med eksisterende teamStats-filer
    python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('ADVARSEL: fetch_team_stats fejlede.\n')"
) else (
    python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('OK: teamStats hentet.\n')"
    echo OK: teamStats hentet.
)
echo.

:: TRIN 1c: Parse teamStats til data/team_activity.js
echo [1c/6] Parser teamStats (parse_team_stats.py)...
python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('[1c/6] Parser teamStats...\n')"
python parse_team_stats.py --days 60 >> "%LOG_FILE%" 2>&1
if errorlevel 1 (
    echo ADVARSEL: parse_team_stats.py fejlede
    python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('ADVARSEL: parse_team_stats fejlede.\n')"
) else (
    python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('OK: team_activity.js genereret.\n')"
    echo OK: team_activity.js genereret.
)
echo.

:: TRIN 4: Start API + hent rider-data
echo [4/6] Starter API og henter rider-data (get_data.py)...
echo       Dette tager ca. 2 timer...
python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('[4/6] Starter API...\n')"
start "Zwift API (Motor)" cmd /c "python -m uvicorn main:app"
echo Venter 30 sekunder pa API-opstart...
timeout /t 30 /nobreak > nul
python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('OK: API klar.\n')"
echo OK: API klar. Starter data-indsamling...
echo.

echo Henter aktive LEQP-ryttere (fetch_leqp_members.py)...
python fetch_leqp_members.py >> "%LOG_FILE%" 2>&1
python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('OK: LEQP members hentet.\n')"
echo OK: LEQP members hentet.
echo.

python get_data.py >> "%LOG_FILE%" 2>&1
python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('OK: Rider-data hentet.\n')"
echo OK: Rider-data hentet.
echo.

:: Luk API (dræb via port 8000)
echo Lukker API...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr "127.0.0.1:8000"') do taskkill /f /pid %%a > nul 2>&1
python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('OK: API lukket.\n')"
echo.

:: TRIN 5: Opdater emea_teams.json
echo [5/6] Opdaterer emea_teams.json...
python emea_teams.py >> "%LOG_FILE%" 2>&1
echo OK: emea_teams.json opdateret.
echo.

:: TRIN 5b: Slå rutenavne op (kun nye rt-IDs)
echo [5b/6] Slaar rutenavne op (lookup_routes.py)...
python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('[5b/6] Rutenavne...\n')"
python lookup_routes.py >> "%LOG_FILE%" 2>&1
python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('OK: Rutenavne opdateret.\n')"
echo OK: Rutenavne opdateret.
echo.

:: TRIN 6: Git commit + push
echo [6/6] Uploader til GitHub...
python -c "open(r'%LOG_FILE%', 'a', encoding='utf-8').write('[6/6] Uploader til GitHub...\n')"
cd /d %PROJECT_DIR%

echo --- git status --- >> "%LOG_FILE%"
git status >> "%LOG_FILE%" 2>&1

git add index.html app.js data/my_teams.js data/opponents.js data/fixtures.js data/ladder_races.js data/rider_bios.js data/other_races.js data/leqp_members.js data/rides.js data/routes.js data/team_activity.js CNAME >> "%LOG_FILE%" 2>&1

git commit -m "Auto update: %DATE% %TIME%" >> "%LOG_FILE%" 2>&1

git push --force >> "%LOG_FILE%" 2>&1
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

