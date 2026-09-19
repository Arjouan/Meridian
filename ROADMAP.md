# Roadmap

The plan for building the platform, phase by phase. Designed for part-time, solo work — every
phase ends with something demoable. Durations are rough guides, not deadlines.

Legend: ✅ done · 🚧 in progress · ⬜ not started

---

## Phase 0 — Foundations & tooling · 🚧
- ✅ Monorepo layout (`apps/api`, `apps/web`, `packages/shared`)
- ✅ `.gitignore`, `.env.example`, `README`, `LICENSE`, roadmap & changelog
- ✅ `docker-compose.yml` (PostgreSQL + PostGIS, Redis)
- ✅ NestJS API skeleton (health endpoint) + Next.js app skeleton
- ✅ Prettier + EditorConfig (ESLint config to add with first real code)
- ✅ GitHub Actions CI (file checks; build/test steps to add with code)

**Milestone:** one command spins up the whole stack locally; CI is green.

## Phase 1 — Core domain & CRUD API · 🚧
- ✅ Prisma schema: Vessels, Containers, Ports (+ initial migration, verified against PostGIS)
- 🚧 REST CRUD endpoints + validation — **Vessels done** (reference slice); Ports & Containers = your turn
- ⬜ Unit tests for the service layer
- 🚧 Realistic seed data — vessels seeded; add ports & containers (see `docs/YOUR-TURN.md`)

**Milestone:** manage vessels, containers, and ports through the API on a real database.

## Phase 2 — Voyages & container tracking · ⬜
- ⬜ Voyages with ordered port calls
- ⬜ Tracking events stored as time-series (TimescaleDB)
- ⬜ Derive a container's current status/location from its event stream
- ⬜ Endpoints for full container history

**Milestone:** look up a container and see its complete journey.

## Phase 3 — Frontend UI & live map · ⬜
- ⬜ Lists + detail pages for vessels, containers, voyages
- ⬜ Interactive MapLibre map (ports, vessels, containers)
- ⬜ Public "track my container" page

**Milestone:** an impressive live demo — the portfolio centrepiece.

## Phase 4 — Certificates, maintenance & scheduled jobs · ⬜
- ⬜ Vessel certificates/surveys with validity intervals
- ⬜ Due-date logic + daily BullMQ job that raises alerts

**Milestone:** the system surfaces certificates due in the next N days.

## Phase 5 — Emissions & compliance module · ⬜
- ⬜ Per-voyage and per-container CO₂ estimation
- ⬜ Emissions dashboard + exportable compliance report

**Milestone:** every voyage shows a credible CO₂ figure and a downloadable report.

## Phase 6 — Dashboards, reporting, auth & multi-tenancy · ⬜
- ⬜ Operations dashboards + KPIs, PDF/CSV export
- ⬜ Login, roles, tenant isolation, customer portal

**Milestone:** two operators log in and each sees only their own fleet.

## Phase 7 — Polish, deploy & write-up · ⬜
- ⬜ Deploy to a public URL, end-to-end tests
- ⬜ Strong README + architecture doc + demo video

**Milestone:** a public, polished, documented demo linkable from a CV.

## Phase 8+ — Advanced (optional, ongoing) · ⬜
- ⬜ Routing/transshipment (pgRouting)
- ⬜ Live AIS ingestion over MQTT
- ⬜ Customs, billing, integrations, public API
