export const isReload = (): boolean =>
  compareNavigationPageAndCurrentPage() && hasNavigationTypeReload();
const hasNavigationTypeReload = (): boolean => {
  const navigation = window.performance.getEntriesByType(
    "navigation",
  )[0] as PerformanceNavigationTiming;
  return navigation && navigation.type === "reload";
};

const compareNavigationPageAndCurrentPage = (): boolean => {
  const currentUrl = window.location.href;
  const navigationUrl =
    window.performance.getEntriesByType("navigation")[0].name;
  return currentUrl === navigationUrl;
};
