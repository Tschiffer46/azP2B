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

### One-time server setup

Run these commands **once** on your Hetzner server (SSH in first):

```bash
# 1. Install Docker (on Debian/Ubuntu Hetzner images)
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# Log out and back in so the group change takes effect

# 2. Create the working directory
mkdir -p ~/p2b
```

That's it. The GitHub Actions workflow handles everything else automatically on each deploy:
- Copies the latest `docker-compose.yml` to `~/p2b/`
- Writes a `.env` file from your GitHub Secrets
- Authenticates with GHCR, pulls the new image, restarts containers
- Runs Prisma database migrations (via the container entrypoint)

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `HETZNER_HOST` | Server IP or hostname |
| `HETZNER_USER` | SSH username (e.g. `root` or `deploy`) |
| `HETZNER_SSH_KEY` | Full private SSH key content (e.g. paste `~/.ssh/id_ed25519`) |
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
3. Copies `docker-compose.yml` to `~/p2b/` on the server
4. Writes `.env` to `~/p2b/` from GitHub Secrets
5. Logs in to GHCR on the server and pulls the new image
6. Restarts containers with `docker compose up -d`
7. Container entrypoint runs `prisma migrate deploy` before starting the Next.js server

### Verifying after the first deploy

Once the Actions deploy job goes green, SSH into the server and check:

```bash
# All containers should show as "running"
docker compose -f ~/p2b/docker-compose.yml ps

# Tail app logs (Ctrl-C to stop)
docker compose -f ~/p2b/docker-compose.yml logs -f app

# Confirm the DB tables were created (enter the DB_PASSWORD you set in GitHub Secrets)
docker compose -f ~/p2b/docker-compose.yml exec db \
  mariadb -u p2b -p p2b -e "SHOW TABLES;"
```

The site is served on port **3000**. Point your reverse proxy (nginx/Caddy) or Hetzner load balancer at `:3000`.

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