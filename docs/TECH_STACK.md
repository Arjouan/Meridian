# Technology stack

Every technology used in the project, what it does, and where to learn it. Versions are the
current targets (see `package.json` files for exact pinned versions).

> For the *reasoning* behind each choice and the alternatives considered, see
> [`ARCHITECTURE.md`](ARCHITECTURE.md#5-why-these-technologies).

## Languages & runtime

| Tech | Version | Role | Docs |
|---|---|---|---|
| Node.js | 20 LTS | JavaScript runtime | https://nodejs.org |
| TypeScript | ^5.5 | Typed language for API + web + shared | https://www.typescriptlang.org |

## Backend (`apps/api`)

| Tech | Version | Role | Docs |
|---|---|---|---|
| NestJS | ^10.4 | API framework (modules, DI, controllers) | https://docs.nestjs.com |
| @nestjs/config | ^3.2 | Environment configuration | https://docs.nestjs.com/techniques/configuration |
| @nestjs/swagger | ^7.4 | OpenAPI / Swagger docs at `/docs` | https://docs.nestjs.com/openapi/introduction |
| Prisma Client | ^5.18 | Type-safe database access | https://www.prisma.io/docs |

## Frontend (`apps/web`)

| Tech | Version | Role | Docs |
|---|---|---|---|
| Next.js | ^14.2 | React framework (App Router, SSR) | https://nextjs.org/docs |
| React | ^18.3 | UI library | https://react.dev |
| Tailwind CSS | ^3.4 | Utility-first styling | https://tailwindcss.com/docs |
| MapLibre GL JS | (Phase 3) | Interactive vector maps | https://maplibre.org |

## Data

| Tech | Version | Role | Docs |
|---|---|---|---|
| PostgreSQL | 16 | Primary database | https://www.postgresql.org/docs |
| PostGIS | 3.4 | Geospatial types & queries | https://postgis.net/documentation |
| TimescaleDB | (Phase 2) | Time-series tracking events | https://docs.timescale.com |
| pgRouting | (Phase 8) | Network routing | https://pgrouting.org |
| Redis | 7 | Queue, cache, realtime fan-out | https://redis.io/docs |
| Prisma (CLI) | ^5.18 | Schema & migrations | https://www.prisma.io/docs/orm |

## Jobs & realtime (later phases)

| Tech | Role | Docs |
|---|---|---|
| BullMQ | Background & scheduled jobs (on Redis) | https://docs.bullmq.io |
| WebSockets | Live updates to the browser | https://docs.nestjs.com/websockets/gateways |
| MQTT | AIS vessel-position ingestion | https://mqtt.org |

## Tooling & infra

| Tech | Role | Docs |
|---|---|---|
| Docker + Compose | Local PostgreSQL + Redis | https://docs.docker.com/compose |
| GitHub Actions | CI (lint + test + build on every push) | https://docs.github.com/actions |
| Jest + ts-jest | Automated tests (`npm test`) | https://jestjs.io |
| ESLint (+ Prettier) | Linting & formatting (`npm run lint`) | https://eslint.org / https://prettier.io |
| npm workspaces | Monorepo package management | https://docs.npmjs.com/cli/using-npm/workspaces |

## Repository layout

```
apps/api        NestJS backend
apps/web        Next.js frontend
packages/shared Shared TypeScript types
prisma          Database schema & migrations
docker          DB init scripts
docs            Architecture, tech stack, getting started
brand           Candidate brand identities
```
