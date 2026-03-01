# Padel to Business

Full-stack Next.js 14 website for [padeltobusiness.se](https://padeltobusiness.se) — Sveriges roligaste padelnätverk.

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

```bash
# On the server
mkdir -p ~/p2b
# Copy docker-compose.yml + .env to ~/p2b/
# Fill in all env values
```

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `HETZNER_HOST` | Server IP or hostname |
| `HETZNER_USER` | SSH username |
| `HETZNER_SSH_KEY` | Private SSH key (ed25519) |
| `GHCR_TOKEN` | GitHub PAT with `packages:write` scope |
| `DB_PASSWORD` | MariaDB user password |
| `DB_ROOT_PASSWORD` | MariaDB root password |
| `ADMIN_PASSWORD` | Admin dashboard password |

### Deploy process

Push to `main` triggers:
1. Lint (`next lint`)
2. Build + push Docker image to `ghcr.io/tschiffer46/azp2b:latest`
3. SSH deploy: `docker compose pull && docker compose up -d`
4. Prisma migrations: `docker compose exec app npx prisma migrate deploy`

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