// This file serves as the main entry point for exporting constants used throughout the frontend application.
// It aggregates and re-exports constants from other files in the constants directory.

// Import constants from other files
import * as apiEndpoints from './apiEndpoints';
import * as errorMessages from './errorMessages';

// Re-export constants
export { apiEndpoints, errorMessages };

// TODO: Implement the following human tasks:
// 1. Implement apiEndpoints.ts file with API endpoint constants (Required)
// 2. Implement errorMessages.ts file with error message constants (Required)

// Once the above tasks are completed, uncomment and update the following exports if necessary:
// export * from './apiEndpoints';
// export * from './errorMessages';

// You can also add more constant exports here as needed for the application