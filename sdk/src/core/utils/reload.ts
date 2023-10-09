export const isReload = (): boolean => {
  const navigation = window.performance.getEntriesByType(
    "navigation",
  )[0] as PerformanceNavigationTiming;
  return navigation && navigation.type === "reload";
};
