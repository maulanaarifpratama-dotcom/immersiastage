import "@testing-library/jest-dom/vitest";

// jsdom ships neither matchMedia nor scrollTo. Both are used by the carousel
// and by route changes, so stub them once for the whole suite.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

window.scrollTo = () => {};
window.Element.prototype.scrollTo = function scrollTo() {};
