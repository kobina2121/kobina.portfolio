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

- [ ] Define semantic CSS color variables for light and dark modes.
- [ ] Define container widths, gutters, spacing, radius, shadows, and elevation.
- [ ] Define responsive heading, body, label, and code typography.
- [ ] Load and subset fonts with `next/font`.
- [ ] Configure focus-ring, selection, scrollbar, and link styles.
- [ ] Add base Shadcn primitives: Button, Card, Badge, Sheet, Dialog, Input, Textarea, Field, Tooltip, Skeleton, Separator, and Toast/Sonner.
- [ ] Build reusable `Container`, `Section`, `SectionHeading`, `Prose`, `IconLink`, and `EmptyState` components.
- [ ] Verify color contrast in both themes.
- [ ] Create a development-only style/component reference page if useful.

**Gate 2:** Core components are consistent at mobile, tablet, and desktop sizes; light/dark contrast passes WCAG AA.

## Phase 3 — Global application shell

**Outcome:** all routes share a responsive, accessible layout.

- [ ] Build root layout and global metadata defaults.
- [ ] Add theme provider with system, light, and dark options.
- [ ] Build skip-to-content link.
- [ ] Build responsive header and desktop navigation.
- [ ] Build accessible mobile navigation using Sheet.
- [ ] Build theme selector/toggle.
- [ ] Build footer with navigation, social links, contact, and copyright.
- [ ] Add consistent page container and section spacing.
- [ ] Add visible keyboard focus states.
- [ ] Confirm semantic landmarks and heading hierarchy.

**Gate 3:** Header, mobile menu, theme controls, skip link, and footer work with mouse, touch, and keyboard at 320px and above.

## Phase 4 — Home page sections

**Outcome:** the full home-page story is implemented with real or approved content.

- [ ] Hero: title, value proposition, CTAs, portrait/visual, availability, and social links.
- [ ] About: biography, strengths, portrait, and credible highlights.
- [ ] Skills: meaningful groups, icons, labels, and optional current-learning group.
- [ ] Services: customer problem, outcome, deliverables, and contact CTA.
- [ ] Featured Projects: three to six curated project cards.
- [ ] Experience: responsive timeline with measurable achievements.
- [ ] Education: institution, qualification, dates, and supporting detail.
- [ ] Certifications: provider, credential, date, and verification link.
- [ ] Testimonials: accessible grid or manually controlled carousel.
- [ ] Contact: introductory copy, form presentation, email, and social alternatives.
- [ ] Add section anchors matching navigation.
- [ ] Review page rhythm, content density, and CTA priority.

**Gate 4:** Every required section is responsive, contains approved content, and has no placeholder text or broken media.

## Phase 5 — Projects and case studies

**Outcome:** visitors can browse work and understand the impact of each project.

- [ ] Create typed `Project` and media models.
- [ ] Add project seed content with unique slugs.
- [ ] Build `/projects` introduction and project grid.
- [ ] Build reusable project card variants.
- [ ] Build `/projects/[slug]` case-study template.
- [ ] Cover context, role, problem, constraints, process, solution, outcome, and lessons.
- [ ] Add responsive gallery with image captions.
- [ ] Add technology, live-site, and source links.
- [ ] Support confidential and unavailable-link states.
- [ ] Add related projects and previous/next navigation.
- [ ] Use `notFound()` for unknown slugs.

**Gate 5:** At least three complete case studies render correctly, have unique URLs, and clearly identify the owner’s contribution and results.

## Phase 6 — System states, metadata, and identity

**Outcome:** incomplete, failed, shared, and search-engine experiences are intentional.

- [ ] Build `not-found.tsx`.
- [ ] Build route-level and global error boundaries.
- [ ] Build route loading states and reusable skeletons.
- [ ] Add empty and no-result states.
- [ ] Add favicon, Apple icon, and web manifest.
- [ ] Add root title template, description, canonical base, and social metadata.
- [ ] Generate project-specific metadata.
- [ ] Add default and project-specific Open Graph images.
- [ ] Add valid `Person`, `WebSite`, and relevant project JSON-LD.
- [ ] Verify metadata and social previews.

**Level 1 gate:** The visual website is complete, responsive, indexable, and usable without animations or advanced interactions.

---

# Level 2 — State and User Experience

## Phase 7 — Navigation, scrolling, and motion

**Outcome:** navigation and animation improve orientation without blocking content.

- [ ] Highlight the current route.
- [ ] Highlight the active home section with `IntersectionObserver`.
- [ ] Add smooth anchor scrolling with sticky-header offset.
- [ ] Close the mobile menu after navigation and restore focus correctly.
- [ ] Add section reveal motion.
- [ ] Add subtle project-card hover and focus motion.
- [ ] Add route transitions only where compatible with App Router rendering.
- [ ] Centralize motion durations and easing.
- [ ] Use `useReducedMotion` and test reduced-motion behavior.
- [ ] Ensure important content is visible without waiting for JavaScript.

