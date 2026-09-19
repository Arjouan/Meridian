# Getting started

How to run the project locally, from a fresh machine to a working stack.

---

## 1. Install the prerequisites

| Tool | Why | Link |
|---|---|---|
| **Node.js 20 LTS** | Runs the API and web app | https://nodejs.org |
| **Docker Desktop** | Runs PostgreSQL + Redis (use the **WSL2** backend on Windows) | https://www.docker.com/products/docker-desktop |
| **Git** | Version control | https://git-scm.com |

Verify:

```bash
node -v      # v20.x
docker -v    # Docker version 2x.x
git -v
```

## 2. Get the code & configure the environment

```bash
git clone <your-repo-url>
cd <repo>

# Create your local .env from the template (never commit .env)
cp .env.example .env
```

Open `.env` and, at minimum, set a real `POSTGRES_PASSWORD` and make sure `DATABASE_URL` matches
it. The defaults work for local development as-is.

## 3. Start the databases

```bash
docker compose up -d
```

This starts:

| Service | URL / port | Notes |
|---|---|---|
| PostgreSQL (+PostGIS) | `localhost:5432` | PostGIS extension enabled automatically on first run |
| Redis | `localhost:6379` | queue / cache |

Check they're healthy:

```bash
docker compose ps
```

## 4. Install dependencies

From the repo root (installs all workspaces):

```bash
npm install
```

## 5. Set up the database schema

```bash
npm run db:generate     # generate the Prisma client
npm run db:migrate      # create tables from prisma/schema.prisma
```

## 6. Run the app

```bash
npm run dev
```

This starts both apps together:

| App | URL |
|---|---|
| Web (Next.js) | http://localhost:3000 |
| API (NestJS) | http://localhost:3001 |
| API docs (Swagger) | http://localhost:3001/docs |
| API health check | http://localhost:3001/health |

You should see the landing page at `:3000`, and `GET /health` should return
`{ "status": "ok", "database": "up", ... }`.

## Useful commands

```bash
npm run dev            # run API + web together
npm run dev:api        # run only the API
npm run dev:web        # run only the web app
npm run build          # build all workspaces
npm run db:migrate     # apply / create migrations
npm run db:studio      # open Prisma Studio (browse the DB)
docker compose up -d   # start databases
docker compose down    # stop databases
docker compose down -v # stop AND delete database data (full reset)
```

## Troubleshooting

- **Port already in use** — something else is on 3000/3001/5432/6379. Stop it, or change the port
  in `.env` / the app.
- **`database: down` in the health check** — is `docker compose ps` healthy? Does `DATABASE_URL`
  match your `.env` credentials?
- **Prisma "client not generated"** — run `npm run db:generate`.
- **Docker on Windows** — make sure Docker Desktop is running and the **WSL2** backend is enabled.

## How it all connects

For the full picture (diagram, layers, and why each technology was chosen) see
[`ARCHITECTURE.md`](ARCHITECTURE.md).
