import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const tokenFile = "src/styles/foundations/tokens.css";
const sourceRoots = ["src/styles"];

const requiredTokens = [
  "warm-neutral-50",
  "warm-neutral-100",
  "warm-neutral-200",
  "warm-neutral-300",
  "warm-neutral-400",
  "warm-neutral-500",
  "warm-neutral-600",
  "warm-neutral-700",
  "warm-neutral-800",
  "warm-neutral-900",
  "warm-neutral-950",
  "umber-50",
  "umber-100",
  "umber-200",
  "umber-300",
  "umber-400",
  "umber-500",
  "umber-600",
  "umber-700",
  "umber-800",
  "umber-900",
  "umber-950",
  "bronze-50",
  "bronze-100",
  "bronze-200",
  "bronze-300",
  "bronze-400",
  "bronze-500",
  "bronze-600",
  "bronze-700",
  "bronze-800",
  "bronze-900",
  "bronze-950",
  "green-50",
  "green-300",
  "green-500",
  "green-900",
  "amber-50",
  "amber-300",
  "amber-500",
  "amber-900",
  "red-50",
  "red-300",
  "red-500",
  "red-900",
  "blue-50",
  "blue-300",
  "blue-500",
  "blue-900",
  "pure-white",
  "pure-black",
  "color-background-page",
  "color-background-subtle",
  "color-background-strong",
  "color-background-inverse",
  "color-background-accent",
  "color-surface-default",
  "color-surface-subtle",
  "color-surface-elevated",
  "color-surface-overlay",
  "color-surface-inverse",
  "color-surface-accent",
  "color-text-primary",
  "color-text-secondary",
  "color-text-tertiary",
  "color-text-inverse",
  "color-text-accent",
  "color-text-link",
  "color-text-disabled",
  "color-text-on-accent",
  "color-border-subtle",
  "color-border-default",
  "color-border-strong",
  "color-border-accent",
  "color-border-focus",
  "color-border-error",
  "color-interactive-primary",
  "color-interactive-primary-hover",
  "color-interactive-primary-active",
  "color-interactive-secondary",
  "color-interactive-secondary-hover",
  "color-interactive-secondary-active",
  "color-interactive-disabled",
  "color-interactive-disabled-text",
  "color-feedback-success",
  "color-feedback-success-subtle",
  "color-feedback-warning",
  "color-feedback-warning-subtle",
  "color-feedback-error",
  "color-feedback-error-subtle",
  "color-feedback-information",
  "color-feedback-information-subtle",
  "font-family-editorial",
  "font-family-functional",
  "font-weight-regular",
  "font-weight-medium",
  "font-weight-bold",
  "type-display-xl-size",
  "type-display-xl-line-height",
  "type-display-xl-letter-spacing",
  "type-display-large-size",
  "type-display-large-line-height",
  "type-display-large-letter-spacing",
  "type-display-medium-size",
  "type-display-medium-line-height",
  "type-display-medium-letter-spacing",
  "type-display-small-size",
  "type-display-small-line-height",
  "type-display-small-letter-spacing",
  "type-heading-1-size",
  "type-heading-1-line-height",
  "type-heading-1-letter-spacing",
  "type-heading-2-size",
  "type-heading-2-line-height",
  "type-heading-2-letter-spacing",
  "type-heading-3-size",
  "type-heading-3-line-height",
  "type-heading-3-letter-spacing",
  "type-heading-4-size",
  "type-heading-4-line-height",
  "type-heading-4-letter-spacing",
  "type-body-xl-size",
  "type-body-xl-line-height",
  "type-body-large-size",
  "type-body-large-line-height",
  "type-body-default-size",
  "type-body-default-line-height",
  "type-body-small-size",
  "type-body-small-line-height",
  "type-body-xs-size",
  "type-body-xs-line-height",
  "type-label-large-size",
  "type-label-large-line-height",
  "type-label-large-letter-spacing",
  "type-label-default-size",
  "type-label-default-line-height",
  "type-label-default-letter-spacing",
  "type-label-small-size",
  "type-label-small-line-height",
  "type-label-small-letter-spacing",
  "type-label-xs-size",
  "type-label-xs-line-height",
  "type-label-xs-letter-spacing",
  "type-caption-size",
  "type-caption-line-height",
  "type-caption-letter-spacing",
  "type-eyebrow-size",
  "type-eyebrow-line-height",
  "type-eyebrow-letter-spacing",
  "type-overline-size",
  "type-overline-line-height",
  "type-overline-letter-spacing",
  "type-quote-size",
  "type-quote-line-height",
  "type-quote-letter-spacing",
  "space-0",
  "space-0-5",
  "space-1",
  "space-1-5",
  "space-2",
  "space-2-5",
  "space-3",
  "space-4",
  "space-5",
  "space-6",
  "space-7",
  "space-8",
  "space-10",
  "space-12",
  "space-15",
  "space-16",
  "space-20",
  "radius-none",
  "radius-small",
  "radius-medium",
  "radius-large",
  "radius-xlarge",
  "radius-pill",
  "border-none",
  "border-thin",
  "border-medium",
  "border-strong",
  "elevation-none",
  "elevation-subtle",
  "elevation-medium",
  "elevation-floating",
  "duration-instant",
  "duration-fast",
  "duration-default",
  "duration-slow",
  "duration-editorial",
  "easing-standard",
  "easing-entrance",
  "easing-exit",
  "easing-editorial",
  "motion-distance-small",
  "motion-distance-medium",
  "motion-distance-large",
  "breakpoint-mobile-max",
  "breakpoint-tablet-min",
  "breakpoint-tablet-max",
  "breakpoint-desktop-min",
  "breakpoint-wide-min",
  "reference-width-mobile",
  "reference-width-tablet",
  "reference-width-desktop",
  "grid-columns",
  "grid-gutter",
  "page-gutter",
  "container-page-max",
  "container-content-max",
  "container-narrow-max",
  "container-form-max",
  "grid-desktop-columns",
  "grid-desktop-gutter",
  "grid-desktop-margin",
  "grid-desktop-content",
  "grid-tablet-columns",
  "grid-tablet-gutter",
  "grid-tablet-margin",
  "grid-tablet-content",
  "grid-mobile-columns",
  "grid-mobile-gutter",
  "grid-mobile-margin",
  "grid-mobile-content",
];

