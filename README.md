# tfaf-abuja-preview

## Project Overview

Things Fall Apart Festival 2026 — Abuja Preview Experience is a framework-free, static, multi-page frontend project for the approved festival preview website.

The current public pages are engineering placeholders only. They are not the final visual implementation and must not be treated as organizer-approved public content.

## Current Engineering Phase

009.5 — Section Compositions

## Technology Stack

- Vite
- Semantic HTML
- Modular CSS with cascade layers
- Vanilla JavaScript ES modules
- npm
- ESLint
- Prettier
- EditorConfig

No React, TypeScript, Tailwind CSS, Sass, CMS, backend, analytics, registration service, final page implementation, or public page assembly is included in this phase.

## Local Installation

```sh
npm install
```

No environment variables are required for 009.5.

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
npm run check
```

`npm run check` runs linting, formatting verification, token validation, shared-component validation, content-component validation, section-composition validation, and the production build.

## Route Inventory

Public routes:

- `/` — Things Fall Apart Festival — Abuja Preview Experience
- `/festival/` — Festival
- `/experience/` — The Experience
- `/visit/` — Plan Your Visit

Development-only route:

- `/dev/foundations/` — Development foundations reference
- `/dev/components/` — Development shared-components reference
- `/dev/content-components/` — Development content-components reference
- `/dev/compositions/` — Development section-compositions reference

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

No-page-assembly boundary:

- Public routes remain shell-level placeholders.
- Do not add hero, theme, journey, event, FAQ, CTA, or closing compositions to `/`, `/festival/`, `/experience/`, or `/visit/` until 009.6 or later.
- `/dev/compositions/` is a static specimen route only.

FAQ composition strategy:

- No `content/faq-group` component exists.
- The FAQ & Visitor Guidance composition reuses the 009.3 native `details`/`summary` accordion and existing context/editorial components.
- FAQ copy remains placeholder-only until approved.

Review-status notes:

- `content/experience-item` property mapping remains under review.
- `content/event-detail` property mapping remains under review.
- Composition boolean property names remain under review.

## Progressive Enhancement

HTML provides the primary experience. CSS provides approved global foundations. Public header, footer, navigation links, page content, and Experience chapter anchors are present in the document before JavaScript runs.

The mobile navigation uses an inline-disclosure enhancement: it is visible by default without JavaScript, and `src/scripts/navigation.js` collapses it only after enhancement is initialized. Accordions use native `details` and `summary` so content remains readable without JavaScript.

Content components introduce no new JavaScript. All content-component text, sequencing, media placeholders, event details, partner marks, and CTA placeholders are present in semantic HTML.

Section compositions introduce no new JavaScript. `/dev/compositions/` is fully static HTML, and its layout is controlled by CSS only. Accordions retain the native 009.3 fallback behaviour.

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
build/009-5-section-compositions
```

## Current Limitations

- Public pages remain engineering placeholders.
- Shared, content, and section-composition foundations have been built, but final public page assembly has not started.
- Final page assembly, form flows, registration, final media assets, final FAQ copy, and final page-level content ordering are not implemented.
- No production image assets, analytics, registration, backend, CMS, Rive, or animation sequences are included.
- Font files are not yet present locally.
- Browser, responsive, and assistive-technology validation remain future QA work.
- Figma property mappings listed as under review have not been converted into a public component API.

## Suggested Commit Sequence

1. `feat: add hero and editorial section compositions`
2. `feat: add experience and event compositions`
3. `feat: add media cultural and reflection compositions`
4. `feat: add partner registration FAQ and closing compositions`
5. `feat: add section composition reference route`
6. `test: add composition audit`
7. `docs: document section composition architecture`

## Definition Of Done For 009.5

- Figma node `73:760` was inspected in read-only mode.
- Verified composition families exist in `src/styles/compositions/`.
- `/dev/compositions/` exists and is excluded from public navigation.
- All required composition specimens are represented with placeholder-only content.
- Public routes remain unassembled shell placeholders.
- FAQ & Visitor Guidance is implemented without inventing a FAQ content component.
- Experience Item, Event Detail, and composition property review status is documented.
- Optional-region, missing-content, long-content, responsive, and 320px specimens exist.
- `npm run compositions:check` passes.
- `npm run check` passes.
- Building Block 009.6 has not started.

## Next Building Block

009.6 — Home Page Implementation
