# Garified Website Redesign — Implementation Plan

Companion to [spec.md](./spec.md). Status: Draft v1 · 2026-10-08

## Ground rules

- Read the relevant guide in `node_modules/next/dist/docs/` before writing code for each phase (see AGENTS.md). Next 16 points that already affect this plan:
  - `params` and `searchParams` are Promises. `PageProps` and `LayoutProps` are global type helpers.
  - `cacheComponents` and `partialPrefetching` are on. `dynamicParams` is unavailable, so service pages use four static route folders.
  - `next lint` is removed. Use `npm run lint` (ESLint flat config).
  - Tailwind v4 runs through the `@tailwindcss/turbopack` loader configured in `next.config.ts`. There is no PostCSS config.
- All copy comes from `src/content/*`. No copy is hard-coded in components.
- Each phase ends with `npm run lint` and `npm run build` passing, then one commit.
- Work happens on a feature branch (`redesign`), not `main`.

## Dependencies

| Package | Version | Why |
| --- | --- | --- |
| `animejs` | 4.5.0 | Motion |
| `radix-ui` | ^1.7 | Accessible Dialog, Tabs, Accordion |
| `lucide-react` | ^1.52 | Icons |
| `zod` | ^4.6 | Form validation. Zod 4: use `z.flattenError()`, not `error.flatten()` |
| `nodemailer` | ^10.1 | Email delivery through Google SMTP. Ships its own types |
| `vitest` (dev) | ^5 | Unit tests for form logic only |

## Target file structure

```
src/
  app/
    layout.tsx                 fonts, metadata, html.js script, EnquiryProvider
    globals.css                Tailwind import, @theme tokens, base styles
    page.tsx                   home: composes sections
    not-found.tsx
    sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg
    services/
      rostering/page.tsx       each renders <ServicePage service="rostering" />
      administration/page.tsx
      marketing/page.tsx
      accounting/page.tsx
  actions/
    send-enquiry.ts            'use server' action
  components/
    layout/   SiteHeader, MobileNav, SiteFooter, Wordmark, SkipLink, MobileCtaBar
    sections/ Hero, HeroVisual, Ribbon, ServiceList, Approach, Testimonials,
              ProviderTabs, Packages, Faq, ContactCta
    service/  ServicePage
    enquiry/  EnquiryProvider, EnquiryDialog, EnquiryForm, EnquirySuccess
    ui/       Button, Eyebrow, Heading (renders <em> accents), CheckIcon, ArrowIcon, Section
    motion/   useAnimeScope, Reveal (scroll-triggered wrapper)
  content/
    site.ts                    home copy (hero, ribbon, approach, tabs, packages, faq, cta, footer)
    services.ts                four services: list rows + full service page copy
    enquiry.ts                 dialog copy, team sizes, service options, brief template
    testimonials.ts            mock entries + isDisplayable() guard
  lib/
    enquiry-schema.ts          shared Zod schema
    build-brief.ts             brief text from the 1:1 template
    cn.ts                      class name join helper
tests/
  enquiry-schema.test.ts
  build-brief.test.ts
  testimonials.test.ts
docs/
  spec.md, implementation-plan.md
.env.example
```

## Phase 0 — Setup

1. Create branch `redesign`.
2. Install the dependencies above.
3. Add `.env.example` with the variables from spec §8.3. Confirm `.env*.local` is gitignored.
4. Add a `test` script (`vitest run`).
5. Remove scaffold assets (`public/*.svg`, scaffold `page.tsx` content, Geist fonts).

**Done when:** the build passes with an empty home page.

## Phase 1 — Design tokens and base styles

Docs to read: `01-getting-started/13-fonts.md`, `03-api-reference/02-components/font.md`.

