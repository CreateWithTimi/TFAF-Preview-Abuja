export function initializeNavigation() {
  const navigation = document.querySelector("[data-mobile-menu]");

  // TODO: Implement mobile navigation behavior in a future approved building block.
  if (!navigation) {
    return;
  }

  if (navigation.dataset.initialized === "true") {
    return;
  }

  navigation.dataset.initialized = "true";
}
