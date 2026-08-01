# tfaf-abuja-preview

## Project Overview

Things Fall Apart Festival 2026 — Abuja Preview Experience is a four-page static website foundation for later design implementation.

The current pages are engineering placeholders only. They are not the final visual implementation and must not be treated as organizer-approved public content.

## Current Engineering Phase

009.1 — Project Foundation

## Technology Stack

- Vite
- HTML
- Modular CSS with cascade layers
- Vanilla JavaScript ES modules
- npm
- ESLint
- Prettier
- EditorConfig

No React, TypeScript, Tailwind CSS, Sass, CMS, backend, analytics, registration service, or final visual system is included in this phase.

## Local Installation

```sh
npm install
```

No environment variables are required for 009.1. Do not create `.env` files unless a later approved building block introduces a real environment need.

## Development Commands

```sh
npm run dev
npm run build
npm run preview
npm run lint
npm run format
npm run format:check
npm run check
```

`npm run check` runs linting, formatting verification, and the production build.

## Route Inventory

- `/` — Things Fall Apart Festival — Abuja Preview Experience
- `/festival/` — Festival
- `/experience/` — The Experience
- `/visit/` — Plan Your Visit

No unapproved routes are included.

## Chapter-Anchor Inventory

The Experience route reserves these native anchors:

- `chapter-01` — 01 — Arrival & Cultural Immersion
- `chapter-02` — 02 — Memory Wall
- `chapter-03` — 03 — Centre for Memories
- `chapter-04` — 04 — Theme Conversation
- `chapter-05` — 05 — Clan Wars
- `chapter-06` — 06 — Learn the Dance
- `chapter-07` — 07 — Books & Merchandise

## Folder Structure

```text
tfaf-abuja-preview/
├── index.html
├── festival/index.html
├── experience/index.html
├── visit/index.html
├── public/
├── src/
│   ├── assets/
│   ├── data/
│   ├── scripts/
│   └── styles/
├── tests/
├── eslint.config.js
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

Reserved folders include short README files until approved assets, styles, utilities, or tests are introduced.

## Design Source Of Truth

The approved design and engineering handoff remain in Figma:

- 007.1 Foundations
- 007.2 Core Components
- 007.3 Content Components
- 007.4 Page Section Compositions
- 008.1 Page Architecture
- 008.2 Desktop Page Assembly
- 008.3 Tablet and Mobile Page Assembly
- 008.4 Engineering Handoff

This repository does not yet map final design tokens, components, page sections, typography, colors, assets, or responsive design from Figma.

## Placeholder-Content Warning

All route copy is limited to approved placeholders and approved constants. Festival details, programme details, dates, venue, registration, transport, and final SEO content must not be invented in this phase.

## Accessibility Intent

The foundation includes semantic landmarks, one H1 per page, skip links, native links, unique chapter IDs, and no JavaScript dependency for core navigation. Accessibility validation continues during later engineering and QA building blocks.

## Progressive-Enhancement Strategy

HTML provides the primary experience. CSS improves readability. JavaScript modules are safe no-op foundations for future interactions and must not be required for route readability, navigation, footer content, or chapter-anchor access.

## Shared Header/Footer Maintenance

This is a vanilla multi-page site. During 009.1, the same compact header and footer markup is repeated in each HTML route so critical shell content remains available when JavaScript fails. Keep the shared shell regions synchronized manually until a later approved building block introduces a build-time partial or templating strategy.

## Naming Conventions

- Files, directories, CSS classes, IDs, and data attributes use lowercase kebab-case.
- JavaScript identifiers use camelCase.
- Future behavioral hooks should use data attributes such as `data-menu-toggle`, `data-mobile-menu`, `data-accordion-trigger`, and `data-chapter-link`.
- JavaScript should not depend primarily on visual styling classes.

## Package-Manager Policy

Use npm only. The only lockfile allowed in this project is `package-lock.json`.

Do not create `yarn.lock`, `pnpm-lock.yaml`, `bun.lock`, or `bun.lockb`.

## Branch Recommendation

Recommended working branch:

```text
build/009-1-project-foundation
```

## Commit Recommendations

Suggested commit sequence:

1. `chore: scaffold Vite multi-page project`
2. `chore: configure project architecture`
3. `chore: add linting and formatting`
4. `feat: add semantic route placeholders`
5. `docs: document project foundation`

## Current Limitations

- No final design tokens or global styles have been mapped.
- No final brand colors, typography, fonts, assets, or components are implemented.
- No mobile menu, accordion, smooth scrolling, analytics, registration, backend, CMS, or deployment configuration is included.
- Placeholder meta descriptions are not final SEO content.
- Browser and accessibility automation are reserved for later QA work.

## Definition Of Done For 009.1

- Vite vanilla project configured.
- npm is the only package manager.
- Four route entry points exist.
- Four routes load during development.
- Four routes exist in the production build.
- Semantic shell exists on every page.
- Each page has exactly one H1.
- Skip link exists and is focus-visible.
- `main-content` exists once per page.
- Experience chapter anchors exist with approved titles.
- CSS foundation files exist.
- JavaScript module foundations exist.
- ESLint passes.
- Prettier check passes.
- Production build passes.
- `npm run check` passes.
- Production preview works.
- Browser console has no uncaught JavaScript errors.
- README documentation is complete.
- No final visual design has been implemented.
- No festival information has been invented.
- 009.2 has not started.

## Next Building Block

009.2 — Design Tokens and Global Styles
