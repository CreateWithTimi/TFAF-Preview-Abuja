# tfaf-abuja-preview

## Project Overview

Things Fall Apart Festival 2026 — Abuja Preview Experience is a framework-free, static, multi-page frontend project for the approved festival preview website.

All four public pages are assembled with approved structure and placeholder-governed copy. The current pages still contain organizer-review placeholders and must not be treated as final public content.

## Current Engineering Phase

009.10 — Responsive and Interaction Hardening

## Technology Stack

- Vite
- Semantic HTML
- Modular CSS with cascade layers
- Vanilla JavaScript ES modules
- npm
- ESLint
- Prettier
- EditorConfig

No React, TypeScript, Tailwind CSS, Sass, CMS, backend, analytics, registration service, launch-readiness work, or accessibility/browser QA completion is included in this phase.

## Local Installation

```sh
npm install
```

No environment variables are required for 009.10.

## Development Commands

```sh
npm run dev
npm run build
npm run preview
npm run lint
npm run format
npm run format:check
npm run tokens:check
npm run components:check
npm run content:check
npm run compositions:check
npm run home:check
npm run festival:check
npm run experience:check
npm run visit:check
npm run hardening:check
npm run check
```

`npm run check` runs linting, formatting verification, token validation, shared-component validation, content-component validation, section-composition validation, Home page validation, Festival page validation, Experience page validation, Visit page validation, responsive/interaction hardening validation, and the production build.

## Route Inventory

Public routes:

- `/` — Assembled Home page for Things Fall Apart Festival — Abuja Preview Experience
- `/festival/` — Assembled Festival page
- `/experience/` — Assembled Experience page
- `/visit/` — Assembled Visit page

Development-only route:

- `/dev/foundations/` — Development foundations reference
- `/dev/components/` — Development shared-components reference
- `/dev/content-components/` — Development content-components reference
- `/dev/compositions/` — Development section-compositions reference

All four public routes are assembled. 009.10 adds deterministic static hardening checks and a manual QA protocol. Full browser matrix, assistive-technology validation, 200% zoom, high-contrast review, and real-device QA remain for 009.11.

Development routes are not public festival routes and must not be added to public navigation, footer navigation, sitemap, or public page architecture.

## Figma Foundations Source

Approved source:

- File: `TFAF`
- File key: `0z2Eoo0SEXchc3yMRgEWS0`
- Page: `04 Design System`
- Node: `22:184`
- Node name: `01 Foundations`

Read-only inspection confirmed 7 variable collections, 143 variables, 25 text styles, 4 effect styles, and 4 grid styles.

## Figma Core Components Source

Approved source:

- File: `TFAF`
- File key: `0z2Eoo0SEXchc3yMRgEWS0`
- Page: `04 Design System`
- Node: `28:2`
- Node name: `02 Core Components`

Read-only inspection confirmed the 009.3 component scope: buttons, text links, icon buttons, tags/badges, dividers, navigation, accordion, status/feedback labels, and documented component principles. Metadata, event-detail, media, partner-mark, header, and footer code foundations are implemented as reusable website primitives without starting section composition.

## Figma Content Components Source

Approved source:

- File: `TFAF`
- File key: `0z2Eoo0SEXchc3yMRgEWS0`
- Page: `04 Design System`
- Node: `47:264`
- Node name: `03 Content Components`

Verified content families:

- `content/section-header`
- `content/editorial-intro`
- `content/eyebrow`
- `content/theme-statement`
- `content/quote`
- `content/experience-item`
- `content/experience-sequence`
- `content/event-detail`
- `content/event-detail-group`
- `content/metadata-item`
- `content/metadata-group`
- `content/context-note`
- `content/highlight`
- `content/partner-mark`
- `content/partner-group`
- `content/media-placeholder`
- `content/cta`

The expected FAQ group is absent from node `47:264`; no `content/faq-group` implementation exists. The 009.5 FAQ & Visitor Guidance composition directly assembles the 009.3 native accordion with existing editorial/context components.

## Figma Page Section Composition Source

Approved source:

- File: `TFAF`
- File key: `0z2Eoo0SEXchc3yMRgEWS0`
- Page: `04 Design System`
- Node: `73:760`
- Node name: `04 Page Section Composition`

Read-only inspection confirmed these composition families:

- Hero Compositions
- Festival Introduction
- Theme Exploration
- Experience Overview
- Full Experience Journey
- Featured Chapter
- Event Information
- Editorial Media
- Cultural Context
- Highlight Composition
- Quotation & Reflection
- Partners
- Registration CTA
- FAQ & Visitor Guidance
- Closing Composition

