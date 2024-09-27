// This file serves as the entry point for custom React hooks used across the Apartment Finder application.
// It exports all available hooks from this directory, making them easily accessible to other parts of the application.

import { useDebounce } from './useDebounce';
import { useLocalStorage } from './useLocalStorage';

export {
  useDebounce,
  useLocalStorage,
};

// Human tasks:
// TODO: Implement the useDebounce custom hook in a separate file
// TODO: Implement the useLocalStorage custom hook in a separate file
// TODO: Review and test the index.ts file to ensure all hooks are correctly exported