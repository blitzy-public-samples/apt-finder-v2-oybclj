/**
 * src/frontend/src/constants/errorMessages.ts
 * 
 * This file contains constant error messages used throughout the frontend application.
 * It provides a centralized location for managing and maintaining error messages,
 * ensuring consistency across the user interface.
 */

export const ERROR_MESSAGES = {
  GENERIC_ERROR: "An unexpected error occurred. Please try again later.",
  INVALID_EMAIL: "Please enter a valid email address.",
  INVALID_PASSWORD: "Password must be at least 12 characters long and include uppercase, lowercase, number, and special character.",
  PASSWORDS_DO_NOT_MATCH: "Passwords do not match.",
  REQUIRED_FIELD: "This field is required.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  FILTER_CREATION_FAILED: "Failed to create filter. Please try again.",
  FILTER_UPDATE_FAILED: "Failed to update filter. Please try again.",
  FILTER_DELETE_FAILED: "Failed to delete filter. Please try again.",
  LISTING_FETCH_FAILED: "Failed to fetch listings. Please try again.",
  SUBSCRIPTION_CREATION_FAILED: "Failed to create subscription. Please try again.",
  SUBSCRIPTION_UPDATE_FAILED: "Failed to update subscription. Please try again.",
  SUBSCRIPTION_CANCEL_FAILED: "Failed to cancel subscription. Please try again.",
  NETWORK_ERROR: "Network error. Please check your internet connection and try again.",
};

// Export individual error messages for more granular imports if needed
export const {
  GENERIC_ERROR,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  PASSWORDS_DO_NOT_MATCH,
  REQUIRED_FIELD,
  INVALID_CREDENTIALS,
  UNAUTHORIZED,
  FILTER_CREATION_FAILED,
  FILTER_UPDATE_FAILED,
  FILTER_DELETE_FAILED,
  LISTING_FETCH_FAILED,
  SUBSCRIPTION_CREATION_FAILED,
  SUBSCRIPTION_UPDATE_FAILED,
  SUBSCRIPTION_CANCEL_FAILED,
  NETWORK_ERROR,
} = ERROR_MESSAGES;