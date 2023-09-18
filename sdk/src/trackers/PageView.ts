import EventDispatcher from "@/lib/core/EventDispatcher";
import { MINI_TRACKER_SERVER_API } from "@/api/ApiClient";
import { API_PAGE_VIEW } from "@/api/endPoint/api";
import { PageView } from "@/api/models/pageView";
import { Session } from "@/api/models/session";
import { PageTransition } from "@/api/models/pageTransition";
import { parseDevice } from "@/utils/parsers/device";
import { parseOS } from "@/utils/parsers/os";
import Storage from "@/lib/core/storage";
class PageViewTracker {
  eventDispatcher: EventDispatcher;
  storage: Storage;
  constructor(eventDispatcher: EventDispatcher, storage: Storage) {
    this.eventDispatcher = eventDispatcher;
    this.storage = storage;
  }

  initialize() {
    this.eventDispatcher.subscribe("page-view", this.tagData.bind(this));
    this.eventDispatcher.subscribe("page-view", this.setFromPage.bind(this));
    this.eventDispatcher.attachEventToElement(window, "load", "page-view");
    // TODO: 라우터 바뀌기 전에 클릭한 element selector 저장
  }

  setFromPage() {
    const url = new URL(window.location.href);
    this.storage.setItem(
      "fromPageLocation",
      url.pathname + url.search + url.hash,
    );
  }

  tagData() {
    const url = new URL(window.location.href);

    const pageViewData: PageView & Session = {
      baseUrl: url.origin,
      pageLocation: url.pathname + url.search + url.hash,
      referrer: document.referrer,
      entryTime: new Date(),
      os: parseOS(navigator.userAgent),
      device: parseDevice(navigator.userAgent),
    };

    const fromPageLocation = this.storage.getItem("fromPageLocation");

    if (fromPageLocation) {
      const pageTransitionData: PageTransition & {
        fromPageLocation: string;
      } = {
        transitionTime: new Date(),
        elementSelector: this.storage.getItem("elementSelector") as string,
        fromPageLocation: fromPageLocation,
      };

      MINI_TRACKER_SERVER_API.post(API_PAGE_VIEW, {
        body: {
          ...pageViewData,
          ...pageTransitionData,
        },
      });
    }

    MINI_TRACKER_SERVER_API.post(API_PAGE_VIEW, {
      body: {
        ...pageViewData,
      },
    });
  }
}
export default PageViewTracker;
