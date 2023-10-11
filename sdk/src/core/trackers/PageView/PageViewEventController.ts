class PageViewEventController {
  private hasTaggedData: boolean = false;
  private readonly tagDataFunction: () => void;

  constructor(tagDataFunction: () => void) {
    this.tagDataFunction = tagDataFunction;
  }

  handleEvent() {
    if (this.hasTaggedData) return;
    this.tagDataFunction();
    this.hasTaggedData = true;
  }

  reset() {
    this.hasTaggedData = false;
  }
}

export default PageViewEventController;
