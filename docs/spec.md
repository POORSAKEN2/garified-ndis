# Garified Website Redesign — Specification

Status: Draft v1 · 2026-10-08
Style tile (approved direction): https://claude.ai/artifact/VH67BZrTtK55fQLdNZGD9Z

## 1. Overview

Garified provides back-office support (rostering, administration, marketing, accounting support) to Australian NDIS provider businesses. It is a B2B service. It does not deliver care and does not serve participants directly.

This project rebuilds the existing reference site (https://garified.celeste0519.chatgpt.site/) in this repo as a Next.js 16 app with a new visual identity:

- A blue palette, because blue reads as trust in business.
- Clear visual hierarchy, so every section has one main point and one action.
- Premium motion built with anime.js v4.
- Mobile first, since many Australian provider operators browse on phones.
- Plain and legible for readers of all ages.
- Trust built on clarity and real proof, never invented claims.

### Goals

1. A provider owner understands what Garified does and does not do within 10 seconds of landing.
2. Every page reads well on a 375px phone with no horizontal scrolling.
3. An enquiry can be sent from any page in under a minute and reaches Garified by email.
4. Passes WCAG 2.2 AA. Body text meets AAA contrast.
5. Lighthouse mobile scores: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+.

### Non-goals

- No new pages beyond the existing five routes.
- No rewording of existing copy.
- No CMS, database, user accounts or analytics in this phase.
- No dark mode. The site ships in light mode only.

## 2. Audience

Owners, directors and operations managers of NDIS provider businesses:

- In-home and community providers
- Supported independent living (SIL) providers
- Specialist disability accommodation (SDA) businesses

Many are 40 to 65 years old, busy and not especially technical. Many will be reading on a phone between other tasks. Design implications:

- 18px body text, generous line height and short line lengths.
- Large, obvious buttons with tap targets of at least 44px.
- No hidden or gesture-only interactions. No auto-advancing carousels.
- Motion that guides the eye and never blocks reading.

## 3. Locked decisions

| Area | Decision |
| --- | --- |
| Copy | Copied 1:1 from the reference site. Exceptions are listed in §5.2. |
| Pages | Same five routes. Contact stays a modal dialog. |
| Palette | Blue palette plus a small amber accent (§6.1). |
| Type | Plus Jakarta Sans, with Instrument Serif Italic for heading accent words. |
| Motion | anime.js v4. Transform and opacity only. Respects reduced motion. |
| Enquiry form | Sent by email through Google SMTP (nodemailer) from a Next.js Server Action. |
| Testimonials | New home section. Uses mock data for now, behind a production guard (§9). |
| Assets | Logo, photos, ABN and contact details are on hold. Use neutral placeholders. |

## 4. Information architecture

### 4.1 Routes

| Route | Page | Meta title |
| --- | --- | --- |
| `/` | Home | Garified \| Business support for NDIS providers |
| `/services/rostering` | Rostering | Rostering \| Garified |
| `/services/administration` | Administration | Administration \| Garified |
| `/services/marketing` | Marketing | Marketing \| Garified |
| `/services/accounting` | Accounting support | Accounting support \| Garified |

Any other path renders a branded 404 page. The 404 is a framework error state, not a new content page.

### 4.2 Home page section order

| # | Section | Anchor | Ground |
| --- | --- | --- | --- |
| 1 | Header (sticky) | | White |
| 2 | Hero | | White with a soft tint glow |
| 3 | Ribbon (provider types) | | Deep blue |
| 4 | 01 / Our services | `#services` | Tint |
| 5 | 02 / A practical partnership | `#approach` | Deep blue |
| 6 | Testimonials (new, unnumbered) | `#testimonials` | Tint |
| 7 | 03 / Who we help (tabs) | `#providers` | White |
| 8 | 04 / Your level of support (packages) | `#packages` | Tint |
| 9 | 05 / A little more clarity (FAQ) | `#faq` | White |
| 10 | Contact CTA | `#contact` | Deep blue |
| 11 | Footer | | Navy |

The numbered eyebrows (01 to 05) stay exactly as on the reference site. Testimonials sit outside that numbering so the existing numbers stay true.

### 4.3 Service page layout

All four service pages share one template:

1. Header: wordmark (links to `/`) and a Let’s talk button.
2. Back link: All services (to `/#services`).
3. Eyebrow `0N / Garified services`, then H1 (title plus "."), then the intro paragraph.
4. H2 tagline, then a five-item checklist.
5. Callout box: H3, paragraph and a "Discuss this service" link.
6. Footer: wordmark and "Business support for Australian NDIS providers."

On service pages, Let’s talk and Discuss this service open the enquiry dialog directly, with that service preselected. This replaces the reference site's jump to `/#contact`. The wording stays the same.

## 5. Content

### 5.1 Source of truth

All wording comes from the captured reference copy. It is stored once, in typed content modules under `src/content/`. Components never hard-code copy. Punctuation rules:

- Curly ’ in "Let’s" and "We’ll".
- Straight ' in "team's", "provider's" and "home's".
- En dash in team sizes ("8–15 workers").
- Accent words wrapped in `<em>` and rendered in the serif italic.

### 5.2 Approved exceptions to 1:1 copy

1. **Testimonials section (new).** Eyebrow "What providers say". H2 "Trusted by the teams *behind the care.*" Quotes are mock data (§9).
2. **Enquiry dialog note and result state.** The reference copy says the brief is not sent ("Your information stays in this session…", "No enquiry has been sent."). That would be false once the form emails Garified, so these lines must change. Proposed wording, pending approval (see §15):
   - Note under the submit button: "We’ll only use these details to reply to your enquiry. Please leave out participant details."
   - Submit button: "Send my enquiry"
   - Success title: "Thanks. Your enquiry has been sent."
   - Success description: "We’ll reply to {email} soon. Here is a copy of your brief for your records."
   - Error message: "We couldn’t send your enquiry. Please check your connection and try again."
   - The form title, description, field labels, placeholders, options and the brief template stay 1:1.

## 6. Design system

### 6.1 Colour tokens

| Token | Hex | Use | Contrast |
| --- | --- | --- | --- |
| `navy` | #0B1F3A | Headings, body text, footer | 16.5:1 on white |
| `blue` | #1D4ED8 | Primary buttons, links, eyebrows, accent words | 6.7:1 on white |
| `blue-hover` | #1E40AF | Hover and pressed states | 8.7:1 on white |
| `deep` | #0F2A4F | Ribbon, Approach, Contact CTA | White on it 14.3:1 |
| `deep-2` | #16375F | Raised surfaces on deep | |
| `tint` | #EEF4FB | Alternating section ground | Navy on it 14.9:1 |
| `muted` | #4B5768 | Secondary text | 7.3:1 on white, 6.6:1 on tint |
| `on-deep` | #B9C7DB | Secondary text on deep | 8.4:1 on deep |
| `line` | #DCE3EC | Borders, dividers | Decorative only |
| `amber` | #F2A93B | Checkmarks, wordmark dot, highlights on deep, focus ring on deep | 7.2:1 on deep |

Rules:

- Amber is never used for text on white or tint.
- Blue is the only colour for interactive text on light grounds.
- Status colours (form errors) use `#B42318` (6.6:1 on white) and are never the only signal: errors also carry an icon and text.

### 6.2 Typography

| Role | Family | Weights |
| --- | --- | --- |
| Headings and body | Plus Jakarta Sans | 400, 500, 600, 700, 800 |
| Accent words, captions | Instrument Serif | 400 italic |

Fonts load through `next/font/google`. They are self-hosted at build time, so there are no runtime requests to Google.

| Step | Desktop | Phone | Line height | Use |
| --- | --- | --- | --- | --- |
| Display | 84px | 42px | 1.02 | Hero H1 |
| H2 | 52px | 34px | 1.08 | Section headings |
| H3 | 36px | 26px | 1.1 | Panel and card titles |
| Lead | 21px | 18px | 1.55 | Hero and section intros |
| Body | 18px | 18px | 1.6 | Paragraphs |
| Small | 15px | 15px | 1.5 | Captions, tags |
| Eyebrow | 13px caps, +12% tracking | same | 1.2 | Section labels |

Fluid sizes use `clamp()`. Headings use `text-wrap: balance`. Running text is capped near 65 characters.

### 6.3 Spacing, radius and elevation

- 4px base scale. Section padding is `clamp(56px, 7vw, 112px)` top and bottom.
- Container max width is 1200px. Side gutter is `clamp(16px, 4vw, 40px)`.
- Radius: 999px for buttons, tabs and tags; 14px for small cards; 20px for panels; 24px for the hero visual.
- One shadow token: `0 1px 2px rgb(11 31 58 / .06), 0 12px 32px -12px rgb(11 31 58 / .18)`. It is used only on raised elements (hero visual, active tab panel, card hover, dialog).

### 6.4 Breakpoints

Tailwind defaults: `sm` 640, `md` 768, `lg` 1024, `xl` 1280. The header switches to the desktop nav at `lg`. Multi-column grids start at `md` or `lg` depending on content.

### 6.5 Buttons and links

| Variant | Look | Use |
| --- | --- | --- |
| Primary | Blue fill, white text, blue glow shadow | Main action per section |
| Outline | White fill, navy text, line border | Secondary actions, non-featured packages |
| White | White fill, navy text | Primary action on deep grounds |
| Text link | Blue, bold, underline grows on hover | Explore links |

Height is 52px (44px for the small variant). Arrow icons nudge 3px on hover. Focus shows a 3px solid ring: blue on light grounds, amber on deep. Every button has a visible pressed state.

## 7. Components

| Component | Notes |
| --- | --- |
| `SiteHeader` | Sticky, white, gains a border and shadow after scrolling 8px. Desktop: wordmark, 3 anchor links, Let’s talk. Below `lg`: menu button that opens a full-width panel with 52px rows. Escape and link taps close it. `aria-expanded` and label toggle between "Open navigation" and "Close navigation". Includes the "Skip to content" link. |
| `Wordmark` | Lowercase "garified" plus an amber "." span. `aria-label="Garified home"`. Placeholder until the logo arrives. |
| `Hero` | Copy column, plus `HeroVisual` (blue panel with grid texture, "Rostering" checklist card and caption card). The panel is a placeholder for `/images/garified-hero.webp` and is swapped for `next/image` once the photo arrives, using the alt text from the copy. |
| `Ribbon` | Serif line on the left and three provider types with amber dots. |
| `ServiceList` | Four rows: number, title, serif tagline, description, tags, Explore service link. A hover underline draws left to right. Stacks to two columns on phones. |
| `Approach` | Deep section. Three steps joined by a track line (horizontal on desktop, vertical on phones). White "Discuss your workflow" button. |
| `Testimonials` | Three static cards. Placeholder cards show a "Sample" tag. The section does not render when it has no displayable quotes (§9). |
| `ProviderTabs` | Radix Tabs. Pills scroll horizontally on phones. Arrow-key navigation. Panel: accent label, H3, text, button, and a "Where we can help" checklist. The button opens the dialog with the tab's preselected services. |
| `Packages` | Three cards. Operations Desk is featured (deep ground, primary button). Each button opens the dialog with its preselected services. Footnote below. |
| `Faq` | Radix Accordion, single-open and collapsible. Plus icon rotates to a minus. 56px minimum row height. |
| `ContactCta` | Deep section with a large heading and a white "Start a conversation" button. |
| `SiteFooter` | Home and service variants per copy. Placeholder slots for ABN and contact details stay hidden until real data exists. |
| `EnquiryDialog` | Radix Dialog (§8). Opened through `EnquiryProvider` context: `openEnquiry(preselect?: ServiceId[])`. |
| `MobileCtaBar` | Below `md` only. Fixed bottom bar with "Let’s talk". It appears after the hero leaves view and hides when the contact section or the dialog is open. It respects the bottom safe-area inset. |
| `CheckIcon`, `ArrowIcon` | Shared SVGs. Check is navy on an amber disc. |

Icons come from `lucide-react`, plus the custom check.

## 8. Enquiry form and email

### 8.1 Fields (labels and options 1:1)

| Field | Name | Rules |
| --- | --- | --- |
| Business name | `business` | Required, 2–120 chars |
| Your name | `name` | Required, 2–120 chars |
| Business email | `email` | Required, valid email, max 254 chars |
| Your team size | `teamSize` | One of the 5 options, default "8–15 workers" |
| Where would you like support? | `services[]` | Zero or more of the 4 services |
| What is taking up your time? | `priorities` | Optional, max 2000 chars |
| (hidden honeypot) | `website` | Must be empty |
| (hidden timestamp) | `startedAt` | Submissions faster than 3 seconds are rejected |

### 8.2 Flow

1. The user opens the dialog from any CTA. Preselected services are ticked.
2. Client-side checks run first: native `required` and `type="email"`, with errors shown inline next to each field and announced via `aria-describedby` and `aria-live`.
3. The form posts to the `sendEnquiry` Server Action via `useActionState`. The submit button shows a pending state and is disabled while sending.
4. The server validates again with Zod. It trims all input and rejects honeypot or too-fast submissions with a generic success response, so bots learn nothing.
5. The server builds the brief from the 1:1 template and sends it through Google SMTP (`smtp.gmail.com:465`) with nodemailer:
   - `to`: `ENQUIRY_TO_EMAIL`, or `GMAIL_USER` when unset
   - `from`: `Garified Website <GMAIL_USER>` (Gmail always sends as the signed-in account)
   - `replyTo`: the user's email
   - `subject`: `Garified NDIS – New enquiry: {business}`
   - Body: an HTML intake sheet (`lib/enquiry-email.ts`: business, contact, team size, the four services as colour-coded tiles, their words, a Reply button) with every user value escaped, plus the plain-text brief as the text alternative. Preview in development at `/styleguide/email` (`?services=none&priorities=none` for the fallbacks).
6. Success: the dialog shows the success state and a copy of the brief, with a Copy brief button and an "Edit your enquiry" link.
7. Failure: the form keeps the user's input and shows the error message. Server errors are logged without personal details.

### 8.3 Environment variables

| Variable | Scope | Example |
| --- | --- | --- |
| `GMAIL_USER` | Server only | `enquiries@garified.com.au` (Gmail or Google Workspace) |
| `GMAIL_APP_PASSWORD` | Server only | 16-character app password |
| `ENQUIRY_TO_EMAIL` | Server only | TBD by the client. Optional, defaults to `GMAIL_USER` |

`.env.example` documents all three. None use the `NEXT_PUBLIC_` prefix. `GMAIL_APP_PASSWORD` is an app password, not the account password: the account needs 2-Step Verification, then one is created at https://myaccount.google.com/apppasswords. Gmail caps sending at about 500 emails a day (2,000 on Workspace), far above enquiry volume.

### 8.4 Privacy and security

- The dialog keeps the "Please leave out participant details." instruction.
- No enquiry data is stored by the site. It exists only in the sent email.
- The Server Action treats all input as untrusted: schema validation, length caps, honeypot and timing check.
- There is no rate limiting in this phase, because the site has no datastore. Revisit if spam appears (§15).

## 9. Testimonials (mock data)

- Content lives in `src/content/testimonials.ts`. Each entry has `quote`, `name`, `role`, `providerType`, `state` and `placeholder: boolean`.
- The three mock entries match the style tile. They use "Client name" instead of invented names and make no numeric claims.
- Placeholder cards always show a visible "Sample" tag.
- **Production guard:** placeholder entries render only when `NODE_ENV !== "production"` or `SHOW_SAMPLE_CONTENT === "true"`. In a production build without the flag they are filtered out, and the whole section disappears if nothing is left. Fake testimonials are misleading conduct under Australian Consumer Law, so this guard must not be removed.
- Replacing mock data with real quotes means editing the content file and setting `placeholder: false`, with written consent on file from each person quoted.

## 10. Motion (anime.js v4)

### 10.1 Principles

- Content is fully readable without JavaScript. Motion only enhances it.
- Animate `transform` and `opacity` only.
- Each animation finishes in under 1.2 seconds. Staggers are 60–140ms.
- Default easing is `outExpo`. `outBack` is used only for small pops (checks, dots).
- When `prefers-reduced-motion: reduce` is set, nothing moves and all content shows in its final state.
- Each animated component sets up anime.js inside `useEffect` with `createScope({ root })` and calls `scope.revert()` on unmount.

### 10.2 First-paint handling for the hero

To avoid a flash of content that then jumps to its start position:

1. An inline script in `<head>` adds `js` to `<html>` before first paint.
2. CSS hides only `[data-hero-anim]` elements when `.js` is present and reduced motion is off.
3. The hero timeline reveals them on mount.
4. A CSS fallback animation reveals them after 2.5 seconds anyway, in case scripts fail.

### 10.3 Animation catalogue

| Where | Trigger | Animation |
| --- | --- | --- |
| Hero | Page load | Eyebrow slides in, H1 words rise from a clipped line (stagger 70ms), lead, buttons and note fade up, visual scales from 0.96, checklist card rises and checks pop in, caption card rises |
| Service rows | Scrolled into view | Rows fade in from x −24 (stagger 90ms) |
| Service row hover | Hover or focus | Blue underline draws left to right (CSS transition) |
| Approach | Scrolled into view | Track fills left to right (top to bottom on phones), steps fade up and dots pop in sequence |
| Testimonials | Scrolled into view | Cards rise (stagger 120ms), quote marks pop |
| Provider tabs | Tab change | Panel content fades up (stagger 60ms), checklist items slide in, checks pop |
| Packages | Scrolled into view | Cards rise (stagger 100ms). Featured card rises last with a slight scale |
| FAQ | Open or close | Height animates via Radix CSS variables, icon rotates |
| Dialog | Open | Overlay fades, panel scales from 0.97 and rises 12px |
| Header | Scroll | Border and shadow fade in (CSS) |
| Buttons and cards | Hover | Lift 1–3px, arrow nudge (CSS) |

Scroll triggers use anime.js `onScroll` and play once.

## 11. Accessibility

- WCAG 2.2 AA throughout. Body text meets AAA contrast.
- Semantic landmarks: `header`, `nav` with labels, `main#main`, `footer`. One H1 per page with no skipped heading levels.
- A skip link is the first focusable element.
- Visible focus on every interactive element, never removed.
- Dialog: focus trapped, Escape closes, focus returns to the opener, labelled by its title.
- Tabs and accordion follow the WAI-ARIA patterns (provided by Radix).
- Form: every input has a visible label. Errors are linked with `aria-describedby` and announced politely.
- Tap targets are at least 44×44px.
- `lang="en-AU"`.
- The page works at 200% zoom and at 320px width without horizontal scrolling.

## 12. Responsive behaviour

- Designed mobile first and checked at 360, 390, 768, 1024, 1280 and 1440px.
- Hero: one column below `lg`, with the copy first and the visual below.
- Services: four-column rows from `lg`, two columns below.
- Approach steps: vertical track below `lg`.
- Tabs: horizontally scrollable pills on phones, with no scrollbar.
- Packages: one column below `lg`, featured card first on phones.
- The dialog becomes a full-height sheet below `sm`.

## 13. Performance and SEO

- Pages are statically prerendered. Cache Components and Partial Prefetching are already enabled in `next.config.ts`.
- Service pages are four static route folders sharing one template, so they need no dynamic params. `dynamicParams` is not available with Cache Components.
- Budget: under 120KB of compressed client JS on first load. anime.js modules are imported by name so unused parts are tree-shaken.
- Fonts are subset to Latin with `display: swap`.
- No layout shift from fonts, images or animation (CLS under 0.05).
- Metadata for every route per the copy. Add `sitemap.ts` and `robots.ts`, plus a generated Open Graph image in brand colours. `metadataBase` waits on the production domain.
- Replace the scaffold `favicon.ico` with an SVG favicon placeholder ("g." on navy).

## 14. Acceptance criteria

1. All five routes render with copy matching the source 1:1, except the approved exceptions in §5.2.
2. Every CTA that opened the dialog on the reference site opens it here, with the same preselected services.
3. A valid enquiry arrives at `ENQUIRY_TO_EMAIL` with the correct brief and a working reply-to. Invalid input shows inline errors and sends nothing.
4. In a production build without `SHOW_SAMPLE_CONTENT`, no placeholder testimonial appears in the HTML.
5. With reduced motion on, nothing animates and nothing is hidden.
6. With JavaScript off, all content is visible and anchor navigation works.
7. No horizontal scrolling at 320px. All tap targets are at least 44px.
8. Keyboard-only users can reach and operate every control, including the tabs, accordion, dialog and mobile menu.
9. Lighthouse mobile targets from §1 are met on the home page and one service page.
10. `npm run lint` and `npm run build` pass with no errors.

## 15. Open questions

1. **Dialog wording (§5.2.2).** Approve the proposed note, button, success and error lines, or supply alternatives.
2. **Recipient address.** Which inbox receives enquiries, and on which domain is the sender verified?
3. **Privacy policy.** The form collects names and emails. Australian Privacy Principles expect a privacy notice. We can link to an external policy or add a page later. Adding a page changes the locked page list.
4. **Spam.** Is honeypot plus timing enough for launch, or should we add Cloudflare Turnstile?
5. **Production domain**, for metadata, sitemap and the Open Graph image.
6. **Assets** (logo, hero photo, ABN, contact details). These are on hold and slot into placeholders when ready.
