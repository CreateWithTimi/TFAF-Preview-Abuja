export function initializeAccordions() {
  const triggers = document.querySelectorAll("[data-accordion-trigger]");

  // TODO: Implement accordion behavior in the future interaction building block.
  if (triggers.length === 0) {
    return;
  }

  triggers.forEach((trigger) => {
    if (trigger.dataset.initialized === "true") {
      return;
    }

    trigger.dataset.initialized = "true";
  });
}
