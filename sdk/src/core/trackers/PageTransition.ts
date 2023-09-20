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
}

export default PageTransitionTracker;
