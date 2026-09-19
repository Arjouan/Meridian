# Your turn — build Ports & Containers

The **Vessels** feature is built for you as a complete, working reference. Now replicate it for
**Ports** and **Containers**. This is the exercise where the stack really clicks.

> Everything you need to copy is under `apps/api/src/vessels/` and `apps/web/app/vessels/`.
> Work on a branch: `git checkout -b feat/ports-crud`.

---

## The pattern (what "one feature" is made of)

For each entity you create the same 6 pieces the Vessels slice has:

| File | Role |
|---|---|
| `dto/create-X.dto.ts` | validates the create body |
| `dto/update-X.dto.ts` | `PartialType(CreateXDto)` |
| `X.service.ts` | DB logic (findAll/findOne/create/update/remove) |
| `X.controller.ts` | the 5 REST routes |
| `X.module.ts` | groups controller + service |
| register in `app.module.ts` | add `XModule` to `imports` |

Then a frontend page at `apps/web/app/x/page.tsx`, and a few rows in `prisma/seed.ts`.

---

## Task A — Ports

Fields already in the database (see `prisma/schema.prisma` → `model Port`):
`locode` (unique), `name`, `country`, `latitude`, `longitude`.

1. Create `apps/api/src/ports/` with the 6 pieces, copying the Vessels files and swapping the
   fields. Your `CreatePortDto` should validate:
   - `locode` — `@IsString()`
   - `name` — `@IsString()`
   - `country` — `@IsString()`
   - `latitude` — `@IsNumber()` (and `@Min(-90) @Max(90)`)
   - `longitude` — `@IsNumber()` (and `@Min(-180) @Max(180)`)
2. In the service use `this.prisma.port.*` instead of `this.prisma.vessel.*`.
3. Register `PortsModule` in `app.module.ts`.
4. Add a page `apps/web/app/ports/page.tsx` (copy the vessels page; show name/locode/country).
5. Add 3 ports to `prisma/seed.ts`, e.g.:
   - Rotterdam — `NLRTM` — NL — 51.95, 4.14
   - Le Havre — `FRLEH` — FR — 49.48, 0.11
   - Singapore — `SGSIN` — SG — 1.26, 103.83

**Verify:** `GET http://localhost:3001/ports` returns your ports, and
`http://localhost:3000/ports` lists them.

## Task B — Containers

Fields (see `model Container`): `isoNumber` (unique), `type` (enum `ContainerType`),
`ownerCode?`, `status` (enum `ContainerStatus`), `currentPortId?`, `vesselId?`.

1. Same 6 pieces under `apps/api/src/containers/`.
   - Validate `type` with `@IsEnum(ContainerType)` and `status` with `@IsEnum(ContainerStatus)`
     (import them from `@prisma/client`, exactly like the Vessels DTO imports `VesselType`).
2. Register `ContainersModule`.
3. Page `apps/web/app/containers/page.tsx`.
4. Seed 3–4 containers (you can leave `currentPortId`/`vesselId` empty for now).

**Stretch:** in the containers service `findAll`, include the related vessel/port:
```ts
this.prisma.container.findMany({ include: { vessel: true, currentPort: true } });
```

---

## How to run & check as you go

```bash
docker compose up -d          # database
npm run db:seed               # (re)insert sample data
npm run dev                   # API :3001 + web :3000
```
- Test endpoints interactively at http://localhost:3001/docs ("Try it out").
- Browse data with `npm run db:studio`.

## When you're done

1. Update `CHANGELOG.md` (under `[Unreleased]`) and tick the item in `ROADMAP.md`.
2. Commit: `git commit -m "feat(api): add ports and containers CRUD"`.
3. Push the branch and open a PR.

## Stuck?

- Read the error text carefully first (see `LEARNING.md` → "read the error message").
- Common ones:
  - *"Cannot find module"* → check your `import` paths and that the file exists.
  - *"PrismaClient did not initialize"* → run `npm run db:generate`.
  - *400 Bad Request on POST* → your body doesn't match the DTO; check required fields.
- Still stuck? Paste the exact error to Claude and ask — that's what it's there for.
