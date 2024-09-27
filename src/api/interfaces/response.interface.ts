/**
 * src/api/interfaces/response.interface.ts
 * 
 * This file defines the ResponseInterface, which represents the structure of API response objects
 * in the Apartment Finder web service. It provides a standardized format for all API responses,
 * ensuring consistency across the application.
 */

/**
 * Interface for API response objects
 */
export interface ResponseInterface {
  /**
   * The HTTP status code of the response
   */
  status: number;

  /**
   * Indicates whether the API request was successful
   */
  success: boolean;

  /**
   * A human-readable message describing the result of the API request
   */
  message: string;

  /**
   * The main payload of the response, which can be of any type
   */
  data: any;

  /**
   * An array of error messages, if any occurred during the request processing
   */
  errors: string[];
}