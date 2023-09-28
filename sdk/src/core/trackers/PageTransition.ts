import EventDispatcher from "@/core/EventDispatcher";
import { getQuerySelector } from "@/utils/parsers/dom";
import { EVENT_KEYS } from "@/constants/event";
import AbstractStorage from "@/core/storage";
import { STORAGE_KEYS } from "@/constants/storage";

class PageTransitionTracker {
  private readonly eventDispatcher: EventDispatcher;
  private readonly storage: AbstractStorage;

  constructor(eventDispatcher: EventDispatcher, storage: AbstractStorage) {
    this.eventDispatcher = eventDispatcher;
    this.storage = storage;
  }

  initialize() {
    this.addParseElementSelectorEvent();
    this.addSaveFromPageLocationEvent();
    this.addSaveEventEmitTimeEvent();
  }

  private addParseElementSelectorEvent() {
    this.eventDispatcher.subscribe(
      EVENT_KEYS.PAGE_TRANSITION_CLICK,
      this.setElementSelector.bind(this),
    );
    this.eventDispatcher.attachEventToElement(
      document,
      "click",
      EVENT_KEYS.PAGE_TRANSITION_CLICK,
    );
  }

  private addSaveFromPageLocationEvent() {
    this.eventDispatcher.subscribe(
      EVENT_KEYS.PAGE_TRANSITION_LOAD,
      this.setFromPageLocation.bind(this),
    );
    this.eventDispatcher.attachEventToElement(
      window,
      "load",
      EVENT_KEYS.PAGE_TRANSITION_LOAD,
    );
  }

  private addSaveEventEmitTimeEvent() {
    this.eventDispatcher.subscribe(
      EVENT_KEYS.PAGE_TRANSITION_CLICK,
      this.setEventEmitTime.bind(this),
    );
    this.eventDispatcher.attachEventToElement(
      document,
      "click",
      EVENT_KEYS.PAGE_TRANSITION_CLICK,
    );
    // TODO: 주소 치고 이동하는 것에 대한 고려 필요
  }

  private setFromPageLocation() {
    const url = new URL(window.location.href);
    this.storage.setItem(
      STORAGE_KEYS.FROM_PAGE_LOCATION,
      url.pathname + url.search + url.hash,
    );
  }

  private setElementSelector(event: Event) {
    const target = event.target as Element;
    this.storage.setItem(
      STORAGE_KEYS.ELEMENT_SELECTOR,
      getQuerySelector(target),
    );
  }

  private setEventEmitTime() {
    this.storage.setItem(
      STORAGE_KEYS.LAST_CLICK_EVENT_EMIT_TIME,
      new Date().toISOString(),
    );
  }
}

export default PageTransitionTracker;
