/**
 * src/api/interfaces/request.interface.ts
 * 
 * This file defines the RequestInterface, which represents the structure of API request objects 
 * used throughout the application. It provides a standardized format for incoming requests, 
 * ensuring consistency and type safety in request handling.
 */

/**
 * Interface for API request objects
 */
export interface RequestInterface {
  /**
   * The request body containing the payload of the request
   */
  body: any;

  /**
   * URL parameters extracted from the request path
   */
  params: Record<string, string>;

  /**
   * Query parameters from the request URL
   */
  query: Record<string, string>;

  /**
   * HTTP headers included in the request
   */
  headers: Record<string, string>;

  /**
   * User information if the request is authenticated
   */
  user?: {
    id: string;
    email: string;
  };
}