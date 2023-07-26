import { IStorage } from "./IStorage";
import { LocalStorage } from "@/services/storage/LocalStorage";
import { SessionStorage } from "@/services/storage/SessionStorage";

export class Storage {
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

  public static getAvailableStorage(): Storage | null {
    for (const storage of [new LocalStorage(), new SessionStorage()]) {
      if (Storage.isAvailable(storage)) {
        return new Storage(storage);
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
