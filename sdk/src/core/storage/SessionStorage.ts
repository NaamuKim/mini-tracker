import { IStorage } from "@/core/storage/IStorage";

export class SessionStorage implements IStorage {
  getItem(key: string): string | null {
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      sessionStorage.setItem(key, value);
    } catch {}
  }

  removeItem(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch {}
  }
}
