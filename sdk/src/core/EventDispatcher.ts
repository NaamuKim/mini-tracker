import { EVENT_KEYS } from "@/constants/event";

type ListenerFn = (event: Event) => void;
type EventTypes = (typeof EVENT_KEYS)[keyof typeof EVENT_KEYS];

class EventDispatcher {
  private static instance: EventDispatcher;
  private listeners: {
    [type: string]: ListenerFn[];
  } = {};
  private constructor() {}

  static getInstance(): EventDispatcher {
    if (!this.instance) {
      this.instance = new EventDispatcher();
    }
    return this.instance;
  }

  subscribe(type: EventTypes, callback: ListenerFn) {
    if (!(type in this.listeners)) {
      this.listeners[type] = [];
    }

    this.listeners[type].push(callback);
  }

  unSubscribe(type: EventTypes, callback: ListenerFn) {
    if (!(type in this.listeners)) {
      return;
    }
    this.listeners[type] = this.listeners[type].filter(
      (listener) => listener !== callback,
    );
  }

  attachEventToElement(
    element: Element | Window | Document,
    eventName: keyof DocumentEventMap,
    type: EventTypes,
  ) {
    const handlers = this.listeners[type];

    const eventListener: EventListener = (event) => {
      for (const handler of handlers) {
        handler(event);
      }
    };

    element.addEventListener(eventName, eventListener);
  }
}

export default EventDispatcher;
