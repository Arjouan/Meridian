# Install — what you need on your machine

Everything you must install before running the project, with Windows-first instructions.
Once done, follow [`docs/GETTING_STARTED.md`](docs/GETTING_STARTED.md) to launch it.

---

## The 3 required tools

| Tool | Version | What it's for |
|---|---|---|
| **Node.js** | 20 LTS | Runs the API (NestJS) and web app (Next.js) |
| **Docker Desktop** | latest | Runs PostgreSQL + Redis without installing them by hand |
| **Git** | latest | Version control / pushing to GitHub |

### 1. Node.js 20 (LTS)

**Recommended (Windows):** install via [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
so you can switch versions later:

```powershell
# after installing nvm-windows:
nvm install 20
nvm use 20
```

Or the simple installer from https://nodejs.org (choose the **LTS** build).

**Verify:**
```powershell
node -v    # should print v20.x
npm -v     # should print 10.x
```

### 2. Docker Desktop

- Download: https://www.docker.com/products/docker-desktop
- During/after install, enable the **WSL2 backend** (Settings → General). This is the smoothest
  way to run Linux containers on Windows.
- Start Docker Desktop and wait until it says **"Engine running"**.

**Verify:**
```powershell
docker -v          # Docker version 2x.x
docker info        # should succeed (daemon running)
```

### 3. Git

- Download: https://git-scm.com/download/win
- **Verify:** `git --version`
- First-time config:
```powershell
git config --global user.name  "Your Name"
git config --global user.email "you@example.com"
```

---

## Recommended (not required)

| Tool | Why |
|---|---|
| **VS Code** (https://code.visualstudio.com) | The editor this project is written for |
| VS Code extensions | ESLint, Prettier, Prisma, Tailwind CSS IntelliSense |
| **GitHub CLI** (https://cli.github.com) | Create & push repos from the terminal (`gh`) |
| **DBeaver** or **pgAdmin** | Browse the PostgreSQL database visually |

VS Code will usually offer to install the recommended extensions when you open the project.

---

## Quick check that you're ready

Run all of these — every line should print a version:

```powershell
node -v
npm -v
docker -v
git --version
```

If they all work and Docker Desktop is running, head to
[`docs/GETTING_STARTED.md`](docs/GETTING_STARTED.md).

> New to these technologies entirely? Read [`docs/LEARNING.md`](docs/LEARNING.md) first — it's a
> gentle, ordered learning path with free resources.
