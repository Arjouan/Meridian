@echo off
setlocal
cd /d "%~dp0"

docker info >nul 2>&1
if errorlevel 1 (
  echo Starting Docker Desktop...
  start "" "%ProgramFiles%\Docker\Docker\Docker Desktop.exe"
  echo Waiting for Docker to be ready...
  :waitdocker
  timeout /t 2 >nul
  docker info >nul 2>&1
  if errorlevel 1 goto waitdocker
)

if not exist node_modules (
  echo First run detected - running full setup, this can take a few minutes...
  powershell -ExecutionPolicy Bypass -File scripts\setup.ps1
  call npm run db:seed
)

echo Once ready, open http://localhost:3000 in your browser.
powershell -ExecutionPolicy Bypass -File scripts\dev.ps1
