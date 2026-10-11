# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Owners, directors and operations managers of Australian NDIS provider businesses: in-home and community providers, supported independent living (SIL) providers and specialist disability accommodation (SDA) businesses. Many are 40 to 65, busy, not especially technical, and reading on a phone between other tasks. They come to find out whether Garified can take a specific back-office workload off their team, and to start an enquiry.

Garified does not serve NDIS participants and does not deliver care. Participants are never the audience.

## Product Purpose

Garified is a B2B business-support company. It does agreed back-office work for NDIS provider businesses across four services: Rostering, Administration, Marketing and Accounting support. Engagements are offered as three packages: Admin Essentials, Operations Desk and Complete Support.

The site exists to make that offer clear and to collect enquiries. Success: a provider owner understands what Garified does, and does not do, within 10 seconds of landing, and can send an enquiry from any page in under a minute.

## Positioning

"Your care team leads. We support the business behind it." Garified prepares, maintains and follows up the agreed administrative work inside the provider's existing systems. The provider keeps every participant, staffing, care and final approval decision. Every engagement has an agreed scope, agreed service hours and a nominated contact, so the line between what Garified prepares and what the provider approves is always explicit.

## Operating Context

The work is weekly, tabular and approval-driven: rosters, availability trackers, intake packs, document and expiry registers, inbox summaries, content calendars, enquiry pipelines, invoice batches, reconciliations and payroll input packs. Its vocabulary is "agreed", "approved", "confirmed", "exceptions" and "your nominated contact". Remote or offshore access is scoped explicitly, covering named access, confidentiality and the provider's privacy requirements.

Routes: `/` plus four service pages (`/services/rostering`, `/services/administration`, `/services/marketing`, `/services/accounting`). Contact is a modal enquiry dialog, not a page. Enquiries are sent by email through Resend from a Next.js server action.

## Capabilities and Constraints

- Next.js 16 (App Router), React 19, Tailwind CSS v4, anime.js v4 for motion, Radix UI primitives, lucide icons.
- Copy is transcribed 1:1 from the reference site and must not be reworded. `src/content/services.ts` is the source of truth for service pages, and `src/content/site.ts` for home and footer. Ask before changing copy or adding pages. The footer copy is the one approved rewrite.
- Exactly five routes. No CMS, accounts, analytics or dark mode in this phase.
- Motion uses transform and opacity only, honours `prefers-reduced-motion`, and content stays visible without JavaScript.
- Illustrative sample material (for example, a sample roster or invoice batch) is allowed when it is visibly labelled as an example. It may never include prices, client names, statistics or results.
- Undecided: final contact details, ABN, an official vector logo, and real photography beyond the current assets.

## Brand Commitments

- Name: Garified (the logo reads "garified SOLUTIONS"). Logo: `src/assets/garified solutions logo.png`, plus a vector trace in `src/components/layout/LogoSvg.tsx` until an official SVG is supplied.
- Voice: plain, calm, precise and practical. Responsibilities are stated clearly. No hype and no guarantees.
- Locked palette, fonts and type scale live in `src/app/globals.css` and `docs/design-direction.md`. The locked palette is navy, blue, deep, tint and amber, set in Plus Jakarta Sans with Instrument Serif italic for the accent words the copy marks.
- The four 3D clay service icons in `src/assets/` (Roster, File, Marketing, Calculator) are brand assets.
- The user wants the site to read as human-designed, not AI-generated (see `docs/design-direction.md`).

## Evidence on Hand

- Service copy for all four pages: `src/content/services.ts`.
- Photos: `src/assets/InhomeCommunity.jpg`, `SILproviders.jpg`, `SDAbusiness.jpg`, `woman_helping.jpg`.
- Testimonials on the home page are mock data, labelled "Sample" and guarded from production. They must be replaced with real, consented quotes before launch.
- There are no real client names, case studies, statistics, prices or certifications, and none may be fabricated.

## Product Principles

1. Show the work, not the mood. The product is structure, so the site should demonstrate organised, approved work rather than decorate around it.
2. The provider stays in control, visibly. Every surface keeps the line between "Garified prepares" and "your team approves" legible.
3. Plain before clever. A busy, non-technical owner on a phone must get the point without effort.
4. Earn trust with clarity and truth, never invented proof.

## Accessibility & Inclusion

WCAG 2.2 AA minimum, with AAA contrast for body text. 18px body text, 44px minimum tap targets, mobile-first layouts, and no gesture-only or auto-advancing interactions. Readers of all ages.
