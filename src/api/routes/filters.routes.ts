import { Router } from 'express';
import * as FiltersController from '../controllers/filters.controller';
import { authMiddleware } from '../middleware/auth.middleware';

/**
 * Creates and configures the router for filter-related endpoints
 * @returns An Express Router instance with configured filter routes
 */
const createFilterRoutes = (): Router => {
  const router = Router();

  // POST route for creating a new filter
  router.post('/', authMiddleware, FiltersController.createFilter);

  // GET route for retrieving all filters for the authenticated user
  router.get('/', authMiddleware, FiltersController.getAllFilters);

  // GET route for retrieving a specific filter by ID
  router.get('/:id', authMiddleware, FiltersController.getFilterById);

  // PUT route for updating a specific filter
  router.put('/:id', authMiddleware, FiltersController.updateFilter);

  // DELETE route for deleting a specific filter
  router.delete('/:id', authMiddleware, FiltersController.deleteFilter);

  return router;
};

export default createFilterRoutes;

// Human tasks:
// TODO: Implement input validation middleware for filter creation and update routes
// TODO: Add pagination support for retrieving all filters
// TODO: Implement rate limiting for filter-related endpoints