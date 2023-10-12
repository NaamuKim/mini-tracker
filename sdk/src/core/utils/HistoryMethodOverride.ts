type CallbackItem = {
  callback: () => void;
  priority: number;
};

export const HISTORY_REPLACE_PRIORITY = {
  SAVE_STATE: 0,
  TAG_DATA: 1,
};

class HistoryMethodOverride {
  private static callbacksMap: Record<
    "pushState" | "replaceState",
    CallbackItem[]
  > = {
    pushState: [],
    replaceState: [],
  };

  private static overrideMethod(
    methodName: "pushState" | "replaceState",
    callback: () => void,
    priority: (typeof HISTORY_REPLACE_PRIORITY)[keyof typeof HISTORY_REPLACE_PRIORITY] = 0,
  ) {
    this.callbacksMap[methodName].push({ callback, priority });
    this.callbacksMap[methodName].sort((a, b) => b.priority - a.priority);

    const originalMethod = history[methodName].bind(history);

    if (!this.isMethodOverridden(methodName)) {
      history[methodName] = function (...args) {
        originalMethod.apply(this, args);

        for (const item of HistoryMethodOverride.callbacksMap[methodName]) {
          item.callback();
        }
      };
    }
  }

  private static isMethodOverridden(
    methodName: "pushState" | "replaceState",
  ): boolean {
    return history[methodName] !== History.prototype[methodName];
  }

  static overridePushState(callback: () => void, priority?: number) {
    this.overrideMethod("pushState", callback, priority);
  }

  static overrideReplaceState(callback: () => void, priority?: number) {
    this.overrideMethod("replaceState", callback, priority);
  }
}

export default HistoryMethodOverride;
