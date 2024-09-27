/**
 * This file defines the TypeScript types and interfaces related to filters
 * in the Apartment Finder application. It includes types for filter criteria,
 * filter objects, and filter-related API responses.
 */

/**
 * Represents the criteria used for filtering apartment listings
 */
export interface FilterCriteria {
  zipCodes: string[];
  minRent: number;
  maxRent: number;
  bedrooms: number;
  bathrooms: number;
  minSquareFootage: number;
  maxSquareFootage: number;
}

/**
 * Represents a saved filter object
 */
export interface Filter {
  id: string;
  name: string;
  userId: string;
  criteria: FilterCriteria;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Represents the request body for creating a new filter
 */
export interface CreateFilterRequest {
  name: string;
  criteria: FilterCriteria;
}

/**
 * Represents the request body for updating an existing filter
 */
export interface UpdateFilterRequest {
  name?: string;
  criteria?: Partial<FilterCriteria>;
}

/**
 * Represents the response structure for filter-related API calls
 */
export interface FilterResponse {
  filter: Filter;
}

/**
 * Represents the response structure for retrieving multiple filters
 */
export interface FiltersResponse {
  filters: Filter[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Human tasks:
 * TODO: Review and validate the defined types to ensure they match the backend API and database schema
 * TODO: Consider adding JSDoc comments to provide more detailed descriptions for each type and its properties
 * TODO: Ensure that these types are properly used in the corresponding components and services
 */