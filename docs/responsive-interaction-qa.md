# Responsive and Interaction QA Protocol

Building Block: 009.10 — Responsive and Interaction Hardening

This protocol is for manual browser validation in a normal local environment. It does not replace Building Block 009.11 accessibility and browser QA.

## Setup

```sh
npm install
npm run check
npm run dev -- --host 127.0.0.1
```

For production-preview checks:

```sh
npm run build
npm run preview -- --host 127.0.0.1
```

## Routes

Public routes:

- `/`
- `/festival/`
- `/experience/`
- `/visit/`

Development routes:

- `/dev/foundations/`
- `/dev/components/`
- `/dev/content-components/`
- `/dev/compositions/`

Development routes must load directly but must not appear in public navigation or footer links.

## Viewport Matrix

Test each public route at:

- 1440px
- 1280px
- 1024px
- 769px
- 768px
- 767px
- 376px
- 375px
- 374px
- 321px
- 320px

Pass means the page has no horizontal scrollbar, clipped required text, overlapping controls, offscreen actions, distorted media, duplicate responsive content, or clipped focus rings.

## Header

- Identity remains visible and links to `/`.
- No text navigation item labelled `Home` appears.
- Festival, Experience, and Visit remain readable while inline.
- Navigation collapses before labels collide or wrap awkwardly.
- Menu button remains reachable at 375px and 320px.
- Expanded mobile navigation displays all three public route links and the registration placeholder.
- Current page indication appears on Festival, Experience, and Visit only.
- Current state is not conveyed by colour alone.

## Mobile Menu

- Activate the menu button with mouse, touch, Enter, and Space.
- `aria-expanded` changes from `false` to `true` on open and back to `false` on close.
- Visible label changes between `Open menu` and `Close menu`.
- Escape closes the menu and returns focus to the toggle.
- Selecting Festival, Experience, or Visit closes the enhanced menu before navigation.
- There is no focus trap, modal role, background scroll lock, or JavaScript-only navigation requirement.
- With JavaScript disabled, the mobile navigation remains present and usable.

## Page Checks

Home:

- H1 wraps safely.
- Hero text and actions precede media in DOM and mobile reading order.
- Hero actions stack when narrow.
- Festival Introduction remains readable.
- Theme statement wraps naturally.
- Experience Overview reflows without horizontal scrolling.
- Featured Chapter does not reserve empty media space when media is absent.
- Event Information stacks cleanly.
- Registration CTA stays contained.
- Closing remains visually distinct from footer.

Festival:

- Placeholder H1 wraps.
- Theme statement does not clip.
- Editorial Introduction has a readable measure.
- Cultural Context keeps source order.
- Editorial Media caption and credit remain attached.
- Experience Summary order remains stable.
- Registration placeholder is non-misleading.

Experience:

- Hero `Begin the Journey` CTA reaches `#chapter-01`.
- Chapter navigation is readable at every tested width.
- Chapter navigation wraps or stacks; it is not horizontal-scroll-only.
- All seven chapter IDs are unique and reachable.
- Direct URLs `/experience/#chapter-01` through `/experience/#chapter-07` land with comfortable spacing.
- Browser Back, Forward, and reload preserve fragment behaviour.
- No scroll-spy or forced focus movement occurs.

Visit:

- Event values remain exactly `Date: To be confirmed`, `Time: To be confirmed`, `Venue: To be confirmed`, and `Location: Abuja`.
- Event details reflow cleanly.
- Venue placeholder preserves ratio.
- FAQ summaries wrap without clipping.
- FAQ answers expand naturally without fixed-height clipping.
- Multiple FAQ items may stay open.
- Registration placeholder remains understandable.

## Chapter Anchors

Test:

- `/experience/#chapter-01`
- `/experience/#chapter-02`
- `/experience/#chapter-03`
- `/experience/#chapter-04`
- `/experience/#chapter-05`
- `/experience/#chapter-06`
- `/experience/#chapter-07`

Each target must expose the exact approved title and must not be hidden behind a sticky header. The header is static; do not introduce sticky behaviour during this phase.

## FAQ

- Native `details` and `summary` elements are used.
- Summary rows can be toggled with mouse, touch, Enter, and Space.
- Focus indicator is visible on summary.
- Open indicator remains visible.
- Multiple FAQ items can remain open.
- No custom exclusive-accordion logic is present.

## Keyboard And Focus

Tab through each route.

- Skip link is the first focusable control and becomes visible.
- Identity link, nav links, menu toggle, CTAs, chapter links, FAQ summaries, and footer links show visible focus.
- Focus is not clipped on default, subtle, inverse, or accent surfaces.
- Disabled registration buttons are not focusable.
- Focus order follows the visual/source order.

## No JavaScript

Disable JavaScript and reload each public route.

- Content remains present and readable.
- Primary and mobile navigation remain available.
- Hero links, Festival links, Visit links, and Experience anchors remain native.
- Visit FAQ remains usable through native disclosure.
- Registration placeholders remain non-misleading.
- Footer remains present.

## Reduced Motion

Enable `prefers-reduced-motion: reduce`.

- Menu state changes remain understandable.
- FAQ disclosure remains usable.
- Focus appears immediately.
- No required content depends on animation.

## Console And Assets

- Open DevTools on each public and development route.
- There are no uncaught JavaScript errors.
- There are no CSS, JavaScript, image, font, or media 404s.
- Production preview has the same result as development where server binding is available.

## Long Content Stress

Use `tests/fixtures/long-content-stress.md` as development-only test input. Do not commit public-route copy changes made during stress testing.

## Result Fields

For each route and viewport record:

- Route:
- Viewport:
- Browser:
- JavaScript enabled or disabled:
- Pass or fail:
- Defect:
- Owning layer:
- Fix applied:
- Retest result:

## Pass And Fail Definitions

Pass: The tested route satisfies all observable criteria for the selected viewport and interaction mode.

Fail: Required content clips, overlaps, disappears, relies on JavaScript unnecessarily, creates horizontal page scrolling, exposes dead links, has broken assets, or presents misleading registration behaviour.
