/**
 * This file defines the FilterInterface, which represents the structure of a filter object
 * used for apartment searches in the Apartment Finder application.
 */

/**
 * Interface defining the structure of a filter object used for apartment searches
 */
export interface FilterInterface {
  /**
   * Unique identifier for the filter
   */
  id: string | number;

  /**
   * Identifier of the user who created the filter
   */
  userId: string | number;

  /**
   * Array of zip codes to search within
   */
  zipCodes: string[];

  /**
   * Minimum rent amount for the search
   */
  minRent: number;

  /**
   * Maximum rent amount for the search
   */
  maxRent: number;

  /**
   * Number of bedrooms to search for
   */
  bedrooms: number;

  /**
   * Number of bathrooms to search for
   */
  bathrooms: number;

  /**
   * Minimum square footage for the search
   */
  minSquareFootage: number;

  /**
   * Maximum square footage for the search
   */
  maxSquareFootage: number;

  /**
   * Date when the filter was created
   */
  createdAt: Date;

  /**
   * Date when the filter was last updated
   */
  updatedAt: Date;
}