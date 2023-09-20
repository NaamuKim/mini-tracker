import PageTransitionTracker from "@/core/trackers/PageTransition";
import EventDispatcher from "@/core/EventDispatcher";
import IOCContainer from "@/core/container/IOCContatiner";
import PageViewTracker from "@/core/trackers/PageView";
import AbstractStorage from "@/core/storage";

class SDKInitializer {
  private readonly eventDispatcher: EventDispatcher;
  private readonly storage: AbstractStorage;

  constructor() {
    this.eventDispatcher = EventDispatcher.getInstance();
    this.storage =
      IOCContainer.getInstance().resolve<AbstractStorage>("Storage");
    this.initialize();
  }

  private initialize() {
    const pageViewTracker = new PageViewTracker(
      this.eventDispatcher,
      this.storage,
    );
    pageViewTracker.initialize();
    const pageTransitionTracker = new PageTransitionTracker(
      this.eventDispatcher,
      this.storage,
    );
    pageTransitionTracker.initialize();
  }
}

export default SDKInitializer;
