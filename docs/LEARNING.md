# Learning path — new to this stack? Start here

You do **not** need to master everything before contributing. This is an ordered path with the
minimum you need at each step, plus the best free resources. Learn just enough to do the next
task, then come back for more.

> Golden rule for beginners: **read the error message slowly, then search the exact text.** Most
> problems are one Google/Stack Overflow away. Official docs beat random blogs.

---

## Suggested order (and how deep to go for now)

1. **Command line + Git** — you'll use these constantly.
2. **JavaScript → TypeScript** — the language everything is written in.
3. **Node.js + npm** — how JS runs on the server and how packages work.
4. **Docker (basics only)** — you just need `docker compose up -d` to work.
5. **SQL + PostgreSQL (basics)** — how data is stored and queried.
6. **Prisma** — how *this* project talks to the database.
7. **NestJS** — the backend/API.
8. **React + Next.js** — the frontend.
9. **Tailwind CSS** — styling.

You can start contributing after steps 1–3 plus a skim of Prisma/NestJS.

---

## 1. Command line + Git

- **Why:** run commands, and save/share your work.
- **Learn:** [MDN: command line crash course](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line) ·
  [Git official book (free)](https://git-scm.com/book/en/v2) ·
  YouTube: search **"Git and GitHub for Beginners freeCodeCamp"**.
- **You need:** `clone, add, commit, push, pull, branch, checkout`. See the project's
  `Git-Commit-Plan.docx` for exactly how we commit here.

## 2. JavaScript → TypeScript

- **Why:** the whole codebase is TypeScript (JavaScript + types).
- **Learn JS first:** [javascript.info](https://javascript.info) (excellent, free) ·
  YouTube: **"JavaScript in 100 Seconds" (Fireship)** for a taste.
- **Then TypeScript:** [TS Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) ·
  [TS for JS programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html).
- **You need:** variables, functions, `async/await`, objects/arrays, types & interfaces, imports.

## 3. Node.js + npm

- **Why:** Node runs the server; npm installs packages and runs our scripts.
- **Learn:** [Node.js intro](https://nodejs.org/en/learn) ·
  [npm docs](https://docs.npmjs.com/about-npm).
- **You need:** what `package.json`, `dependencies`, `node_modules`, and `npm run <script>` are.
  Our scripts live in the root `package.json`.

## 4. Docker (basics only)

- **Why:** it runs PostgreSQL + Redis for you so you don't install databases by hand.
- **Learn:** [Docker Compose overview](https://docs.docker.com/compose/) ·
  YouTube: **"Docker in 100 Seconds" (Fireship)** then **"Docker Compose" (TechWorld with Nana)**.
- **You need (for now):** `docker compose up -d`, `docker compose ps`, `docker compose down`.
  That's genuinely enough at the start.

## 5. SQL + PostgreSQL (basics)

- **Why:** our data lives in PostgreSQL; understanding tables/rows/queries helps everything.
- **Learn:** [SQLBolt (interactive, free)](https://sqlbolt.com) ·
  [PostgreSQL tutorial](https://www.postgresqltutorial.com).
- **You need:** tables, rows, `SELECT/INSERT/UPDATE/DELETE`, primary/foreign keys, joins (later).
- **Tip:** run `npm run db:studio` to *see* the data in a browser.

## 6. Prisma (our database layer)

- **Why:** we define the database in `prisma/schema.prisma` and query it type-safely in the API.
- **Learn:** [Prisma Quickstart](https://www.prisma.io/docs/getting-started) ·
  [Prisma Client CRUD](https://www.prisma.io/docs/orm/prisma-client/queries/crud).
- **You need:** how models map to tables, `prisma generate`, `prisma migrate`, and
  `prisma.vessel.findMany()`-style queries.

## 7. NestJS (the API)

- **Why:** it's our backend framework — modules, controllers, services, dependency injection.
- **Learn:** [NestJS "First steps"](https://docs.nestjs.com/first-steps) ·
  [Controllers](https://docs.nestjs.com/controllers) · [Providers/Services](https://docs.nestjs.com/providers) ·
  YouTube: search **"NestJS Crash Course"**.
- **You need:** what a Module/Controller/Service is, and how injection wires them (see
  `apps/api/src/health` for a tiny real example).

## 8. React + Next.js (the frontend)

- **Why:** the UI. React builds components; Next.js is the framework around it.
- **Learn React:** [react.dev/learn](https://react.dev/learn) (official, superb).
- **Learn Next.js:** [Next.js "Learn" course](https://nextjs.org/learn) (interactive, free) ·
  focus on the **App Router** (we use the `app/` folder).
- **You need:** components, props, `useState`, and how pages live under `app/` (see
  `apps/web/app/page.tsx`).

## 9. Tailwind CSS (styling)

- **Why:** we style with utility classes instead of separate CSS files.
- **Learn:** [Tailwind docs](https://tailwindcss.com/docs/utility-first) ·
  YouTube: **"Tailwind in 100 Seconds" (Fireship)**.
- **You need:** how classes like `flex`, `px-4`, `text-navy` work (our brand colours are wired
  into `apps/web/tailwind.config.ts`).

---

## General tips

- **One thing at a time.** Get the app running (steps 1–4) before learning the deep parts.
- **Change something small and see what happens** — see [`EXERCISES.md`](EXERCISES.md).
- **Use the docs' search.** Every tool above has great official docs; prefer them over blogs.
- **Keep a personal notes file** of commands and gotchas you hit. Future-you will thank you.
- **Ask the error, not the void.** Copy the exact error text into a search engine.

When you're ready to actually build something, do the exercises in [`EXERCISES.md`](EXERCISES.md).
