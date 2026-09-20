#!/bin/bash
# Double-click launcher for Meridian (macOS/Linux).
# Starts the container runtime if needed, runs first-time setup on the very
# first launch, then starts the app and opens it in your browser.
set -e
cd "$(dirname "$0")"

if ! docker info > /dev/null 2>&1; then
  if command -v colima > /dev/null 2>&1; then
    echo "==> Starting Colima (container runtime)..."
    colima start
  else
    echo "ERROR: Docker isn't running and Colima isn't installed. See INSTALL.md."
    read -n 1 -s -r -p "Press any key to close..."
    exit 1
  fi
fi

if [ ! -d node_modules ]; then
  echo "==> First run detected — running full setup (this can take a few minutes)..."
  bash scripts/setup.sh
  npm run db:seed
fi

# Open the browser automatically once the web app responds, in the background.
( until curl -s http://localhost:3000 > /dev/null 2>&1; do sleep 1; done; open http://localhost:3000 ) &

bash scripts/dev.sh
