import { readFile } from "node:fs/promises";

const festivalPath = "festival/index.html";
const placeholderPublicPages = ["visit/index.html"];
const developmentPages = [
  "dev/foundations/index.html",
  "dev/components/index.html",
  "dev/content-components/index.html",
  "dev/compositions/index.html",
];

const requiredSectionIds = [
  "festival-hero",
  "festival-introduction",
  "theme-exploration",
  "cultural-context",
  "editorial-media",
  "experience-summary",
  "registration-interest",
  "closing",
];

const forbiddenPhrases = [
  "limited time",
  "buy now",
  "early bird",
  "sold out",
  "tickets available",
  "countdown",
  "ticket price",
  "ticket pricing",
  "scarcity",
  "register now",
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

function compactText(content) {
  return content.replace(/\s+/g, " ");
}

async function read(path) {
  return readFile(path, "utf8");
}

const festival = await read(festivalPath);
const compactFestival = compactText(festival);

record(festival.includes("<!doctype html>"), "Festival route is missing");
record(
  festival.includes('<main id="main-content">'),
  "Festival missing main-content",
);
record(
  countMatches(festival, /\sid="main-content"/g) === 1,
  "Festival must contain one main-content ID",
);
record(countMatches(festival, /<h1\b/gi) === 1, "Festival must contain one H1");
record(
  festival.includes('<h1 id="festival-heading"') &&
    compactFestival.includes("> Festival <"),
  "Festival H1 does not match the temporary approved placeholder",
);
record(
  festival.includes(
    "PLACEHOLDER — FINAL FESTIVAL H1 REQUIRES ORGANIZER APPROVAL",
  ),
  "Festival H1 is missing the required approval comment",
);

for (const id of requiredSectionIds) {
  record(festival.includes(`id="${id}"`), `Festival missing section id ${id}`);
}

const sectionPositions = requiredSectionIds.map((id) =>
  festival.indexOf(`id="${id}"`),
);
record(
  sectionPositions.every((position) => position !== -1),
  "Festival section positions could not be calculated",
);
record(
  sectionPositions.every(
    (position, index) => index === 0 || position > sectionPositions[index - 1],
  ),
  "Festival section order does not match approved sequence",
);

record(
  festival.includes("composition-hero--immersive"),
  "Festival Hero does not use the approved immersive composition",
);
record(
  festival.includes("composition-festival-introduction"),
  "Festival Introduction composition missing",
);
record(
  festival.includes("composition-theme-exploration") &&
    !festival.includes("composition-theme-exploration--compact"),
  "Full Theme Exploration composition missing or incorrectly compact",
);
record(
  festival.includes("composition-cultural-context"),
  "Cultural Context composition missing",
);
record(
  festival.includes("composition-editorial-media") &&
    festival.includes(
      "CONDITIONAL SECTION — REMOVE IF FINAL MEDIA IS NOT APPROVED",
    ),
  "Editorial Media is missing or not marked conditional",
);
record(
  festival.includes("composition-experience-overview"),
  "Experience Summary composition missing",
);
record(
  festival.includes("composition-registration-cta"),
  "Registration CTA composition missing",
);
record(festival.includes("composition-closing"), "Closing Composition missing");

record(
  !festival.includes("composition-highlight"),
  "Highlights section is present",
);
record(
  !festival.includes("composition-quotation-reflection") &&
    !festival.includes("editorial-quote"),
  "Quotation and Reflection section is present",
);
record(
  !festival.includes("composition-partners"),
  "Partners section is present",
);

record(
  countMatches(festival, /NAMED\. UNNAMED\. RENAMED\./g) === 2,
  "Festival should contain one hero theme statement and one full theme statement",
);
record(
  !/<h1[^>]*>\s*NAMED\. UNNAMED\. RENAMED\./i.test(festival),
  "Theme statement is incorrectly marked up as H1",
);
record(
  festival.includes("Power, Identity and the Right to Self-Definition"),
  "Theme support statement missing",
);

record(
  festival.includes('href="/experience/"') &&
    compactFestival.includes("> Explore the Seven Chapters <"),
  "Primary Experience CTA missing or incorrect",
);
record(
  festival.includes('href="/experience/"') &&
    compactFestival.includes("> Explore the Experience <"),
  "Experience Summary CTA missing or incorrect",
);
record(
  festival.includes('href="/visit/"') &&
    compactFestival.includes("> Plan Your Visit <"),
  "Visit CTA missing or incorrect",
);
record(
  !festival.includes("/register/"),
  "Festival contains speculative /register/",
);
record(!festival.includes('href="#"'), 'Festival contains href="#"');
record(
  festival.includes(
    '<button class="button button--secondary" type="button" disabled>',
  ) && festival.includes("Destination pending organizer approval"),
  "Registration action is not clearly non-interactive and unresolved",
);

for (const phrase of forbiddenPhrases) {
  record(
    !festival.toLowerCase().includes(phrase),
    `Festival contains forbidden urgency or ticketing phrase: ${phrase}`,
  );
}

for (const name of fakePartnerNames) {
  record(
    !festival.toLowerCase().includes(name),
    `Festival contains fake partner name: ${name}`,
  );
}

record(
  !/\b2026-\d{2}-\d{2}\b/.test(festival),
  "Festival contains invented date",
);
record(!festival.includes("Eagle Square"), "Festival contains invented venue");
record(
  !festival.includes("venue address"),
  "Festival contains venue address language",
);
record(
  !/\bsaid\b/i.test(festival),
  "Festival appears to include quotation attribution",
);

const summary = festival.slice(
  festival.indexOf('id="experience-summary"'),
  festival.indexOf('id="registration-interest"'),
);
const summaryTitles = [
  "Arrival &amp; Cultural Immersion",
  "Memory Wall",
  "Centre for Memories",
];
for (const title of summaryTitles) {
  record(summary.includes(title), `Experience Summary missing ${title}`);
}
const summaryPositions = summaryTitles.map((title) => summary.indexOf(title));
record(
  summaryPositions.every(
    (position, index) => index === 0 || position > summaryPositions[index - 1],
  ),
  "Experience Summary order is not stable canonical preview order",
);

record(
  !festival.includes(">Home<"),
  "Festival contains unapproved Home text nav item",
);
record(
  festival.includes('href="/festival/"') &&
    festival.includes('aria-current="page"'),
  "Festival navigation does not mark the current page",
);
record(
  !festival.includes("/dev/foundations/") &&
    !festival.includes("/dev/components/") &&
    !festival.includes("/dev/content-components/") &&
    !festival.includes("/dev/compositions/"),
  "Festival links to a development route",
);
record(
  festival.includes("site-header") &&
    festival.includes("primary-navigation") &&
    festival.includes("site-footer") &&
    festival.includes("mobile-navigation"),
  "Festival does not include the shared shell",
);

const home = await read("index.html");
record(
  home.includes("The First Chapter Begins in Abuja") &&
    home.includes('id="home-hero"') &&
    home.includes('id="featured-chapter"'),
  "Home route no longer appears preserved",
);

for (const page of placeholderPublicPages) {
  const content = await read(page);
  record(
    !content.includes("composition-hero") &&
      !content.includes("composition-theme-exploration") &&
      !content.includes("composition-registration-cta"),
    `${page} appears to contain assembled page compositions`,
  );
  record(
    content.includes("PLACEHOLDER — COPY APPROVAL REQUIRED") ||
      content.includes("chapter-placeholder") ||
      content.includes("Location:"),
    `${page} no longer appears to be placeholder-level`,
  );
}

const experiencePage = await read("experience/index.html");
record(
  experiencePage.includes(
    "PLACEHOLDER — FINAL EXPERIENCE H1 REQUIRES ORGANIZER APPROVAL",
  ) &&
    experiencePage.includes('id="experience-hero"') &&
    experiencePage.includes('id="experience-journey"'),
  "Experience route no longer appears assembled as expected",
);
for (const [index, title] of [
  "Arrival &amp; Cultural Immersion",
  "Memory Wall",
  "Centre for Memories",
  "Theme Conversation",
  "Clan Wars",
  "Learn the Dance",
  "Books &amp; Merchandise",
].entries()) {
  const id = `chapter-0${index + 1}`;
  record(
    experiencePage.includes(`id="${id}"`),
    `Experience route missing ${id}`,
  );
  record(experiencePage.includes(title), `Experience route missing ${title}`);
}

const mainCss = await read("src/styles/main.css");
record(
  mainCss.includes("./pages/festival.css"),
  "main.css does not import festival.css",
);

const festivalCss = await read("src/styles/pages/festival.css");
record(
  !/#[0-9a-f]{3,8}\b/i.test(festivalCss) &&
    !/\brgba?\(/i.test(festivalCss) &&
    !/\bhsl[a]?\(/i.test(festivalCss),
  "Festival CSS contains raw colour literals",
);
record(
  festivalCss.includes("var(--") || festivalCss.includes("composition"),
  "Festival CSS does not consume tokens or composition classes",
);
record(
  !/(^|\n)\.button\s*\{/m.test(festivalCss) &&
    !/(^|\n)\.section-header\s*\{/m.test(festivalCss) &&
    !/(^|\n)\.experience-item\s*\{/m.test(festivalCss),
  "Festival CSS duplicates component or composition implementation",
);

for (const page of developmentPages) {
  await read(page);
}

console.log(
  "Festival audit note: static checks do not replace browser, responsive, keyboard, screen-reader, or visual QA.",
);

if (errors.length > 0) {
  console.error(`Festival audit failed with ${errors.length} issue(s):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `Festival audit passed: ${requiredSectionIds.length} section IDs, ${placeholderPublicPages.length} remaining placeholder public routes, ${developmentPages.length} development routes checked.`,
);