The Figma board is marked `Ready for Human Review`. DOM-order confirmation, spacing-token documentation, breakpoint documentation, property-behaviour mapping, boolean-property naming, responsive specimen validation, and final browser/assistive-technology validation remain review items.

## CSS Architecture

Cascade order:

```css
@layer reset, tokens, base, layout, components, content, compositions, pages,
  utilities;
```

Primary foundation files:

- `src/styles/foundations/reset.css`
- `src/styles/foundations/tokens.css`
- `src/styles/foundations/typography.css`
- `src/styles/foundations/layout.css`
- `src/styles/foundations/utilities.css`

The page-specific reference stylesheet is `src/styles/pages/foundations-reference.css` and is kept in the `pages` layer.

Shared component files live in `src/styles/components/` and are imported in the `components` layer:

- buttons
- links
- navigation
- menu toggle
- header
- footer
- metadata
- event details
- media
- partner marks
- accordion
- icon controls
- status labels

Content component files live in `src/styles/content/` and are imported in the `content` layer. Content styles consume foundation tokens and reuse shared components rather than redefining controls.

Section composition files live in `src/styles/compositions/` and are imported in the `compositions` layer. This layer owns only outer section structure, container relationship, surface context, responsive grids, region placement, and optional-region collapse. It must not recreate shared controls or duplicate content-component anatomy.

Implemented composition files:

- `base.css`
- `hero.css`
- `festival-introduction.css`
- `theme-exploration.css`
- `experience-overview.css`
- `experience-journey.css`
- `featured-chapter.css`
- `event-information.css`
- `editorial-media.css`
- `cultural-context.css`
- `highlight.css`
- `quotation-reflection.css`
- `partners.css`
- `registration-cta.css`
- `faq-visitor-guidance.css`
- `closing.css`

## Token Guidance

009.2 implemented primitive and semantic tokens. 009.3 consumes those existing tokens for shared components and does not introduce final page-composition tokens.

CSS custom properties use lowercase kebab-case and do not use slash characters. Figma fractional spacing names map as:

- `space/0_5` → `--space-0-5`
- `space/1_5` → `--space-1-5`
- `space/2_5` → `--space-2-5`

Run token validation with:

```sh
npm run tokens:check
```

Run component validation with:

```sh
npm run components:check
```

Run content-component validation with:

```sh
npm run content:check
```

Run section-composition validation with:

```sh
npm run compositions:check
```

Run Home page validation with:

```sh
npm run home:check
```

Run Festival page validation with:

```sh
npm run festival:check
```

Run Experience page validation with:

```sh
npm run experience:check
```

Run Visit page validation with:

```sh
npm run visit:check
```

## Dark-Mode Policy

Light mode is the default `:root` semantic mapping. Dark mode is available only through explicit scoping with:

```html
<div data-theme="dark"></div>
```

Do not activate Dark mode automatically, do not add a theme switcher, and do not use `prefers-color-scheme` to change the production theme without organizer approval.

## Font Asset Status

Figma specifies:

- Editorial: `DM Serif Display`
- Functional: `DM Sans`

No approved local WOFF2 font files are currently present in `src/assets/fonts/`. The code uses approved fallback stacks and does not load remote font services. Production font files remain an open dependency for a later approved building block.

## Typography Usage

Use foundation classes such as:

- `.type-display-xl`
- `.type-heading-1`
- `.type-body-default`
- `.type-label-default`
- `.type-caption`
- `.type-eyebrow`
- `.type-quote`

Display and editorial styles use the editorial stack. Body, labels, captions, navigation, controls, metadata, and functional interface text use the functional stack.

## Containers And Breakpoints

Engineering ranges:

- Mobile: `0–767px`
- Tablet: `768–1023px`
- Desktop: `1024px and above`
- Wide desktop: `1440px and above`

Reference widths:

- Mobile: `375px`
- Tablet: `768px`
- Desktop: `1440px`

Container primitives:

- `.container`
- `.container-content`
- `.container-narrow`
- `.container-form`
- `.full-bleed`

Grid reference tokens document approved columns, gutters, margins, and content widths; they are not a complete grid utility framework.

## Surface Usage

Semantic surface classes control colour context only:

- `.surface-default`
- `.surface-subtle`
- `.surface-elevated`
- `.surface-inverse`
- `.surface-accent`

They do not add section spacing, component layout, or automatic alternation.

## Accessibility Intent

WCAG 2.2 AA is the target, not a conformance claim. Foundations include:

