# Padel to Business

Full-stack Next.js 15 website for [padeltobusiness.se](https://padeltobusiness.se) — Sveriges roligaste padelnätverk.

## Prerequisites

- Node.js 20+
- Docker & Docker Compose
- A MariaDB instance (or use `docker-compose.yml`)

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values (see Environment Variables below)

# 3. Run Prisma migrations
npx prisma migrate dev --name init

# 4. Seed sample events
npx prisma db seed

# 5. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/sv`.

---

## Database Seeding

Seeds 3 sample events at Malmö Padel:

```bash
npx prisma db seed
```

---

## Hetzner Deployment

> **Full instructions:** See [`docs/ServerSetup.md`](docs/ServerSetup.md) for a complete, step-by-step guide written for this specific server environment (existing Nginx server, `deploy` user, Terminus SSH client).

### One-time server setup (summary)

These steps are performed **once** before merging. All require logging in as **`root`** in Terminus:

1. **Docker is already installed** (v29.2.1 confirmed) — no action needed
2. **Add `deploy` to the docker group**: `usermod -aG docker deploy`
3. **Add Nginx virtual host** for `padeltobusiness.se` → `proxy_pass http://localhost:3000`
4. **Get SSL certificate**: `certbot --nginx -d padeltobusiness.se -d www.padeltobusiness.se`

After that, **merge the PR**. GitHub Actions handles everything else.

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `HETZNER_HOST` | Server IP or hostname (same server as azprofil/agiletransition) |
| `HETZNER_USER` | SSH username — set to **`deploy`** |
| `HETZNER_SSH_KEY` | Private SSH key for the `deploy` user (same key used by other sites) |
| `GHCR_TOKEN` | GitHub PAT with `packages:read` and `packages:write` scopes |
| `DB_PASSWORD` | MariaDB user password (choose a strong password) |
| `DB_ROOT_PASSWORD` | MariaDB root password (choose a strong password) |
| `ADMIN_PASSWORD` | Password for the `/admin` dashboard |

**Optional secrets** — leave empty to disable outgoing email:

| Secret | Description |
|--------|-------------|
| `SMTP_HOST` | SMTP server hostname |
| `SMTP_PORT` | SMTP port (usually `587`) |
| `SMTP_USER` | SMTP login username |
| `SMTP_PASS` | SMTP login password |
| `SMTP_FROM` | From address, e.g. `info@padeltobusiness.se` |

### Deploy process

Push to `main` automatically:
1. Runs `next lint`
2. Builds and pushes Docker image to `ghcr.io/tschiffer46/azp2b:latest`
3. SSH into server as `deploy`: creates `~/p2b/`, copies `docker-compose.yml`, writes `.env` from Secrets
4. Logs in to GHCR on the server, pulls the new image, restarts containers
5. Container entrypoint runs `prisma migrate deploy` then starts the Next.js app on port 3000

### Verifying after the first deploy

See [`docs/ServerSetup.md` → Step 8](docs/ServerSetup.md#step-8----verify-the-deployment-after-merge) for the full verification checklist with expected outputs.

---

## Adding Assets

See the README in each asset folder:

- [`public/assets/hero/README.md`](public/assets/hero/README.md) — Hero background image
- [`public/assets/team/README.md`](public/assets/team/README.md) — Team photos
- [`public/assets/logo/README.md`](public/assets/logo/README.md) — Logo files
- [`public/assets/og/README.md`](public/assets/og/README.md) — Open Graph image

---

## Adding SMTP Provider

Edit `.env.local` (or server env):

```
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=yourpassword
SMTP_FROM="Padel to Business <info@padeltobusiness.se>"
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | MariaDB connection string |
| `DB_PASSWORD` | MariaDB user password (Docker Compose) |
| `DB_ROOT_PASSWORD` | MariaDB root password (Docker Compose) |
| `ADMIN_PASSWORD` | Password for `/admin` dashboard |
| `SMTP_HOST` | SMTP server hostname |
| `SMTP_PORT` | SMTP port (usually 587) |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `SMTP_FROM` | From address for emails |
| `GHCR_TOKEN` | GitHub PAT for container registry |

---

## Project Structure

See [`docs/Architecture.md`](docs/Architecture.md) for the full architecture overview.