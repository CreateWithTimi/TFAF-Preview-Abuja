import { initializeAccordions } from "./accordion.js";
import { initializeChapterAnchors } from "./anchors.js";
import { initializeNavigation } from "./navigation.js";

function initializeSite() {
  initializeNavigation();
  initializeAccordions();
  initializeChapterAnchors();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSite, {
    once: true,
  });
} else {
  initializeSite();
}
