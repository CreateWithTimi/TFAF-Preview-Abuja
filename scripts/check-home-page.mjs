import { readFile } from "node:fs/promises";

const homePath = "index.html";
const remainingPlaceholderPublicPages = [
  "experience/index.html",
  "visit/index.html",
];
const developmentPages = [
  "dev/foundations/index.html",
  "dev/components/index.html",
  "dev/content-components/index.html",
  "dev/compositions/index.html",
];

const requiredSectionIds = [
  "home-hero",
  "festival-introduction",
  "theme-preview",
  "experience-overview",
  "featured-chapter",
  "event-information",
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

const approvedEventValues = [
  "Date",
  "Time",
  "Venue",
  "Location",
  "To be confirmed",
  "Abuja",
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

const home = await read(homePath);
const compactHome = compactText(home);

record(home.includes('<main id="main-content">'), "Home missing main-content");
record(
  countMatches(home, /\sid="main-content"/g) === 1,
  "Home must contain one main-content ID",
);
record(countMatches(home, /<h1\b/gi) === 1, "Home must contain one H1");
record(
  home.includes('<h1 id="home-heading"') &&
    home.includes("The First Chapter Begins in Abuja"),
  "Home H1 does not match approved wording",
);

for (const id of requiredSectionIds) {
  record(home.includes(`id="${id}"`), `Home missing section id ${id}`);
}

const sectionPositions = requiredSectionIds.map((id) =>
  home.indexOf(`id="${id}"`),
);
record(
  sectionPositions.every((position) => position !== -1),
  "Required section positions could not be calculated",
);
record(
  sectionPositions.every(
    (position, index) => index === 0 || position > sectionPositions[index - 1],
  ),
  "Home section order does not match approved sequence",
);

record(
  !home.includes('id="cultural-context"'),
  "Conditional Cultural Context section is present",
);
record(
  !home.includes('id="partners"'),
  "Conditional Partners section is present",
);
record(
  !home.includes("composition-highlight"),
  "Highlights section is present",
);
record(
  !home.includes("composition-quotation-reflection") &&
    !home.includes("editorial-quote"),
  "Quotation section is present",
);

record(
  home.includes('href="/experience/"') &&
    compactHome.includes("> Explore the Experience <"),
  "Primary Experience CTA missing or incorrect",
);
record(
  home.includes('href="/visit/"') &&
    compactHome.includes("> Plan Your Visit <"),
  "Secondary Visit CTA missing or incorrect",
);
record(
  home.includes('href="/festival/"') &&
    compactHome.includes("> Discover the Festival <") &&
    compactHome.includes("> Explore the Festival Theme <"),
  "Festival actions missing or incorrect",
);

record(!home.includes("/register/"), "Home contains speculative /register/");
record(!home.includes('href="#"'), 'Home contains href="#"');
record(
  home.includes(
    '<button class="button button--secondary" type="button" disabled>',
  ) && home.includes("Destination pending organizer approval"),
  "Registration action is not clearly non-interactive and unresolved",
);

for (const phrase of forbiddenPhrases) {
  record(
    !home.toLowerCase().includes(phrase),
    `Home contains forbidden urgency or ticketing phrase: ${phrase}`,
  );
}

record(!/\b2026-\d{2}-\d{2}\b/.test(home), "Home contains invented date");
record(!home.includes("Eagle Square"), "Home contains invented venue");
record(!home.includes("venue address"), "Home contains venue address language");

for (const name of fakePartnerNames) {
  record(
    !home.toLowerCase().includes(name),
    `Home contains fake partner name: ${name}`,
  );
}

const eventSection = home.slice(
  home.indexOf('id="event-information"'),
  home.indexOf('id="registration-interest"'),
);
for (const value of approvedEventValues) {
  record(
    eventSection.includes(value),
    `Home Event Information missing approved value: ${value}`,
  );
}
record(
  !/>\s*(January|February|March|April|May|June|July|August|September|October|November|December)\b/i.test(
    eventSection,
  ),
  "Home Event Information contains an invented calendar date",
);

record(!home.includes(">Home<"), "Home contains unapproved Home text nav item");
record(
  !home.includes("/dev/foundations/") &&
    !home.includes("/dev/components/") &&
    !home.includes("/dev/content-components/") &&
    !home.includes("/dev/compositions/"),
  "Home links to a development route",
);
record(
  home.includes("site-header") &&
    home.includes("primary-navigation") &&
    home.includes("site-footer") &&
    home.includes("mobile-navigation"),
  "Home does not include the shared shell",
);

for (const page of remainingPlaceholderPublicPages) {
  const content = await read(page);
  record(
    !content.includes("composition-hero") &&
      !content.includes("composition-theme-exploration") &&
      !content.includes("composition-registration-cta"),
    `${page} appears to contain assembled page compositions`,
  );
  record(
    content.includes("Project foundation only") ||
      content.includes("PLACEHOLDER — COPY APPROVAL REQUIRED") ||
      content.includes("chapter-placeholder") ||
      content.includes("Location:"),
    `${page} no longer appears to be placeholder-level`,
  );
}

const experiencePage = await read("experience/index.html");
for (const [index, title] of [
  "01 — Arrival &amp; Cultural Immersion",
  "02 — Memory Wall",
  "03 — Centre for Memories",
  "04 — Theme Conversation",
  "05 — Clan Wars",
  "06 — Learn the Dance",
  "07 — Books &amp; Merchandise",
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
  mainCss.includes("./pages/home.css"),
  "main.css does not import home.css",
);

const homeCss = await read("src/styles/pages/home.css");
record(
  !/#[0-9a-f]{3,8}\b/i.test(homeCss) &&
    !/\brgba?\(/i.test(homeCss) &&
    !/\bhsl[a]?\(/i.test(homeCss),
  "Home CSS contains raw colour literals",
);
record(
  homeCss.includes("var(--") || homeCss.includes("composition"),
  "Home CSS does not consume tokens or composition classes",
);
record(
  !/(^|\n)\.button\s*\{/m.test(homeCss) &&
    !/(^|\n)\.section-header\s*\{/m.test(homeCss) &&
    !/(^|\n)\.experience-item\s*\{/m.test(homeCss),
  "Home CSS duplicates component or composition implementation",
);

for (const page of developmentPages) {
  await read(page);
}

console.log(
  "Home audit note: static checks do not replace browser, responsive, keyboard, screen-reader, or visual QA.",
);

if (errors.length > 0) {
  console.error(`Home audit failed with ${errors.length} issue(s):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `Home audit passed: ${requiredSectionIds.length} section IDs, ${remainingPlaceholderPublicPages.length} remaining placeholder public routes, ${developmentPages.length} development routes checked.`,
);
