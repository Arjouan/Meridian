#!/bin/bash
# Double-click to stop Meridian's database and cache containers.
# If a "Launch Meridian" window is still open running the dev servers,
# close that window (or press Ctrl+C in it) to stop those too.
cd "$(dirname "$0")"

echo "==> Stopping database and cache (docker compose down)..."
docker compose down

echo "Done."
read -n 1 -s -r -p "Press any key to close..."
