import { format } from 'date-fns';
import { UserInterface } from '../types/auth';
import { ApartmentInterface } from '../types/listing';

/**
 * Formats a number as USD currency
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Formats a date string or Date object into a human-readable format
 * @param date - The date to format
 * @param formatString - The format string to use (default: 'MM/dd/yyyy')
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string, formatString: string = 'MM/dd/yyyy'): string => {
  return format(new Date(date), formatString);
};

/**
 * Formats an apartment address into a single line string
 * @param apartment - The apartment object containing address information
 * @returns Formatted address string
 */
export const formatAddress = (apartment: ApartmentInterface): string => {
  const { street_address, city, state, zipcode } = apartment;
  return `${street_address}, ${city}, ${state} ${zipcode}`;
};

/**
 * Formats a phone number string into a standardized format
 * @param phoneNumber - The phone number to format
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumber;
};

/**
 * Truncates a string to a specified length and adds an ellipsis if necessary
 * @param text - The text to truncate
 * @param maxLength - The maximum length of the truncated string
 * @returns Truncated string
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Formats square footage as a string with 'sq ft' suffix
 * @param squareFootage - The square footage to format
 * @returns Formatted square footage
 */
export const formatSquareFootage = (squareFootage: number): string => {
  return `${Math.round(squareFootage)} sq ft`;
};

/**
 * Formats the number of bedrooms and bathrooms into a concise string
 * @param bedrooms - The number of bedrooms
 * @param bathrooms - The number of bathrooms
 * @returns Formatted bed/bath string
 */
export const formatBedBath = (bedrooms: number, bathrooms: number): string => {
  const bedroomText = bedrooms === 1 ? '1 bed' : `${bedrooms} beds`;
  const bathroomText = bathrooms === 1 ? '1 bath' : `${bathrooms} baths`;
  return `${bedroomText} • ${bathroomText}`;
};

/**
 * Human tasks:
 * - Review and approve the formatting functions and their implementations
 * - Ensure that the date formatting is consistent with the project's requirements and localization needs
 * - Add any additional formatting functions that may be needed for the Apartment Finder application
 * - Implement unit tests for all formatting functions in this file
 */