- Visible `:focus-visible` styles
- Functional body text minimums
- Reduced-motion baseline
- Colour-independent communication guidance
- Semantic heading guidance
- Image-alt role guidance
- No placeholder-only form-label policy for future forms
- Approximately 44×44px target guidance for later interactive components

Accessibility validation continues during later engineering and QA building blocks.

## Content Component Strategy

Content components are reusable editorial and informational patterns only. They must not hardcode page-level heading levels; heading level is chosen by page context. Reference specimens may use `h2` or `h3` solely to demonstrate structure.

Optional regions are removed from markup when absent. Do not render empty action, media, metadata, attribution, caption, heading, or secondary-action containers.

Content resilience requirements:

- no fixed-height text clipping
- long headings and descriptions wrap
- missing optional regions collapse cleanly
- metadata and partner marks wrap
- media placeholders preserve approved aspect ratios
- event details use definition-list semantics
- inverse surfaces remain readable
- components remain usable at narrow widths

`content/experience-item` and `content/event-detail` are marked: Structure Implemented, Property Mapping Under Review. Figma notes say boolean/text properties require restoration before final lock.

Registration CTA constraints:

- approved label: `Register Interest`
- approved note: `Registration details will be confirmed by the organizers.`
- no `/register/` route
- no dead `href="#"`
- no form, countdown, urgency, ticket price, or fake success state

Approved event placeholders for specimens:

- `Date: To be confirmed`
- `Time: To be confirmed`
- `Venue: To be confirmed`
- `Location: Abuja`

## Section Composition Strategy

Compositions assemble existing shared and content components into reusable page sections. The current composition layer includes hero variants, editorial introductions, theme exploration, experience overview, full journey, featured chapter, event information, editorial media, cultural context, highlights, quotation/reflection, partners, registration CTA, FAQ/visitor guidance, and closing patterns.

The composition reference page is development-only and is not part of the public festival route architecture.

DOM order strategy:

- Preserve semantic reading order even when desktop visual media placement changes.
- Keep text before media when media is semantically secondary.
- Use CSS Grid placement for media-left/media-right variants.
- Do not duplicate content for separate breakpoints.

Optional-region strategy:

- Omit missing regions from HTML instead of rendering empty wrappers.
- Supported optional regions include eyebrow, description, media, metadata, context note, primary/secondary actions, partner groups, quote attribution, visitor guidance, highlights, and status notes.
- Figma boolean-property names remain under review; current implementation uses semantic HTML absence and documented modifier classes.

Surface strategy:

- Use existing semantic surfaces: default, subtle, inverse, accent, and elevated only where appropriate.
- Do not alternate surfaces mechanically.
- Surface choices are section-level context, not page rhythm.

Responsive composition strategy:

- Reference widths are 1280px/1440px desktop, 768px tablet, 375px mobile, and 320px reflow stress.
- Split layouts stack, grids wrap, event details reduce columns, CTA actions stack, and journey content remains sequential.
- Browser validation is still required before claiming final responsive approval.

Page-assembly boundary:

- Home, Festival, Experience, and Visit have been assembled in their approved building blocks.
- Do not begin responsive-hardening or interaction-hardening changes before 009.10.
- `/dev/compositions/` is a static specimen route only.

FAQ composition strategy:

- No `content/faq-group` component exists.
- The FAQ & Visitor Guidance composition reuses the 009.3 native `details`/`summary` accordion and existing context/editorial components.
- FAQ copy remains placeholder-only until approved.

Review-status notes:

- `content/experience-item` property mapping remains under review.
- `content/event-detail` property mapping remains under review.
- Composition boolean property names remain under review.

## Home Page Implementation

Building Block 009.6 assembles only the public Home route (`/`). It introduces and orients visitors, establishes the Abuja Preview Experience, previews the theme and Experience, surfaces one featured-chapter placeholder, summarizes event information, and keeps registration as an unresolved placeholder action.

Figma sources:

- `102:3490` — Desktop Page Assembly
- `112:4378` — Tablet and Mobile Page Assembly plus 320px validation evidence
- `117:7001` — Page-Level Validation and Engineering Handoff

Approved Home H1:

```text
The First Chapter Begins in Abuja
```

Approved Home sequence:

1. Global Header
2. Editorial Split Hero
3. Festival Introduction
4. Theme Preview
5. Experience Overview
6. Featured Chapter
7. Event Information Summary
8. Registration Interest
9. Closing Composition
10. Global Footer

Conditional sections omitted for 009.6:

- Cultural Context
- Partners

