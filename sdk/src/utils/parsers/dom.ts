export const getQuerySelector = (element: Element): string => {
  return buildQuerySelector(element).join(" > ");
};

const buildQuerySelector = (element: Element | null): string[] => {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) return [];

  const selector = getElementSelector(element);
  return element.id
    ? [selector]
    : [...buildQuerySelector(element.parentNode as Element), selector];
};

const getElementSelector = (element: Element): string => {
  let selector = element.nodeName.toLowerCase();

  if (element.id) return selector + "#" + element.id;

  const nthChildSelectorIndex = getNthChildIndex(
    element.previousElementSibling as Element,
  );

  if (element.className !== "") {
    const classList = element.className.trim().split(/\s+/g);
    if (classList.length && nthChildSelectorIndex <= 1)
      selector += "." + classList.join(".");
  }

  if (nthChildSelectorIndex > 1)
    selector += `:nth-child(${nthChildSelectorIndex})`;

  return selector;
};

const getNthChildIndex = (
  element: Element | null,
  index: number = 1,
): number => {
  if (!element) return index;
  return getNthChildIndex(element.previousElementSibling as Element, index + 1);
};
