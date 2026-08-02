import { readdir, readFile } from "node:fs/promises";

const publicPages = [
  "index.html",
  "festival/index.html",
  "experience/index.html",
  "visit/index.html",
];

const htmlPages = [
  ...publicPages,
  "dev/foundations/index.html",
  "dev/components/index.html",
];

const requiredComponentFiles = [
  "buttons.css",
  "links.css",
  "navigation.css",
  "menu-toggle.css",
  "header.css",
  "footer.css",
  "metadata.css",
  "event-details.css",
  "media.css",
  "partner-mark.css",
  "accordion.css",
  "icon-control.css",
  "status-label.css",
];

const expectedChapters = [
  ["chapter-01", "01 — Arrival &amp; Cultural Immersion"],
  ["chapter-02", "02 — Memory Wall"],
  ["chapter-03", "03 — Centre for Memories"],
  ["chapter-04", "04 — Theme Conversation"],
  ["chapter-05", "05 — Clan Wars"],
  ["chapter-06", "06 — Learn the Dance"],
  ["chapter-07", "07 — Books &amp; Merchandise"],
];

const errors = [];

function record(condition, message) {
  if (!condition) {
    errors.push(message);
  }
}

function matches(content, pattern) {
  return Array.from(content.matchAll(pattern));
}

async function read(path) {
  return readFile(path, "utf8");
}

for (const page of htmlPages) {
  const content = await read(page);
  const ids = matches(content, /\sid="([^"]+)"/g).map((match) => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  const h1Count = matches(content, /<h1\b/gi).length;
  const mainContentCount = matches(content, /\sid="main-content"/g).length;

  record(
    !content.includes('href="#"'),
    `${page}: contains a dead href="#" link`,
  );
  record(
    duplicateIds.length === 0,
    `${page}: contains duplicate IDs: ${duplicateIds.join(", ")}`,
  );
  record(h1Count === 1, `${page}: expected exactly one h1, found ${h1Count}`);
  record(
    mainContentCount === 1,
    `${page}: expected one main-content ID, found ${mainContentCount}`,
  );
  record(
    content.includes('class="skip-link" href="#main-content"'),
    `${page}: missing skip link`,
  );
  record(
    content.includes('type="module" src="/src/scripts/main.js"'),
    `${page}: missing JS module entry`,
  );
}

for (const page of publicPages) {
  const content = await read(page);
  const primaryNav = content.match(
    /<nav class="primary-navigation" aria-label="Primary navigation">[\s\S]*?<\/nav>/,
  );

  record(primaryNav, `${page}: missing primary navigation landmark`);

  if (primaryNav) {
    const navMarkup = primaryNav[0];
    record(
      !navMarkup.includes(">Home<"),
      `${page}: primary nav includes unapproved Home item`,
    );
    record(
      navMarkup.includes('href="/festival/"'),
      `${page}: missing Festival link`,
    );
    record(
      navMarkup.includes('href="/experience/"'),
      `${page}: missing Experience link`,
    );
    record(navMarkup.includes('href="/visit/"'), `${page}: missing Visit link`);
    record(
      !navMarkup.includes("/dev/components/"),
      `${page}: links to development component route`,
    );
  }

  record(
    !content.includes('href="/register/"'),
    `${page}: links to unapproved register route`,
  );
  record(
    content.includes("data-menu-toggle"),
    `${page}: missing menu toggle hook`,
  );
  record(
    content.includes("data-mobile-navigation"),
    `${page}: missing mobile navigation hook`,
  );
  record(
    content.includes('aria-expanded="false"'),
    `${page}: menu toggle missing aria-expanded`,
  );
  record(
    content.includes('aria-controls="primary-mobile-navigation"'),
    `${page}: menu toggle missing aria-controls`,
  );
}

const experience = await read("experience/index.html");
for (const [id, title] of expectedChapters) {
  record(
    experience.includes(`id="${id}"`),
    `experience/index.html: missing ${id}`,
  );
  record(
    experience.includes(title),
    `experience/index.html: missing approved title ${title}`,
  );
  record(
    experience.includes(`href="#${id}"`),
    `experience/index.html: missing native link to ${id}`,
  );
}

const root = await read("index.html");
record(
  root.includes("The First Chapter Begins in Abuja") &&
    root.includes('id="home-hero"') &&
    root.includes('id="registration-interest"'),
  "index.html: approved Home content changed",
);

const festival = await read("festival/index.html");
record(
  festival.includes("Festival") &&
    festival.includes("PLACEHOLDER — COPY APPROVAL REQUIRED"),
  "festival/index.html: approved placeholder content changed",
);

const visit = await read("visit/index.html");
record(
  visit.includes("Plan Your Visit") &&
    visit.includes('<dd class="event-details__description">Abuja</dd>'),
  "visit/index.html: approved Visit information changed",
);

const componentDir = await readdir("src/styles/components");
for (const file of requiredComponentFiles) {
  record(
    componentDir.includes(file),
    `src/styles/components/${file}: missing component CSS file`,
  );
}

const mainCss = await read("src/styles/main.css");
for (const file of requiredComponentFiles) {
  record(
    mainCss.includes(`./components/${file}`),
    `src/styles/main.css: missing import for ${file}`,
  );
}

const viteConfig = await read("vite.config.js");
record(
  viteConfig.includes("dev/components/index.html"),
  "vite.config.js: missing dev components input",
);

const devComponents = await read("dev/components/index.html");
for (const label of [
  "Actions",
  "Sizes",
  "Long Labels",
  "Full Width",
  "States",
  "Inverse",
  "Links",
  "Navigation Links",
  "Header States",
  "Mobile Closed",
  "Mobile Open",
  "Footer",
  "Event Details",
  "Metadata",
  "Media",
  "Partner Marks",
  "Accordion",
  "Icon Controls",
  "Status Labels",
  "Focus",
  "Touch Target",
  "320 Width Stress",
  "Reduced Motion",
  "Limitations",
]) {
  record(
    devComponents.includes(label),
    `dev/components/index.html: missing ${label} specimen`,
  );
}

const scripts = await Promise.all([
  read("src/scripts/navigation.js"),
  read("src/scripts/accordion.js"),
]);
record(
  scripts[0].includes("data-menu-toggle"),
  "navigation.js: missing menu toggle behavior hook",
);
record(scripts[0].includes("Escape"), "navigation.js: missing Escape behavior");
record(
  scripts[1].includes("data-accordion"),
  "accordion.js: missing accordion hook",
);

if (errors.length > 0) {
  console.error(`Component audit failed with ${errors.length} issue(s):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `Component audit passed: ${requiredComponentFiles.length} CSS files, ${htmlPages.length} HTML routes checked.`,
);
