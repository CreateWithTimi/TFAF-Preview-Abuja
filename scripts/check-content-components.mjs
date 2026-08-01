import { readdir, readFile } from "node:fs/promises";

const publicPages = [
  "index.html",
  "festival/index.html",
  "experience/index.html",
  "visit/index.html",
];

const allHtmlPages = [
  ...publicPages,
  "dev/foundations/index.html",
  "dev/components/index.html",
  "dev/content-components/index.html",
];

const requiredContentFiles = [
  "eyebrow.css",
  "section-header.css",
  "editorial-intro.css",
  "theme-statement.css",
  "quote.css",
  "experience.css",
  "event-information.css",
  "metadata.css",
  "context-note.css",
  "highlight.css",
  "partner-group.css",
  "media-placeholder.css",
  "cta.css",
];

const requiredFamilies = [
  "content-eyebrow",
  "section-header",
  "editorial-intro",
  "theme-statement",
  "editorial-quote",
  "experience-item",
  "experience-sequence",
  "event-detail",
  "event-detail-group",
  "content-metadata-item",
  "content-metadata-group",
  "context-note",
  "content-highlight",
  "partner-group",
  "content-media-placeholder",
  "content-cta",
];

const approvedChapterTitles = [
  "01 — Arrival &amp; Cultural Immersion",
  "02 — Memory Wall",
  "03 — Centre for Memories",
  "04 — Theme Conversation",
  "05 — Clan Wars",
  "06 — Learn the Dance",
  "07 — Books &amp; Merchandise",
];

const forbiddenPhrases = [
  "limited time",
  "buy now",
  "early bird",
  "sold out",
  "tickets available",
  "venue address",
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

const contentDir = await readdir("src/styles/content");
for (const file of requiredContentFiles) {
  record(contentDir.includes(file), `Missing src/styles/content/${file}`);
}

const mainCss = await read("src/styles/main.css");
record(
  mainCss.includes("components, content, compositions"),
  "main.css does not declare the content cascade layer in the expected order",
);

for (const file of requiredContentFiles) {
  record(
    mainCss.includes(`./content/${file}`),
    `main.css does not import ${file}`,
  );
}

const viteConfig = await read("vite.config.js");
record(
  viteConfig.includes("dev/content-components/index.html"),
  "vite.config.js does not include the content components route",
);

const contentPage = await read("dev/content-components/index.html");
record(
  contentPage.includes("Development Reference — Not a Public Festival Page"),
  "Content reference page is missing the development-only warning",
);

for (const family of requiredFamilies) {
  record(contentPage.includes(family), `Content page missing ${family}`);
}

for (const phrase of [
  "Section Header — alignments",
  "Section Header — scales",
  "Section Header — no action",
  "Editorial Intro — long content",
  "Editorial Intro — missing optional regions",
  "Theme Statement — preview/small equivalent",
  "Theme Statement — full/large equivalent",
  "Theme Statement — alignments",
  "Quote — long content",
  "Quote — missing attribution",
  "Experience Item — media left",
  "Experience Item — media right",
  "Experience Item — no media",
  "Experience Sequence — seven approved titles",
  "Event Detail Group — full",
  "Media Placeholder — every verified type",
  "Media Placeholder — every verified ratio",
  "CTA — registration placeholder",
  "Hidden-region examples",
  "Long-content stress examples",
  "320px examples",
  "Components under Design Property Review",
]) {
  record(
    contentPage.includes(phrase),
    `Content page missing specimen: ${phrase}`,
  );
}

for (const title of [
  "Arrival &amp; Cultural Immersion",
  "Memory Wall",
  "Centre for Memories",
  "Theme Conversation",
  "Clan Wars",
  "Learn the Dance",
  "Books &amp; Merchandise",
]) {
  record(
    contentPage.includes(title),
    `Content page missing approved title ${title}`,
  );
}

record(!contentPage.includes("faq-group"), "FAQ group class was invented");
record(!contentPage.includes("content/faq"), "FAQ content family was invented");

const ids = Array.from(contentPage.matchAll(/\sid="([^"]+)"/g)).map(
  (match) => match[1],
);
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
record(duplicates.length === 0, `Duplicate IDs: ${duplicates.join(", ")}`);

for (const page of allHtmlPages) {
  const content = await read(page);
  record(!content.includes('href="#"'), `${page}: contains href="#"`);
  record(
    !content.includes('href="/register/"'),
    `${page}: contains /register/`,
  );
}

for (const page of publicPages) {
  const content = await read(page);
  record(
    !content.includes("/dev/content-components/"),
    `${page}: links to development content route`,
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

const contentCss = (
  await Promise.all(
    requiredContentFiles.map((file) => read(`src/styles/content/${file}`)),
  )
).join("\n");

record(
  !/#(?:[0-9a-fA-F]{3,8})\b/.test(contentCss),
  "Content CSS contains raw hex colour literals",
);
record(
  !contentCss.includes("data-accordion"),
  "Content CSS recreates accordion behavior",
);
record(
  !/^\.button\s*\{/m.test(contentCss),
  "Content CSS recreates shared button CSS",
);
record(
  !contentCss.includes("--dev-"),
  "Content CSS contains deprecated dev token names",
);

for (const phrase of forbiddenPhrases) {
  record(
    !contentPage.toLowerCase().includes(phrase),
    `Forbidden urgency or event phrase present: ${phrase}`,
  );
}

for (const unapproved of ["Lagos", "Enugu", "Transcorp", "Congress Hall"]) {
  record(
    !contentPage.includes(unapproved),
    `Unapproved event value present: ${unapproved}`,
  );
}

console.log(
  "Content audit note: static checks do not replace browser, keyboard, screen-reader, or visual QA.",
);

if (errors.length > 0) {
  console.error(
    `Content component audit failed with ${errors.length} issue(s):`,
  );
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `Content component audit passed: ${requiredContentFiles.length} CSS files, ${requiredFamilies.length} content families, ${allHtmlPages.length} HTML routes checked.`,
);
