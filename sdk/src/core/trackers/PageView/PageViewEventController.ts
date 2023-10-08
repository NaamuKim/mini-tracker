class PageViewEventController {
  private hasTaggedData: boolean = false;

  constructor(private tagDataFunction: () => void) {}

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