Absent from the approved Home assembly:

- Highlights
- Quotation

Home CTA destinations:

- `Explore the Experience` → `/experience/`
- `Plan Your Visit` → `/visit/`
- `Discover the Festival` → `/festival/`
- `Explore the Festival Theme` → `/festival/`
- `Register Interest` → no live destination until organizer approval

Registration placeholder strategy:

- The Home registration CTA uses a disabled native button with explanatory status text.
- No `/register/`, `href="#"`, fake success state, countdown, ticket price, scarcity, or urgency language is allowed.
- Production must not ship a misleading registration action.

Featured-chapter placeholder strategy:

- The official featured chapter is not approved.
- The Home page uses an approved chapter title with a visible pending-approval status note.
- The temporary action links to `/experience/`, not an unconfirmed chapter anchor.

Home surface rhythm:

- Default: Header, Hero, Theme Preview, Featured Chapter, Event Information, Closing
- Subtle: Festival Introduction, Experience Overview, Footer
- Inverse: Registration CTA

Responsive behaviour:

- Desktop follows the 1280px Home assembly.
- Tablet uses reduced spacing and keeps inline navigation while it fits.
- Mobile uses the compact disclosure navigation and stacked section layouts.
- 320px remains the narrow reflow validation target.

Home page CSS boundary:

- `src/styles/pages/home.css` may only control Home section relationships and page-level adjustments around existing components/compositions.
- It must not duplicate shared, content, or composition styling.

Public placeholder-content policy:

- Use approved text where available.
- Unapproved content remains neutral and marked with source comments or restrained visitor-facing status where necessary.
- Do not invent final organizer copy, event facts, venue details, partner content, photography, or registration behaviour.

## Festival Page Implementation

Building Block 009.7 assembles only the public Festival route (`/festival/`). It explains the festival’s meaning, owns the full theme treatment, introduces the cultural proposition, includes conditionally retained editorial media, summarizes the Experience without rendering the complete journey, and keeps registration unresolved.

Figma sources:

- `102:3490` — Desktop Page Assembly
- `112:4378` — Tablet and Mobile Page Assembly plus 320px validation evidence
- `117:7001` — Page-Level Validation and Engineering Handoff

Temporary Festival H1:

```text
Festival
```

The final Festival H1 remains unresolved and requires organizer approval. The HTML keeps a source comment beside the H1: `PLACEHOLDER — FINAL FESTIVAL H1 REQUIRES ORGANIZER APPROVAL`.

Approved Festival sequence:

1. Global Header
2. Festival Hero
3. Editorial Introduction
4. Full Theme Exploration
5. Cultural Context
6. Editorial Media
7. Experience Summary
8. Registration CTA
9. Closing Composition
10. Global Footer

Editorial Media decision:

- Editorial Media is conditionally included because it appears in the desktop, tablet, and mobile Festival specimens.
- It uses approved placeholder media, caption, and credit treatment.
- The section is marked in source with `CONDITIONAL SECTION — REMOVE IF FINAL MEDIA IS NOT APPROVED`.

Omitted sections:

- Highlights
- Quotation and Reflection
- Partners
- Additional media sections beyond the approved Editorial Media region

Theme ownership:

- Festival owns the full `NAMED. UNNAMED. RENAMED.` treatment.
- The supporting statement is `Power, Identity and the Right to Self-Definition`.
- The theme statement remains real HTML text and is not treated as another H1.

Cultural Context ownership:

- Festival owns the complete Cultural Context treatment.
- All cultural and historical claims remain organizer-review dependencies.
- No factual cultural claims, literary interpretation, quotations, or final media have been invented.

Experience Summary order:

- The Festival summary uses one stable source order across all widths: `Arrival & Cultural Immersion`, `Memory Wall`, `Centre for Memories`.
- This follows the canonical approved chapter numbering while documenting that desktop and responsive Figma specimens showed inconsistent summary ordering.
- The full seven-chapter journey remains reserved for the Experience page.

Festival CTA destinations:

- `Explore the Seven Chapters` → `/experience/`
- `Explore the Experience` → `/experience/`
- `Plan Your Visit` → `/visit/`
- `Register Interest` → no live destination until organizer approval

Registration constraints:

- No `/register/`, `href="#"`, form, fake submit action, countdown, ticket price, scarcity, urgency language, or fake success state.
- The CTA uses a disabled native button with explanatory status text.

Festival surface rhythm:

- Default: Header, Festival Hero, Editorial Introduction, Cultural Context, Experience Summary, Closing
- Subtle: Full Theme Exploration, Editorial Media, Footer
- Inverse: Registration CTA

