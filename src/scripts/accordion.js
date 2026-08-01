export function initializeAccordions() {
  const accordions = document.querySelectorAll("[data-accordion]");

  // TODO: Add optional analytics or advanced accordion instrumentation in a future approved building block.
  if (accordions.length === 0) {
    return;
  }

  accordions.forEach((accordion) => {
    if (accordion.dataset.initialized === "true") {
      return;
    }

    accordion.dataset.initialized = "true";
  });
}
