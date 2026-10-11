# Garified — Design direction

Companion to [spec.md](./spec.md). Written 2026-10-08, before Phase 1.

The approved style tile fixed the palette, the typefaces and the 1:1 copy. This note
records how those locked choices are *used*, so the site reads as designed for
Garified rather than assembled from a template. Where it differs from the style tile,
the reason is given.

## The subject

Garified does the back office of an NDIS provider: rosters, intake packs, document
trackers, timesheets, invoices. The work is weekly, tabular and approval-driven. Its
vocabulary is "agreed", "approved", "confirmed", "exceptions", "your nominated contact".
The promise in the copy is structure, with the provider's team keeping every decision.

So the visual world is the working week: roster columns, rows that line up, items
that get ticked off, and a clear line between what Garified prepares and what the
provider approves. Not sunlit offices, gradient glows or floating dashboard cards.

## Tokens (locked, from the spec)

| Name | Hex | Role |
| --- | --- | --- |
| Navy | #0B1F3A | Ink |
| Blue | #1D4ED8 | Every action, accent words on light |
| Deep | #0F2A4F | Dark bands |
| Tint | #EEF4FB | Alternate ground, footer ground |
| Amber | #F2A93B | Ticks, wordmark dot, accents on deep only |
| Line | #DCE3EC | Rules and borders |

Type: Plus Jakarta Sans for everything, Instrument Serif Italic only for the accent
words the copy already marks.

## Where the boldness goes

One memorable element, everything else quiet.

**The hero is a week sheet (Phase 5).** The visual is a roster-style week grid,
Monday to Friday, drawn in line and tint. On load, the service tasks named in the copy
("Roster preparation", "Availability & leave", "Shift follow-up", "Participant intake",
"Invoice preparation" …) slot into their days, and a final column ticks them as
approved. It is the one orchestrated motion on the page, and it shows the product
promise ("A clearer week") instead of decorating around it. It replaces the style
tile's gradient panel with grid texture and floating cards, which is the generic
"SaaS hero" pattern. The photo, once it arrives, belongs in a calmer spot lower on the
page or as a framed inset inside the sheet, not as the whole hero.

Everything else follows from that grid: ruled rows, aligned columns, hairline
dividers that separate real list items, generous white space.

## Changes from the style tile, and why

| Style tile | Now | Why |
| --- | --- | --- |
| Eyebrows in tracked capitals with a leading dash | Sentence case, 15px semibold. The section number sits in muted tabular figures before the label | Tracked capital eyebrows on every heading are the most common template tell. The numbers stay because the copy numbers the sections in order |
| Blue glow shadow under primary buttons | Flat fill with a slightly darker bottom edge; pressing moves the button down 1px | Coloured glows read as decoration. A pressed edge reads as a control |
| Arrow icon on every button | Arrows only on links that go somewhere (Explore service, All services). Buttons that open the enquiry dialog have no arrow | The arrow then means "this navigates", which is information |
| Radial tint glow behind the hero | Plain white ground | Gradient washes are decoration with no meaning |
| Hover lift on every card | Hover feedback only on things you can click | Motion should answer an action |
| Scroll reveals on every section | Kept minimal and short in Phase 7; the hero is the one set piece | One orchestrated moment lands better than many |

Unchanged from the tile: palette, typefaces, type scale, pill buttons, radius ladder
(999 / 14 / 20 / 24), amber ticks, the italic serif accent words from the copy.

## Layout rules

- Left aligned throughout. Centred text only for the short contact call to action.
- Container 1200px, gutter `clamp(16px, 4vw, 40px)`.
- Running text capped at 54ch (Jakarta sets about 66 characters per line at that width).
- One shadow token, only on raised things (dialog, active tab panel, hero sheet).
- Borders mark real boundaries: a list row, a form field, a panel. Never a card
  for the sake of a card.

## Notes for later phases

- Phase 5 hero: build the week sheet as semantic HTML (a list per day), so it reads
  correctly without CSS or JS. Task labels come from the service tags in
  `src/content/services.ts`; do not invent new task names or numbers.
- Phase 7: the hero timeline is the only page-load motion. Section reveals, if any,
  stay under 600ms and never hide content without JS.

## As built (Phases 4 to 7)

Deliberate departures from the spec, and why:

