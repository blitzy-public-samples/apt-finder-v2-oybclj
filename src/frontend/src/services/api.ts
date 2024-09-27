import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';

// TODO: Import API_BASE_URL from environment configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Creates and configures an Axios instance for making API requests
 * @returns {AxiosInstance} Configured Axios instance
 */
const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return instance;
};

/**
 * Sets the authentication token in the Axios instance headers
 * @param {string | null} token - The authentication token
 */
export const setAuthToken = (token: string | null): void => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

/**
 * Handles API errors and formats them for consistent error handling
 * @param {AxiosError} error - The error object from Axios
 * @returns {object} Formatted error object
 */
export const handleApiError = (error: AxiosError): object => {
  if (error.response) {
    return {
      status: error.response.status,
      message: error.response.data.message || 'An error occurred',
      data: error.response.data,
    };
  }
  return {
    status: 500,
    message: 'Network Error',
    data: null,
  };
};

/**
 * Main API service class for making HTTP requests
 */
class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = createApiInstance();
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // You can add any request modifications here
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(handleApiError(error))
    );
  }

  /**
   * Performs a GET request
   * @param {string} url - The API endpoint
   * @param {AxiosRequestConfig} config - Optional Axios config
   * @returns {Promise<any>} Promise resolving to the response data
   */
  public async get(url: string, config?: AxiosRequestConfig): Promise<any> {
    try {
      const response = await this.api.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Performs a POST request
   * @param {string} url - The API endpoint
   * @param {object} data - The data to be sent
   * @param {AxiosRequestConfig} config - Optional Axios config
   * @returns {Promise<any>} Promise resolving to the response data
   */
  public async post(url: string, data: object, config?: AxiosRequestConfig): Promise<any> {
    try {
      const response = await this.api.post(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Performs a PUT request
   * @param {string} url - The API endpoint
   * @param {object} data - The data to be sent
   * @param {AxiosRequestConfig} config - Optional Axios config
   * @returns {Promise<any>} Promise resolving to the response data
   */
  public async put(url: string, data: object, config?: AxiosRequestConfig): Promise<any> {
    try {
      const response = await this.api.put(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Performs a DELETE request
   * @param {string} url - The API endpoint
   * @param {AxiosRequestConfig} config - Optional Axios config
   * @returns {Promise<any>} Promise resolving to the response data
   */
  public async delete(url: string, config?: AxiosRequestConfig): Promise<any> {
    try {
      const response = await this.api.delete(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const api = new ApiService();
export default api;

// Human tasks:
// TODO: Implement proper error handling and logging mechanism
// TODO: Set up environment-specific API base URLs
// TODO: Implement request throttling or rate limiting