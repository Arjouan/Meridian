#!/usr/bin/env bash
# Launch the whole project (macOS / Linux / WSL / Git Bash).
# Run from the repo root:  bash scripts/dev.sh
set -euo pipefail

if [ ! -f .env ]; then
  echo "No .env found - creating from .env.example"
  cp .env.example .env
fi

echo "==> Ensuring databases are up (docker compose up -d)"
docker compose up -d

echo "==> Starting API + web (npm run dev)"
echo "    Web  : http://localhost:3000"
echo "    API  : http://localhost:3001  (docs at /docs, health at /health)"
echo "    Press Ctrl+C to stop."
npm run dev
