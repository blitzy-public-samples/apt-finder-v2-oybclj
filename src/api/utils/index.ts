// src/api/utils/index.ts

// Import utility modules
import * as validation from './validation';
import * as encryption from './encryption';
import * as jwt from './jwt';

// Export utility modules
export { validation, encryption, jwt };

// TODO: Implement validation utility functions in src/api/utils/validation.ts
// TODO: Implement encryption utility functions in src/api/utils/encryption.ts
// TODO: Implement JWT utility functions in src/api/utils/jwt.ts

/**
 * This file serves as the main entry point for utility functions used in the API.
 * It exports various utility modules to be used across the application.
 */

// Add any shared utility functions here if needed

// Example of a shared utility function (remove or replace as needed):
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

// Human tasks:
// - Implement validation utility functions in src/api/utils/validation.ts
// - Implement encryption utility functions in src/api/utils/encryption.ts
// - Implement JWT utility functions in src/api/utils/jwt.ts