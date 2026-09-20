@echo off
cd /d "%~dp0"
echo Stopping database and cache (docker compose down)...
docker compose down
echo Done.
pause