Festival responsive behaviour:

- Desktop follows the 1280px Festival assembly.
- Tablet uses reduced spacing, compact sequences, and keeps inline navigation only while it fits.
- Mobile uses the compact disclosure navigation and stacked section layouts.
- 320px remains the narrow reflow validation target.
- No required content is removed at narrower widths.

Festival page CSS boundary:

- `src/styles/pages/festival.css` controls only Festival page-level section relationships and verified page-specific adjustments.
- It must not duplicate shared, content, or composition styling and must not introduce raw colour literals.

Outstanding organizer dependencies:

- Final Festival H1
- Festival editorial copy
- Cultural-context copy and factual review
- Final media, captions, credits, and alt decisions
- Registration destination
- Production SEO metadata

Browser-validation limitation:

- Static audits do not replace browser, responsive, keyboard, screen-reader, or assistive-technology validation.

## Experience Page Implementation

Building Block 009.8 assembles only the public Experience route (`/experience/`). It introduces the visitor experience, provides native chapter navigation, presents the complete seven-chapter journey in approved order, and guides visitors toward practical Visit information while keeping registration secondary and unresolved.

Figma sources:

- `102:3490` — Desktop Page Assembly
- `112:4378` — Tablet and Mobile Page Assembly plus 320px validation evidence
- `117:7001` — Page-Level Validation and Engineering Handoff

Temporary Experience H1:

```text
The Experience
```

The final Experience H1 remains unresolved and requires organizer approval. The HTML keeps a source comment beside the H1: `PLACEHOLDER — FINAL EXPERIENCE H1 REQUIRES ORGANIZER APPROVAL`.

Approved Experience sequence:

1. Global Header
2. Experience Hero
3. Experience Overview
4. Chapter Navigation
5. Full Seven-Chapter Journey
6. Plan Your Visit CTA
7. Closing Composition
8. Global Footer

Hero CTA reconciliation:

- `Begin the Journey` → `#chapter-01`
- `Plan Your Visit` → `/visit/`

The handoff page inventory lists Visit and registration actions for Experience, while the page specimens show the hero journey-start action. The implemented reconciliation preserves the visitor flow: enter journey, explore chapters, then plan attendance.

Chapter navigation strategy:

- A labelled secondary navigation landmark uses `aria-label="Experience chapters"`.
- All chapter links are native fragment links.
- No JavaScript, scroll-spy, active tracking, fake buttons, or horizontal-scroll-only navigation is used.
- Labels remain readable and wrap at narrow widths.

Exact chapter inventory and IDs:

- `chapter-01` — 01 — Arrival & Cultural Immersion
- `chapter-02` — 02 — Memory Wall
- `chapter-03` — 03 — Centre for Memories
- `chapter-04` — 04 — Theme Conversation
- `chapter-05` — 05 — Clan Wars
- `chapter-06` — 06 — Learn the Dance
- `chapter-07` — 07 — Books & Merchandise

Native-anchor behaviour:

- `#chapter-01` through `#chapter-07` are stable fragment targets in normal document flow.
- Direct URL loading, browser Back/Forward fragment history, and no-JavaScript navigation are implementation requirements.
- No forced focus movement or smooth-scrolling script is added.

Journey semantic decision:

- The full journey uses an ordered list.
- Each chapter is one list item with its approved ID, visible number, and visible title.
- Decorative connectors are hidden from assistive technology.
- Chapter descriptions, metadata, media, context notes, and actions are omitted until approved.

Compact step-format decision:

- The journey uses the verified compact `content/experience-item` structure.
- Because `content/experience-item` property mapping remains under review, the page uses only existing verified classes and semantic markup rather than inventing new boolean APIs.

Omitted Experience sections:

- Quotation and Reflection
- Highlight Composition
- Extra Editorial Media
- Dedicated Registration CTA section

Post-journey CTA strategy:

- Primary action: `Plan Your Visit` → `/visit/`
- Secondary registration treatment: disabled `Register Interest` placeholder with `Registration details will be confirmed by the organizers.`
- No `/register/`, `href="#"`, fake form, fake success state, countdown, urgency, or ticket pricing is allowed.

Experience surface rhythm:

- Orientation zone: Hero, Overview, Chapter Navigation
- Journey zone: continuous seven-chapter sequence without mechanical chapter striping
- Post-journey action: inverse CTA treatment
- Closing and footer preserve established global rhythm

Experience responsive behaviour:

