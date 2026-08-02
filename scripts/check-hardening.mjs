import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const publicPages = [
  { path: "index.html", route: "/", current: null },
  { path: "festival/index.html", route: "/festival/", current: "Festival" },
  {
    path: "experience/index.html",
    route: "/experience/",
    current: "Experience",
  },
  { path: "visit/index.html", route: "/visit/", current: "Visit" },
];

const developmentPages = [
  "dev/foundations/index.html",
  "dev/components/index.html",
  "dev/content-components/index.html",
  "dev/compositions/index.html",
];

const pageAudits = [
  "home:check",
  "festival:check",
  "experience:check",
  "visit:check",
];

const chapterAnchors = [
  ["chapter-01", "01", "Arrival &amp; Cultural Immersion"],
  ["chapter-02", "02", "Memory Wall"],
  ["chapter-03", "03", "Centre for Memories"],
  ["chapter-04", "04", "Theme Conversation"],
  ["chapter-05", "05", "Clan Wars"],
  ["chapter-06", "06", "Learn the Dance"],
  ["chapter-07", "07", "Books &amp; Merchandise"],
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

async function readDirectoryFiles(directory, extension) {
  const names = await readdir(directory);
  return Promise.all(
    names
      .filter((name) => name.endsWith(extension))
      .map(async (name) => ({
        path: join(directory, name),
        content: await read(join(directory, name)),
      })),
  );
}

function runAudit(script) {
  const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
  const result = spawnSync(npmCommand, ["run", "--silent", script], {
    encoding: "utf8",
  });

  record(result.status === 0, `${script} failed:\n${result.stderr}`);
}

function extractHeader(content) {
  const start = content.indexOf("<header");
  const end = content.indexOf("</header>");

  return start === -1 || end === -1 ? "" : content.slice(start, end);
}

function extractSection(content, id, nextId) {
  const start = content.indexOf(`id="${id}"`);
  const end = nextId ? content.indexOf(`id="${nextId}"`, start) : -1;

  if (start === -1) {
    return "";
  }

  return end === -1 ? content.slice(start) : content.slice(start, end);
}

function uniqueIdsAreValid(content, path) {
  const ids = Array.from(content.matchAll(/\sid="([^"]+)"/g)).map(
    (match) => match[1],
  );
  const uniqueIds = new Set(ids);

  record(ids.length === uniqueIds.size, `${path}: duplicate IDs found`);
}

function publicNavigationIsValid(content, path, current) {
  const header = extractHeader(content);

  record(header.includes('href="/"'), `${path}: identity link is missing`);
  record(
    !/>\s*Home\s*</.test(header),
    `${path}: unapproved Home text navigation item found`,
  );
  record(
    header.includes('href="/festival/"') &&
      header.includes('href="/experience/"') &&
      header.includes('href="/visit/"'),
    `${path}: primary route links are incomplete`,
  );

  const currentCount = countMatches(header, /aria-current="page"/g);
  if (current === null) {
    record(currentCount === 0, `${path}: Home must not mark text nav current`);
  } else {
    record(
      currentCount === 2,
      `${path}: expected desktop and mobile current states for ${current}`,
    );
    record(
      new RegExp(`aria-current="page"[\\s\\S]*>${current}<|>${current}<`).test(
        header,
      ),
      `${path}: current state for ${current} is missing or mismatched`,
    );
  }
}

function registrationIsNonFunctional(content, path) {
  const sections = [
    extractSection(content, "registration-interest", "closing"),
    extractHeader(content),
    content.slice(content.indexOf("<footer")),
  ].filter(Boolean);

  record(
    content.includes("Register Interest"),
    `${path}: Register Interest placeholder missing`,
  );
  record(
    !content.includes("/register/"),
    `${path}: speculative /register/ route found`,
  );
  record(!content.includes('href="#"'), `${path}: dead href="#" found`);

  for (const section of sections) {
    if (section.includes("Register Interest")) {
      record(
        !/<a\b[^>]*>\s*Register Interest\s*</.test(section),
        `${path}: Register Interest rendered as a live link`,
      );
    }
  }
}

for (const audit of pageAudits) {
  runAudit(audit);
}

const publicContents = await Promise.all(
  publicPages.map(async (page) => ({
    ...page,
    content: await read(page.path),
  })),
);

for (const page of publicContents) {
  uniqueIdsAreValid(page.content, page.path);
  publicNavigationIsValid(page.content, page.path, page.current);
  registrationIsNonFunctional(page.content, page.path);

  record(
    !page.content.includes("/dev/foundations/") &&
      !page.content.includes("/dev/components/") &&
      !page.content.includes("/dev/content-components/") &&
      !page.content.includes("/dev/compositions/"),
    `${page.path}: public page links to development route`,
  );
}

for (const path of developmentPages) {
  await read(path);
}

const experience = publicContents.find(
  (page) => page.path === "experience/index.html",
).content;
const chapterNavigation = extractSection(
  experience,
  "experience-chapters",
  "experience-journey",
);
const journey = extractSection(
  experience,
  "experience-journey",
  "plan-your-visit",
);

