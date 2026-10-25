# Personal Portfolio — Implementation Roadmap

This document is the source of truth for building and launching the portfolio. Complete phases in order. Do not move a phase to **Complete** until its exit criteria pass.

## Project goals

- Present a clear professional identity within the first screen.
- Showcase high-quality project case studies, skills, services, and experience.
- Turn qualified visitors into conversations through a secure contact flow.
- Achieve excellent accessibility, mobile usability, SEO, and performance.
- Keep content easy to update without coupling it to page components.
- Deploy safely to Vercel with monitoring and abuse protection.

## Technical baseline

- Next.js 15+ with App Router and React Server Components by default.
- TypeScript in strict mode.
- Tailwind CSS and Shadcn UI.
- Motion for React (formerly Framer Motion) for progressive, reduced-motion-aware animation.
- React Icons for technology and social branding.
- Zod for content and form validation.
- Resend with React Email for contact email delivery.
- Typed local content first; MDX for long-form content; Sanity only if editorial workflows require it.
- Vercel for previews and production deployment.
- Vitest, React Testing Library, Playwright, and Axe for verification.

## Working rules

1. Keep pages and data-fetching code server-rendered unless browser state is required.
2. Keep client components small and isolated.
3. Use design tokens instead of one-off color, spacing, or typography values.
4. Every feature must support keyboard navigation and reduced motion.
5. Every project image must have defined dimensions, responsive sizing, and appropriate alternative text.
6. Validate untrusted data on the server even when it was already validated in the browser.
7. Never commit secrets or real contact-form credentials.
8. Finish and verify each phase before expanding scope.

## Status legend

- [ ] Not started
- [~] In progress
- [x] Complete
- **Gate:** a required verification point before continuing

---

# Phase 0 — Discovery and content collection

**Outcome:** the visual direction and content needed to build the portfolio are available.

## 0.1 Professional positioning

- [ ] Confirm full name and preferred professional title.
- [ ] Write a one-sentence value proposition.
- [ ] Define target visitors: employers, clients, collaborators, or a priority order.
- [ ] Define primary CTA: contact, hire, book a call, or view work.
- [ ] Define secondary CTA: download CV or view all projects.
- [ ] Confirm location, timezone, remote/on-site preference, and availability.

## 0.2 Content inventory

- [ ] Finalize short and long biography.
- [ ] Gather profile portrait and optional personal brand imagery.
- [ ] List skills grouped by frontend, backend, tooling/cloud, design, and collaboration.
- [ ] Define services with problem, outcome, and deliverables.
- [ ] Prepare complete employment history with measurable achievements.
- [ ] Prepare education and certifications with verification links.
- [ ] Obtain testimonial text and permission to publish names/photos.
- [ ] Provide social, GitHub, LinkedIn, email, and other public links.
- [ ] Provide the current CV as a versioned PDF.

## 0.3 Project case studies

For each featured project, collect:

- [ ] Title, slug, short summary, and category.
- [ ] Cover image and gallery assets.
- [ ] Client or project context.
- [ ] Problem and constraints.
- [ ] Personal role and exact contribution.
- [ ] Research and implementation process.
- [ ] Technical and design decisions.
- [ ] Stack and tools.
- [ ] Outcome and measurable impact.
- [ ] Lessons learned.
- [ ] Live URL and repository URL when public.
- [ ] Confidentiality limitations where applicable.

## 0.4 Visual direction

- [ ] Choose brand personality and visual references.
- [ ] Select primary and neutral color direction.
- [ ] Choose display and body font direction.
- [ ] Confirm light theme, dark theme, or both as first-class experiences.
- [ ] Approve desktop and mobile content hierarchy.

**Gate 0:** Content exists for every required home section and at least three portfolio projects. Brand direction and CTAs are approved.

---

# Level 1 — UI Foundation

## Phase 1 — Project bootstrap and engineering foundation ✅

**Outcome:** a stable Next.js application with consistent developer tooling.

