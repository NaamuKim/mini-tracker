import EventDispatcher from "@/core/EventDispatcher";
import AbstractStorage from "@/core/storage";
import { MINI_TRACKER_SERVER_API } from "@/api/ApiClient";
import { API_PAGE_VIEW } from "@/api/endPoint/api";
import { PageView } from "@/api/models/pageView";
import { Session } from "@/api/models/session";
import { PageTransition } from "@/api/models/pageTransition";
import { parseDevice } from "@/utils/parsers/device";
import { parseOS } from "@/utils/parsers/os";
import { EVENT_KEYS } from "@/constants/event";
import { STORAGE_KEYS } from "@/constants/storage";
import HistoryMethodOverride from "@/core/utils/HistoryMethodOverride";

class PageViewTracker {
  eventDispatcher: EventDispatcher;
  storage: AbstractStorage;
  constructor(eventDispatcher: EventDispatcher, storage: AbstractStorage) {
    this.eventDispatcher = eventDispatcher;
    this.storage = storage;
  }

  initialize() {
    this.eventDispatcher.subscribe(
      EVENT_KEYS.PAGE_VIEW_LOAD,
      this.tagData.bind(this),
    );
    this.eventDispatcher.attachEventToElement(
      window,
      "load",
      EVENT_KEYS.PAGE_VIEW_LOAD,
    );

    // SPA 대응
    HistoryMethodOverride.overridePushState(this.tagData.bind(this));
    HistoryMethodOverride.overrideReplaceState(this.tagData.bind(this));
  }

  private createPageViewData(): PageView & Session {
    const url = new URL(window.location.href);
    return {
      baseUrl: url.origin,
      pageLocation: url.pathname + url.search + url.hash,
      referrer: document.referrer,
      entryTime: new Date(),
      os: parseOS(navigator.userAgent),
      device: parseDevice(navigator.userAgent),
    };
  }

  private createPageTransitionData():
    | (PageTransition & {
        fromPageLocation: string;
        fromPageExitTime: Date;
      })
    | null {
    const fromPageLocation = this.storage.getItem(
      STORAGE_KEYS.FROM_PAGE_LOCATION,
    );
    const currentLocation = this.createPageViewData().pageLocation;

    if (fromPageLocation && fromPageLocation !== currentLocation) {
      return {
        transitionTime: new Date(),
        elementSelector: this.storage.getItem(
          STORAGE_KEYS.ELEMENT_SELECTOR,
        ) as string,
        fromPageLocation,
        fromPageExitTime: new Date(
          this.storage.getItem(
            STORAGE_KEYS.LAST_CLICK_EVENT_EMIT_TIME,
          ) as string,
        ),
      };
    }

    return null;
  }

  tagData() {
    const pageViewData = this.createPageViewData();
    const pageTransitionData = this.createPageTransitionData();

    let body = { ...pageViewData };
    if (pageTransitionData) {
      body = { ...body, ...pageTransitionData };
    }

    return MINI_TRACKER_SERVER_API.post(API_PAGE_VIEW, {
      body,
    });
  }
}
export default PageViewTracker;
