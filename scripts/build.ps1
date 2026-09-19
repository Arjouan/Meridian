# Compile the whole project (Windows / PowerShell).
# Run from the repo root:  ./scripts/build.ps1
$ErrorActionPreference = 'Stop'

Write-Host "==> Installing dependencies" -ForegroundColor Cyan
npm install

Write-Host "==> Generating Prisma client" -ForegroundColor Cyan
npm run db:generate

Write-Host "==> Building all workspaces (api + web)" -ForegroundColor Cyan
npm run build

Write-Host ""
Write-Host "Build complete." -ForegroundColor Green
