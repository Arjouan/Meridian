<p align="center">
  <img src="assets/logo-icon.svg" width="88" alt="logo">
</p>

<h1 align="center">Maritime Logistics Platform</h1>

<p align="center">
  <strong>Open, real-time container visibility &amp; vessel emissions for small and regional carriers.</strong><br>
  See every container, know every ETA, and prove every tonne of CO&#8322; &mdash; in one system.
</p>

<p align="center">
  <em>Working name (undecided):</em> <strong>VMS</strong> &middot; <strong>PortFlow</strong> &middot; <strong>Meridian</strong> &nbsp;|&nbsp;
  License: <strong>AGPL-3.0</strong> &nbsp;|&nbsp; Status: <strong>Phase 0 &mdash; scaffolding</strong>
</p>

---

## What is this?

A maritime & container-logistics platform that models a fleet as vessels, containers, ports, and
voyages, tracks each container's journey in real time, flags vessel certificates before they
expire, and estimates CO&#8322; per voyage and per container. Built to be modern, fast, map-first,
open-source, and self-hostable.

> A personal project built to learn, to serve as a portfolio piece, and to potentially grow into a
> real product. See [`ROADMAP.md`](ROADMAP.md) for the plan, [`CHANGELOG.md`](CHANGELOG.md) for
> progress, and [`docs/`](docs/) for the full launch plan.

## Highlights

- **Live map** of vessels, ports, and container positions (MapLibre + PostGIS)
- **Container tracking** — a full, timestamped movement history and derived current status
- **Certificates & surveys** — automatic due/overdue alerts (scheduled jobs)
- **Emissions** — per-voyage and per-container CO&#8322; accounting and compliance reports
- **Public "track my container" page** and a documented REST API

## Tech stack

| Layer | Choice |
|---|---|
| Backend | TypeScript + **NestJS** (REST + OpenAPI) |
| Database | **PostgreSQL** + **PostGIS** (geo) + **TimescaleDB** (tracking time-series) + **pgRouting** (routes) |
| ORM | **Prisma** (+ raw SQL for spatial/time-series) |
| Frontend | **Next.js** + React + **Tailwind CSS** + shadcn/ui |
| Maps | **MapLibre GL JS** |
| Jobs / realtime | **BullMQ** + **Redis**, WebSockets, MQTT (AIS ingestion, later) |
| Infra | **Docker Compose**, GitHub Actions |

## Getting started

> The commands below describe the intended Phase 0/1 workflow. The scaffold is being built out;
> follow [`ROADMAP.md`](ROADMAP.md) for what's implemented so far.

### Prerequisites

- [Node.js](https://nodejs.org) 20+ (LTS)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (WSL2 backend on Windows)
- [Git](https://git-scm.com)

### Run locally

```bash
git clone <your-repo-url> && cd <repo>
cp .env.example .env         # then edit values as needed
docker compose up -d         # PostgreSQL + PostGIS, Redis
npm install
npm run db:migrate           # once Prisma is set up
npm run dev                  # API + web
```

- Web: http://localhost:3000
- API: http://localhost:3001
- API docs (OpenAPI): http://localhost:3001/docs

## Project structure

```
.
├─ apps/
│  ├─ api/             # NestJS backend (REST + OpenAPI, health, Prisma)
│  └─ web/             # Next.js frontend (landing page, map/dashboards later)
├─ packages/
│  └─ shared/          # shared TypeScript types
├─ prisma/             # schema.prisma (+ migrations)
├─ docker/             # DB init scripts (PostGIS)
├─ assets/             # shared brand asset used by this README
├─ brand/              # candidate identities (name TBD): vms / portflow / meridian
├─ docs/               # architecture, tech stack, getting started, launch plan
├─ .github/workflows/  # CI
├─ docker-compose.yml  # PostgreSQL/PostGIS + Redis
├─ ROADMAP.md
├─ CHANGELOG.md
└─ README.md
```

## Documentation

**New here? Start with these:**
- [`START-HERE.md`](START-HERE.md) — 30-second orientation (also for returning after a break).
- [`INSTALL.md`](INSTALL.md) — exactly what to install (Windows-first).
- [`docs/LEARNING.md`](docs/LEARNING.md) — never used these technologies? A gentle, ordered learning path with free resources.
- [`docs/EXERCISES.md`](docs/EXERCISES.md) — learn by making small real changes to this project.
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — the branch → commit → PR workflow.
- [`docs/GIT-GUIDE.md`](docs/GIT-GUIDE.md) — Git/GitHub good habits: branching, commit format, pushing, PRs.

**Reference:**
- [`docs/GETTING_STARTED.md`](docs/GETTING_STARTED.md) — configure and run locally.
- [`docs/DEV-WORKFLOW.md`](docs/DEV-WORKFLOW.md) — test changes, compile, run tests, and **resume after a break**.
- [`docs/YOUR-TURN.md`](docs/YOUR-TURN.md) — build Ports & Containers (guided exercise).
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — how it's connected + **why each technology was chosen**.
- [`docs/TECH_STACK.md`](docs/TECH_STACK.md) — every technology, version, and role.
- [`docs/MARKET-STUDY.md`](docs/MARKET-STUDY.md) — market size, drivers, competitors, impact & unique value (with sources).
- [`docs/Launch-Plan.docx`](docs/) — the full product & go-to-market plan.

## Scripts

One-liners in [`scripts/`](scripts/) (both PowerShell `.ps1` and Bash `.sh`):

| Task | Windows | macOS / Linux / WSL |
|---|---|---|
| First-time setup | `./scripts/setup.ps1` | `bash scripts/setup.sh` |
| Compile everything | `./scripts/build.ps1` | `bash scripts/build.sh` |
| Launch the project | `./scripts/dev.ps1` | `bash scripts/dev.sh` |

## Brand

The final name is undecided between **VMS**, **PortFlow**, and **Meridian** — all three share the
same navy + blue design system, so the app theme is identical regardless. Each identity's logo and
brand guide lives under [`brand/`](brand/).

## Roadmap & changelog

- **Roadmap:** [`ROADMAP.md`](ROADMAP.md) — the phased plan (Phase 0 → 8).
- **Changelog:** [`CHANGELOG.md`](CHANGELOG.md) — updated with every meaningful change.

Keeping both current is deliberate: it's free project marketing and portfolio evidence.

## License

Licensed under the **GNU Affero General Public License v3.0** — see [`LICENSE`](LICENSE).

You may use, study, modify, and self-host this software freely; if you run a modified version as a
network service you must make your source available under the same license. The copyright holder
may additionally offer commercial licenses.