- [x] Initialize Next.js with App Router, TypeScript, Tailwind CSS, and `src/` convention.
- [x] Pin the package manager and create its lockfile.
- [x] Enable strict TypeScript settings.
- [x] Configure ESLint and formatting.
- [x] Configure `@/*` import aliases.
- [x] Install and initialize Shadcn UI.
- [x] Install Motion for React, React Icons, Zod, `next-themes`, and Sonner.
- [x] Create `.env.example` and validate environment variables.
- [x] Add scripts for lint, type-check, test, build, and end-to-end testing.
- [x] Create the base application folder structure.
- [x] Add a minimal README with setup and command instructions.

### Target folders

```text
app/
components/{layout,sections,projects,forms,motion,ui}/
content/
emails/
lib/{analytics,content,email}/
public/{images,documents}/
tests/
types/
```

**Gate 1: Passed on 2026-07-14.** Development server returned HTTP 200; formatting, lint, type-check, unit tests, and the production build passed.

## Phase 2 — Design system

**Outcome:** every page can be built from a consistent visual foundation.

- [x] Define semantic CSS color variables for light and dark modes.
- [x] Define container widths, gutters, spacing, radius, shadows, and elevation.
- [x] Define responsive heading, body, label, and code typography.
- [x] Load and subset fonts with `next/font`.
- [x] Configure focus-ring, selection, scrollbar, and link styles.
- [x] Add base Shadcn primitives: Button, Card, Badge, Sheet, Dialog, Input, Textarea, Field, Tooltip, Skeleton, Separator, and Toast/Sonner.
- [x] Build reusable `Container`, `Section`, `SectionHeading`, `Prose`, `IconLink`, and `EmptyState` components.
- [x] Verify color contrast in both themes.
- [x] Create a development-only style/component reference page if useful.

**Gate 2: Passed on 2026-07-19.** Core tokens, Shadcn primitives, layout/content components, tooltip/toast providers, and the development-only design-system reference page are in place; formatting, linting, type-checking, tests, and production build passed.

## Phase 3 — Global application shell

**Outcome:** all routes share a responsive, accessible layout.

- [x] Build root layout and global metadata defaults.
- [x] Add theme provider with system, light, and dark options.
- [x] Build skip-to-content link.
- [x] Build responsive header and desktop navigation.
- [x] Build accessible mobile navigation using Sheet.
- [x] Build theme selector/toggle.
- [x] Build footer with navigation, social links, contact, and copyright.
- [x] Add consistent page container and section spacing.
- [x] Add visible keyboard focus states.
- [x] Confirm semantic landmarks and heading hierarchy.

**Gate 3: Passed on 2026-07-19.** Global metadata defaults, skip-to-content behavior, desktop navigation, Sheet-based mobile navigation, system/light/dark theme control, shared footer, semantic landmarks, and shared page spacing are in place; formatting, linting, type-checking, unit tests, and the production build passed.

## Phase 4 — Home page sections

**Outcome:** the full home-page story is implemented with real or approved content.

- [x] Hero: title, value proposition, CTAs, portrait/visual, availability, and social links.
- [x] About: biography, strengths, portrait, and credible highlights.
- [x] Skills: meaningful groups, icons, labels, and optional current-learning group.
- [x] Services: customer problem, outcome, deliverables, and contact CTA.
- [x] Featured Projects: three to six curated project cards.
- [x] Experience: responsive timeline with measurable achievements.
- [x] Education: institution, qualification, dates, and supporting detail.
- [x] Certifications: provider, credential, date, and verification link.
- [x] Testimonials: accessible grid or manually controlled carousel.
- [x] Contact: introductory copy, form presentation, email, and social alternatives.
- [x] Add section anchors matching navigation.
- [x] Review page rhythm, content density, and CTA priority.

