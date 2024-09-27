import { useState, useEffect, useCallback } from 'react';

/**
 * A custom hook that provides a debounced value.
 * 
 * @param value The value to be debounced.
 * @param delay The delay in milliseconds for the debounce effect.
 * @returns The debounced value.
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const debouncedSetValue = useCallback(
    (newValue: T) => {
      const handler = setTimeout(() => {
        setDebouncedValue(newValue);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [delay]
  );

  useEffect(() => {
    const cleanup = debouncedSetValue(value);
    return cleanup;
  }, [value, debouncedSetValue]);

  return debouncedValue;
}

export default useDebounce;
```

This implementation follows the specifications provided and includes the following features:

1. The hook is generic, allowing it to work with any type of value.
2. It uses the `useState`, `useEffect`, and `useCallback` hooks from React to manage the debounced value and side effects.
3. The `debouncedSetValue` function is memoized using `useCallback` to prevent unnecessary re-renders.
4. The `useEffect` hook is used to set up and clear the debounce timer.
5. The hook returns the debounced value, which updates after the specified delay has elapsed since the last change to the input value.

This implementation provides a reusable and efficient way to debounce values in React components, which can be particularly useful for optimizing performance in scenarios like search inputs or other frequently changing values that trigger expensive operations.