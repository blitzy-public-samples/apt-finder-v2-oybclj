/**
 * StorageService
 * 
 * This service class handles local storage operations for the Apartment Finder application.
 * It provides methods to store, retrieve, remove, and manage data in the browser's local storage.
 */
export class StorageService {
  /**
   * Initializes the StorageService
   * No initialization steps are required for this service
   */
  constructor() {}

  /**
   * Stores a key-value pair in local storage
   * @param key The key under which to store the value
   * @param value The value to be stored
   */
  setItem(key: string, value: any): void {
    try {
      // Convert the value to a JSON string if it's not already a string
      const jsonString = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, jsonString);
    } catch (error) {
      console.error(`Error storing item in local storage: ${error}`);
    }
  }

  /**
   * Retrieves a value from local storage by its key
   * @param key The key of the item to retrieve
   * @returns The stored value, or null if not found
   */
  getItem(key: string): any {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return null;
      }

      // Attempt to parse the item as JSON
      try {
        return JSON.parse(item);
      } catch {
        // If parsing fails, return the original string
        return item;
      }
    } catch (error) {
      console.error(`Error retrieving item from local storage: ${error}`);
      return null;
    }
  }

  /**
   * Removes an item from local storage by its key
   * @param key The key of the item to remove
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from local storage: ${error}`);
    }
  }

  /**
   * Clears all items from local storage
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing local storage: ${error}`);
    }
  }

  /**
   * Returns an array of all keys in local storage
   * @returns An array of all keys in local storage
   */
  keys(): string[] {
    try {
      return Object.keys(localStorage);
    } catch (error) {
      console.error(`Error retrieving keys from local storage: ${error}`);
      return [];
    }
  }
}