# Kobina Portfolio

A production-oriented personal portfolio built with Next.js App Router, TypeScript, Tailwind CSS, and Shadcn UI.

The ordered implementation plan and completion gates live in [ROADMAP.md](./ROADMAP.md).

## Requirements

- Node.js 20.9 or newer
- npm 10.9.8

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
npm run dev          # Start the local development server
npm run build        # Create a production build
npm run start        # Serve the production build
npm run lint         # Run ESLint
npm run typecheck    # Run strict TypeScript checks
npm run format       # Format supported project files
npm run format:check # Check formatting without changing files
npm test             # Run unit and component tests once
npm run test:watch   # Run unit tests in watch mode
npm run test:e2e     # Run Playwright end-to-end tests
```

Install Playwright's local Chromium binary before the first end-to-end run:

```bash
npx playwright install chromium
```

## Environment variables

Copy `.env.example` to `.env.local`. The site can run locally with defaults, but production contact delivery requires:

- `NEXT_PUBLIC_SITE_URL` — canonical site URL.
- `MONGODB_URI` — MongoDB connection string that stores portfolio content.
- `MONGODB_DB` — database name, defaults to `portfolio`.
- `ADMIN_EMAIL` — the only email allowed to sign in to `/admin`.
- `ADMIN_PASSWORD` — password for that admin account.
- `ADMIN_SESSION_SECRET` — at least 32 random characters used to sign admin sessions (`openssl rand -base64 32`).
- `RESEND_API_KEY` — Resend API key.
- `CONTACT_FROM_EMAIL` — sender address from a verified Resend domain.
- `CONTACT_TO_EMAIL` — inbox that receives portfolio contact submissions.

Abuse-protection credentials are reserved for the later security phase.

Environment parsing is centralized in `src/lib/env.ts`. Server secrets must never be imported into client components.

## Content database and admin

Portfolio content (site settings, projects, skills, services, experience, education, certifications, and testimonials) is stored in MongoDB. Navigation and image assets stay in code because they point at routes and files in the repository.

Until `MONGODB_URI` is set, or while the database is empty or unreachable, the site serves the built-in content from `src/lib/content/default-content.ts`, so it never goes blank.

To set up MongoDB:

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), add a database user, and allow your IP address (and `0.0.0.0/0` for Vercel) under Network Access.
2. Copy the connection string into `MONGODB_URI` in `.env.local` and in your hosting provider.
3. Seed the built-in content, either with the **Import built-in content** button at `/admin` or with:

```bash
npm run db:seed
```

Pass `-- --replace` to overwrite existing database content with the built-in content.

The `/admin` dashboard has a single account: only `ADMIN_EMAIL` with `ADMIN_PASSWORD` can sign in. From there you can create, edit, reorder, and delete items in every collection and update site settings. Saving revalidates the public pages immediately; edits made directly in MongoDB appear within an hour.

## Source structure

```text
src/app/                 Routes, layouts, metadata, and global styles
src/components/          Layout, section, project, form, motion, and UI code
src/content/             Typed local portfolio content
src/emails/              React Email templates
src/hooks/               Shared client hooks
src/lib/                 Environment, content, email, analytics, and utilities
src/types/               Shared TypeScript types
public/images/           Optimized source media
public/documents/        Versioned CV and public documents
tests/unit/              Vitest unit/component tests
tests/e2e/               Playwright browser tests
```

## Architecture conventions

- Server Components are the default; use client components only for browser state or interaction.
- Use semantic design tokens and Shadcn primitives instead of one-off styles.
- Validate external and user-provided values on the server with Zod.
- Support keyboard navigation and reduced-motion preferences in every interactive feature.
