import { RegexPatterns } from '../../shared/constants/regexPatterns';
import { UserInterface } from '../types/auth';
import { FilterInterface } from '../types/filter';

export const isValidEmail = (email: string): boolean => {
  return RegexPatterns.EMAIL.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 12 && RegexPatterns.PASSWORD.test(password);
};

export const isValidZipCode = (zipCode: string): boolean => {
  return RegexPatterns.ZIP_CODE.test(zipCode);
};

export const validateLoginForm = (loginData: Partial<UserInterface>): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!loginData.email || !isValidEmail(loginData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!loginData.password) {
    errors.password = 'Password is required';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateSignupForm = (signupData: Partial<UserInterface>): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!signupData.email || !isValidEmail(signupData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!signupData.password || !isValidPassword(signupData.password)) {
    errors.password = 'Password must be at least 12 characters long and include uppercase, lowercase, number, and special character';
  }

  if (signupData.password !== signupData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (!signupData.firstName) {
    errors.firstName = 'First name is required';
  }

  if (!signupData.lastName) {
    errors.lastName = 'Last name is required';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateFilterForm = (filterData: Partial<FilterInterface>): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (filterData.minRent && (isNaN(filterData.minRent) || filterData.minRent < 0)) {
    errors.minRent = 'Minimum rent must be a positive number';
  }

  if (filterData.maxRent && (isNaN(filterData.maxRent) || filterData.maxRent < 0)) {
    errors.maxRent = 'Maximum rent must be a positive number';
  }

  if (filterData.minRent && filterData.maxRent && filterData.minRent > filterData.maxRent) {
    errors.maxRent = 'Maximum rent must be greater than or equal to minimum rent';
  }

  if (filterData.zipCodes && (!Array.isArray(filterData.zipCodes) || !filterData.zipCodes.every(isValidZipCode))) {
    errors.zipCodes = 'Please enter valid zip codes';
  }

  if (filterData.bedrooms && (isNaN(filterData.bedrooms) || filterData.bedrooms < 0)) {
    errors.bedrooms = 'Number of bedrooms must be a positive number';
  }

  if (filterData.bathrooms && (isNaN(filterData.bathrooms) || filterData.bathrooms < 0)) {
    errors.bathrooms = 'Number of bathrooms must be a positive number';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateFormField = (fieldName: string, value: any, validationRules: Record<string, any>): string => {
  if (validationRules.required && !value) {
    return `${fieldName} is required`;
  }

  if (validationRules.minLength && value.length < validationRules.minLength) {
    return `${fieldName} must be at least ${validationRules.minLength} characters long`;
  }

  if (validationRules.maxLength && value.length > validationRules.maxLength) {
    return `${fieldName} must not exceed ${validationRules.maxLength} characters`;
  }

  if (validationRules.pattern && !validationRules.pattern.test(value)) {
    return `Please enter a valid ${fieldName}`;
  }

  return '';
};

// Human tasks:
// TODO: Review and approve the frontend-specific validation functions and their implementations
// TODO: Ensure that the RegexPatterns imported from shared constants are correctly used in the frontend context
// TODO: Add any additional frontend-specific validation functions that may be needed for the Apartment Finder application
// TODO: Implement unit tests for all validation functions in this file