// src/api/tests/index.ts

import { describe, it } from 'mocha';
import authTests from './auth.test';
import filtersTests from './filters.test';
import listingsTests from './listings.test';
import subscriptionsTests from './subscriptions.test';

describe('API Tests', () => {
  describe('Authentication Tests', authTests);
  describe('Filters Tests', filtersTests);
  describe('Listings Tests', listingsTests);
  describe('Subscriptions Tests', subscriptionsTests);
});

// Function to run all API test suites
export const runAllTests = (): void => {
  describe('Apartment Finder API Test Suite', () => {
    // Authentication Tests
    describe('Authentication', authTests);

    // Filters Tests
    describe('Filters', filtersTests);

    // Listings Tests
    describe('Listings', listingsTests);

    // Subscriptions Tests
    describe('Subscriptions', subscriptionsTests);
  });
};

// Export individual test suites for granular testing if needed
export { authTests, filtersTests, listingsTests, subscriptionsTests };

// Human Tasks:
// - Implement individual test files (auth.test.ts, filters.test.ts, listings.test.ts, subscriptions.test.ts)
// - Set up test environment and configuration
// - Integrate with CI/CD pipeline for automated testing