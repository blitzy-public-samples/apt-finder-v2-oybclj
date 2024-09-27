import { Router } from 'express';
import { getListings, getListingById, createListing, updateListing, deleteListing } from '../controllers/listings.controller';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { ApartmentInterface } from '../../shared/interfaces/apartment.interface';

// Create a new Express Router instance
const listingsRouter: Router = Router();

// Define GET route for retrieving all listings
listingsRouter.get('/', getListings);

// Define GET route for retrieving a specific listing by ID
listingsRouter.get('/:id', getListingById);

// Define POST route for creating a new listing (protected by authMiddleware)
listingsRouter.post('/', authMiddleware, createListing);

// Define PUT route for updating an existing listing (protected by authMiddleware)
listingsRouter.put('/:id', authMiddleware, updateListing);

// Define DELETE route for deleting a listing (protected by authMiddleware)
listingsRouter.delete('/:id', authMiddleware, deleteListing);

// Export the configured router
export { listingsRouter };

// Human tasks:
// TODO: Implement pagination for the GET /listings route
// TODO: Add input validation middleware for POST and PUT routes
// TODO: Consider adding rate limiting to prevent abuse