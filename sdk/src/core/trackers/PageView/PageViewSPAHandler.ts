import PageViewEventController from "@/core/trackers/PageView/PageViewEventController";
import HistoryMethodOverride, {
  HISTORY_REPLACE_PRIORITY,
} from "@/core/utils/HistoryMethodOverride";
import { isSPABackNavigation } from "@/core/utils/spa";
import AbstractStorage from "@/core/storage";
import { STORAGE_KEYS } from "@/constants/storage";

class PageViewSPAHandler {
  private readonly eventController: PageViewEventController;
  private readonly storage: AbstractStorage;

  constructor(
    eventController: PageViewEventController,
    storage: AbstractStorage,
  ) {
    this.eventController = eventController;
    this.storage = storage;
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
      if (
        isSPABackNavigation(
          this.storage.getItem(STORAGE_KEYS.FROM_PAGE_LOCATION),
        )
      ) {
        this.eventController.reset();
      }
      this.eventController.handleEvent();
    }, HISTORY_REPLACE_PRIORITY.TAG_DATA);
  }
}

export default PageViewSPAHandler;
