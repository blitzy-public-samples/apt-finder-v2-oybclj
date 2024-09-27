import { RegexPatterns } from '../constants';
import { UserInterface, FilterInterface } from '../interfaces';

/**
 * Validates if the given string is a valid email address
 * @param email The email string to validate
 * @returns True if the email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  // TODO: Implement RegexPatterns.EMAIL once it's available
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Temporary regex pattern
  return emailRegex.test(email);
};

/**
 * Validates if the given string meets the password requirements
 * @param password The password string to validate
 * @returns True if the password is valid, false otherwise
 */
export const isValidPassword = (password: string): boolean => {
  // TODO: Implement RegexPatterns.PASSWORD once it's available
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/; // Temporary regex pattern
  return password.length >= 12 && passwordRegex.test(password);
};

/**
 * Validates if the given string is a valid US zip code
 * @param zipCode The zip code string to validate
 * @returns True if the zip code is valid, false otherwise
 */
export const isValidZipCode = (zipCode: string): boolean => {
  // TODO: Implement RegexPatterns.ZIP_CODE once it's available
  const zipCodeRegex = /^\d{5}(-\d{4})?$/; // Temporary regex pattern
  return zipCodeRegex.test(zipCode);
};

/**
 * Validates if the given string is a valid US phone number
 * @param phoneNumber The phone number string to validate
 * @returns True if the phone number is valid, false otherwise
 */
export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  // TODO: Implement RegexPatterns.PHONE_NUMBER once it's available
  const phoneNumberRegex = /^\+?1?\s?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/; // Temporary regex pattern
  return phoneNumberRegex.test(phoneNumber);
};

/**
 * Validates user input against the UserInterface
 * @param userInput The user input object to validate
 * @returns An object with a 'valid' boolean and an 'errors' array
 */
export const validateUserInput = (userInput: Partial<UserInterface>): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!userInput.email) {
    errors.push('Email is required');
  } else if (!isValidEmail(userInput.email)) {
    errors.push('Invalid email format');
  }

  if (!userInput.password) {
    errors.push('Password is required');
  } else if (!isValidPassword(userInput.password)) {
    errors.push('Password must be at least 12 characters long and contain uppercase, lowercase, number, and special character');
  }

  if (userInput.phoneNumber && !isValidPhoneNumber(userInput.phoneNumber)) {
    errors.push('Invalid phone number format');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validates filter criteria against the FilterInterface
 * @param filterCriteria The filter criteria object to validate
 * @returns An object with a 'valid' boolean and an 'errors' array
 */
export const validateFilterCriteria = (filterCriteria: Partial<FilterInterface>): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (filterCriteria.minRent !== undefined && (isNaN(filterCriteria.minRent) || filterCriteria.minRent < 0)) {
    errors.push('Minimum rent must be a non-negative number');
  }

  if (filterCriteria.maxRent !== undefined && (isNaN(filterCriteria.maxRent) || filterCriteria.maxRent < 0)) {
    errors.push('Maximum rent must be a non-negative number');
  }

  if (filterCriteria.minRent !== undefined && filterCriteria.maxRent !== undefined && filterCriteria.minRent > filterCriteria.maxRent) {
    errors.push('Minimum rent cannot be greater than maximum rent');
  }

  if (filterCriteria.zipCodes && (!Array.isArray(filterCriteria.zipCodes) || !filterCriteria.zipCodes.every(isValidZipCode))) {
    errors.push('Invalid zip code(s) provided');
  }

  // Add more validation rules for other filter criteria as needed

  return {
    valid: errors.length === 0,
    errors,
  };
};

// Human tasks:
// 1. Review and approve the validation functions and their implementations
// 2. Ensure that the RegexPatterns imported from constants are correctly implemented and tested
// 3. Add any additional validation functions that may be needed for the Apartment Finder application