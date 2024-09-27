import { format, parse, isValid, addDays, differenceInDays } from 'date-fns';

/**
 * Formats a given date into a specified format string
 * @param date The date to format
 * @param formatString The desired format string
 * @returns Formatted date string
 */
export function formatDate(date: Date, formatString: string): string {
  return format(date, formatString);
}

/**
 * Parses a date string into a Date object
 * @param dateString The date string to parse
 * @param formatString The format string of the date string
 * @returns Parsed Date object
 * @throws Error if the parsed date is invalid
 */
export function parseDate(dateString: string, formatString: string): Date {
  const parsedDate = parse(dateString, formatString, new Date());
  if (!isValid(parsedDate)) {
    throw new Error('Invalid date string or format');
  }
  return parsedDate;
}

/**
 * Adds a specified number of days to a given date
 * @param date The initial date
 * @param days The number of days to add
 * @returns New Date object with added days
 */
export function addDaysToDate(date: Date, days: number): Date {
  return addDays(date, days);
}

/**
 * Calculates the difference in days between two dates
 * @param startDate The start date
 * @param endDate The end date
 * @returns Number of days between the two dates
 */
export function calculateDateDifference(startDate: Date, endDate: Date): number {
  return differenceInDays(endDate, startDate);
}

/**
 * Checks if a given date is within a specified range
 * @param date The date to check
 * @param startDate The start date of the range
 * @param endDate The end date of the range
 * @returns True if the date is within the range, false otherwise
 */
export function isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
  return date >= startDate && date <= endDate;
}

// Human tasks:
// TODO: Review and approve the date helper functions
// TODO: Add any additional date-related utility functions specific to the Apartment Finder application
// TODO: Ensure that the date-fns library is installed and properly configured in the project