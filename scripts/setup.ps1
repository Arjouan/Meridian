# First-time setup (Windows / PowerShell).
# Run from the repo root:  ./scripts/setup.ps1
$ErrorActionPreference = 'Stop'

Write-Host "==> Checking tools..." -ForegroundColor Cyan
foreach ($t in 'node','npm','docker','git') {
  if (-not (Get-Command $t -ErrorAction SilentlyContinue)) {
    Write-Error "$t is not installed. See INSTALL.md."
  }
}
Write-Host "    node $(node -v), npm $(npm -v), docker present, git present" -ForegroundColor Green

if (-not (Test-Path ".env")) {
  Write-Host "==> Creating .env from .env.example" -ForegroundColor Cyan
  Copy-Item ".env.example" ".env"
  Write-Host "    Edit .env to set a real POSTGRES_PASSWORD before production use." -ForegroundColor Yellow
}

Write-Host "==> Starting databases (docker compose up -d)" -ForegroundColor Cyan
docker compose up -d

Write-Host "==> Installing dependencies (npm install)" -ForegroundColor Cyan
npm install

Write-Host "==> Generating Prisma client" -ForegroundColor Cyan
npm run db:generate

Write-Host "==> Applying database schema (prisma migrate)" -ForegroundColor Cyan
npm run db:migrate

Write-Host ""
Write-Host "Setup complete. Start the app with:  ./scripts/dev.ps1  (or npm run dev)" -ForegroundColor Green
