import EventDispatcher from "@/lib/core/EventDispatcher";
import PageViewTracker from "@/trackers/PageView";
import IOCContainer from "@/lib/core/container/IOCContatiner";
import Storage from "@/lib/core/storage";

class SDKInitializer {
  private readonly eventDispatcher: EventDispatcher;
  private readonly storage: Storage;

  constructor() {
    this.eventDispatcher = EventDispatcher.getInstance();
    this.storage = IOCContainer.getInstance().resolve<Storage>("Storage");
    this.initialize();
  }

  private initialize() {
    const pvTracker = new PageViewTracker(this.eventDispatcher, this.storage);
    pvTracker.initialize();
  }
}

export default SDKInitializer;
