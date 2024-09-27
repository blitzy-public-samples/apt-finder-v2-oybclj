/**
 * src/shared/utils/formatting.ts
 * 
 * This file contains utility functions for formatting various types of data
 * used in the Apartment Finder application, such as currency, dates, addresses,
 * and other relevant information.
 */

/**
 * Formats a number as a currency string with the specified currency symbol and decimal places
 * @param amount The number to format
 * @param currencySymbol The currency symbol to use (e.g., '$')
 * @param decimalPlaces The number of decimal places to show
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currencySymbol: string, decimalPlaces: number): string {
  // Check if the amount is a valid number
  if (isNaN(amount)) {
    return 'Invalid amount';
  }

  // Round the amount to the specified decimal places
  const roundedAmount = Number(amount.toFixed(decimalPlaces));

  // Convert the number to a string with fixed decimal places
  const formattedAmount = roundedAmount.toFixed(decimalPlaces);

  // Add the currency symbol to the beginning of the string
  return `${currencySymbol}${formattedAmount}`;
}

/**
 * Formats a phone number string into a standardized format (e.g., (XXX) XXX-XXXX)
 * @param phoneNumber The phone number to format
 * @returns Formatted phone number string
 */
export function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters from the input string
  const digitsOnly = phoneNumber.replace(/\D/g, '');

  // Check if the resulting string has 10 digits
  if (digitsOnly.length === 10) {
    // If valid, format the string as (XXX) XXX-XXXX
    return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
  }

  // If invalid, return the original input string
  return phoneNumber;
}

/**
 * Formats an address object into a single-line string
 * @param address The address object containing street, city, state, and zipcode
 * @returns Formatted address string
 */
export function formatAddress(address: { street: string; city: string; state: string; zipcode: string }): string {
  // Extract street, city, state, and zipcode from the address object
  const { street, city, state, zipcode } = address;

  // Combine the components into a single string, separated by commas
  const formattedAddress = `${street}, ${city}, ${state} ${zipcode}`;

  // Trim any extra whitespace
  return formattedAddress.trim();
}

/**
 * Formats a number as a square footage string with 'sq ft' suffix
 * @param squareFootage The square footage number to format
 * @returns Formatted square footage string
 */
export function formatSquareFootage(squareFootage: number): string {
  // Round the input number to the nearest integer
  const roundedFootage = Math.round(squareFootage);

  // Convert the number to a string
  let formattedFootage = roundedFootage.toString();

  // Add commas for thousands separators
  formattedFootage = formattedFootage.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Append 'sq ft' to the end of the string
  return `${formattedFootage} sq ft`;
}

/**
 * Capitalizes the first letter of a given string
 * @param input The input string to capitalize
 * @returns String with the first letter capitalized
 */
export function capitalizeFirstLetter(input: string): string {
  // Check if the input string is empty or null
  if (!input) {
    return input;
  }

  // Capitalize the first letter and concatenate with the rest of the string
  return input.charAt(0).toUpperCase() + input.slice(1);
}

/**
 * Human tasks:
 * - Review and approve the formatting utility functions
 * - Add unit tests for each formatting function
 * - Consider adding more specific formatting functions for apartment-related data if needed
 */