record(
  experience.includes('href="#chapter-01"') &&
    experience.includes("Begin the Journey"),
  "Experience hero CTA must link to #chapter-01",
);
record(
  chapterNavigation.includes('<nav class="chapter-navigation"') &&
    chapterNavigation.includes('aria-label="Experience chapters"'),
  "Chapter navigation landmark missing",
);
record(
  !/carousel|overflow-auto|horizontal-scroll/i.test(chapterNavigation),
  "Chapter navigation includes a prohibited carousel or horizontal-scroll-only pattern",
);

for (const [id, number, title] of chapterAnchors) {
  record(
    countMatches(experience, new RegExp(`\\sid="${id}"`, "g")) === 1,
    `Experience must contain ${id} exactly once`,
  );
  record(
    chapterNavigation.includes(`href="#${id}"`),
    `Chapter navigation missing #${id}`,
  );
  record(journey.includes(number), `Journey missing chapter number ${number}`);
  record(journey.includes(title), `Journey missing exact title ${title}`);
}

const visit = publicContents.find(
  (page) => page.path === "visit/index.html",
).content;
const faq = extractSection(
  visit,
  "frequently-asked-questions",
  "registration-interest",
);
record(faq.includes("<details"), "FAQ must use native details");
record(faq.includes("<summary"), "FAQ must use native summary");
record(
  countMatches(faq, /<details class="accordion__item">/g) >= 3,
  "FAQ placeholder disclosure items missing",
);

const scripts = await Promise.all(
  [
    "src/scripts/main.js",
    "src/scripts/navigation.js",
    "src/scripts/accordion.js",
  ].map(read),
);
const scriptsText = scripts.join("\n");

record(
  !/scroll-spy|data-scroll-spy|progress-tracker/i.test(scriptsText),
  "Scroll-spy code found",
);
record(
  !/position:\s*sticky|sticky-header/i.test(
    (await read("src/styles/main.css")) + scriptsText,
  ),
  "Sticky header implementation found",
);
record(
  !/summary[\s\S]*addEventListener|addEventListener[\s\S]*summary|\.open\s*=/.test(
    await read("src/scripts/accordion.js"),
  ),
  "Custom FAQ accordion JavaScript found",
);

const styleFiles = [
  ...(await readDirectoryFiles("src/styles/foundations", ".css")),
  ...(await readDirectoryFiles("src/styles/components", ".css")),
  ...(await readDirectoryFiles("src/styles/content", ".css")),
  ...(await readDirectoryFiles("src/styles/compositions", ".css")),
  ...(await readDirectoryFiles("src/styles/pages", ".css")),
];
const allCss = styleFiles.map((file) => file.content).join("\n");
const pageCss = styleFiles
  .filter((file) => file.path.includes("src/styles/pages/"))
  .map((file) => file.content)
  .join("\n");

record(
  !/(^|\n)\s*(html|body)\s*\{[^}]*overflow-x:\s*hidden/ims.test(allCss),
  "Root overflow-x hidden is used as a blanket overflow fix",
);
record(
  !/text-overflow:\s*ellipsis/i.test(allCss),
  "Essential text may be hidden by ellipsis",
);
record(!/outline:\s*(0|none)/i.test(allCss), "Focus outline removal found");
record(
  /:focus-visible\s*\{[\s\S]*outline:\s*var\(--border-medium\)\s+solid\s+var\(--color-border-focus\)/.test(
    allCss,
  ),
  "Tokenized focus-visible outline is missing",
);
record(
  /prefers-reduced-motion:\s*reduce/.test(allCss),
  "Reduced-motion rule is missing",
);
record(
  !/#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/i.test(pageCss),
  "Page styles contain prohibited raw colour literals",
);
record(
  !/@media[^{]+\{[\s\S]{0,220}#(home-hero|festival-hero|experience-hero|visit-hero|event-information|experience-journey|registration-interest)[^{]*\{[^}]*display:\s*none/i.test(
    allCss,
  ),
  "Required page content appears hidden by breakpoint",
);
record(
  !/(^|\n)\s*\.(composition|section-header|experience-item|event-detail|accordion|button|primary-navigation__link|mobile-navigation__link|footer-navigation__link)[^{]*\{[^}]*(?<![-\w])height\s*:/imu.test(
    allCss,
  ),
  "Required component or composition uses fixed height likely to clip text",
);

record(
  allCss.includes("min-block-size: 44px") &&
    allCss.includes(".accordion__summary") &&
    allCss.includes(".menu-toggle"),
  "Touch target hardening is missing",
);
record(
  existsSync("docs/responsive-interaction-qa.md"),
  "Manual responsive interaction QA protocol missing",
);
record(
  existsSync("tests/fixtures/long-content-stress.md"),
  "Long-content stress fixture missing",
);

if (errors.length > 0) {
  console.error("Hardening audit failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  "Hardening audit note: static checks do not replace browser, responsive, keyboard, screen-reader, or visual QA.",
);
console.log(
  `Hardening audit passed: ${publicPages.length} public routes, ${developmentPages.length} development routes, ${chapterAnchors.length} chapter anchors checked.`,
);
