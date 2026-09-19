# Launch the whole project (Windows / PowerShell).
# Run from the repo root:  ./scripts/dev.ps1
$ErrorActionPreference = 'Stop'

if (-not (Test-Path ".env")) {
  Write-Host "No .env found - creating from .env.example" -ForegroundColor Yellow
  Copy-Item ".env.example" ".env"
}

Write-Host "==> Ensuring databases are up (docker compose up -d)" -ForegroundColor Cyan
docker compose up -d

Write-Host "==> Starting API + web (npm run dev)" -ForegroundColor Cyan
Write-Host "    Web  : http://localhost:3000"
Write-Host "    API  : http://localhost:3001  (docs at /docs, health at /health)"
Write-Host "    Press Ctrl+C to stop." -ForegroundColor Yellow
npm run dev
