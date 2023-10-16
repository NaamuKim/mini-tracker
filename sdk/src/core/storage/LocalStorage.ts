import { IStorage } from "@/core/storage/IStorage";

export class LocalStorage implements IStorage {
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {}
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {}
  }
}