**Gate 4: Implementation checkpoint on 2026-07-19.** Every required home section now renders with responsive structure, anchors, and content. Final Gate 4 approval still requires replacing anonymous testimonials and learning-track certification labels with the owner’s approved real details, then doing final visual/content QA.

## Phase 5 — Projects and case studies

**Outcome:** visitors can browse work and understand the impact of each project.

- [x] Create typed `Project` and media models.
- [x] Add project seed content with unique slugs.
- [x] Build `/projects` introduction and project grid.
- [x] Build reusable project card variants.
- [x] Build `/projects/[slug]` case-study template.
- [x] Cover context, role, problem, constraints, process, solution, outcome, and lessons.
- [x] Add responsive gallery with image captions.
- [x] Add technology, live-site, and source links.
- [x] Support confidential and unavailable-link states.
- [x] Add related projects and previous/next navigation.
- [x] Use `notFound()` for unknown slugs.

**Gate 5: Passed on 2026-07-19.** Three seeded case studies render at unique URLs, identify context, owner contribution, process, solution, outcomes, lessons, link availability, and related navigation; formatting, linting, type-checking, unit tests, and the production build passed.

## Phase 6 — System states, metadata, and identity

**Outcome:** incomplete, failed, shared, and search-engine experiences are intentional.

- [x] Build `not-found.tsx`.
- [x] Build route-level and global error boundaries.
- [x] Build route loading states and reusable skeletons.
- [x] Add empty and no-result states.
- [x] Add favicon, Apple icon, and web manifest.
- [x] Add root title template, description, canonical base, and social metadata.
- [x] Generate project-specific metadata.
- [x] Add default and project-specific Open Graph images.
- [x] Add valid `Person`, `WebSite`, and relevant project JSON-LD.
- [x] Verify metadata and social previews.

**Gate 6: Passed on 2026-07-19.** Custom 404, error boundaries, loading skeletons, empty states, manifest/icons, canonical/social metadata, generated Open Graph images, project metadata, and JSON-LD structured data are in place; formatting, linting, type-checking, unit tests, and the production build passed.

**Level 1 gate: Passed on 2026-07-19.** The visual website foundation is complete, responsive, indexable, and usable without animations or advanced interactions.

---

# Level 2 — State and User Experience

## Phase 7 — Navigation, scrolling, and motion

**Outcome:** navigation and animation improve orientation without blocking content.

- [x] Highlight the current route.
- [x] Highlight the active home section with `IntersectionObserver`.
- [x] Add smooth anchor scrolling with sticky-header offset.
- [x] Close the mobile menu after navigation and restore focus correctly.
- [x] Add section reveal motion.
- [x] Add subtle project-card hover and focus motion.
- [x] Add route transitions only where compatible with App Router rendering.
- [x] Centralize motion durations and easing.
- [x] Use `useReducedMotion` and test reduced-motion behavior.
- [x] Ensure important content is visible without waiting for JavaScript.

**Gate 7: Passed on 2026-07-19.** Route and active home-section navigation states, sticky-offset smooth scrolling, Sheet menu close behavior, reduced-motion-safe section reveals, project-card hover/focus motion, centralized motion tokens, and App Router-safe transition wrapping are in place; formatting, linting, type-checking, unit tests, and production build passed.

## Phase 8 — Project discovery

**Outcome:** projects are easy to find and filter, and filter state is shareable.

- [x] Add project search over title, summary, technologies, and tags.
- [x] Add category filters.
- [x] Add optional technology filters if the project count justifies them.
- [x] Store filters in URL search parameters.
- [x] Show result count and clear-all control.
- [x] Add a useful no-results state.
- [x] Add accessible modal previews while preserving normal project links.
- [x] Confirm Back/Forward navigation behaves predictably.

**Gate 8: Passed on 2026-07-19.** Project search, category filters, technology filters, URL-backed filter state, result counts, clear-all control, no-results state, and accessible preview dialogs are in place while preserving full case-study links; formatting, linting, type-checking, unit tests, and production build passed.

