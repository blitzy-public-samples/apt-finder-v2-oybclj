/**
 * This file contains common TypeScript types used throughout the Apartment Finder web service frontend application.
 */

/**
 * Generic type for API responses
 */
export type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};

/**
 * Generic type for paginated API responses
 */
export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

/**
 * Type for error responses from the API
 */
export type ErrorResponse = {
  message: string;
  errors?: { [key: string]: string[] };
};

/**
 * Type for sorting order
 */
export type SortOrder = 'asc' | 'desc';

/**
 * Type for filter operators
 */
export type FilterOperator = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'like';

/**
 * Type for filter criteria
 */
export type FilterCriteria = {
  field: string;
  operator: FilterOperator;
  value: any;
};

/**
 * Type for sort criteria
 */
export type SortCriteria = {
  field: string;
  order: SortOrder;
};

/**
 * Type for pagination parameters
 */
export type PaginationParams = {
  page: number;
  limit: number;
};

/**
 * Type for query parameters
 */
export type QueryParams = {
  filters?: FilterCriteria[];
  sort?: SortCriteria[];
  pagination?: PaginationParams;
};

/**
 * Type alias for ID fields
 */
export type ID = string | number;