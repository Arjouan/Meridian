# Contributing

However small, here's how to make a change cleanly. This keeps the history readable and the
project healthy — and it's the same workflow whether it's just you or a team.

## Setup

See [`INSTALL.md`](INSTALL.md) then [`docs/GETTING_STARTED.md`](docs/GETTING_STARTED.md).
Brand new to the technologies? Start with [`docs/LEARNING.md`](docs/LEARNING.md) and
[`docs/EXERCISES.md`](docs/EXERCISES.md).

> New to Git/GitHub? Read the full **[`docs/GIT-GUIDE.md`](docs/GIT-GUIDE.md)** — branching, commit
> message format, pushing, and PR habits, with beginner-friendly examples and "help I messed up" fixes.

## Workflow

1. **Branch** off `main`:
   ```bash
   git checkout -b feat/vessels-crud
   ```
2. **Make the change** — keep it focused on one thing.
3. **Update the docs of record:**
   - add a bullet under `[Unreleased]` in [`CHANGELOG.md`](CHANGELOG.md)
   - tick the item in [`ROADMAP.md`](ROADMAP.md) if a phase item changed
4. **Commit** with a conventional message (see below).
5. **Push** and open a **Pull Request** (the template guides you). Merge when CI is green.

## Commit message format (Conventional Commits)

```
<type>(<scope>): <short summary>
```

Types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `ci`.

Examples:
- `feat(api): add vessel CRUD endpoints`
- `fix(web): correct map marker position`
- `docs: expand getting-started troubleshooting`

Keep each commit to one logical change. See `Git-Commit-Plan.docx` (in the project folder) for the
exact first-push sequence.

## Branch naming

`feat/…`, `fix/…`, `docs/…`, `chore/…` — e.g. `feat/container-tracking`.

## Code style

- Prettier + EditorConfig are configured; format on save in VS Code.
- Keep domain logic in services, not controllers (see
  [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md#3-layers-and-the-golden-rule)).
- Prefer clear names over comments; comment the *why*, not the *what*.