1. `globals.css`: `@import "tailwindcss"`, then `@theme` with the colour tokens (spec §6.1), font variables, the fluid type scale (§6.2), radius and shadow tokens. Remove the dark-mode block.
2. Base layer: 18px body, line height 1.6, `text-wrap: balance` on headings, `em` accent style, focus ring utilities (blue, and amber inside `.on-deep`), `scroll-padding-top` for the sticky header, and the reduced-motion reset.
3. `layout.tsx`: load Plus Jakarta Sans (400–800) and Instrument Serif (400 italic) with `next/font/google`, exposed as CSS variables. Set `lang="en-AU"` and the home metadata.
4. Add the inline `<head>` script that sets `html.js`, plus the hero first-paint CSS with its 2.5s fallback (spec §10.2).
5. `ui/` primitives: `Button` (primary, outline, white, sm), `TextLink`, `Eyebrow`, `Heading` (takes copy with accent markers and renders `<em>`), `Section` (ground variants: white, tint, deep), `CheckIcon`, `ArrowIcon`.

**Done when:** a scratch page shows every button variant and heading level matching the style tile.

## Phase 2 — Content modules

1. Transcribe the reference copy into `src/content/site.ts`, `services.ts` and `enquiry.ts` as typed constants. Represent accent words and line breaks as structured data, for example `[{ text: "The business" }, { br: true }, { text: "behind" }, { br: true }, { em: "better care." }]`, rather than HTML strings.
2. Define `ServiceId = "rostering" | "administration" | "marketing" | "accounting"` and use it for every preselect list (tabs, packages, service pages).
3. `testimonials.ts`: the three mock entries and `getDisplayableTestimonials()`, which applies the production guard (spec §9).
4. Proof the content against the reference copy line by line, paying attention to curly versus straight apostrophes and en dashes.

**Done when:** a diff review against the captured copy finds no wording differences outside spec §5.2.

## Phase 3 — Layout shell

1. `SkipLink`, `Wordmark`, `SiteHeader` (sticky, scrolled state via a small client hook), `MobileNav` (disclosure panel below `lg`, closes on Escape and on link tap), `SiteFooter` (home and service variants).
2. `MobileCtaBar` with an `IntersectionObserver` on the hero and the contact section.
3. `not-found.tsx` using the shell.

**Done when:** the header and footer work at 360px and 1280px, keyboard navigation reaches every link, and the mobile menu toggles its label correctly.

## Phase 4 — Enquiry dialog and email

Docs to read: `02-guides/forms.md`, `02-guides/server-actions.md`, `02-guides/environment-variables.md`.

1. `lib/enquiry-schema.ts`: Zod schema per spec §8.1, used by both client and server.
2. `lib/build-brief.ts`: builds the brief text exactly from the 1:1 template, including the fallbacks "Help choosing the right starting point" and "To discuss in a workflow review."
3. Unit tests for both, covering required fields, bad email, max lengths, empty services fallback and empty priorities fallback.
4. `actions/send-enquiry.ts` (`'use server'`):
   - parse `FormData` and validate
   - silently accept honeypot or under-3-second submissions without sending
   - send through Google SMTP (nodemailer) as plain text with `replyTo`
   - return `{ status: "success", brief } | { status: "error", fieldErrors?, message }`
   - log failures without personal data
5. `EnquiryProvider` (client context): `openEnquiry(preselect?)`, open state, preselect state.
6. `EnquiryDialog` using Radix Dialog. `EnquiryForm` with `useActionState`, pending state, inline errors and preserved input on error. `EnquirySuccess` with the brief, a Copy brief button (with a clipboard fallback) and "Edit your enquiry".
7. Full-height sheet layout below `sm`.

**Done when:** with a real `GMAIL_USER` and `GMAIL_APP_PASSWORD`, a test enquiry arrives with the correct brief and reply-to. Invalid submissions show errors and send nothing. Unit tests pass.

## Phase 5 — Home sections (static)

Build each section from the content modules, without motion yet:

