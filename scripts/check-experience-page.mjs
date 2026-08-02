import { readFile } from "node:fs/promises";

const experiencePath = "experience/index.html";
const developmentPages = [
  "dev/foundations/index.html",
  "dev/components/index.html",
  "dev/content-components/index.html",
  "dev/compositions/index.html",
];

const requiredSectionIds = [
  "experience-hero",
  "experience-overview",
  "experience-chapters",
  "experience-journey",
  "plan-your-visit",
  "closing",
];

const chapters = [
  ["chapter-01", "01", "Arrival &amp; Cultural Immersion"],
  ["chapter-02", "02", "Memory Wall"],
  ["chapter-03", "03", "Centre for Memories"],
  ["chapter-04", "04", "Theme Conversation"],
  ["chapter-05", "05", "Clan Wars"],
  ["chapter-06", "06", "Learn the Dance"],
  ["chapter-07", "07", "Books &amp; Merchandise"],
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

const experience = await read(experiencePath);
const compactExperience = compactText(experience);

record(experience.includes("<!doctype html>"), "Experience route is missing");
record(
  experience.includes('<main id="main-content">'),
  "Experience missing main-content",
);
record(
  countMatches(experience, /\sid="main-content"/g) === 1,
  "Experience must contain one main-content ID",
);
record(
  countMatches(experience, /<h1\b/gi) === 1,
  "Experience must contain one H1",
);
record(
  experience.includes('<h1 id="experience-heading"') &&
    compactExperience.includes("> The Experience <"),
  "Experience H1 does not match the temporary approved placeholder",
);
record(
  experience.includes(
    "PLACEHOLDER — FINAL EXPERIENCE H1 REQUIRES ORGANIZER APPROVAL",
  ),
  "Experience H1 is missing the required approval comment",
);

for (const id of requiredSectionIds) {
  record(
    experience.includes(`id="${id}"`),
    `Experience missing section id ${id}`,
  );
}

const sectionPositions = requiredSectionIds.map((id) =>
  experience.indexOf(`id="${id}"`),
);
record(
  sectionPositions.every((position) => position !== -1),
  "Experience section positions could not be calculated",
);
record(
  sectionPositions.every(
    (position, index) => index === 0 || position > sectionPositions[index - 1],
  ),
  "Experience section order does not match approved sequence",
);

record(
  experience.includes("composition-hero--immersive"),
  "Experience Hero does not use the approved immersive composition",
);
record(
  experience.includes("composition-experience-overview"),
  "Experience Overview composition missing",
);
record(
  experience.includes("composition-experience-journey"),
  "Full Experience Journey composition missing",
);
record(
  experience.includes("composition-closing"),
  "Closing Composition missing",
);

record(
  experience.includes('href="#chapter-01"') &&
    compactExperience.includes("> Begin the Journey <"),
  "Hero Begin the Journey CTA is missing or incorrect",
);
record(
  experience.includes('href="/visit/"') &&
    compactExperience.includes("> Plan Your Visit <"),
  "Plan Your Visit CTA is missing or incorrect",
);
record(
  !experience.includes("/register/"),
  "Experience contains speculative /register/",
);
record(!experience.includes('href="#"'), 'Experience contains href="#"');
record(
  experience.includes(
    '<button class="button button--secondary" type="button" disabled>',
  ) &&
    experience.includes(
      "Registration details will be confirmed by the organizers.",
    ),
  "Register Interest treatment is not clearly non-interactive and unresolved",
);

record(
  experience.includes(
    '<nav class="chapter-navigation" aria-label="Experience chapters">',
  ),
  "Chapter navigation missing labelled secondary nav",
);

const chapterNavStart = experience.indexOf('<nav class="chapter-navigation"');
const chapterNav = experience.slice(
  chapterNavStart,
  experience.indexOf("</nav>", chapterNavStart),
);
for (const [id, number, title] of chapters) {
  record(
    chapterNav.includes(`href="#${id}"`),
    `Chapter navigation missing #${id}`,
  );
  record(chapterNav.includes(number), `Chapter nav missing ${number}`);
  record(chapterNav.includes(title), `Chapter nav missing ${title}`);
}

const journey = experience.slice(
  experience.indexOf('id="experience-journey"'),
  experience.indexOf('id="plan-your-visit"'),
);
record(
  journey.includes("<ol") && journey.includes("</ol>"),
  "Journey does not use ordered semantics",
);
record(
  !/\shidden(=|>|\s)/.test(journey),
  "A chapter appears hidden in the journey",
);

const chapterPositions = [];
for (const [id, number, title] of chapters) {
  record(
    countMatches(experience, new RegExp(`\\sid="${id}"`, "g")) === 1,
    `Experience must contain ${id} exactly once`,
  );
  record(journey.includes(`id="${id}"`), `Journey missing ${id}`);
  record(journey.includes(number), `Journey missing number ${number}`);
  record(journey.includes(title), `Journey missing title ${title}`);
  chapterPositions.push(journey.indexOf(`id="${id}"`));
}
record(
  chapterPositions.every(
    (position, index) => index === 0 || position > chapterPositions[index - 1],
  ),
  "Chapter order is not preserved",
);

record(
  !/Books &amp; Merchandise[\s\S]*Books &amp; Merchandise[\s\S]*Books &amp; Merchandise/.test(
    journey,
  ),
  "Journey contains repeated placeholder chapter labels",
);
record(
  !experience.includes("scroll-spy") &&
    !experience.includes("data-scroll-spy") &&
    !experience.includes("progress-tracker") &&
    !experience.includes("carousel"),
  "Experience includes prohibited scroll-spy, progress, or carousel structure",
);

record(
  experience.indexOf('id="plan-your-visit"') >
    experience.indexOf('id="experience-journey"'),
  "Plan Your Visit CTA does not appear after the journey",
);
record(
  !experience.includes('id="registration-interest"'),
  "Dedicated Registration section is present",
);
record(
  !experience.includes("composition-quotation-reflection") &&
    !experience.includes("editorial-quote"),
  "Quotation and Reflection section is present",
);
record(
  !experience.includes("composition-highlight"),
  "Highlight Composition is present",
);
record(
  !experience.includes("composition-editorial-media"),
  "Extra Editorial Media section is present",
);

for (const phrase of forbiddenPhrases) {
  record(
    !experience.toLowerCase().includes(phrase),
    `Experience contains forbidden urgency or ticketing phrase: ${phrase}`,
  );
}
record(
  !/\b2026-\d{2}-\d{2}\b/.test(experience),
  "Experience contains invented event date",
);
record(
  !experience.includes("Eagle Square"),
  "Experience contains invented venue",
);

record(
  !experience.includes(">Home<"),
  "Experience contains unapproved Home text nav item",
);
record(
  experience.includes('href="/experience/"') &&
    experience.includes('aria-current="page"'),
  "Experience navigation does not mark the current page",
);
record(
  !experience.includes("/dev/foundations/") &&
    !experience.includes("/dev/components/") &&
    !experience.includes("/dev/content-components/") &&
    !experience.includes("/dev/compositions/"),
  "Experience links to a development route",
);

const home = await read("index.html");
record(
  home.includes("The First Chapter Begins in Abuja") &&
    home.includes('id="home-hero"') &&
    home.includes('id="featured-chapter"'),
  "Home route no longer appears preserved",
);

const festival = await read("festival/index.html");
record(
  festival.includes(
    "PLACEHOLDER — FINAL FESTIVAL H1 REQUIRES ORGANIZER APPROVAL",
  ) &&
    festival.includes('id="festival-hero"') &&
    festival.includes('id="experience-summary"'),
  "Festival route no longer appears preserved",
);

const visit = await read("visit/index.html");
record(
  !visit.includes("composition-hero") &&
    !visit.includes("composition-registration-cta") &&
    visit.includes("Location:"),
  "Visit route no longer appears placeholder-level",
);

const mainCss = await read("src/styles/main.css");
record(
  mainCss.includes("./pages/experience.css"),
  "main.css does not import experience.css",
);

const experienceCss = await read("src/styles/pages/experience.css");
record(
  !/#[0-9a-f]{3,8}\b/i.test(experienceCss) &&
    !/\brgba?\(/i.test(experienceCss) &&
    !/\bhsl[a]?\(/i.test(experienceCss),
  "Experience CSS contains raw colour literals",
);
record(
  experienceCss.includes("var(--") || experienceCss.includes("composition"),
  "Experience CSS does not consume tokens or composition classes",
);
record(
  !/(^|\n)\.button\s*\{/m.test(experienceCss) &&
    !/(^|\n)\.experience-item\s*\{/m.test(experienceCss) &&
    !/(^|\n)\.composition\s*\{/m.test(experienceCss),
  "Experience CSS duplicates shared, content, or composition implementation",
);

for (const page of developmentPages) {
  await read(page);
}

console.log(
  "Experience audit note: static checks do not replace browser, responsive, keyboard, screen-reader, or visual QA.",
);

if (errors.length > 0) {
  console.error(`Experience audit failed with ${errors.length} issue(s):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `Experience audit passed: ${requiredSectionIds.length} section IDs, ${chapters.length} chapter anchors, ${developmentPages.length} development routes checked.`,
);
