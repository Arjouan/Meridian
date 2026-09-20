# START HERE

A 30-second orientation. Whether you're new or coming back after a break, this tells you where to go.

## Coming back after time away?
Follow **[`docs/DEV-WORKFLOW.md` → §9 "Resuming after time away"](docs/DEV-WORKFLOW.md#9-resuming-after-time-away)**.
Short version, from this folder:
```bash
docker compose up -d
npm install
npm run db:generate && npm run db:migrate && npm run db:seed
npm run dev          # web :3000, API :3001/docs
```

## First time on this machine?
1. Install Node 20, Docker, Git → **[`INSTALL.md`](INSTALL.md)**
2. `./scripts/setup.ps1` (Windows) or `bash scripts/setup.sh`, then `npm run db:seed`
3. `./scripts/dev.ps1` → open http://localhost:3000

## Never used these technologies?
Read **[`docs/LEARNING.md`](docs/LEARNING.md)**, then do the exercises in
**[`docs/EXERCISES.md`](docs/EXERCISES.md)**.

## What to build next?
- The next hands-on task: **[`docs/YOUR-TURN.md`](docs/YOUR-TURN.md)** (Ports & Containers, mirroring the Vessels feature).
- The big picture / phases: **[`ROADMAP.md`](ROADMAP.md)**.
- What was done most recently: **[`CHANGELOG.md`](CHANGELOG.md)**.

## Understand the project
- How it's built & why: **[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)**
- The full plan & business context: **[`docs/Launch-Plan.docx`](docs/)**
- The whole story so far: `../claude-saves/SESSION-LOG.md` (outside this repo)

## Status
Phase 0 complete + Vessels feature done (build, DB, API, tests all green). Name finalized:
**Meridian** — Vessel Management System (VMS).