## Phase 9 — Contact form experience

**Outcome:** the form has complete browser-side behavior before email delivery is connected.

- [x] Define shared Zod contact schema.
- [x] Add name, email, subject/type, optional budget, and message fields.
- [x] Connect labels, descriptions, errors, and `aria-invalid` correctly.
- [x] Add character limits and useful inline validation.
- [x] Add pending and duplicate-submit protection.
- [x] Preserve values after validation errors.
- [x] Add success and error presentation.
- [x] Add accessible toast notifications as secondary feedback.
- [x] Add privacy/consent notice.

**Gate 9: Passed on 2026-07-19.** The homepage contact form now uses a shared Zod schema, accessible browser-side validation, inline errors, character limits, pending/duplicate-submit protection, success messaging, toast feedback, a privacy/consent notice, and an email-draft fallback until the Phase 12 backend is connected; formatting, linting, type-checking, unit tests, and production build passed.

## Phase 10 — Convenience, media, and accessibility

- [x] Add copy-email button with confirmation and fallback.
- [x] Add versioned CV download with analytics-ready event hook.
- [x] Add back-to-top button.
- [x] Add external-link indicators and accessible names.
- [x] Optimize all images with `next/image`, correct `sizes`, and stable aspect ratios.
- [x] Prioritize only true above-the-fold media.
- [x] Lazy-load galleries and non-critical interactive components.
- [x] Audit heading order, landmarks, form names, link purpose, and alt text.
- [x] Test keyboard-only use, 200% zoom, screen-reader basics, and reduced motion.
- [x] Confirm touch targets and mobile form usability.

**Gate 10: Passed on 2026-07-19.** Copy-email controls, a versioned CV download path, analytics-ready UI event hooks, back-to-top behavior, external-link indicators, stronger accessible names, larger mobile targets, and form/filter touch improvements are in place. Image usage remains `next/image` based with priority limited to the true first-viewport portrait; formatting, linting, type-checking, unit tests, and production build passed.

**Level 2 gate: Passed on 2026-07-19.** Navigation, filtering, themes, modals, and form UI work across keyboard, touch, and mouse with reduced-motion-aware behavior and no known serious accessibility regressions.

---

# Level 3 — Data and Content Management

## Phase 11 — Content architecture

**Outcome:** content is independent from presentation and validated at build time.

- [x] Define schemas for site config, navigation, projects, skills, services, experience, education, certifications, and testimonials.
- [x] Validate dates, URLs, media, duplicate slugs, and required fields.
- [x] Create repository functions such as `getAllProjects()` and `getProjectBySlug()`.
- [x] Make pages consume repository functions instead of importing raw data.
- [x] Organize images by project and purpose.
- [x] Decide whether long case studies require MDX.
- [x] Add optional blog schema, index, article route, tags, and RSS only if the blog is approved.
- [x] Keep a content adapter boundary for a future Sanity migration.

**Gate 11: Passed on 2026-07-20.** Portfolio content now parses through Zod schemas for site config, navigation, projects, skills, services, experience, education, certifications, testimonials, links, dates, image assets, and duplicate project slugs. Pages consume repository getters instead of raw arrays, reusable images are registered by purpose, current case studies remain typed local content without MDX, blog support remains disabled until approved, and the repository API is the adapter boundary for a future CMS/Sanity migration; formatting, linting, type-checking, unit tests, and production build passed.

## Phase 12 — Contact backend and email

**Outcome:** production contact submissions are validated, protected, delivered, and observable.

- [x] Create `POST /api/contact` Route Handler.
- [x] Validate and normalize all input on the server.
- [x] Reject invalid types, oversized values, and malformed requests.
- [x] Create React Email notification template.
- [~] Configure Resend with a verified sending domain.
- [x] Set the visitor’s address as `replyTo`, never as an untrusted sender.
- [x] Add plain-text email output.
- [x] Add idempotency handling.
- [x] Return stable, non-sensitive error codes to the client.
- [x] Connect the browser form to the endpoint.
- [x] Test success, validation failure, provider failure, and retry behavior.

