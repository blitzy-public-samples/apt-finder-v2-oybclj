// src/api/middleware/index.ts

// Import middleware functions
import { authMiddleware } from './auth.middleware';
import { errorMiddleware } from './error.middleware';
import { rateLimiterMiddleware } from './rateLimiter.middleware';

// Export middleware functions
export {
  authMiddleware,
  errorMiddleware,
  rateLimiterMiddleware
};

// TODO: Implement the following middleware functions in their respective files:
// - auth.middleware.ts: Implement the authMiddleware function for handling user authentication
// - error.middleware.ts: Implement the errorMiddleware function for handling and formatting error responses
// - rateLimiter.middleware.ts: Implement the rateLimiterMiddleware function for implementing rate limiting on API endpoints

/**
 * This file serves as the main entry point for exporting all middleware functions used in the Apartment Finder API.
 * Each middleware function is imported from its respective file and then re-exported for use in the application.
 * 
 * authMiddleware: Handles user authentication
 * errorMiddleware: Handles and formats error responses
 * rateLimiterMiddleware: Implements rate limiting on API endpoints
 */