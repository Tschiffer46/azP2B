# Bootstrap — Padel to Business

## Project Brief
**padeltobusiness.se** is a Swedish padel sports business networking community founded by three friends (Gustav, Brian, Jonte) with a mission to combine padel sports with business networking.

## Stack
Next.js 14 (App Router) · TypeScript · Tailwind CSS · MariaDB / Prisma · Nodemailer · Docker

## Quick Start
```bash
npm install
cp .env.example .env.local
# Fill in .env.local values
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

## Design Tokens
- Background: `#0a0a0a` / `#111111`
- Accent: `#a3e635` (lime)
- Font: Inter