- Desktop follows the 1280px Experience assembly.
- Tablet uses reduced spacing and wrapped chapter navigation.
- Mobile stacks the hero, overview, navigation, journey, CTA, and closing.
- 320px remains the narrow reflow validation target.
- No chapter is removed at any width.

Experience page CSS boundary:

- `src/styles/pages/experience.css` controls only Experience page-level section relationships, chapter-navigation integration, journey list relationships, and verified page-specific adjustments.
- It must not duplicate shared buttons, content experience-item styling, or composition styling and must not introduce raw colour literals.

Experience organizer dependencies:

- Final Experience H1
- Overview copy
- Chapter descriptions
- Chapter metadata
- Chapter media and alt decisions
- Context notes
- Chapter actions
- Registration destination
- Production SEO metadata

Browser-validation limitation:

- Static audits do not replace browser, responsive, keyboard, screen-reader, browser-history, or assistive-technology validation.

## Visit Page Implementation

Building Block 009.9 assembles only the public Visit route (`/visit/`). It owns the practical attendance experience, presents approved event placeholders, provides visitor-focused guidance and venue-media placeholders, includes native FAQ disclosure, exposes registration interest honestly, and routes visitors back into the Experience.

Figma sources:

- `102:3490` — Desktop Page Assembly
- `112:4378` — Tablet and Mobile Page Assembly plus 320px validation evidence
- `117:7001` — Page-Level Validation and Engineering Handoff

Approved Visit H1:

```text
Plan Your Visit
```

Approved Visit sequence:

1. Global Header
2. Visit Hero
3. Event Information
4. Visitor Guidance
5. Venue Media
6. FAQ
7. Registration CTA
8. Closing Composition
9. Global Footer

Approved event-value inventory:

- Date: `To be confirmed`
- Time: `To be confirmed`
- Venue: `To be confirmed`
- Location: `Abuja`

Visitor Guidance semantic decision:

- The section is named and marked up as practical `visitor-guidance`.
- It does not use cultural-context, festival-context, or heritage-context naming.
- Guidance copy remains placeholder-only and is marked in source with `PLACEHOLDER — VISITOR GUIDANCE REQUIRES ORGANIZER APPROVAL`.
- No transport, parking, access-facility, arrival-time, security, venue-address, or policy details have been invented.

Venue Media conditional status:

- Venue Media is included because it appears in the approved Visit structure.
- It uses neutral placeholder media, caption, credit, and venue copy.
- The section is marked in source with `CONDITIONAL CONTENT — FINAL VENUE MEDIA REQUIRES ORGANIZER APPROVAL`.
- Final venue media, caption, credit, and alt treatment remain organizer dependencies.

FAQ semantic decision:

- FAQ uses the existing native `details`/`summary` accordion structure from 009.3.
- No new FAQ component family or custom Visit JavaScript is introduced.
- Multiple FAQ items may remain open.
- Structure: Implemented.
- Content: Organizer Review.
- Browser interaction validation: Required.

Registration treatment:

- Label: `Register Interest`
- Note: `Registration details will be confirmed by the organizers.`
- Destination: unconfirmed.
- The CTA uses a disabled native button plus placeholder status text.
- No `/register/`, `href="#"`, form, fake success state, ticket pricing, countdown, scarcity, urgency language, or registration logic is allowed.

CTA reconciliation:

- Hero: `Explore the Experience` → `/experience/`
- Registration section: `Register Interest` → unresolved, non-interactive placeholder
- Closing: `Explore the Experience` → `/experience/`
- No fourth CTA or second post-registration CTA section is included.

Omitted Visit sections:

- Partners
- Separate Cultural Context
- Additional Editorial Media
- Highlight Composition
- Quotation and Reflection
- Experience Summary
- Secondary CTA section after registration

Visit surface rhythm:

- Default: Header, Visit Hero, Event Information, Visitor Guidance, Venue Media, Closing
- Subtle: FAQ, Footer
- Primary or inverse action treatment: Registration CTA

Visit responsive behaviour:

- Desktop follows the 1280px Visit assembly.
- Tablet reduces event columns and stacks split relationships as needed.
- Mobile uses stacked practical sections, one-column event details, native FAQ disclosures, and contained registration treatment.
- 320px remains the narrow reflow validation target.
- No required content is removed at narrow widths.

Visit page CSS boundary:

- `src/styles/pages/visit.css` controls only Visit page-level composition relationships, FAQ placement, and verified Visit-only responsive adjustments.
- It must not duplicate accordion, event-detail, button, or composition styling and must not introduce raw colour literals.

Visit organizer dependencies:

