import { Request, Response } from 'express';
import { ListingsService } from '../services/listings.service';
import { ApartmentInterface } from '../../shared/interfaces/apartment.interface';

export class ListingsController {
  private listingsService: ListingsService;

  constructor() {
    this.listingsService = new ListingsService();
  }

  /**
   * Retrieves a list of apartment listings based on filter criteria
   * @param req Express Request object
   * @param res Express Response object
   */
  public async getListings(req: Request, res: Response): Promise<void> {
    try {
      const filterCriteria = req.query; // Extract filter criteria from query parameters
      const listings = await this.listingsService.getListings(filterCriteria);
      res.status(200).json(listings);
    } catch (error) {
      console.error('Error in getListings:', error);
      res.status(500).json({ message: 'An error occurred while fetching listings' });
    }
  }

  /**
   * Retrieves a single apartment listing by its ID
   * @param req Express Request object
   * @param res Express Response object
   */
  public async getListingById(req: Request, res: Response): Promise<void> {
    try {
      const listingId = req.params.id;
      const listing = await this.listingsService.getListingById(listingId);
      if (listing) {
        res.status(200).json(listing);
      } else {
        res.status(404).json({ message: 'Listing not found' });
      }
    } catch (error) {
      console.error('Error in getListingById:', error);
      res.status(500).json({ message: 'An error occurred while fetching the listing' });
    }
  }

  /**
   * Creates a new apartment listing
   * @param req Express Request object
   * @param res Express Response object
   */
  public async createListing(req: Request, res: Response): Promise<void> {
    try {
      const listingData: ApartmentInterface = req.body;
      // TODO: Implement input validation
      const createdListing = await this.listingsService.createListing(listingData);
      res.status(201).json(createdListing);
    } catch (error) {
      console.error('Error in createListing:', error);
      res.status(500).json({ message: 'An error occurred while creating the listing' });
    }
  }

  /**
   * Updates an existing apartment listing
   * @param req Express Request object
   * @param res Express Response object
   */
  public async updateListing(req: Request, res: Response): Promise<void> {
    try {
      const listingId = req.params.id;
      const listingData: Partial<ApartmentInterface> = req.body;
      // TODO: Implement input validation
      const updatedListing = await this.listingsService.updateListing(listingId, listingData);
      if (updatedListing) {
        res.status(200).json(updatedListing);
      } else {
        res.status(404).json({ message: 'Listing not found' });
      }
    } catch (error) {
      console.error('Error in updateListing:', error);
      res.status(500).json({ message: 'An error occurred while updating the listing' });
    }
  }

  /**
   * Deletes an apartment listing
   * @param req Express Request object
   * @param res Express Response object
   */
  public async deleteListing(req: Request, res: Response): Promise<void> {
    try {
      const listingId = req.params.id;
      const deleted = await this.listingsService.deleteListing(listingId);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Listing not found' });
      }
    } catch (error) {
      console.error('Error in deleteListing:', error);
      res.status(500).json({ message: 'An error occurred while deleting the listing' });
    }
  }
}

// TODO: Implement input validation for createListing and updateListing functions
// TODO: Add error handling for database connection issues
// TODO: Implement pagination for getListings function
// TODO: Add logging for all controller actions

export default new ListingsController();