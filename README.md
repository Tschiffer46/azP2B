# Padel to Business (azP2B)

Static website for **Padel to Business** — a padel networking community in Malmö.

Built with **Vite + React + Tailwind CSS**, deployed via rsync to a Hetzner server.

## Tech Stack

- [Vite](https://vitejs.dev/) — build tool
- [React](https://react.dev/) — UI framework
- [React Router](https://reactrouter.com/) — client-side routing
- [Tailwind CSS](https://tailwindcss.com/) — styling

## Pages

- `/` — Home (hero, team, features, pricing, contact)
- `/kalender` — Calendar & Booking
- `/bli-medlem` — Membership
- `/hitta-hit` — Find Us (Google Maps embed)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output is in `dist/`.

## Deployment

This is a **Vite + React + Tailwind CSS** static site for **padeltobusiness.se**.

Deployed via **GitHub Actions** to a Hetzner server on every push to `main`.

### Required GitHub Secrets

| Secret | Description |
|---|---|
| `SERVER_HOST` | IP address or hostname of the Hetzner server |
| `SERVER_USER` | SSH username (`deploy`) |
| `SERVER_SSH_KEY` | Private SSH key content for authentication |

To add secrets: GitHub repo → Settings → Secrets and variables → Actions → New repository secret.

### How it works

The workflow builds the project and rsyncs `./dist/` to `~/hosting/sites/client-azp2b/dist/` on the server.

### Server prerequisites (one-time setup)

1. Create the target directory as the `deploy` user:
   ```bash
   mkdir -p ~/hosting/sites/client-azp2b/dist
   ```
2. Ensure Nginx is configured to serve from that directory. Config file: `/etc/nginx/conf.d/padeltobusiness.se.conf`