**Phase 12 checkpoint on 2026-07-20.** The contact route, server validation, size/malformed request rejection, HTML and plain-text notification output, Resend REST integration, `reply_to` behavior, idempotency handling, stable client error codes, browser form submission, and route tests are implemented. Final Gate 12 still requires setting `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` from a verified Resend domain, and `CONTACT_TO_EMAIL` in the deployment environment, then confirming a real email delivery smoke test.

## Phase 13 — SEO, analytics, and observability

- [x] Generate `sitemap.ts` from real routes and content.
- [x] Add `robots.ts` with production-only indexing rules.
- [x] Add canonical URLs to indexable pages.
- [ ] Validate Open Graph and structured-data output.
- [ ] Add Vercel Web Analytics and Speed Insights or approved alternatives.
- [ ] Track project open, live-demo click, CV download, and successful contact submission.
- [ ] Exclude form values and personal data from analytics.
- [ ] Add error monitoring such as Sentry if approved.
- [ ] Add structured server logs with request IDs and redacted fields.
- [ ] Add a privacy page covering analytics, email processing, and spam protection.

## Phase 14 — Environment and error hardening

- [ ] Validate required environment variables at startup.
- [ ] Separate local, preview, and production configuration.
- [ ] Confirm no server secret appears in browser bundles.
- [ ] Define user-safe errors for content, API, email, and rate-limit failures.
- [ ] Add logging boundaries without recording message contents.
- [ ] Document credential setup and rotation.

**Level 3 gate:** Content is typed, email works on a verified domain, metadata is generated correctly, and production failures can be diagnosed without exposing private data.

---

# Level 4 — Production and Deployment

## Phase 15 — Abuse prevention and security

**Outcome:** public endpoints and pages have layered production protection.

- [ ] Add hidden honeypot field.
- [ ] Reject unrealistically fast form submissions.
- [ ] Add strict server-side input and content-length limits.
- [ ] Add per-IP and burst rate limiting.
- [ ] Add Cloudflare Turnstile or Google reCAPTCHA with server-side verification.
- [ ] Add safe generic responses for rejected spam.
- [ ] Configure Vercel WAF/bot rules if available for the deployment plan.
- [ ] Add Content Security Policy.
- [ ] Add Referrer Policy, `nosniff`, Permissions Policy, HSTS, and frame restrictions.
- [ ] Test CSP with fonts, analytics, CAPTCHA, and required third-party resources.
- [ ] Run dependency and secret scans.

## Phase 16 — Automated testing

### Unit and component tests

- [ ] Test schemas and content validation.
- [ ] Test search and filter utilities.
- [ ] Test metadata helpers and route utilities.
- [ ] Test contact form validation and state rendering.
- [ ] Test theme and navigation controls.

### End-to-end tests

- [ ] Home navigation and section anchors.
- [ ] Mobile navigation and focus restoration.
- [ ] Theme persistence.
- [ ] Project search and filters.
- [ ] Valid and invalid project routes.
- [ ] Contact success, validation, rate-limit, and provider-error states.
- [ ] CV download.
- [ ] 404 and error pages.
- [ ] Axe accessibility scans on core routes.

## Phase 17 — Performance and Lighthouse

- [ ] Inspect client bundle size and remove unnecessary client boundaries.
- [ ] Eliminate avoidable layout shifts.
- [ ] Optimize hero image, galleries, fonts, and third-party scripts.
- [ ] Verify caching and static generation behavior.
- [ ] Run Lighthouse on home, project index, a case study, and contact flow.
- [ ] Test on throttled mobile conditions.
- [ ] Test Core Web Vitals through preview and production telemetry.

### Performance budgets

