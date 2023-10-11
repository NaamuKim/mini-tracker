import PageViewEventController from "@/core/trackers/PageView/PageViewEventController";
import HistoryMethodOverride from "@/core/utils/HistoryMethodOverride";
import { isSPABackNavigation } from "@/core/utils/spa";

class PageViewSPAHandler {
  private readonly eventController: PageViewEventController;

  constructor(eventController: PageViewEventController) {
    this.eventController = eventController;
  }

  handleSPATransitions() {
    this.handleHistoryPushState();
    this.handleHistoryReplaceState();
  }

  handleHistoryPushState() {
    HistoryMethodOverride.overridePushState(() => {
      this.eventController.reset();
      this.eventController.handleEvent();
    });
  }

  handleHistoryReplaceState() {
    HistoryMethodOverride.overrideReplaceState(() => {
      if (isSPABackNavigation()) this.eventController.reset();
      this.eventController.handleEvent();
    });
  }
}

export default PageViewSPAHandler;