const deprecatedTokens = [
  "foundation-color-surface",
  "foundation-color-text",
  "foundation-color-muted",
  "foundation-color-border",
  "foundation-color-focus",
  "foundation-font-family",
  "foundation-space-2",
  "foundation-container-max",
];

async function collectCssFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectCssFiles(path)));
    } else if (entry.isFile() && entry.name.endsWith(".css")) {
      files.push(path);
    }
  }

  return files;
}

const tokenSource = await readFile(tokenFile, "utf8");
const primaryRootBlock =
  tokenSource.match(/:root\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
const primaryDeclarations = [
  ...primaryRootBlock.matchAll(/--([a-z0-9-]+)\s*:/g),
].map((match) => match[1]);
const primaryDeclaredTokens = new Set(primaryDeclarations);
const duplicateTokens = primaryDeclarations.filter(
  (token, index) => primaryDeclarations.indexOf(token) !== index,
);
const missingRequired = requiredTokens.filter(
  (token) => !primaryDeclaredTokens.has(token),
);

const cssFiles = (
  await Promise.all(sourceRoots.map((root) => collectCssFiles(root)))
).flat();
const cssByFile = await Promise.all(
  cssFiles.map(async (file) => [file, await readFile(file, "utf8")]),
);
const allCss = cssByFile.map(([, css]) => css).join("\n");
const declarations = [...allCss.matchAll(/--([a-z0-9-]+)\s*:/g)].map(
  (match) => match[1],
);
const declaredTokens = new Set(declarations);
const unresolvedReferences = [];

for (const [file, css] of cssByFile) {
  for (const match of css.matchAll(/var\(\s*--([a-z0-9-]+)\s*([,)])/g)) {
    const [, token, closing] = match;
    const hasFallback = closing === ",";
    if (!declaredTokens.has(token) && !hasFallback) {
      unresolvedReferences.push(`${file}: --${token}`);
    }
  }
}

const deprecatedFound = deprecatedTokens.filter((token) =>
  allCss.includes(`--${token}`),
);
const rawFigmaNames = [...allCss.matchAll(/--[a-z0-9-]*\/[a-z0-9_/-]+/g)].map(
  (match) => match[0],
);
const temporaryMarkers = allCss.match(
  /Foundation-only temporary|pending 007\.1/,
);
const failures = [
  ...missingRequired.map((token) => `Missing required token --${token}`),
  ...duplicateTokens.map((token) => `Duplicate token declaration --${token}`),
  ...unresolvedReferences.map((item) => `Unresolved custom property ${item}`),
  ...deprecatedFound.map(
    (token) => `Deprecated 009.1 token remains --${token}`,
  ),
  ...rawFigmaNames.map((token) => `Raw slash-style Figma token found ${token}`),
];

if (temporaryMarkers) {
  failures.push("Temporary 009.1 token marker remains in CSS");
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(
  `Token audit passed: ${requiredTokens.length} required tokens, ${declaredTokens.size} declarations, ${cssFiles.length} CSS files.`,
);