- Lighthouse Performance: 90+ mobile.
- Accessibility: 95+ with no serious or critical issues.
- Best Practices: 95+.
- SEO: 100.
- LCP: below 2.5 seconds at the 75th percentile.
- INP: below 200 ms at the 75th percentile.
- CLS: below 0.1 at the 75th percentile.

## Phase 18 — CI/CD and Vercel deployment

- [ ] Create Git repository and branch strategy.
- [ ] Add CI for install, type-check, lint, test, and production build.
- [ ] Connect Vercel and enable pull-request preview deployments.
- [ ] Configure separate preview and production environment variables.
- [ ] Protect preview deployments from indexing and unauthorized access.
- [ ] Add production custom domain.
- [ ] Configure canonical host redirect and HTTPS.
- [ ] Verify Resend DNS records.
- [ ] Run smoke tests against preview and production deployments.
- [ ] Document rollback procedure.

## Phase 19 — Launch checklist

### Content

- [ ] Spelling, dates, titles, URLs, and project facts reviewed.
- [ ] All testimonials and images have publishing permission.
- [ ] CV is current and downloads correctly.
- [ ] No draft, placeholder, or confidential content is exposed.

### Technical

- [ ] Production build and full test suite pass.
- [ ] Contact email is received and reply behavior works.
- [ ] Rate limiting and CAPTCHA are tested safely.
- [ ] Sitemap, robots, canonical URLs, and social previews are correct.
- [ ] Security headers and CSP pass inspection.
- [ ] Analytics and error monitoring receive production events.
- [ ] Major browsers and representative mobile devices are tested.

### Search and release

- [ ] Submit sitemap to relevant webmaster tools.
- [ ] Verify production ownership and domain records.
- [ ] Announce launch only after smoke tests pass.
- [ ] Record deployment version and rollback point.

**Level 4 gate:** Production meets security, testing, performance, accessibility, SEO, observability, and content requirements. The site is ready to announce.

---

# Post-launch maintenance

## First 48 hours

- [ ] Monitor contact failures, server errors, and Web Vitals.
- [ ] Check analytics for broken journeys or unexpected drop-offs.
- [ ] Test contact delivery again from an external device/network.
- [ ] Fix critical accessibility, content, or routing issues immediately.

## Monthly

- [ ] Review dependency updates and security advisories.
- [ ] Check broken links and missing images.
- [ ] Review contact spam and rate-limit behavior.
- [ ] Review Core Web Vitals and error trends.
- [ ] Confirm availability, CV, experience, and featured work are current.

## Quarterly

- [ ] Refresh project outcomes and screenshots.
- [ ] Review SEO search appearance and metadata.
- [ ] Re-run the complete Lighthouse and accessibility audit.
- [ ] Reassess whether MDX or Sanity is justified by the publishing workflow.

---

# Scope control and decision log

Record material decisions here before implementing them.

| Decision          | Default                  | Change only when                                                 |
| ----------------- | ------------------------ | ---------------------------------------------------------------- |
| Contact provider  | Visitor's email app      | Server-side delivery (e.g. Resend) is needed again               |
| Content source    | MongoDB + typed fallback | Editors require drafts, previews, or non-code publishing         |
| Long-form content | MDX                      | A CMS is approved                                                |
| CAPTCHA           | Turnstile                | Google reCAPTCHA is a firm requirement                           |
| Analytics         | Vercel Analytics         | Privacy, cost, or reporting requirements favor another tool      |
| Global state      | None                     | Multiple unrelated client features genuinely share complex state |
| Project modal     | Accessible Dialog        | Addressable modal routes materially improve the experience       |

## Approved scope changes

- Password-protected admin route for editing portfolio content stored in MongoDB.

## Deferred unless explicitly approved

- Full migration from local fallback to MongoDB-only content.
- User accounts or authentication.
- Database-backed contact history.
- Newsletter subscriptions.
- Automatic testimonial carousel.
- Internationalization.
- Complex 3D hero scenes.
- Real-time chat.

These features can be added later, but they should not delay the core portfolio launch.
