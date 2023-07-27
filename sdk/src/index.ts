import { handlePageChange } from "@/handlers/pageChangeHandler";
import { Storage } from "@/services/storage/Storage";

(function () {
  const storage: Storage | null = Storage.getAvailableStorage();

  if (!storage) {
    // TODO: 스토리지가 없을 경우 서버로 에러를 전송한다.
    return;
  }

  const originalPushState: typeof history.pushState =
    history.pushState.bind(history);
  history.pushState = function () {
    originalPushState.apply(this, arguments as any);
    handlePageChange(storage);
  };

  const originalReplaceState: typeof history.replaceState =
    history.replaceState.bind(history);
  history.replaceState = function () {
    originalReplaceState.apply(this, arguments as any);
    handlePageChange(storage);
  };

  window.onload = () => handlePageChange(storage);
  window.onpopstate = () => handlePageChange(storage);
})();
