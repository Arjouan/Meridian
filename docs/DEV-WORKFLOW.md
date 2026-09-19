# Development workflow — testing changes & compiling

Everything you need to work on the project day to day: run it, see your changes, compile it, test
it, and recover when something breaks. Written to be beginner-friendly.

> **Coming back after a break?** Jump to [§9 Resuming after time away](#9-resuming-after-time-away).

---

## 1. Mental model — what runs where

| Piece | Where | URL / port | Started by |
|---|---|---|---|
| Web (Next.js) | `apps/web` | http://localhost:3000 | `npm run dev` |
| API (NestJS) | `apps/api` | http://localhost:3001 | `npm run dev` |
| API docs (Swagger) | — | http://localhost:3001/docs | with the API |
| PostgreSQL (+PostGIS) | Docker | localhost:5432 | `docker compose up -d` |
| Redis | Docker | localhost:6379 | `docker compose up -d` |
| Prisma Studio (DB browser) | — | http://localhost:5555 | `npm run db:studio` |

The web app calls the API over HTTP; the API talks to PostgreSQL through Prisma. The databases run
in Docker so you never install them by hand.

## 2. Prerequisites (once per machine)

Install **Node.js 20**, **Docker Desktop**, and **Git** — see [`../INSTALL.md`](../INSTALL.md).
Verify with `node -v`, `docker -v`, `git --version`.

## 3. First-time setup (once per clone)

```bash
cd github-repo
./scripts/setup.ps1        # Windows PowerShell
# or:  bash scripts/setup.sh   (macOS / Linux / WSL / Git Bash)
npm run db:seed            # load sample vessels
```
`setup` checks your tools, creates `.env`, starts the databases, installs dependencies, and applies
the database migration.

## 4. The daily loop — test changes live (hot reload)

Start everything:
```bash
./scripts/dev.ps1          # or:  docker compose up -d  &&  npm run dev
```
Now **edit and save** — no rebuild needed:

- **Frontend change** (`apps/web/…`) → save → the browser at http://localhost:3000 refreshes automatically.
- **API change** (`apps/api/…`) → save → NestJS restarts automatically; retest the endpoint.

Stop with `Ctrl+C`. Stop the databases with `docker compose down`.

## 5. How to test each kind of change

### 5a. A frontend change
Edit e.g. `apps/web/app/vessels/page.tsx`, save, look at http://localhost:3000/vessels.

### 5b. An API change
Edit e.g. files under `apps/api/src/vessels/`, save. Then test the endpoint any of these ways:
- **Swagger UI** (easiest): http://localhost:3001/docs → find the route → **"Try it out"** → **Execute**.
- **Browser** for a `GET`: open http://localhost:3001/vessels.
- **curl** from a terminal:
  ```bash
  curl http://localhost:3001/vessels
  curl -X POST http://localhost:3001/vessels \
    -H "content-type: application/json" \
    -d '{"imo":"9876543","name":"My Ship"}'
  ```

### 5c. A database change (schema)
Edit `prisma/schema.prisma` (e.g. add a field), then:
```bash
npm run db:migrate         # creates + applies a migration; asks for a name like "add_field_x"
```
This updates the database **and** regenerates the Prisma client so your code sees the new field.
Browse the result:
```bash
npm run db:studio          # opens http://localhost:5555 to view/edit rows
```

### 5d. Sample data
```bash
npm run db:seed            # (re)inserts the sample vessels; safe to run repeatedly
```

## 6. Compile the whole project

To confirm everything still compiles (also what CI does):
```bash
npm run build              # or ./scripts/build.ps1  — runs nest build + next build
```
- ✅ Success: `Compiled successfully`, no red errors.
- ❌ Failure: the error names the file and line. Fix and rerun.

You don't need to build in order to *test* (dev mode is enough) — build is the "does it all still
compile?" check before committing.

## 7. Automated tests

There is a first unit test for the Vessels service (`apps/api/src/vessels/vessels.service.spec.ts`).
```bash
npm test                   # runs all workspace tests (currently the API's)
# or, inside apps/api:
npm run test:watch         # re-runs tests as you edit
```
> Tests need the Prisma client generated first (`npm run db:generate`, which `setup` already did).
Copy that spec's pattern when you add tests for Ports and Containers.

## 8. Code style, git, and troubleshooting

**Linting & formatting:** ESLint is configured for both apps — run `npm run lint` (CI runs it too).
Prettier + EditorConfig handle formatting; in VS Code, install the Prettier extension and enable
"Format on Save".

**Git (every change):** see [`../CONTRIBUTING.md`](../CONTRIBUTING.md) — branch → change → update
CHANGELOG/ROADMAP → conventional commit → PR.

**Troubleshooting:**
| Symptom | Fix |
|---|---|
| `port already in use` (3000/3001/5432) | stop the other process, or change the port |
| health shows `database: down` | is `docker compose ps` healthy? does `.env` match? |
| `PrismaClient did not initialize` | run `npm run db:generate` |
| `Cannot find module` | check import paths; run `npm install` |
| `400 Bad Request` on POST | your body doesn't match the DTO — check required fields in Swagger |
| DB acting weird / want a clean slate | `docker compose down -v` then `docker compose up -d` + `npm run db:migrate` + `npm run db:seed` (⚠ deletes local data) |
| Node modules broken after pulling changes | delete `node_modules` and run `npm install` again |

## 9. Resuming after time away

Coming back in a few weeks? Do this from the repo root:

```bash
# 1. Get any latest changes (if you pushed from elsewhere)
git pull

# 2. Start the databases
docker compose up -d

# 3. Reinstall deps IF package.json changed since last time (safe to always run)
npm install

# 4. Make sure the DB schema & client are current
npm run db:generate
npm run db:migrate          # applies any new migrations (no-op if already current)

# 5. (optional) reload sample data
npm run db:seed

# 6. Run it
npm run dev
```

Then open http://localhost:3000 and http://localhost:3001/docs to confirm it's alive.

**Where to pick up:** read [`../ROADMAP.md`](../ROADMAP.md) (what's next), [`../CHANGELOG.md`](../CHANGELOG.md)
(what you last did), and [`YOUR-TURN.md`](YOUR-TURN.md) (the Ports & Containers exercise). If you're
rusty on a technology, [`LEARNING.md`](LEARNING.md) is your refresher.

**If something is badly broken and you just want a clean slate:**
```bash
docker compose down -v          # remove DB containers + data
rm -rf node_modules apps/*/node_modules   # (Windows: delete these folders)
npm install
docker compose up -d
npm run db:generate && npm run db:migrate && npm run db:seed
npm run dev
```

## 10. One-page command cheat sheet

```bash
docker compose up -d     # start databases
npm run dev              # run API + web (hot reload)
npm run build            # compile everything
npm test                 # run automated tests
npm run lint             # check code style (ESLint)
npm run db:migrate       # apply a schema change
npm run db:seed          # (re)load sample data
npm run db:studio        # browse the database
docker compose down      # stop databases
docker compose down -v   # stop + delete DB data (clean slate)
```
