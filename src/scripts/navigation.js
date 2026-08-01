export function initializeNavigation() {
  const headers = document.querySelectorAll("[data-site-header]");

  // TODO: Expand mobile navigation behavior in the future interaction building block.
  if (headers.length === 0) {
    return;
  }

  headers.forEach((header) => {
    if (header.dataset.navigationInitialized === "true") {
      return;
    }

    const toggle = header.querySelector("[data-menu-toggle]");
    const navigation = header.querySelector("[data-mobile-navigation]");

    if (!toggle || !navigation) {
      return;
    }

    const label = toggle.querySelector(".menu-toggle__label");

    function setMenuState(isOpen, shouldFocusToggle = false) {
      toggle.setAttribute("aria-expanded", String(isOpen));
      header.dataset.menuOpen = String(isOpen);
      navigation.hidden = !isOpen;

      if (label) {
        label.textContent = isOpen ? "Close menu" : "Open menu";
      }

      if (shouldFocusToggle) {
        toggle.focus();
      }
    }

    header.classList.add("has-js-navigation");
    header.dataset.navigationInitialized = "true";
    setMenuState(false);

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      setMenuState(!isOpen);
    });

    navigation.addEventListener("click", (event) => {
      const link = event.target.closest("[data-menu-link]");

      if (link) {
        setMenuState(false);
      }
    });

    header.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMenuState(false, true);
      }
    });
  });
}
