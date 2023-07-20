let previousPage: string = window.location.href;

const customPopState = (e: PopStateEvent) => {
  const currentPage = window.location.href;
  sendPageInfoToServer({ previousPage, currentPage });
  previousPage = currentPage;
};

const setPopStateEvent = () => {
  if (!window) {
    throw new Error("window is not defined");
  }
  window.addEventListener("popstate", customPopState);
};

interface PageInfo {
  previousPage: string;
  currentPage: string;
}

const sendPageInfoToServer = ({
  previousPage,
  currentPage,
}: PageInfo): void => {
  const data: PageInfo = {
    previousPage,
    currentPage,
  };

  const xhr: XMLHttpRequest = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(JSON.stringify(data));
};
setPopStateEvent();
