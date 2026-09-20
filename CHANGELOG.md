# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project aims to follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- Repository foundations: `README`, `.gitignore`, `.env.example`, `ROADMAP.md`, `CHANGELOG.md`, `LICENSE` (AGPL-3.0).
- Candidate brand identities under `brand/`: VMS, PortFlow, Meridian (shared design system).
- Documentation: `docs/ARCHITECTURE.md`, `docs/TECH_STACK.md`, `docs/GETTING_STARTED.md`, launch plan.
- Monorepo scaffold (npm workspaces): root config, `tsconfig.base.json`, Prettier/EditorConfig.
- Local infrastructure: `docker-compose.yml` (PostgreSQL/PostGIS + Redis) and DB init script.
- Database schema (`prisma/schema.prisma`): Vessel, Port, Container models + enums.
- **API** (`apps/api`): NestJS skeleton with Prisma module and a `/health` endpoint + Swagger at `/docs`.
- **Web** (`apps/web`): Next.js + Tailwind skeleton with a branded landing page.
- **Shared** (`packages/shared`): shared domain TypeScript types.
- CI: GitHub Actions workflow and a pull-request template.
- Onboarding: `INSTALL.md`, `docs/LEARNING.md`, `docs/EXERCISES.md`, `CONTRIBUTING.md`.
- Cross-platform scripts in `scripts/` (setup, build, dev — PowerShell + Bash).

- Initial database migration (`prisma/migrations/20260704232440_init`) + `migration_lock.toml`.
- **Vessels feature (reference vertical slice):** DTOs + validation, `VesselsService`,
  `VesselsController` (full CRUD), `VesselsModule`; global `ValidationPipe`.
- Seed script (`prisma/seed.ts`) with sample vessels; `npm run db:seed`.
- Frontend `/vessels` page (Next.js) listing vessels from the API; link from the home page.
- `docs/YOUR-TURN.md` — guide to replicate the slice for Ports & Containers.
- First unit test (`vessels.service.spec.ts`) with Jest + ts-jest; `npm test` wired up.
- `docs/DEV-WORKFLOW.md` — detailed dev/test/compile guide incl. a "resuming after a break" section.
- `START-HERE.md` — 30-second orientation for returning to (or starting) the project.
- ESLint configured for both apps (`npm run lint`); CI now runs lint + test + build.
- `docs/GIT-GUIDE.md` — Git/GitHub good-habits guide (branching, commit format, pushing, PRs).
- `docs/MARKET-STUDY.md` — evidence-based market study (size, drivers, competitors, impact, sources).

### Verified
- Full monorepo builds cleanly in a Node 20 container: `npm install` + `prisma generate` +
  `nest build` (API) + `next build` (web) all succeed.
- Database verified end-to-end: PostGIS container starts healthy, the migration applies, and the
  `Vessel`, `Port`, `Container` tables are created (PostGIS extension confirmed).

### Changed
- Finalized the project identity: **Meridian**, tagline "Vessel Management System" (VMS),
  combining the Meridian name with the VMS wave/pennant logo mark. Updated `brand/meridian/`,
  `README.md`, `START-HERE.md`, and the web app's title/heading accordingly. Archived the
  PortFlow candidate and the earlier Meridian globe concept under `docs/brand-exploration/`.

---

<!--
How to keep this file (the habit):
- Add a bullet under [Unreleased] whenever you finish something meaningful.
- Group entries under: Added, Changed, Fixed, Removed, Security.
- When you cut a release, replace [Unreleased] with a version + date, e.g.:
    ## [0.1.0] - 2026-08-01
  and start a fresh [Unreleased] section above it.
-->
