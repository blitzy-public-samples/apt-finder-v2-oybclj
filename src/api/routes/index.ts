// src/api/routes/index.ts

import { Router } from 'express';
import authRoutes from './auth.routes';
import filterRoutes from './filters.routes';
import listingRoutes from './listings.routes';
import subscriptionRoutes from './subscriptions.routes';

/**
 * Combines all imported routes into a single Router instance
 * @returns {Router} An Express Router instance containing all combined routes
 */
function combineRoutes(): Router {
  const router = Router();

  // Use authRoutes on the router with '/auth' prefix
  router.use('/auth', authRoutes);

  // Use filterRoutes on the router with '/filters' prefix
  router.use('/filters', filterRoutes);

  // Use listingRoutes on the router with '/listings' prefix
  router.use('/listings', listingRoutes);

  // Use subscriptionRoutes on the router with '/subscriptions' prefix
  router.use('/subscriptions', subscriptionRoutes);

  return router;
}

// Export the result of the combineRoutes function
export default combineRoutes();

// Human Tasks:
// TODO: Implement individual route files (auth.routes.ts, filters.routes.ts, listings.routes.ts, subscriptions.routes.ts)
// TODO: Review and approve the overall routing structure
// TODO: Ensure all necessary middleware is applied to routes