- Visitor guidance content
- FAQ questions and answers
- Venue details
- Venue media, caption, credit, and alt decisions
- Registration destination
- Production SEO metadata

Browser-validation limitation:

- Static audits do not replace browser, responsive, keyboard, screen-reader, FAQ interaction, or assistive-technology validation.

## Progressive Enhancement

HTML provides the primary experience. CSS provides approved global foundations. Public header, footer, navigation links, page content, and Experience chapter anchors are present in the document before JavaScript runs.

The mobile navigation uses an inline-disclosure enhancement: it is visible by default without JavaScript, and `src/scripts/navigation.js` collapses it only after enhancement is initialized. Accordions use native `details` and `summary` so content remains readable without JavaScript.

Content components introduce no new JavaScript. All content-component text, sequencing, media placeholders, event details, partner marks, and CTA placeholders are present in semantic HTML.

Section compositions introduce no new JavaScript. `/dev/compositions/` is fully static HTML, and its layout is controlled by CSS only. Accordions retain the native 009.3 fallback behaviour.

The Home page introduces no Home-specific JavaScript. Home content, links, event details, registration placeholder, header, and footer are present in HTML and remain readable without JavaScript.

The Festival page introduces no Festival-specific JavaScript. Festival content, links, theme treatment, media placeholders, registration placeholder, header, and footer are present in HTML and remain readable without JavaScript.

The Experience page introduces no Experience-specific JavaScript. Chapter navigation, journey anchors, Visit links, registration placeholder, header, and footer are present in HTML and remain usable without JavaScript.

The Visit page introduces no Visit-specific JavaScript. Event details, visitor guidance, venue media placeholders, native FAQ disclosure, registration placeholder, Experience links, header, and footer are present in HTML and remain usable without JavaScript.

## Shared Header And Footer

This is still a vanilla multi-page site. Header and footer markup is repeated in the four public HTML route files, with shared-region comments retained. Keep those shells synchronized manually until an approved future building block introduces a templating strategy.

The public shell includes:

- identity link to `/`
- Festival, Experience, and Visit links
- non-interactive `Register Interest` placeholder text
- responsive mobile navigation disclosure
- utility footer navigation for approved public routes only

Do not add a Home primary navigation item, dead `href="#"` links, `/register/`, or speculative footer links.

## Chapter-Anchor Inventory

The Experience route reserves these native anchors:

- `chapter-01` — 01 — Arrival & Cultural Immersion
- `chapter-02` — 02 — Memory Wall
- `chapter-03` — 03 — Centre for Memories
- `chapter-04` — 04 — Theme Conversation
- `chapter-05` — 05 — Clan Wars
- `chapter-06` — 06 — Learn the Dance
- `chapter-07` — 07 — Books & Merchandise

## Package-Manager Policy

Use npm only. The only lockfile allowed in this project is `package-lock.json`.

Do not create `yarn.lock`, `pnpm-lock.yaml`, `bun.lock`, or `bun.lockb`.

## Branch Recommendation

Recommended working branch:

```text
build/009-10-responsive-interaction-hardening
```

## Responsive And Interaction Hardening

009.10 treats the four assembled public pages as one system and hardens the implementation without redesigning page architecture, section order, content ownership, or visual direction.

Responsive source nodes inspected in read-only mode:

- `112:4378` — `008.3 — Tablet and Mobile Page Assembly`
- `117:7001` — `008.4 — Page-Level Validation and Engineering Handoff`

Viewport matrix for manual QA:

- `1440px`
- `1280px`
- `1024px`
- `769px`
- `768px`
- `767px`
- `376px`
- `375px`
- `374px`
- `321px`
- `320px`

Coded breakpoint strategy:

- Foundation typography and container tokens change at `768px`, `1024px`, and `1440px` to match the Figma reference widths while remaining fluid between them.
- Shared split compositions change from single-column to two-column at `768px`, preserving source order and moving only the visual media/content placement where the composition variant calls for it.
- Larger hero type steps up at `1024px`, keeping the approved hierarchy without shrinking text to force one-line headings.
- Event-detail and metadata groups increase columns at `768px` and `1024px` where content has enough room.
- Header navigation currently uses the selected inline-disclosure model: inline links are shown at `768px` and above; the menu toggle and disclosure navigation are used below `768px`. Figma notes this as content-driven; browser QA in 009.11 should confirm no collision near the 769/768/767 boundary.
- CTA groups become full-width below `374px` to protect labels at the 375/374/321/320 stress widths.

Validation added:

