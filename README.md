# CampusCart

CampusCart is a polished campus marketplace UI for browsing student listings, buying requests, profile flows, and listing-management screens.

This repository is currently configured as a **frontend-only portfolio demo**. The hosted version uses local mock data, bypasses authentication, and disables write/payment/upload/AI actions so it can be shown publicly without exposing a backend, database, secrets, or student data.

## What This Demo Shows

- Marketplace browsing and filtering
- Listing detail pages
- Want-to-buy request discovery
- Dashboard/profile screens
- Create/edit form UI in read-only demo mode
- Safe local image previews and simulated AI suggestions

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS |
| Routing | React Router |
| Demo data | Local mock fixtures |
| Deployment | Vercel static frontend |
| Package manager | pnpm |

The original full-stack project files are still present for reference, but the portfolio deployment does not run the Express backend, Prisma, PostgreSQL, Better Auth, Stripe, uploads, or Ollama.

## Local Development

```bash
cd app
pnpm install
pnpm dev
```

Open:

```text
http://localhost:5173
```

`pnpm dev` starts the Vite frontend only. No database, backend, auth service, or AI service is required.

## Useful Commands

```bash
pnpm dev          # Start the frontend demo
pnpm build        # Build the static production bundle
pnpm preview      # Preview the production build locally
pnpm lint         # Run ESLint
```

## Vercel Deployment

Import this GitHub repository into Vercel and use:

| Setting | Value |
| --- | --- |
| Root Directory | `app` |
| Framework Preset | Vite |
| Build Command | `pnpm build` |
| Output Directory | `dist` |
| Environment Variables | None required |

`app/vercel.json` and `app/.vercelignore` are included so the deployment is static and does not ship the backend/server folders.

## Security Posture

The public portfolio build is intentionally read-only:

- No public signup or login
- No live backend calls
- No database connection
- No file uploads to a server
- No payment checkout
- No AI/Ollama service calls
- No demo passwords or real student data in the production bundle

If you restore the full-stack version later, harden it separately before exposing it publicly.