## Phase 8 — Project discovery

**Outcome:** projects are easy to find and filter, and filter state is shareable.

- [ ] Add project search over title, summary, technologies, and tags.
- [ ] Add category filters.
- [ ] Add optional technology filters if the project count justifies them.
- [ ] Store filters in URL search parameters.
- [ ] Show result count and clear-all control.
- [ ] Add a useful no-results state.
- [ ] Add accessible modal previews while preserving normal project links.
- [ ] Confirm Back/Forward navigation behaves predictably.

## Phase 9 — Contact form experience

**Outcome:** the form has complete browser-side behavior before email delivery is connected.

- [ ] Define shared Zod contact schema.
- [ ] Add name, email, subject/type, optional budget, and message fields.
- [ ] Connect labels, descriptions, errors, and `aria-invalid` correctly.
- [ ] Add character limits and useful inline validation.
- [ ] Add pending and duplicate-submit protection.
- [ ] Preserve values after validation errors.
- [ ] Add success and error presentation.
- [ ] Add accessible toast notifications as secondary feedback.
- [ ] Add privacy/consent notice.

## Phase 10 — Convenience, media, and accessibility

- [ ] Add copy-email button with confirmation and fallback.
- [ ] Add versioned CV download with analytics-ready event hook.
- [ ] Add back-to-top button.
- [ ] Add external-link indicators and accessible names.
- [ ] Optimize all images with `next/image`, correct `sizes`, and stable aspect ratios.
- [ ] Prioritize only true above-the-fold media.
- [ ] Lazy-load galleries and non-critical interactive components.
- [ ] Audit heading order, landmarks, form names, link purpose, and alt text.
- [ ] Test keyboard-only use, 200% zoom, screen-reader basics, and reduced motion.
- [ ] Confirm touch targets and mobile form usability.

**Level 2 gate:** Navigation, filtering, themes, modals, and form UI work across keyboard, touch, and mouse with no serious Axe violations.

---

# Level 3 — Data and Content Management

## Phase 11 — Content architecture

**Outcome:** content is independent from presentation and validated at build time.

- [ ] Define schemas for site config, navigation, projects, skills, services, experience, education, certifications, and testimonials.
- [ ] Validate dates, URLs, media, duplicate slugs, and required fields.
- [ ] Create repository functions such as `getAllProjects()` and `getProjectBySlug()`.
- [ ] Make pages consume repository functions instead of importing raw data.
- [ ] Organize images by project and purpose.
- [ ] Decide whether long case studies require MDX.
- [ ] Add optional blog schema, index, article route, tags, and RSS only if the blog is approved.
- [ ] Keep a content adapter boundary for a future Sanity migration.

## Phase 12 — Contact backend and email

**Outcome:** production contact submissions are validated, protected, delivered, and observable.

- [ ] Create `POST /api/contact` Route Handler.
- [ ] Validate and normalize all input on the server.
- [ ] Reject invalid types, oversized values, and malformed requests.
- [ ] Create React Email notification template.
- [ ] Configure Resend with a verified sending domain.
- [ ] Set the visitor’s address as `replyTo`, never as an untrusted sender.
- [ ] Add plain-text email output.
- [ ] Add idempotency handling.
- [ ] Return stable, non-sensitive error codes to the client.
- [ ] Connect the browser form to the endpoint.
- [ ] Test success, validation failure, provider failure, and retry behavior.

## Phase 13 — SEO, analytics, and observability

- [ ] Generate `sitemap.ts` from real routes and content.
- [ ] Add `robots.ts` with production-only indexing rules.
- [ ] Add canonical URLs to indexable pages.
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

| Decision          | Default           | Change only when                                                 |
| ----------------- | ----------------- | ---------------------------------------------------------------- |
| Contact provider  | Resend            | Another provider has a concrete compliance or delivery advantage |
| Content source    | Typed local data  | Editors require drafts, previews, or non-code publishing         |
| Long-form content | MDX               | A CMS is approved                                                |
| CAPTCHA           | Turnstile         | Google reCAPTCHA is a firm requirement                           |
| Analytics         | Vercel Analytics  | Privacy, cost, or reporting requirements favor another tool      |
| Global state      | None              | Multiple unrelated client features genuinely share complex state |
| Project modal     | Accessible Dialog | Addressable modal routes materially improve the experience       |

## Deferred unless explicitly approved

- Full CMS migration.
- User accounts or authentication.
- Database-backed contact history.
- Newsletter subscriptions.
- Automatic testimonial carousel.
- Internationalization.
- Complex 3D hero scenes.
- Admin dashboard.
- Real-time chat.

These features can be added later, but they should not delay the core portfolio launch.