- `npm run hardening:check` performs deterministic static checks for route preservation, current-page states, duplicate IDs, chapter anchors, dead links, speculative registration routes, native FAQ disclosure, no scroll-spy, no sticky header, no root `overflow-x: hidden`, focus outline preservation, reduced-motion rule presence, and development-route leakage.
- `docs/responsive-interaction-qa.md` provides the manual browser QA protocol for routes, viewport matrix, header, mobile menu, focus, FAQ, no-JavaScript, reduced-motion, console, and asset checks.
- `tests/fixtures/long-content-stress.md` provides development-only long-content strings for wrapping and overflow stress testing.

Mobile-navigation validation scope:

- Static code verifies the inline-disclosure model remains present in HTML, has `aria-expanded`, `aria-controls`, visible label text, public route links, no Home text link, and current states on public non-Home routes.
- `navigation.js` keeps repeated initialization guarded, updates `aria-expanded`, changes the visible label between `Open menu` and `Close menu`, closes on Escape, returns focus to the toggle after Escape, and closes after route-link activation.
- Live keyboard verification remains part of the manual QA protocol because the Codex sandbox may block local server binding.

Chapter-anchor validation scope:

- The Experience route keeps native links to `#chapter-01` through `#chapter-07`.
- The journey keeps all seven approved IDs and exact titles.
- `scroll-margin-block-start` is tokenized on chapter targets to support comfortable native fragment positioning with the current static header.

FAQ validation scope:

- Visit FAQ uses native `details` and `summary`.
- No custom exclusive-accordion JavaScript is implemented.
- Multiple items may remain open.
- Summary rows use tokenized touch-target and focus treatment.

Registration placeholder validation scope:

- `Register Interest` remains non-misleading.
- No `/register/`, dead `href="#"`, fake click behaviour, form, countdown, pricing, scarcity language, or registration backend exists.

No-JavaScript and reduced-motion strategy:

- Public content, navigation, chapter anchors, FAQ disclosures, and footer markup exist in HTML before JavaScript runs.
- Mobile navigation is available in unenhanced HTML and is collapsed only after JavaScript initializes.
- Reduced-motion rules remain in the foundation/component layers; no decorative animation or smooth-scroll dependency has been added.

Automated browser-test status:

- Playwright was not added during 009.10. The current environment has previously blocked local server binding with `listen EPERM`, so deterministic static audits remain inside `npm run check` and environment-dependent browser QA is documented separately.

## Current Limitations

- All four public pages are assembled.
- Form flows, registration, final media assets, final FAQ copy, and organizer-approved replacement content are not implemented.
- No production image assets, analytics, registration, backend, CMS, Rive, or animation sequences are included.
- Font files are not yet present locally.
- Manual browser, responsive, keyboard, console, and no-JavaScript validation requires a local environment that can bind the Vite dev and preview servers.
- Comprehensive screen-reader, browser-matrix, 200% zoom, high-contrast, real-device, and assistive-technology validation remain future QA work.
- Browser server binding may be unavailable in the Codex sandbox; report live-validation limits honestly.
- Figma property mappings listed as under review have not been converted into a public component API.

## Suggested Commit Sequence

1. `feat: implement responsive Home page`
2. `test: add Home page audit`
3. `docs: document Home page implementation`
4. `feat: implement responsive Festival page`
5. `test: add Festival page audit`
6. `docs: document Festival page implementation`
7. `feat: implement responsive Experience page`
8. `test: add Experience page audit`
9. `docs: document Experience page implementation`
10. `feat: implement responsive Visit page`
11. `test: add Visit page audit`
12. `docs: document Visit page implementation`
13. `fix: harden responsive layouts and interactions`
14. `test: add responsive interaction hardening audit`
15. `docs: document responsive interaction QA protocol`

## Definition Of Done For 009.10

- Responsive Figma sources were inspected in read-only mode.
- Baseline validation passed before 009.10 edits.
- All four public pages remain assembled and were reviewed as one static system.
- Coded breakpoints and responsive expectations are documented.
- Mobile navigation, current-page states, chapter anchors, native FAQ disclosure, registration placeholders, focus-outline preservation, reduced-motion rules, no-JavaScript strategy, and development-route boundaries are covered by static audit and manual QA protocol.
- Long-content stress fixtures exist for development-only review.
- `npm run hardening:check` passes.
- Every earlier audit still passes.
- `npm run check` passes.
- Browser-dependent verification is documented honestly and remains dependent on local server availability.
- No redesign occurred.
- Building Block 009.11 has not started.

## Next Building Block

009.11 — Accessibility and Browser QA
