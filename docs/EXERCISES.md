# Exercises — learn the stack by changing this project

Small, hands-on tasks in increasing difficulty. Each one teaches one piece of the stack by making
a real change to *this* codebase. Do them on a branch, and don't worry about breaking things —
that's how you learn.

> Before starting: get the app running once (see [`GETTING_STARTED.md`](GETTING_STARTED.md)).
> New to the tools? Skim [`LEARNING.md`](LEARNING.md) first.

For each exercise: create a branch, make the change, verify it, then either keep it or
`git checkout .` to discard.

---

## 0. Warm-up — run it and look around
**Goal:** confirm your environment works and see the moving parts.
1. `docker compose up -d`, then `npm run dev`.
2. Open http://localhost:3000 (web) and http://localhost:3001/health (API).
3. Run `npm run db:studio` and browse the (empty) Vessel/Port/Container tables.

**You learned:** how the web app, API, and database connect.

---

## 1. Change some text (Next.js / React)
**Goal:** edit the landing page.
- Open `apps/web/app/page.tsx`. Change the headline text and save.
- The browser should hot-reload instantly.

**Verify:** your new text shows at http://localhost:3000.
**Stretch:** change a Tailwind class (e.g. `text-4xl` → `text-5xl`) and watch it update.

---

## 2. Add a field to the database (Prisma + SQL)
**Goal:** add a `yearBuilt` number to vessels.
1. In `prisma/schema.prisma`, add to `model Vessel`:  `yearBuilt Int?`
2. Run `npm run db:migrate` and give the migration a name like `add_vessel_year_built`.
3. Open `npm run db:studio` — the new column is there.

**You learned:** how schema changes become real database migrations.
**Stretch:** add the same field to the `Vessel` interface in `packages/shared/src/index.ts`.

---

## 3. Add an API endpoint (NestJS)
**Goal:** create `GET /vessels` that returns all vessels.
1. Create `apps/api/src/vessels/vessels.controller.ts`:
   ```ts
   import { Controller, Get } from '@nestjs/common';
   import { ApiTags } from '@nestjs/swagger';
   import { PrismaService } from '../prisma/prisma.service';

   @ApiTags('vessels')
   @Controller('vessels')
   export class VesselsController {
     constructor(private readonly prisma: PrismaService) {}

     @Get()
     findAll() {
       return this.prisma.vessel.findMany();
     }
   }
   ```
2. Create `apps/api/src/vessels/vessels.module.ts` (a `@Module` with this controller).
3. Import `VesselsModule` in `apps/api/src/app.module.ts`.

**Verify:** http://localhost:3001/vessels returns `[]`, and it appears in http://localhost:3001/docs.
**You learned:** the Controller → Service (Prisma) flow and how modules wire together.

---

## 4. Create data (POST endpoint + validation)
**Goal:** add `POST /vessels` to create a vessel.
- Add a `create()` method with `@Post()` that calls `this.prisma.vessel.create({ data })`.
- Test it from the `/docs` "Try it out" button with a body like:
  ```json
  { "imo": "9812445", "name": "MSC Test", "type": "CONTAINER_SHIP" }
  ```
**Verify:** `GET /vessels` now returns your vessel; see it in Prisma Studio too.
**Stretch:** add input validation with `class-validator` + a DTO (look up "NestJS validation pipe").

---

## 5. Show real data on the frontend (Next.js data fetching)
**Goal:** list vessels on a web page.
1. Create `apps/web/app/vessels/page.tsx`.
2. Fetch from the API and render a list:
   ```tsx
   export default async function VesselsPage() {
     const res = await fetch('http://localhost:3001/vessels', { cache: 'no-store' });
     const vessels = await res.json();
     return (
       <ul className="p-8">
         {vessels.map((v: any) => <li key={v.id}>{v.name} — {v.imo}</li>)}
       </ul>
     );
   }
   ```
**Verify:** http://localhost:3000/vessels shows the vessel you created in exercise 4.
**You learned:** how the frontend talks to the backend.

---

## 6. Seed some data (scripting + Prisma)
**Goal:** insert a few real ports automatically.
- Create `prisma/seed.ts` that uses Prisma Client to `create` 3 ports (e.g. Rotterdam `NLRTM`,
  Le Havre `FRLEH`, Singapore `SGSIN` with their lat/lng).
- Wire it up: see the [Prisma seeding docs](https://www.prisma.io/docs/guides/database/seed-database).

**Verify:** the ports appear in Prisma Studio.
**You learned:** how to populate a database programmatically (used for demos).

---

## 7. Style a component (Tailwind)
**Goal:** turn the vessel list into cards.
- Wrap each item in a `div` with classes like
  `rounded-lg border border-slate-200 p-4 shadow-sm`.
**Stretch:** colour the status with the brand palette (`text-blue`, `text-navy`).

---

## 8. Write a tiny test (later, optional)
**Goal:** get a first automated test running.
- Add Vitest or Jest to `apps/api`, write a test that a service returns expected data.
- See [NestJS testing](https://docs.nestjs.com/fundamentals/testing).
**You learned:** the basics of automated testing — the safety net for future changes.

---

## What next?
When these feel comfortable, pick a real item from [`ROADMAP.md`](../ROADMAP.md) (Phase 1 —
Vessels/Containers/Ports CRUD is the natural next step) and build it for real, following the
workflow in [`../CONTRIBUTING.md`](../CONTRIBUTING.md).
