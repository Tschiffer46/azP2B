# Architecture — Padel to Business

## Overview
Production website for **padeltobusiness.se** — a Swedish padel sports business networking community.

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 3 |
| Database | MariaDB via Prisma ORM |
| Email | Nodemailer (provider-agnostic) |
| i18n | Middleware-based locale routing (`/sv`, `/da`) |
| Deployment | Docker + Docker Compose on Hetzner |
| CI/CD | GitHub Actions |

## Color Palette
| Role | Tailwind Token | Hex |
|------|---------------|-----|
| Background | `p2b-black` | `#0a0a0a` |
| Card/dark bg | `p2b-dark` | `#111111` |
| Deeper card | `p2b-darker` | `#1a1a1a` |
| Accent (lime) | `p2b-lime` | `#a3e635` |
| Text | `p2b-white` | `#ffffff` |
| Muted text | `p2b-grey` | `#a0a0a0` |

## Folder Structure
```
app/
  [locale]/         # Locale-aware pages (sv, da)
    layout.tsx      # Root layout with Navbar + Footer
    page.tsx        # Home page
    bli-medlem/     # Membership signup
    kalender/       # Calendar & booking
    hitta-hit/      # Find us / map
  admin/            # Admin dashboard (cookie-protected)
  api/              # API routes (members, bookings, events, admin)
components/         # Shared React components
lib/                # Utilities (db, mail, i18n)
locales/            # Translation files (sv.json, da.json)
prisma/             # Schema + seed
public/assets/      # Static assets (hero, team, logo, og)
docs/               # Project documentation
```

## Internationalisation
- **Languages:** Swedish (`sv`, default) and Danish (`da`)
- **Routing:** `/sv/...` and `/da/...` — middleware in `middleware.ts` redirects `/` based on `Accept-Language`
- **Translations:** loaded server-side via `lib/i18n.ts`, passed as props — no client-side i18n library

## Deployment Flow
1. Push to `main` triggers GitHub Actions
2. Lint job runs `next lint`
3. Deploy job: build + push Docker image to GHCR
4. SSH into Hetzner: `docker compose pull && up -d`
5. Run Prisma migrations in container

## Required GitHub Secrets
| Secret | Description |
|--------|-------------|
| `HETZNER_HOST` | Server IP or hostname |
| `HETZNER_USER` | SSH username |
| `HETZNER_SSH_KEY` | Private SSH key |
| `GHCR_TOKEN` | GitHub PAT with packages:write |
| `DB_PASSWORD` | MariaDB user password |
| `DB_ROOT_PASSWORD` | MariaDB root password |
| `ADMIN_PASSWORD` | Admin dashboard password |
