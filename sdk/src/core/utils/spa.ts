export const isSPABackNavigation = (): boolean => {
  const currentUrl = window.location.href;
  // TODO navigationUrl 스토리지에서 가져와야함
  const navigationUrl = "";
  return currentUrl !== navigationUrl;
};
