/**
 * src/shared/constants/regexPatterns.ts
 * 
 * This file contains a collection of regular expression patterns used throughout 
 * the Apartment Finder application for input validation and data parsing.
 */

// Regular expression for validating email addresses
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Regular expression for validating passwords (min 12 chars, uppercase, lowercase, number, special char)
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

// Regular expression for validating US ZIP codes
export const ZIP_CODE_REGEX = /^\d{5}(-\d{4})?$/;

// Regular expression for validating US phone numbers
export const PHONE_NUMBER_REGEX = /^\+?1?\s?\(?[2-9]\d{2}\)?[-\s]?\d{3}[-\s]?\d{4}$/;

// Regular expression for validating currency amounts
export const CURRENCY_REGEX = /^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/;

// Regular expression for validating URLs
export const URL_REGEX = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

/**
 * Human Tasks:
 * 
 * Required:
 * - Review and validate the regular expressions to ensure they meet all specific requirements for the Apartment Finder application
 * 
 * Optional:
 * - Consider adding any additional regex patterns that may be needed for specific apartment listing data validation
 */