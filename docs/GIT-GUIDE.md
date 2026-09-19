# Git & GitHub — good habits guide

A practical, beginner-friendly guide to working with Git and GitHub on this project: how to branch,
how to write commits, how to push, and how to open pull requests. Follow this and your history will
be clean and your project will look professional.

> First push of the whole project? Use **`Git-Commit-Plan.docx`** (in the project folder) — it's the
> one-time, step-by-step sequence. This guide is for everyday work *after* that.

---

## 1. The mental model (30 seconds)

- **Repository (repo):** your project + its full history.
- **Commit:** a saved snapshot of changes, with a message explaining *why*.
- **Branch:** a parallel line of work. You build a feature on a branch, then merge it into `main`.
- **Remote (`origin`):** the copy on GitHub. You **push** to it and **pull** from it.
- **Pull Request (PR):** a request to merge your branch into `main`, where CI runs and you review.

**Golden rule:** never commit straight to `main`. Always branch → PR → merge.

---

## 2. The everyday workflow

```bash
# 1. Start from an up-to-date main
git checkout main
git pull

# 2. Create a branch for your task
git checkout -b feat/ports-crud

# 3. Do the work, then see what changed
git status
git diff

# 4. Stage and commit (in small, logical chunks)
git add apps/api/src/ports
git commit -m "feat(api): add ports CRUD endpoints"

# 5. Push your branch to GitHub
git push -u origin feat/ports-crud     # first push of this branch
# (later pushes on the same branch are just:  git push)

# 6. Open a Pull Request on GitHub, let CI pass, merge it.

# 7. Clean up
git checkout main
git pull
git branch -d feat/ports-crud
```

---

## 3. Branch naming

Format: `type/short-description` (lowercase, hyphens).

| Prefix | Use for | Example |
|---|---|---|
| `feat/` | a new feature | `feat/container-tracking` |
| `fix/` | a bug fix | `fix/vessel-duplicate-imo` |
| `docs/` | documentation only | `docs/update-readme` |
| `chore/` | tooling/config, no app logic | `chore/add-eslint-rule` |
| `refactor/` | code change, no behaviour change | `refactor/vessels-service` |
| `test/` | adding/adjusting tests | `test/ports-service` |

---

## 4. Commit messages — the format

We use **Conventional Commits**. One line, structured:

```
type(scope): short summary
```

- **type** — one of: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `ci`.
- **scope** *(optional)* — the area: `api`, `web`, `db`, `shared`, `infra`…
- **summary** — imperative mood ("add", not "added"/"adds"), lowercase, no full stop, ≤ ~72 chars.

**Good:**
```
feat(api): add ports CRUD endpoints
fix(web): correct vessel status badge colour
docs: expand getting-started troubleshooting
chore(api): bump nestjs to 10.4
test(api): cover ports service not-found case
```

**Avoid:**
```
Update stuff              (no type, vague)
fixed the bug.            (past tense, full stop, vague)
feat: did a lot of things (not one logical change)
WIP                       (never commit "work in progress" to main)
```

### Longer commits (optional body)
When a change needs explanation, add a blank line then a body that explains **why** (not what — the
diff shows what):

```
feat(api): add emissions estimate to voyages

Uses distance + vessel type to produce a rough CO2 figure per voyage.
Formula is a placeholder to be refined once real fuel data is available.
```

---

## 5. What makes a *good* commit

- **Atomic:** one logical change per commit. Don't mix a bug fix with a refactor.
- **Builds/tests pass:** run `npm run build` and `npm test` before committing meaningful work.
- **Explains why:** the message should make sense to future-you in 6 months.
- **Small and frequent** beats one giant commit. It's easier to review and to undo.

---

## 6. Pull Requests (PRs)

1. Push your branch, then open a PR on GitHub (`main` ← your branch).
2. Fill in the template (it's prompted automatically): what changed, why, related roadmap item.
3. **Wait for CI to go green** (it runs lint + test + build).
4. Review your own diff first — you'll catch half your mistakes.
5. Merge (a **squash merge** keeps `main` history tidy — one clean commit per PR).
6. Delete the branch after merging.

Before opening a PR, tick:
- [ ] `CHANGELOG.md` updated (under `[Unreleased]`)
- [ ] `ROADMAP.md` ticked if a phase item changed
- [ ] `npm run build`, `npm test`, `npm run lint` all pass
- [ ] no secrets committed (`.env` stays local)

---

## 7. Staying in sync

```bash
git checkout main
git pull                 # get the latest main
git checkout my-branch
git merge main           # bring main's changes into your branch (simple & safe)
```
(There's also `git rebase`, which makes a cleaner line of history — learn it later; `merge` is fine
to start.)

---

## 8. Never commit secrets

- `.env` is in `.gitignore` — keep it that way. Only `.env.example` (no real values) is committed.
- If you *ever* commit a secret by accident: rotate it (change the password/key) immediately —
  removing it from history is not enough once it's pushed.

---

## 9. "Help, I messed up" — common fixes

| Situation | Fix |
|---|---|
| Wrong commit message (not pushed yet) | `git commit --amend -m "new message"` |
| Staged a file by mistake | `git restore --staged <file>` |
| Discard local changes to a file | `git restore <file>` (⚠ loses your edits) |
| Committed to `main` by accident (not pushed) | `git branch feat/x` then `git reset --hard origin/main` |
| Push rejected ("fetch first") | `git pull` (resolve any conflicts), then `git push` |
| See recent history | `git log --oneline -10` |
| See what changed | `git status` and `git diff` |

> When unsure, **`git status` first** — it usually tells you what to do next. And you can paste any
> Git error to Claude for an explanation.

---

## 10. Cheat sheet

```bash
git status                     # what's changed / staged
git diff                       # see unstaged changes
git checkout -b feat/thing     # create + switch to a branch
git add <paths>                # stage specific files
git commit -m "feat(x): ..."   # commit staged changes
git push -u origin feat/thing  # first push of a branch
git push                       # subsequent pushes
git pull                       # get latest from GitHub
git log --oneline -10          # recent history
git branch -d feat/thing       # delete a merged branch
```
