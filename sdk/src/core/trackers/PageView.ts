import EventDispatcher from "@/core/EventDispatcher";
import AbstractStorage from "@/core/storage";
import { MINI_TRACKER_SERVER_API } from "@/api/ApiClient";
import { API_PAGE_VIEW } from "@/api/endPoint/api";
import { PageView } from "@/api/models/pageView";
import { Session } from "@/api/models/session";
import { PageTransition } from "@/api/models/pageTransition";
import { parseDevice } from "@/utils/parsers/device";
import { parseOS } from "@/utils/parsers/os";

class PageViewTracker {
  eventDispatcher: EventDispatcher;
  storage: AbstractStorage;
  constructor(eventDispatcher: EventDispatcher, storage: AbstractStorage) {
    this.eventDispatcher = eventDispatcher;
    this.storage = storage;
  }

  initialize() {
    this.eventDispatcher.subscribe("page-view-load", this.tagData.bind(this));
    this.eventDispatcher.attachEventToElement(window, "load", "page-view-load");
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
        fromPageLocation,
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
