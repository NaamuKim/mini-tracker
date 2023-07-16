var previousPage = window.location.href;
var customPopState = function (e) {
    var currentPage = window.location.href;
    sendPageInfoToServer({ previousPage: previousPage, currentPage: currentPage });
    previousPage = currentPage;
};
var setPopStateEvent = function () {
    if (!window) {
        throw new Error('window is not defined');
    }
    window.addEventListener('popstate', customPopState);
};
var sendPageInfoToServer = function (_a) {
    var previousPage = _a.previousPage, currentPage = _a.currentPage;
    var data = {
        previousPage: previousPage,
        currentPage: currentPage,
    };
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'endpoint', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
};
setPopStateEvent();
