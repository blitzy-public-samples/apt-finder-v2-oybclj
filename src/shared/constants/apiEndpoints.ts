/**
 * API Endpoints for the Apartment Finder application
 * This file contains constants for all API endpoints used in the application.
 * It provides a centralized location for managing and accessing API routes,
 * ensuring consistency across the frontend and backend.
 */

// Base URL for all API endpoints
export const API_BASE_URL = '/api/v1';

// Authentication endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
};

// User-related endpoints
export const USER_ENDPOINTS = {
  PROFILE: '/users/profile',
  UPDATE_PROFILE: '/users/update-profile',
};

// Filter-related endpoints
export const FILTER_ENDPOINTS = {
  CREATE: '/filters',
  GET_ALL: '/filters',
  GET_BY_ID: '/filters/:id',
  UPDATE: '/filters/:id',
  DELETE: '/filters/:id',
};

// Listing-related endpoints
export const LISTING_ENDPOINTS = {
  SEARCH: '/listings/search',
  GET_BY_ID: '/listings/:id',
};

// Subscription-related endpoints
export const SUBSCRIPTION_ENDPOINTS = {
  CREATE: '/subscriptions',
  GET_ALL: '/subscriptions',
  GET_BY_ID: '/subscriptions/:id',
  UPDATE: '/subscriptions/:id',
  CANCEL: '/subscriptions/:id/cancel',
};

// Zillow-related endpoints
export const ZILLOW_ENDPOINTS = {
  FETCH_LISTINGS: '/zillow/fetch-listings',
};

// Export all endpoints as a single object for convenience
export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,
  AUTH: AUTH_ENDPOINTS,
  USER: USER_ENDPOINTS,
  FILTER: FILTER_ENDPOINTS,
  LISTING: LISTING_ENDPOINTS,
  SUBSCRIPTION: SUBSCRIPTION_ENDPOINTS,
  ZILLOW: ZILLOW_ENDPOINTS,
};