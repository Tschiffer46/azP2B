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

## Deploy

Pushed to `main` → GitHub Actions builds and rsyncs `dist/` to `~/hosting/sites/azp2b/dist/` on the Hetzner server.

Required GitHub secrets: `SERVER_HOST`, `SERVER_USER`, `SERVER_SSH_KEY`.
