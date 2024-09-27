/**
 * src/shared/constants/errorMessages.ts
 * 
 * This file contains all error message constants used throughout the Apartment Finder application.
 * It provides a centralized location for managing error messages, ensuring consistency and easy maintenance.
 */

// Authentication-related error messages
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: "Invalid email or password. Please try again.",
  USER_NOT_FOUND: "User not found. Please check your email or sign up for a new account.",
  EMAIL_ALREADY_EXISTS: "An account with this email already exists. Please use a different email or try logging in.",
  WEAK_PASSWORD: "Password is too weak. Please use a combination of uppercase and lowercase letters, numbers, and special characters.",
  UNAUTHORIZED: "You are not authorized to perform this action. Please log in or check your permissions.",
  TOKEN_EXPIRED: "Your session has expired. Please log in again.",
};

// Validation-related error messages
export const VALIDATION_ERRORS = {
  REQUIRED_FIELD: "This field is required.",
  INVALID_EMAIL: "Please enter a valid email address.",
  INVALID_PASSWORD: "Password must be at least 8 characters long and include a mix of letters, numbers, and special characters.",
  INVALID_ZIPCODE: "Please enter a valid 5-digit ZIP code.",
  INVALID_PRICE_RANGE: "Please enter a valid price range.",
};

// API-related error messages
export const API_ERRORS = {
  NETWORK_ERROR: "Unable to connect to the server. Please check your internet connection and try again.",
  SERVER_ERROR: "An unexpected error occurred on the server. Please try again later.",
  NOT_FOUND: "The requested resource was not found.",
  BAD_REQUEST: "The request was invalid or cannot be served. Please check your input and try again.",
  FORBIDDEN: "You don't have permission to access this resource.",
};

// Subscription-related error messages
export const SUBSCRIPTION_ERRORS = {
  PAYMENT_FAILED: "Payment processing failed. Please check your payment information and try again.",
  SUBSCRIPTION_EXPIRED: "Your subscription has expired. Please renew to continue using premium features.",
  INVALID_PLAN: "The selected subscription plan is invalid or no longer available.",
};

// Listing-related error messages
export const LISTING_ERRORS = {
  LISTING_NOT_FOUND: "The requested apartment listing could not be found.",
  INVALID_FILTER: "One or more filter criteria are invalid. Please adjust your search parameters.",
  NO_RESULTS: "No apartments found matching your criteria. Try adjusting your filters for more results.",
};

/**
 * Human Tasks:
 * 1. Review and finalize the error messages to ensure they cover all necessary scenarios
 * 2. Ensure error messages are clear, concise, and user-friendly
 * 3. Consider internationalization requirements for error messages
 */