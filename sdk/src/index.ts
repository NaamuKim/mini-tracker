import { handlePageChange } from "@/handlers/pageChangeHandler";

(function () {
  let previousPage: string =
    localStorage.getItem("previousPage") || window.location.href;

  const originalPushState: typeof history.pushState =
    history.pushState.bind(history);
  history.pushState = function () {
    originalPushState.apply(this, arguments as any);
    handlePageChange(previousPage);
  };

  const originalReplaceState: typeof history.replaceState =
    history.replaceState.bind(history);
  history.replaceState = function () {
    originalReplaceState.apply(this, arguments as any);
    handlePageChange(previousPage);
  };

  window.onload = () => handlePageChange(previousPage);
  window.onpopstate = () => handlePageChange(previousPage);
})();
