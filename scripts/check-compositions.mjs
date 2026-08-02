import { readdir, readFile } from "node:fs/promises";

const publicPages = [
  "index.html",
  "festival/index.html",
  "experience/index.html",
  "visit/index.html",
];

const developmentPages = [
  "dev/foundations/index.html",
  "dev/components/index.html",
  "dev/content-components/index.html",
  "dev/compositions/index.html",
];

const allHtmlPages = [...publicPages, ...developmentPages];

const requiredCompositionFiles = [
  "base.css",
  "hero.css",
  "festival-introduction.css",
  "theme-exploration.css",
  "experience-overview.css",
  "experience-journey.css",
  "featured-chapter.css",
  "event-information.css",
  "editorial-media.css",
  "cultural-context.css",
  "highlight.css",
  "quotation-reflection.css",
  "partners.css",
  "registration-cta.css",
  "faq-visitor-guidance.css",
  "closing.css",
];

const requiredCompositionClasses = [
  "composition-hero",
  "composition-hero--editorial-split",
  "composition-hero--immersive",
  "composition-hero--minimal",
  "composition-festival-introduction",
  "composition-theme-exploration",
  "composition-experience-overview",
  "composition-experience-journey",
  "composition-featured-chapter",
  "composition-event-information",
  "composition-editorial-media",
  "composition-cultural-context",
  "composition-highlight",
  "composition-quotation-reflection",
  "composition-partners",
  "composition-registration-cta",
  "composition-faq-visitor-guidance",
  "composition-closing",
];

const requiredSpecimens = [
  "Composition overview",
  "Architecture diagram",
  "Hero — editorial split",
  "Hero — editorial split without media",
  "Hero — immersive",
  "Hero — minimal",
  "Hero — long heading",
  "Festival Introduction",
  "Festival Introduction without media",
  "Theme Exploration — full",
  "Theme Exploration — compact/preview configuration",
  "Theme Exploration — long supporting copy",
  "Experience Overview",
  "Experience Overview — reduced item count",
  "Experience Overview — long item content",
  "Full Experience Journey — seven titles",
  "Full Experience Journey — 320px specimen",
  "Featured Chapter — media left",
  "Featured Chapter — media right",
  "Featured Chapter — no media",
  "Event Information — full",
  "Event Information — summary configuration",
  "Event Information — long venue value",
  "Editorial Media — media left",
  "Editorial Media — media right",
  "Cultural Context",
  "Cultural Context — no media",
  "Highlight Composition",
  "Quotation &amp; Reflection",
  "Quotation &amp; Reflection — no attribution",
  "Partners",
  "Partners — mixed-width marks",
  "Registration CTA",
  "Registration CTA — stacked mobile actions",
  "FAQ &amp; Visitor Guidance",
  "FAQ — long question and answer",
  "Closing Composition",
  "Default surfaces",
  "Subtle surfaces",
  "Inverse surfaces",
  "Optional-region specimens",
  "Missing-media specimens",
  "Missing-action specimens",
  "Long-content stress specimens",
  "Responsive transformation specimens",
  "320px specimens",
  "Property mappings under review",
  "Composition limitations",
];

const approvedChapterTitles = [
  "Arrival &amp; Cultural Immersion",
  "Memory Wall",
  "Centre for Memories",
  "Theme Conversation",
  "Clan Wars",
  "Learn the Dance",
  "Books &amp; Merchandise",
];

const approvedEventPairs = [
  ["Date", "To be confirmed"],
  ["Time", "To be confirmed"],
  ["Venue", "To be confirmed"],
  ["Location", "Abuja"],
];

const forbiddenPhrases = [
  "limited time",
  "buy now",
  "early bird",
  "sold out",
  "tickets available",
  "countdown",
  "pricing",
  "venue address",
  "lagos",
  "speaker name",
  "chinua achebe",
];

const fakePartnerNames = [
  "acme",
  "globex",
  "initech",
  "umbrella",
  "wayne enterprises",
];

const errors = [];

function record(condition, message) {
  if (!condition) {
    errors.push(message);
  }
}

function countMatches(content, pattern) {
  return Array.from(content.matchAll(pattern)).length;
}

async function read(path) {
  return readFile(path, "utf8");
}

const compositionDir = await readdir("src/styles/compositions");
for (const file of requiredCompositionFiles) {
  record(
    compositionDir.includes(file),
    `Missing src/styles/compositions/${file}`,
  );
}

const mainCss = await read("src/styles/main.css");
record(
  mainCss.includes("components, content, compositions, pages"),
  "main.css does not declare the compositions layer in the expected order",
);

for (const file of requiredCompositionFiles) {
  record(
    mainCss.includes(`./compositions/${file}`),
    `main.css does not import ${file}`,
  );
}

const viteConfig = await read("vite.config.js");
record(
  viteConfig.includes("dev/compositions/index.html"),
  "vite.config.js does not include the compositions route",
);

const packageJson = await read("package.json");
record(
  packageJson.includes('"compositions:check"'),
  "package.json is missing compositions:check",
);
record(
  packageJson.includes("npm run compositions:check"),
  "npm run check does not include compositions:check",
);

