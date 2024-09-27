// src/shared/config/environment.ts

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define the NODE_ENV
export const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Retrieves an environment variable, throwing an error if it's not set
 * @param key The name of the environment variable
 * @returns The value of the environment variable
 * @throws Error if the environment variable is not set
 */
export function getEnvironmentVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}

// Export environment-specific variables
export const API_BASE_URL = getEnvironmentVariable('API_BASE_URL');
export const DATABASE_URL = getEnvironmentVariable('DATABASE_URL');
export const REDIS_URL = getEnvironmentVariable('REDIS_URL');
export const JWT_SECRET = getEnvironmentVariable('JWT_SECRET');
export const ZILLOW_API_KEY = getEnvironmentVariable('ZILLOW_API_KEY');
export const PAYPAL_CLIENT_ID = getEnvironmentVariable('PAYPAL_CLIENT_ID');
export const PAYPAL_CLIENT_SECRET = getEnvironmentVariable('PAYPAL_CLIENT_SECRET');

// Human tasks (commented)
/**
 * TODO: Human Tasks
 * 1. Set up proper .env files for different environments (development, staging, production)
 * 2. Ensure all sensitive information (API keys, secrets) are properly secured and not committed to version control
 * 3. Review and adjust the list of environment variables based on the specific needs of the Apartment Finder application
 */