import { readFile } from "node:fs/promises";

const visitPath = "visit/index.html";
const developmentPages = [
  "dev/foundations/index.html",
  "dev/components/index.html",
  "dev/content-components/index.html",
  "dev/compositions/index.html",
];

const requiredSectionIds = [
  "visit-hero",
  "event-information",
  "visitor-guidance",
  "venue-media",
  "frequently-asked-questions",
  "registration-interest",
  "closing",
];

const approvedEventValues = [
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
  "ticket price",
  "ticket pricing",
  "scarcity",
  "register now",
  "parking",
  "transport",
  "shuttle",
  "address",
  "security",
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

const visit = await read(visitPath);
const compactVisit = compactText(visit);

record(visit.includes("<!doctype html>"), "Visit route is missing");
record(
  visit.includes('<main id="main-content">'),
  "Visit missing main-content",
);
record(
  countMatches(visit, /\sid="main-content"/g) === 1,
  "Visit must contain one main-content ID",
);
record(countMatches(visit, /<h1\b/gi) === 1, "Visit must contain one H1");
record(
  visit.includes('<h1 id="visit-heading"') &&
    compactVisit.includes("> Plan Your Visit <"),
  "Visit H1 does not match approved wording",
);
record(
  !visit.includes("FINAL VISIT H1 REQUIRES") &&
    !visit.includes("PLACEHOLDER — FINAL VISIT H1"),
  "Visit H1 must not be marked as placeholder",
);

for (const id of requiredSectionIds) {
  record(visit.includes(`id="${id}"`), `Visit missing section id ${id}`);
}

const sectionPositions = requiredSectionIds.map((id) =>
  visit.indexOf(`id="${id}"`),
);
record(
  sectionPositions.every((position) => position !== -1),
  "Visit section positions could not be calculated",
);
record(
  sectionPositions.every(
    (position, index) => index === 0 || position > sectionPositions[index - 1],
  ),
  "Visit section order does not match approved sequence",
);

record(
  visit.includes("composition-hero--minimal"),
  "Visit Hero does not use the approved practical/minimal hero composition",
);
record(
  visit.includes("composition-event-information"),
  "Event Information composition missing",
);
record(
  visit.includes("composition-faq-visitor-guidance"),
  "Visitor Guidance or FAQ composition missing",
);
record(
  visit.includes("composition-editorial-media"),
  "Venue Media composition missing",
);
record(
  visit.includes("composition-registration-cta"),
  "Registration CTA composition missing",
);
record(visit.includes("composition-closing"), "Closing Composition missing");

record(
  !visit.includes('id="cultural-context"') &&
    !visit.includes("composition-cultural-context"),
  "Separate Cultural Context section is present",
);
record(!visit.includes("composition-partners"), "Partners section is present");
record(
  !visit.includes("composition-highlight"),
  "Highlight section is present",
);
record(
  !visit.includes("composition-quotation-reflection") &&
    !visit.includes("editorial-quote"),
  "Quotation section is present",
);
record(
  !visit.includes('id="experience-summary"') &&
    !visit.includes("composition-experience-overview"),
  "Experience Summary is present",
);
record(
  countMatches(visit, /composition-editorial-media/g) === 1,
  "Additional Editorial Media section is present",
);

const eventSection = visit.slice(
  visit.indexOf('id="event-information"'),
  visit.indexOf('id="visitor-guidance"'),
);
record(
  eventSection.includes("<dl"),
  "Event Information must use a definition list",
);
for (const [label, value] of approvedEventValues) {
  record(
    eventSection.includes(`<dt class="event-detail__label">${label}</dt>`),
    `Event Information missing ${label}`,
  );
  record(
    eventSection.includes(`<dd class="event-detail__value">${value}</dd>`),
    `Event Information missing ${value}`,
  );
}
record(
  countMatches(eventSection, /<dt class="event-detail__label">/g) === 4 &&
    countMatches(eventSection, /<dd class="event-detail__value">/g) === 4,
  "Event Information must contain exactly four label/value pairs",
);

record(!/\b2026-\d{2}-\d{2}\b/.test(visit), "Visit contains invented date");
record(!/\b\d{1,2}:\d{2}\b/.test(visit), "Visit contains invented time");
record(!visit.includes("Eagle Square"), "Visit contains invented venue");
record(
  !visit.toLowerCase().includes("venue address"),
  "Visit contains invented address language",
);

const guidance = visit.slice(
  visit.indexOf('id="visitor-guidance"'),
  visit.indexOf('id="venue-media"'),
);
record(guidance.includes("Visitor Guidance"), "Visitor Guidance is missing");
record(
  guidance.includes(
    "PLACEHOLDER — VISITOR GUIDANCE REQUIRES ORGANIZER APPROVAL",
  ),
  "Visitor Guidance is not marked as placeholder in source",
);

const venueMedia = visit.slice(
  visit.indexOf('id="venue-media"'),
  visit.indexOf('id="frequently-asked-questions"'),
);
record(
  venueMedia.includes("content-media-placeholder"),
  "Venue Media placeholder missing",
);
record(
  venueMedia.includes(
    "CONDITIONAL CONTENT — FINAL VENUE MEDIA REQUIRES ORGANIZER APPROVAL",
  ),
  "Venue Media is not marked conditional",
);
record(venueMedia.includes("<figcaption"), "Venue Media caption missing");
record(venueMedia.includes("credit"), "Venue Media credit missing");

const faq = visit.slice(
  visit.indexOf('id="frequently-asked-questions"'),
  visit.indexOf('id="registration-interest"'),
);
record(
  faq.includes("<details") && faq.includes("<summary"),
  "FAQ must use native details/summary",
);
record(
  countMatches(faq, /<details class="accordion__item">/g) >= 3,
  "FAQ must include placeholder items",
);
record(
  faq.includes("PLACEHOLDER — FAQ CONTENT REQUIRES ORGANIZER APPROVAL") &&
    faq.includes("Placeholder question requiring organizer approval") &&
    faq.includes("Placeholder answer requiring organizer approval."),
  "FAQ content is not clearly placeholder",
);
record(
  !/<h[1-6][^>]*>Placeholder question/i.test(faq),
  "FAQ items use unnecessary page-level heading landmarks",
);

const registration = visit.slice(
  visit.indexOf('id="registration-interest"'),
  visit.indexOf('id="closing"'),
);
record(
  registration.includes("Register Interest"),
  "Registration CTA missing label",
);
record(
  registration.includes(
    "Registration details will be confirmed by the organizers.",
  ),
  "Registration CTA missing approved note",
);
record(
  registration.includes(
    '<button class="button button--secondary" type="button" disabled>',
  ),
  "Register Interest is not non-interactive",
);
record(
  !registration.includes("<a "),
  "Register Interest has a speculative link",
);
record(!visit.includes("/register/"), "Visit contains speculative /register/");
record(!visit.includes('href="#"'), 'Visit contains href="#"');
record(!/<form\b/i.test(visit), "Visit contains a form");

for (const phrase of forbiddenPhrases) {
  record(
    !visit.toLowerCase().includes(phrase),
    `Visit contains forbidden or unapproved phrase: ${phrase}`,
  );
}

record(
  visit.includes('href="/experience/"') &&
    compactVisit.includes("> Explore the Experience <"),
  "Explore the Experience CTA missing or incorrect",
);
record(
  visit.indexOf('id="closing"') > visit.indexOf('id="registration-interest"'),
  "Closing does not appear after Registration CTA",
);
record(
  countMatches(visit, /id="registration-interest"/g) === 1,
  "Duplicate registration section or secondary CTA section detected",
);

record(
  !visit.includes(">Home<"),
  "Visit contains unapproved Home text nav item",
);
record(
  visit.includes('href="/visit/"') && visit.includes('aria-current="page"'),
  "Visit navigation does not mark the current page",
);
record(
  !visit.includes("/dev/foundations/") &&
    !visit.includes("/dev/components/") &&
    !visit.includes("/dev/content-components/") &&
    !visit.includes("/dev/compositions/"),
  "Visit links to a development route",
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

const experience = await read("experience/index.html");
record(
  experience.includes(
    "PLACEHOLDER — FINAL EXPERIENCE H1 REQUIRES ORGANIZER APPROVAL",
  ) &&
    experience.includes('id="experience-journey"') &&
    experience.includes('href="#chapter-01"'),
  "Experience route no longer appears preserved",
);
for (const id of [
  "chapter-01",
  "chapter-02",
  "chapter-03",
  "chapter-04",
  "chapter-05",
  "chapter-06",
  "chapter-07",
]) {
  record(experience.includes(`id="${id}"`), `Experience route missing ${id}`);
}

const mainCss = await read("src/styles/main.css");
record(
  mainCss.includes("./pages/visit.css"),
  "main.css does not import visit.css",
);

const visitCss = await read("src/styles/pages/visit.css");
record(
  !/#[0-9a-f]{3,8}\b/i.test(visitCss) &&
    !/\brgba?\(/i.test(visitCss) &&
    !/\bhsl[a]?\(/i.test(visitCss),
  "Visit CSS contains raw colour literals",
);
record(
  visitCss.includes("var(--") || visitCss.includes("composition"),
  "Visit CSS does not consume tokens or composition classes",
);
record(
  !/(^|\n)\.accordion\s*\{/m.test(visitCss) &&
    !/(^|\n)\.event-detail\s*\{/m.test(visitCss) &&
    !/(^|\n)\.button\s*\{/m.test(visitCss),
  "Visit CSS duplicates shared/content implementation",
);

const scripts = await Promise.all([
  read("src/scripts/main.js"),
  read("src/scripts/navigation.js"),
  read("src/scripts/accordion.js"),
]);
record(
  !scripts.join("\n").includes("visit"),
  "Visit-specific JavaScript was added",
);

for (const page of developmentPages) {
  await read(page);
}

console.log(
  "Visit audit note: static checks do not replace browser, responsive, keyboard, screen-reader, FAQ interaction, or visual QA.",
);

if (errors.length > 0) {
  console.error(`Visit audit failed with ${errors.length} issue(s):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `Visit audit passed: ${requiredSectionIds.length} section IDs, ${approvedEventValues.length} event values, ${developmentPages.length} development routes checked.`,
);