| Spec | Built | Why |
| --- | --- | --- |
| Hero visual: blue panel with grid texture and floating cards | Week sheet: the service tags as colour-coded tasks in a Mon–Fri grid, ticked as approved, with a legend | Shows the product promise instead of decorating. The weekday labels are the only new words |
| Hero H1 words rise on load | H1 and copy are static; only the sheet animates | Keeps the largest text visible at first paint (LCP) and leaves one set piece |
| Motion on service rows, testimonials, packages | None | One orchestrated moment lands better than many. Motion stays on the hero sheet, the approach track and tab changes (which answer a click) |
| FAQ uses Radix Accordion | Native `<details name="faq">` | Radix hides closed answers in the HTML, which fails the JS-off criterion. `name` gives single-open; height animates where `interpolate-size` is supported |
| Dialog panel animates on close | Opens only | Exit animations make Radix wait for `animationend`; a missed event leaves an invisible panel over the page |
| Featured package: primary button | White button | The button table puts white on deep grounds; blue on deep is low contrast |
| Accent serif on service taglines | Sans | Serif is kept for the accent words the copy marks, plus captions |
| Who we help: Radix Tabs, one panel at a time | Three open columns, each a photo with the provider's name tagged on its corner (deep tag, amber top edge, like the ribbon), then scope as a serif caption, promise, ruled checklist and an outline button. Columns share a subgrid from `lg` so the rows line up | Every visitor finds their kind of business without a click, and all copy shows with JS off. No box around the columns, so it does not echo the bordered package cards that follow. "Where we can help" stays as a screen-reader label for each list |
| Footer: navy, wordmark, tagline and three links, copy 1:1 | Large-type footer on tint, the same on every page: the closing statement ("Your care team leads. We support the *business behind it.*") beside a Let’s talk button, a blurb with Services (the four service pages) and Explore (home sections) links, a bottom bar, then the full logo spanning the container. The logo is a vector trace of the PNG (`LogoSvg`) and rises out of a clip line as the page ends, via a CSS scroll timeline | The owner asked for a large-type footer with the logo scaled up, and for the footer copy to be rewritten (the one exception to the 1:1 rule). Tint, not navy, because the logo's blue is about 2:1 on navy and the logo keeps its own colours. The rise is scroll-linked, needs no JS and sits still where unsupported or under reduced motion |

Motion triggers use an IntersectionObserver (`components/motion/play-in-view.ts`) and
play once. Testing note: headless Edge sometimes stops producing frames on idle pages,
which looks like a stalled animation. Check motion in a real browser.

## Service pages: the stage (2026-10-10)

The four `/services/*` pages share one template (`components/service/ServicePage.tsx`).
An earlier pass the same day set them as a scope document (margin column, numbered
clauses 1.1–1.6, a 2px rule on every section). The owner asked for a cleaner page that
catches the eye, with the information unchanged, so it was rebuilt as below. Header,
footer and all copy are unchanged.

| Scope document | Now | Why |
| --- | --- | --- |
| Ruled title block, H1 across the column, sheet beside the intro | Copy on the left. On the right a tint **stage** runs from the top of the window (under the frosted header) to the hero's foot and out to the screen edge. The example sheet sits on it, and the service's clay icon (the same four as the home hero) lands on the sheet's corner | One bold, specific moment per page. The icon ties each page to the home hero; the sheet still shows the work |
| H1 at display (84) | H1 at a new `title` step (64, `--text-title`) | Beside the stage, 84 broke "A better business view." onto four lines. 64 keeps every title on its two copy lines |
| Margin column with sticky section numbers, 2px navy rule per section | The home page's own `SectionHead` (sentence-case eyebrow with its number, heading, intro) | Less chrome, and the service pages now read as the same site as home |
| Included items as numbered clauses, linked from the sheet | A 3-column ruled grid, no numbers, no links | They are options, not a sequence, so numbers carried nothing once the cross-links went |
| Sign-off close | The home `ContactCta` deep band | Same close as home, with the service ticked in the dialog |
| Service number (01–04) before the hero eyebrow | Dropped | It clashed with the page's own section 01 directly below |

Kept: the handover as one joined panel (Garified prepares on tint with amber ticks, your
team decides on deep), the process step track (on a tint band) and the home FAQ layout.

Motion: `SheetMotion` lands the icon (scale, drop and a small counter-turn), then the
rows rise and the statuses stamp on, then the icon keeps a slow drift. It plays when the
sheet is in view: at load on desktop, after the copy on phones. Reduced motion and JS-off
show everything at rest.

Example data lives in `src/content/examples.ts`. It is authored demo material, always shown
under the "Example" label, with placeholder names and no prices, clients or statistics.
Sheet names and footers reference the handover outputs by index, so they stay 1:1 with the
copy.
