class HistoryMethodOverride {
  private static overrideMethod(
    methodName: "pushState" | "replaceState",
    callback: () => void,
  ) {
    const originalMethod = history[methodName].bind(history);

    history[methodName] = function (...args) {
      originalMethod.apply(this, args);
      callback();
    };
  }

  static overridePushState(callback: () => void) {
    this.overrideMethod("pushState", callback);
  }

  static overrideReplaceState(callback: () => void) {
    this.overrideMethod("replaceState", callback);
  }
}

export default HistoryMethodOverride;
