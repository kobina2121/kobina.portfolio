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

Copy `.env.example` to `.env.local`. Phase 1 only requires `NEXT_PUBLIC_SITE_URL`; email and abuse-protection credentials become required when those integrations are implemented.

Environment parsing is centralized in `src/lib/env.ts`. Server secrets must never be imported into client components.

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
