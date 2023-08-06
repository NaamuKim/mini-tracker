import { handlePageChange } from "@/handlers/pageChangeHandler";
import { Storage } from "@/services/storage/Storage";
import { sendPageViewInfoToServer } from "@/services/collector";

(function () {
  const storage: Storage | null = Storage.getAvailableStorage();

  if (!storage) {
    // TODO: 스토리지가 없을 경우 서버로 에러를 전송한다.
    return;
  }

  const originalPushState: typeof history.pushState =
    history.pushState.bind(history);
  history.pushState = function (...args) {
    originalPushState.apply(this, args);
    handlePageChange(storage);
  };

  const originalReplaceState: typeof history.replaceState =
    history.replaceState.bind(history);
  history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    handlePageChange(storage);
  };

  window.onload = () => handlePageChange(storage);
  window.onpopstate = () => handlePageChange(storage);

  document.addEventListener("DOMContentLoaded", () => {
    sendPageViewInfoToServer();
  });
})();
