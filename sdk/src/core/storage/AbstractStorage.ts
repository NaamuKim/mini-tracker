import { IStorage } from "@/core/storage/IStorage";
import { LocalStorage } from "@/core/storage/LocalStorage";
import { SessionStorage } from "@/core/storage/SessionStorage";

class AbstractStorage {
  private storage: IStorage;

  constructor(storage: IStorage) {
    this.storage = storage;
  }

  public static isAvailable(storage: IStorage): boolean {
    try {
      const testKey = "__test__";
      storage.setItem(testKey, "value");
      storage.getItem(testKey);
      storage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  public static getAvailableStorage(): AbstractStorage | null {
    for (const storage of [new LocalStorage(), new SessionStorage()]) {
      if (AbstractStorage.isAvailable(storage)) {
        return new AbstractStorage(storage);
      }
    }
    return null;
  }
  public setItem(key: string, value: string): void {
    try {
      this.storage.setItem(key, value);
    } catch {
      throw new Error("Storage is full");
    }
  }

  public getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  public removeItem(key: string): void {
    this.storage.removeItem(key);
  }
}

export default AbstractStorage;
