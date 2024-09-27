/**
 * src/frontend/src/types/auth.ts
 * This file contains TypeScript type definitions related to authentication
 * in the Apartment Finder application.
 */

/**
 * Represents a user in the application
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  lastLogin: Date;
}

/**
 * Represents the authentication state in the application
 */
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

/**
 * Represents the credentials required for user login
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Represents the data required for user registration
 */
export interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

/**
 * Represents the response from authentication-related API calls
 */
export interface AuthResponse {
  user: User;
  token: string;
}

/**
 * Represents an error that occurred during authentication
 */
export interface AuthError {
  message: string;
  code: string;
}

// Human tasks:
// TODO: Review and validate the defined types to ensure they meet all authentication requirements
// TODO: Consider adding any additional authentication-related types that may be needed in the future