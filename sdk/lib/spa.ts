type UserPostedInfo = {
  previousPage: string;
  currentPage: string;
  scrollY: number;
  scrollX: number;
};

(function () {
  let previousPage: string =
    localStorage.getItem("previousPage") || window.location.href;

  const sendPageInfoToServer = <T extends UserPostedInfo>({
    previousPage,
    currentPage,
  }: T) => {
    const data = { previousPage, currentPage };
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
  };

  const handlePageChange = () => {
    const currentPage: string = window.location.href;
    if (currentPage !== previousPage) {
      sendPageInfoToServer<UserPostedInfo>({
        previousPage,
        currentPage,
        scrollY: window.scrollY,
        scrollX: window.scrollX,
      });
      previousPage = currentPage;
      localStorage.setItem("previousPage", currentPage);
    }
  };

  const originalPushState: typeof history.pushState =
    history.pushState.bind(history);
  history.pushState = function () {
    originalPushState.apply(this, arguments as any);
    handlePageChange();
  };

  const originalReplaceState: typeof history.replaceState =
    history.replaceState.bind(history);
  history.replaceState = function () {
    originalReplaceState.apply(this, arguments as any);
    handlePageChange();
  };

  window.onload = handlePageChange;
  window.onpopstate = handlePageChange;
})();
