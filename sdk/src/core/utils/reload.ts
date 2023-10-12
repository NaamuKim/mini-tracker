import { isSPABackNavigation } from "@/core/utils/spa";
import IOCContainer from "@/core/container/IOCContatiner";
import AbstractStorage from "@/core/storage";
import { IOC_DEPENDENCIES_KEYS } from "@/constants/ioc";

export const isReload = (): boolean =>
  hasNavigationTypeReload() &&
  !isSPABackNavigation(
    IOCContainer.getInstance()
      .resolve<AbstractStorage>(IOC_DEPENDENCIES_KEYS.STORAGE)
      .getItem("fromPageLocation"),
  );

const hasNavigationTypeReload = (): boolean => {
  const navigation = window.performance.getEntriesByType(
    "navigation",
  )[0] as PerformanceNavigationTiming;
  return navigation && navigation.type === "reload";
};
