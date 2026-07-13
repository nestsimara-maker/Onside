# Altura

The launchpad for business in China — a marketing site, service-request
system, and networking hub, built with Next.js (App Router), Prisma, and
SQLite.

## What's here

- **Services** (`/services`) — entity registration, corporate bank account
  opening, taxation & accounting, grants & subsidies, visa & residence,
  legal translation, IP registration, and HR/payroll. Each service has an
  inline inquiry form that persists to the database.
- **Playbook Hub** (`/hub`) — a directory where six kinds of actors list
  themselves: companies, corporates, investors, banks, governments, and
  students. Each category has its own listing form and detail pages.
- **Events** (`/events`) — a filterable event listing where each card links
  out to the organizer's own site.
- **About** / **Contact** — company info and a contact form.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack, TypeScript)
- [Tailwind CSS 4](https://tailwindcss.com) for styling
- [Prisma 7](https://www.prisma.io) + SQLite (via `@prisma/adapter-better-sqlite3`) for persistence
- [Zod](https://zod.dev) for request validation

## Getting started

```bash
npm install          # also runs `prisma generate` via postinstall
npm run db:migrate    # create the SQLite database and apply the schema
npm run db:seed       # populate sample listings and events
npm run dev            # start the dev server on http://localhost:3000
```

Copy `.env.example` to `.env` if you need to override `DATABASE_URL` (it
defaults to a local `file:./dev.db`).

## Scripts

| Command             | Description                                  |
| -------------------- | --------------------------------------------- |
| `npm run dev`         | Start the dev server (Turbopack)              |
| `npm run build`       | Production build                              |
| `npm run start`       | Run the production build                      |
| `npm run lint`        | Lint the project                              |
| `npm run db:migrate`  | Apply Prisma migrations (dev)                 |
| `npm run db:seed`     | Reset and seed sample data                    |

## Data model

See `prisma/schema.prisma` for the full schema. In short:

- `Listing` — one row per Playbook Hub entry, discriminated by `category`
  (`COMPANY`, `CORPORATE`, `INVESTOR`, `BANK`, `GOVERNMENT`, `STUDENT`).
- `ServiceInquiry` — a request submitted from the Services page.
- `Event` — an event listing with an outbound `url` to the organizer.
- `ContactMessage` — messages submitted from the Contact page.

## Production notes

This project uses SQLite for simplicity in development. SQLite's on-disk
file doesn't survive serverless/ephemeral deployments (e.g. Vercel), so
before deploying to production, either:

- switch the Prisma datasource + adapter to Postgres (e.g.
  `@prisma/adapter-pg` with a hosted Postgres database), or
- deploy to a target with a persistent filesystem/volume for the SQLite file.

No authentication or admin moderation is implemented yet — all
listings/events publish immediately on submission.
