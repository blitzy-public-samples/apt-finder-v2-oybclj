import { useState, useEffect } from 'react';

/**
 * A custom hook that provides a stateful value and a setter function for interacting with localStorage
 * @param key The key to use for storing the value in localStorage
 * @param initialValue The initial value to use if no value is found in localStorage
 * @returns A tuple containing the current value and a setter function
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Check if the code is running in a browser environment
  const isBrowser = typeof window !== 'undefined';

  // Initialize state with the value from localStorage or the provided initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isBrowser) {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  // Define a function to update both the state and localStorage
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (isBrowser) {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  // Use useEffect to update localStorage when the key changes
  useEffect(() => {
    if (isBrowser) {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error('Error updating localStorage:', error);
      }
    }
  }, [key, storedValue, isBrowser]);

  return [storedValue, setValue];
}

export default useLocalStorage;

// Human tasks:
// TODO: Add error handling for cases where localStorage might be unavailable or quota exceeded
// TODO: Implement unit tests for the useLocalStorage hook
// TODO: Consider adding support for storing and retrieving complex objects (JSON serialization/deserialization)