1. `Hero` and `HeroVisual` (placeholder panel; attributes ready for a future `next/image` swap).
2. `Ribbon`.
3. `ServiceList`, with rows linking to the service pages.
4. `Approach`.
5. `Testimonials`, rendering only displayable entries and nothing when the list is empty.
6. `ProviderTabs` (Radix Tabs; the CTA calls `openEnquiry` with the tab's preselect).
7. `Packages` (featured Operations Desk; CTAs preselect per copy).
8. `Faq` (Radix Accordion, single and collapsible).
9. `ContactCta`.
10. Compose them in `app/page.tsx` with the anchors from spec §4.2.

Keep sections as Server Components. Only the interactive leaves (`ProviderTabs`, `Faq`, CTA buttons that open the dialog) are Client Components.

**Done when:** the home page matches the style tile at 390px and 1280px with JavaScript disabled, apart from the dialog.

## Phase 6 — Service pages

1. `ServicePage` template (spec §4.3) reading from `services.ts`.
2. Four route folders, each exporting `metadata` and rendering the template.
3. "Let’s talk" and "Discuss this service" open the dialog with that service preselected.

**Done when:** all four pages render with correct copy and titles, and the back link returns to `/#services`.

## Phase 7 — Motion

Docs to read: anime.js v4 docs for `createScope`, `createTimeline`, `onScroll`, `stagger`.

1. `useAnimeScope(rootRef, setup)` hook: wraps `createScope({ root, mediaQueries: { reduce: "(prefers-reduced-motion: reduce)" } })`, skips setup when reduced motion is on, and calls `revert()` on unmount.
2. `Reveal` wrapper for the scroll-triggered sections, using `onScroll` and playing once.
3. Implement each row of the animation catalogue (spec §10.3): hero timeline first, then services, approach track, testimonials, tabs, packages, dialog.
4. FAQ height animation through Radix's `--radix-accordion-content-height` CSS variable. No anime.js needed.
5. Check: no layout shift, no hidden content with JS off, nothing moves with reduced motion on.

**Done when:** motion matches the style tile, and Lighthouse shows CLS under 0.05 with no long tasks over 100ms caused by animation.

## Phase 8 — SEO, polish and hardening

1. Per-route metadata, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` (navy ground, wordmark, H1). Leave `metadataBase` as a TODO until the domain is known.
2. SVG favicon placeholder.
3. Accessibility pass: axe browser extension on every route, keyboard-only walkthrough, screen reader spot check (NVDA on Windows), 200% zoom, 320px width.
4. Copy proof pass against the source.
5. Lighthouse mobile on `/` and `/services/rostering`. Fix anything below the spec §1 targets.
6. Production guard check: `next build` without `SHOW_SAMPLE_CONTENT`, then confirm no "Sample" quote text appears in the HTML output.

**Done when:** every acceptance criterion in spec §14 passes.

## Phase 9 — Handoff

1. README: setup, environment variables, Gmail app password steps, how to replace mock testimonials, how to swap in the hero photo and logo.
2. Open a PR from `redesign` to `main` with screenshots at 390px and 1280px.

## Verification matrix

| Check | How | Phase |
| --- | --- | --- |
| Types and lint | `npm run lint`, `next build` | Every phase |
| Form logic | `npm test` (Vitest) | 4 |
| Email delivery | Real send to a test inbox | 4 |
| Copy fidelity | Line-by-line diff against the captured copy | 2, 8 |
| Responsive | Browser at 360, 390, 768, 1024, 1280, 1440 | 3, 5, 6, 8 |
| Accessibility | axe, keyboard walkthrough, NVDA, zoom | 8 |
| Motion | Visual review; reduced motion on; JS off | 7 |
| Performance | Lighthouse mobile | 8 |
| Testimonial guard | Production build HTML search | 8 |

## Risks

| Risk | Mitigation |
| --- | --- |
| Hero flashes before animating | `html.js` gate plus CSS fallback (spec §10.2) |
| Gmail app password missing or revoked at launch | Set `GMAIL_USER` and `GMAIL_APP_PASSWORD` on the host and send a test enquiry before launch. Production errors visibly when either is missing |
| Mock testimonials reach production | Guard in `getDisplayableTestimonials()`, a unit test for it, and the Phase 8 build check |
| Dialog copy is false if left 1:1 | Proposed replacement wording awaiting approval (spec §15.1) |
| Spam without rate limiting | Honeypot and timing check now; Turnstile if needed |
| Next 16 API drift from training data | Read the bundled docs before each phase |

## Blocked on the client

- Approval of the dialog wording (spec §15.1). Phase 4 can be built with the proposed wording and changed later.
- The recipient address and a verified sending domain. Needed to finish Phase 4 testing for real.
- Production domain. Needed only for the `metadataBase` TODO in Phase 8.
