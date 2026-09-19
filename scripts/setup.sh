#!/usr/bin/env bash
# First-time setup (macOS / Linux / WSL / Git Bash).
# Run from the repo root:  bash scripts/setup.sh
set -euo pipefail

echo "==> Checking tools..."
for t in node npm docker git; do
  command -v "$t" >/dev/null 2>&1 || { echo "ERROR: $t is not installed. See INSTALL.md."; exit 1; }
done
echo "    node $(node -v), npm $(npm -v), docker present, git present"

if [ ! -f .env ]; then
  echo "==> Creating .env from .env.example"
  cp .env.example .env
  echo "    Edit .env to set a real POSTGRES_PASSWORD before production use."
fi

echo "==> Starting databases (docker compose up -d)"
docker compose up -d

echo "==> Installing dependencies (npm install)"
npm install

echo "==> Generating Prisma client"
npm run db:generate

echo "==> Applying database schema (prisma migrate)"
npm run db:migrate

echo ""
echo "Setup complete. Start the app with:  bash scripts/dev.sh  (or npm run dev)"
