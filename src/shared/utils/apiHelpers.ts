import axios, { AxiosError } from 'axios';

// Define the ApiResponse and ApiError interfaces
interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

interface ApiError {
  message: string;
  code: string;
  status: number;
}

/**
 * Handles API errors and returns a standardized ApiError object
 * @param error - The error object from the API request
 * @returns A standardized ApiError object
 */
export const handleApiError = (error: any): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    return {
      message: axiosError.message || 'An unknown error occurred',
      code: axiosError.code || 'UNKNOWN_ERROR',
      status: axiosError.response?.status || 500,
    };
  }
  return {
    message: error.message || 'An unknown error occurred',
    code: 'UNKNOWN_ERROR',
    status: 500,
  };
};

/**
 * Processes API responses and returns a standardized ApiResponse object
 * @param response - The response object from the API request
 * @returns A standardized ApiResponse object
 */
export const handleApiResponse = <T>(response: any): ApiResponse<T> => {
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

/**
 * Creates a URL query string from an object of parameters
 * @param params - An object containing key-value pairs for query parameters
 * @returns A URL-encoded query string
 */
export const createQueryString = (params: Record<string, string | number | boolean>): string => {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
};

/**
 * Retries an API request with exponential backoff
 * @param requestFn - A function that returns a Promise for the API request
 * @param maxRetries - The maximum number of retry attempts
 * @param initialDelay - The initial delay in milliseconds before the first retry
 * @returns A Promise that resolves with the result of the successful API request
 */
export const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> => {
  let retries = 0;
  let delay = initialDelay;

  while (retries < maxRetries) {
    try {
      return await requestFn();
    } catch (error) {
      retries++;
      if (retries >= maxRetries) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }

  throw new Error('Max retries reached');
};

// Human tasks:
// TODO: Review and approve the API helper functions
// TODO: Implement error handling and logging mechanisms
// TODO: Consider adding additional API-related utility functions as needed