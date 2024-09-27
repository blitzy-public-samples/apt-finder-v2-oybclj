// src/frontend/src/utils/storage.ts

/**
 * Enum representing the types of storage available
 */
export enum StorageType {
  localStorage = 'localStorage',
  sessionStorage = 'sessionStorage'
}

/**
 * Stores a key-value pair in the specified storage type
 * @param key The key to store the value under
 * @param value The value to store
 * @param type The type of storage to use (localStorage or sessionStorage)
 */
export function setItem(key: string, value: any, type: StorageType): void {
  // Check if the storage type is valid
  if (!isValidStorageType(type)) {
    throw new Error(`Invalid storage type: ${type}`);
  }

  try {
    // Convert the value to a JSON string if it's not a string
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);

    // Store the key-value pair in the specified storage
    window[type].setItem(key, stringValue);
  } catch (error) {
    console.error(`Error setting item in ${type}:`, error);
    throw error;
  }
}

/**
 * Retrieves a value from the specified storage type by its key
 * @param key The key to retrieve the value for
 * @param type The type of storage to use (localStorage or sessionStorage)
 * @returns The stored value, or null if not found
 */
export function getItem(key: string, type: StorageType): any {
  // Check if the storage type is valid
  if (!isValidStorageType(type)) {
    throw new Error(`Invalid storage type: ${type}`);
  }

  try {
    // Retrieve the value from the specified storage
    const value = window[type].getItem(key);

    if (value === null) {
      return null;
    }

    // If the value exists, attempt to parse it as JSON
    try {
      return JSON.parse(value);
    } catch {
      // Return the original string if parsing fails
      return value;
    }
  } catch (error) {
    console.error(`Error getting item from ${type}:`, error);
    throw error;
  }
}

/**
 * Removes an item from the specified storage type by its key
 * @param key The key of the item to remove
 * @param type The type of storage to use (localStorage or sessionStorage)
 */
export function removeItem(key: string, type: StorageType): void {
  // Check if the storage type is valid
  if (!isValidStorageType(type)) {
    throw new Error(`Invalid storage type: ${type}`);
  }

  try {
    // Remove the item from the specified storage using the provided key
    window[type].removeItem(key);
  } catch (error) {
    console.error(`Error removing item from ${type}:`, error);
    throw error;
  }
}

/**
 * Clears all items from the specified storage type
 * @param type The type of storage to clear (localStorage or sessionStorage)
 */
export function clear(type: StorageType): void {
  // Check if the storage type is valid
  if (!isValidStorageType(type)) {
    throw new Error(`Invalid storage type: ${type}`);
  }

  try {
    // Clear all items from the specified storage
    window[type].clear();
  } catch (error) {
    console.error(`Error clearing ${type}:`, error);
    throw error;
  }
}

/**
 * Checks if the given storage type is valid
 * @param type The storage type to check
 * @returns True if the storage type is valid, false otherwise
 */
function isValidStorageType(type: StorageType): boolean {
  return Object.values(StorageType).includes(type);
}