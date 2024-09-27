// src/frontend/src/constants/apiEndpoints.ts

// Base URL for API endpoints
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

// Helper function to generate full API endpoint URLs
const generateEndpoint = (path: string): string => `${API_BASE_URL}${path}`;

// Authentication endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: generateEndpoint('/auth/login'),
  SIGNUP: generateEndpoint('/auth/signup'),
  LOGOUT: generateEndpoint('/auth/logout'),
  FORGOT_PASSWORD: generateEndpoint('/auth/forgot-password'),
  RESET_PASSWORD: generateEndpoint('/auth/reset-password'),
};

// Filter endpoints
export const FILTER_ENDPOINTS = {
  CREATE: generateEndpoint('/filters'),
  GET_ALL: generateEndpoint('/filters'),
  GET_ONE: generateEndpoint('/filters/{id}'),
  UPDATE: generateEndpoint('/filters/{id}'),
  DELETE: generateEndpoint('/filters/{id}'),
};

// Listing endpoints
export const LISTING_ENDPOINTS = {
  GET_ALL: generateEndpoint('/listings'),
  GET_ONE: generateEndpoint('/listings/{id}'),
  SEARCH: generateEndpoint('/listings/search'),
};

// Subscription endpoints
export const SUBSCRIPTION_ENDPOINTS = {
  CREATE: generateEndpoint('/subscriptions'),
  GET_ALL: generateEndpoint('/subscriptions'),
  GET_ONE: generateEndpoint('/subscriptions/{id}'),
  UPDATE: generateEndpoint('/subscriptions/{id}'),
  CANCEL: generateEndpoint('/subscriptions/{id}/cancel'),
};

// Human tasks (commented)
/*
TODO:
1. Verify and update the API_BASE_URL with the correct production URL when deploying
2. Ensure that all required API endpoints are included and correctly named
3. Update .env file with the correct REACT_APP_API_BASE_URL for different environments
*/