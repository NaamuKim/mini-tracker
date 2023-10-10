import PageViewEventController from "@/core/trackers/PageView/PageViewEventController";
import HistoryMethodOverride from "@/core/utils/HistoryMethodOverride";

class PageViewSPAHandler {
  private readonly eventController: PageViewEventController;

  constructor(eventController: PageViewEventController) {
    this.eventController = eventController;
  }

  handleSPATransitions() {
    HistoryMethodOverride.overridePushState(
      this.eventController.handleEvent.bind(this.eventController),
    );
    HistoryMethodOverride.overrideReplaceState(
      this.eventController.handleEvent.bind(this.eventController),
    );
  }
}

export default PageViewSPAHandler;
