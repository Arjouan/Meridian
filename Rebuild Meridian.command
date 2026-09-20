#!/bin/bash
# Double-click to regenerate the Prisma client and do a full production build.
# Note: while "Launch Meridian" is running, ordinary code edits already hot-reload
# on save (nest --watch / next dev) — you don't need this for those. Use this after
# editing prisma/schema.prisma, or to verify everything still compiles cleanly.
set -e
cd "$(dirname "$0")"

echo "==> Regenerating Prisma client..."
npm run db:generate

echo "==> Building all workspaces (api + web)..."
npm run build

echo ""
echo "Build succeeded."
read -n 1 -s -r -p "Press any key to close..."
