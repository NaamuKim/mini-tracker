export const isSPABackNavigation = (
  fromPageLocation: string | null,
): boolean => {
  const currentUrl = new URL(window.location.href).pathname;
  return currentUrl !== fromPageLocation;
};