const compositionPage = await read("dev/compositions/index.html");
record(
  compositionPage.includes(
    "Development Reference — Not a Public Festival Page",
  ),
  "Composition reference page is missing the development-only warning",
);

for (const className of requiredCompositionClasses) {
  record(
    compositionPage.includes(className),
    `Composition page missing ${className}`,
  );
}

for (const specimen of requiredSpecimens) {
  record(
    compositionPage.includes(specimen),
    `Composition page missing specimen: ${specimen}`,
  );
}

for (const title of approvedChapterTitles) {
  record(
    compositionPage.includes(title),
    `Composition page missing approved chapter title: ${title}`,
  );
}

for (const [label, value] of approvedEventPairs) {
  const labelIndex = compositionPage.indexOf(`>${label}<`);
  const valueIndex = compositionPage.indexOf(`>${value}<`, labelIndex);
  record(
    labelIndex !== -1 && valueIndex !== -1,
    `Composition page missing approved event pair ${label}: ${value}`,
  );
}

record(
  compositionPage.includes("Register Interest"),
  "Composition page missing approved Register Interest label",
);
record(
  compositionPage.includes(
    "Registration details will be confirmed by the organizers.",
  ),
  "Composition page missing approved registration note",
);

const ids = Array.from(compositionPage.matchAll(/\sid="([^"]+)"/g)).map(
  (match) => match[1],
);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
record(
  duplicateIds.length === 0,
  `Duplicate IDs in compositions page: ${duplicateIds.join(", ")}`,
);

for (const page of allHtmlPages) {
  const content = await read(page);
  record(!content.includes('href="#"'), `${page}: contains href="#"`);
  record(!content.includes("/register/"), `${page}: contains /register/`);
}

for (const page of publicPages) {
  const content = await read(page);
  record(
    !content.includes("/dev/compositions/"),
    `${page}: links to development compositions route`,
  );
  record(
    countMatches(content, /<h1\b/gi) === 1,
    `${page}: does not contain exactly one h1`,
  );
  record(
    countMatches(content, /\sid="main-content"/g) === 1,
    `${page}: does not contain exactly one main-content ID`,
  );
  record(
    page === "index.html" ||
      page === "festival/index.html" ||
      (!content.includes("composition-hero") &&
        !content.includes("composition-experience-journey") &&
        !content.includes("composition-registration-cta")),
    `${page}: appears to contain public page composition assembly`,
  );
  record(
    !content.includes(">Home<"),
    `${page}: contains unapproved Home nav item`,
  );
}

const experiencePage = await read("experience/index.html");
for (const [index, title] of approvedChapterTitles.entries()) {
  const id = `chapter-0${index + 1}`;
  record(
    experiencePage.includes(`id="${id}"`),
    `Experience route missing ${id}`,
  );
  record(experiencePage.includes(title), `Experience route missing ${title}`);
}

record(
  !compositionPage.includes("content-faq-group") &&
    !compositionPage.includes("faq-group") &&
    !mainCss.includes("content/faq"),
  "FAQ content-component family was invented",
);

const compositionCss = (
  await Promise.all(
    requiredCompositionFiles.map((file) =>
      read(`src/styles/compositions/${file}`),
    ),
  )
).join("\n");

record(
  !/#[0-9a-f]{3,8}\b/i.test(compositionCss) &&
    !/\brgba?\(/i.test(compositionCss) &&
    !/\bhsl[a]?\(/i.test(compositionCss),
  "Composition CSS contains raw colour values",
);
record(
  countMatches(compositionCss, /var\(--/g) >= 40,
  "Composition CSS does not appear to consume custom properties",
);
record(
  !/(^|\n)\.button\s*\{/m.test(compositionCss) &&
    !/(^|\n)\.accordion__summary\s*\{/m.test(compositionCss) &&
    !/(^|\n)\.content-media-placeholder\s*\{/m.test(compositionCss),
  "Composition CSS duplicates shared/content component implementation",
);
record(
  !compositionCss.includes("@keyframes"),
  "Composition CSS introduced animation",
);

const lowerCompositionPage = compositionPage.toLowerCase();
for (const phrase of forbiddenPhrases) {
  record(
    !lowerCompositionPage.includes(phrase),
    `Forbidden phrase found in composition page: ${phrase}`,
  );
}
for (const name of fakePartnerNames) {
  record(
    !lowerCompositionPage.includes(name),
    `Fake partner name found in composition page: ${name}`,
  );
}

record(
  !compositionPage.includes("real quotation") &&
    !compositionPage.includes("Speaker Name"),
  "Real quotation attribution or speaker placeholder was introduced",
);

console.log(
  "Composition audit note: static checks do not replace browser, responsive, keyboard, screen-reader, or visual QA.",
);

if (errors.length > 0) {
  console.error(`Composition audit failed with ${errors.length} issue(s):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `Composition audit passed: ${requiredCompositionFiles.length} CSS files, ${requiredCompositionClasses.length} composition classes, ${allHtmlPages.length} HTML routes checked.`,
);
