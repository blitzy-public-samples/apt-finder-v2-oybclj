import validator from 'validator';

/**
 * Validates if the given string is a valid email address
 * @param email The email address to validate
 * @returns True if the email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  return validator.isEmail(email);
};

/**
 * Validates if the given string meets the password requirements
 * @param password The password to validate
 * @returns True if the password meets the requirements, false otherwise
 */
export const isValidPassword = (password: string): boolean => {
  const minLength = 12;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

  return (
    password.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar
  );
};

/**
 * Validates if the given string is a valid US zip code
 * @param zipCode The zip code to validate
 * @returns True if the zip code is valid, false otherwise
 */
export const isValidZipCode = (zipCode: string): boolean => {
  const zipCodeRegex = /^\d{5}(-\d{4})?$/;
  return zipCodeRegex.test(zipCode);
};

/**
 * Validates if the given rent range is valid
 * @param minRent The minimum rent value
 * @param maxRent The maximum rent value
 * @returns True if the rent range is valid, false otherwise
 */
export const isValidRentRange = (minRent: number, maxRent: number): boolean => {
  return minRent >= 0 && maxRent >= minRent;
};

/**
 * Validates if the given date range is valid
 * @param startDate The start date of the range
 * @param endDate The end date of the range
 * @returns True if the date range is valid, false otherwise
 */
export const isValidDateRange = (startDate: Date, endDate: Date): boolean => {
  return startDate instanceof Date &&
         endDate instanceof Date &&
         endDate >= startDate;
};

/**
 * Sanitizes the input string to prevent XSS attacks
 * @param input The input string to sanitize
 * @returns Sanitized input string
 */
export const sanitizeInput = (input: string): string => {
  return validator.escape(input);
};

// Human tasks:
// TODO: Review and approve the validation functions implemented
// TODO: Add any additional validation functions specific to the Apartment Finder application if needed
// TODO: Write unit tests for each validation function