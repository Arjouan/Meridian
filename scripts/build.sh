#!/usr/bin/env bash
# Compile the whole project (macOS / Linux / WSL / Git Bash).
# Run from the repo root:  bash scripts/build.sh
set -euo pipefail

echo "==> Installing dependencies"
npm install

echo "==> Generating Prisma client"
npm run db:generate

echo "==> Building all workspaces (api + web)"
npm run build

echo ""
echo "Build complete."
