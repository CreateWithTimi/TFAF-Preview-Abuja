# tfaf-abuja-preview

## Project Overview

Things Fall Apart Festival 2026 — Abuja Preview Experience is a framework-free, static, multi-page frontend project for the approved festival preview website.

The current public pages are engineering placeholders only. They are not the final visual implementation and must not be treated as organizer-approved public content.

## Current Engineering Phase

009.3 — Shared Components

## Technology Stack

- Vite
- Semantic HTML
- Modular CSS with cascade layers
- Vanilla JavaScript ES modules
- npm
- ESLint
- Prettier
- EditorConfig

No React, TypeScript, Tailwind CSS, Sass, CMS, backend, analytics, registration service, or page-section assembly is included in this phase.

## Local Installation

```sh
npm install
```

No environment variables are required for 009.3.

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
npm run check
```

`npm run check` runs linting, formatting verification, token validation, component validation, and the production build.

## Route Inventory

Public routes:

- `/` — Things Fall Apart Festival — Abuja Preview Experience
- `/festival/` — Festival
- `/experience/` — The Experience
- `/visit/` — Plan Your Visit

Development-only route:

- `/dev/foundations/` — Development foundations reference
- `/dev/components/` — Development shared-components reference

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

Read-only inspection confirmed the 009.3 component scope: buttons, text links, icon buttons, tags/badges, dividers, navigation, accordion, status/feedback labels, and documented component principles. Metadata, event-detail, media, partner-mark, header, and footer code foundations are implemented as reusable website primitives without starting 009.4 page-section composition.

## CSS Architecture

Cascade order:

```css
@layer reset, tokens, base, layout, components, compositions, pages, utilities;
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

## Progressive Enhancement

HTML provides the primary experience. CSS provides approved global foundations. Public header, footer, navigation links, page content, and Experience chapter anchors are present in the document before JavaScript runs.

The mobile navigation uses an inline-disclosure enhancement: it is visible by default without JavaScript, and `src/scripts/navigation.js` collapses it only after enhancement is initialized. Accordions use native `details` and `summary` so content remains readable without JavaScript.

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
build/009-2-design-tokens-global-styles
```

For the current phase:

```text
build/009-3-shared-components
```

## Current Limitations

- Public pages remain engineering placeholders.
- Shared component foundations have been built, but final page-section composition has not started.
- Final page assembly, cards, form flows, registration, final media assets, and content components are not implemented.
- No production image assets, analytics, registration, backend, CMS, Rive, or animation sequences are included.
- Font files are not yet present locally.
- Browser and accessibility automation remain future QA work.

## Suggested Commit Sequence

1. `feat: add shared component primitives`
2. `feat: integrate shared header and footer shell`
3. `feat: add mobile navigation enhancement`
4. `feat: add component reference route`
5. `test: add component validation audit`
6. `docs: document shared component foundation`

## Definition Of Done For 009.3

- Shared component CSS files exist and import through the components layer.
- Public route shells use the shared header/footer pattern.
- Mobile navigation is readable without JavaScript and enhanced only after initialization.
- Accordion specimens use native disclosure behavior.
- `/dev/components/` exists and is excluded from public navigation.
- `npm run components:check` passes.
- `npm run check` passes.
- Building Block 009.4 has not started.

## Next Building Block

009.4 — Content Components
