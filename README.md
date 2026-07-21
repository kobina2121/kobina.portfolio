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
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — Sanity project ID for the `/admin` Studio.
- `NEXT_PUBLIC_SANITY_DATASET` — Sanity dataset name, usually `production`.
- `RESEND_API_KEY` — Resend API key.
- `CONTACT_FROM_EMAIL` — sender address from a verified Resend domain.
- `CONTACT_TO_EMAIL` — inbox that receives portfolio contact submissions.

Abuse-protection credentials are reserved for the later security phase.

Environment parsing is centralized in `src/lib/env.ts`. Server secrets must never be imported into client components.

## Admin CMS

The portfolio includes an embedded Sanity Studio at `/admin`. Until `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are configured, that route shows setup instructions instead of the editor.

Editable content types include projects, experience, skills, services, education, certifications, testimonials, and site settings. The public site still has typed local fallback content, so it remains stable while Sanity is being connected or seeded.

Seed the current local projects and experience into Sanity with:

```bash
npm run sanity:seed
```

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
