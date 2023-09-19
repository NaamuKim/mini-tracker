type DependencyMap = {
  [key: string]: any;
};
class IOCContainer {
  private static instance: IOCContainer | null = null;
  private dependencies: DependencyMap = {};

  static getInstance(): IOCContainer {
    if (this.instance === null) {
      this.instance = new IOCContainer();
    }
    return this.instance;
  }

  register<T>(key: string, instance: T): void {
    this.dependencies[key] = instance;
  }

  resolve<T>(key: string): T {
    if (!this.dependencies[key]) {
      throw new Error(`No dependency registered for key: ${key}`);
    }
    return this.dependencies[key];
  }
}

export default IOCContainer;
