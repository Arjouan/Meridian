@echo off
rem Double-click to regenerate the Prisma client and do a full production build.
rem Note: while "Launch Meridian" is running, ordinary code edits already hot-reload
rem on save (nest --watch / next dev) - you don't need this for those. Use this after
rem editing prisma\schema.prisma, or to verify everything still compiles cleanly.
cd /d "%~dp0"

echo Regenerating Prisma client...
call npm run db:generate
if errorlevel 1 goto :fail

echo Building all workspaces (api + web)...
call npm run build
if errorlevel 1 goto :fail

echo.
echo Build succeeded.
pause
exit /b 0

:fail
echo.
echo Build failed - see the errors above.
pause
exit /b 1
