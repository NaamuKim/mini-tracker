import PageTransitionTracker from "@/core/trackers/PageTransition";
import EventDispatcher from "@/core/EventDispatcher";
import IOCContainer from "@/core/container/IOCContatiner";
import PageViewTracker from "@/core/trackers/PageView/PageViewTracker";
import AbstractStorage from "@/core/storage";
import { IOC_DEPENDENCIES_KEYS } from "@/constants/ioc";

class SDKInitializer {
  private readonly eventDispatcher: EventDispatcher;
  private readonly storage: AbstractStorage;

  constructor() {
    this.eventDispatcher = EventDispatcher.getInstance();
    this.storage = IOCContainer.getInstance().resolve<AbstractStorage>(
      IOC_DEPENDENCIES_KEYS.STORAGE,
    );
    this.initialize();
  }

  private initialize() {
    this.pageViewTrackerInitialize();
    this.pageTransitionTrackerInitialize();
  }

  pageViewTrackerInitialize() {
    const pageViewTracker = new PageViewTracker(
      this.eventDispatcher,
      this.storage,
    );
    pageViewTracker.initialize();
  }

  pageTransitionTrackerInitialize() {
    const pageTransitionTracker = new PageTransitionTracker(
      this.eventDispatcher,
      this.storage,
    );
    pageTransitionTracker.initialize();
  }
}

export default SDKInitializer;
