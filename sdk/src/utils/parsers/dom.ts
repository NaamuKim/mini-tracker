export const getQuerySelector = (element: Element): string => {
  const parts: string[] = [];

  while (element && element.nodeType === Node.ELEMENT_NODE) {
    let selector = element.nodeName.toLowerCase();

    if (element.id) {
      selector += "#" + element.id;
      parts.unshift(selector);
      break;
    }

    const classList = element.className.trim().split(/\s+/g);
    if (classList.length) {
      selector += "." + classList.join(".");
    }

    let siblingIndex = 1;
    let sibling = element.previousElementSibling as Element | null;
    while (sibling) {
      siblingIndex++;
      sibling = sibling.previousElementSibling;
    }
    if (siblingIndex > 1) {
      selector += `:nth-child(${siblingIndex})`;
    }

    parts.unshift(selector);
    element = element.parentNode as Element;
  }

  return parts.join(" > ");
};
