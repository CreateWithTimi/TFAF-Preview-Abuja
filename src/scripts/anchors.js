export function initializeChapterAnchors() {
  const chapterLinks = document.querySelectorAll("[data-chapter-link]");

  // TODO: Implement enhanced chapter-anchor behavior in a future approved building block.
  if (chapterLinks.length === 0) {
    return;
  }

  chapterLinks.forEach((link) => {
    if (link.dataset.initialized === "true") {
      return;
    }

    link.dataset.initialized = "true";
  });
}
