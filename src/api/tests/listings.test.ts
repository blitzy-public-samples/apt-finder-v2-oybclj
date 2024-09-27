import { describe, it, expect, jest } from '@jest/globals';
import { Request, Response } from 'express';
import { ListingsController } from '../controllers/listings.controller';
import { ListingsService } from '../services/listings.service';
import { ApartmentInterface } from '../../shared/interfaces/apartment.interface';

// Mock the ListingsService
jest.mock('../services/listings.service');

// Helper function to create a mock Request object
const createMockRequest = (params = {}, query = {}, body = {}): Partial<Request> => ({
  params,
  query,
  body,
});

// Helper function to create a mock Response object
const createMockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('ListingsController', () => {
  let listingsController: ListingsController;
  let listingsService: jest.Mocked<ListingsService>;

  beforeEach(() => {
    listingsService = new ListingsService() as jest.Mocked<ListingsService>;
    listingsController = new ListingsController(listingsService);
  });

  describe('getListings', () => {
    it('should return a list of apartment listings', async () => {
      const mockListings: ApartmentInterface[] = [
        { id: '1', title: 'Apartment 1', rent: 1000 },
        { id: '2', title: 'Apartment 2', rent: 1200 },
      ];
      listingsService.getListings.mockResolvedValue(mockListings);

      const mockReq = createMockRequest();
      const mockRes = createMockResponse();

      await listingsController.getListings(mockReq as Request, mockRes as Response);

      expect(listingsService.getListings).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockListings);
    });
  });

  describe('getListingById', () => {
    it('should return a single apartment listing by ID', async () => {
      const mockListing: ApartmentInterface = { id: '1', title: 'Apartment 1', rent: 1000 };
      listingsService.getListingById.mockResolvedValue(mockListing);

      const mockReq = createMockRequest({ id: '1' });
      const mockRes = createMockResponse();

      await listingsController.getListingById(mockReq as Request, mockRes as Response);

      expect(listingsService.getListingById).toHaveBeenCalledWith('1');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockListing);
    });
  });

  describe('createListing', () => {
    it('should create a new apartment listing', async () => {
      const newListing: ApartmentInterface = { title: 'New Apartment', rent: 1500 };
      const createdListing: ApartmentInterface = { id: '3', ...newListing };
      listingsService.createListing.mockResolvedValue(createdListing);

      const mockReq = createMockRequest({}, {}, newListing);
      const mockRes = createMockResponse();

      await listingsController.createListing(mockReq as Request, mockRes as Response);

      expect(listingsService.createListing).toHaveBeenCalledWith(newListing);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(createdListing);
    });
  });

  describe('updateListing', () => {
    it('should update an existing apartment listing', async () => {
      const updatedListing: ApartmentInterface = { id: '1', title: 'Updated Apartment', rent: 1100 };
      listingsService.updateListing.mockResolvedValue(updatedListing);

      const mockReq = createMockRequest({ id: '1' }, {}, { title: 'Updated Apartment', rent: 1100 });
      const mockRes = createMockResponse();

      await listingsController.updateListing(mockReq as Request, mockRes as Response);

      expect(listingsService.updateListing).toHaveBeenCalledWith('1', { title: 'Updated Apartment', rent: 1100 });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(updatedListing);
    });
  });

  describe('deleteListing', () => {
    it('should delete an apartment listing', async () => {
      listingsService.deleteListing.mockResolvedValue(undefined);

      const mockReq = createMockRequest({ id: '1' });
      const mockRes = createMockResponse();

      await listingsController.deleteListing(mockReq as Request, mockRes as Response);

      expect(listingsService.deleteListing).toHaveBeenCalledWith('1');
      expect(mockRes.status).toHaveBeenCalledWith(204);
      expect(mockRes.send).toHaveBeenCalled();
    });
  });
});

describe('ListingsService', () => {
  let listingsService: ListingsService;

  beforeEach(() => {
    listingsService = new ListingsService();
  });

  describe('getListings', () => {
    it('should return filtered apartment listings', async () => {
      // Implementation depends on the actual ListingsService implementation
      // This is a placeholder test
      const filters = { minRent: 1000, maxRent: 2000 };
      const listings = await listingsService.getListings(filters);
      expect(Array.isArray(listings)).toBeTruthy();
      expect(listings.every(listing => listing.rent >= 1000 && listing.rent <= 2000)).toBeTruthy();
    });
  });

  describe('getListingById', () => {
    it('should return a single apartment listing by ID', async () => {
      // Implementation depends on the actual ListingsService implementation
      // This is a placeholder test
      const id = '1';
      const listing = await listingsService.getListingById(id);
      expect(listing).toBeDefined();
      expect(listing.id).toBe(id);
    });
  });

  describe('updateListings', () => {
    it('should update the local database with the latest listings from Zillow', async () => {
      // Implementation depends on the actual ListingsService implementation
      // This is a placeholder test
      const result = await listingsService.updateListings();
      expect(result).toBeDefined();
    });
  });

  describe('applyFilters', () => {
    it('should correctly apply filters to a list of apartment listings', () => {
      const listings: ApartmentInterface[] = [
        { id: '1', title: 'Apt 1', rent: 1000, bedrooms: 1, bathrooms: 1 },
        { id: '2', title: 'Apt 2', rent: 1500, bedrooms: 2, bathrooms: 1 },
        { id: '3', title: 'Apt 3', rent: 2000, bedrooms: 2, bathrooms: 2 },
      ];
      const filters = { minRent: 1200, maxRent: 1800, minBedrooms: 2 };
      const filteredListings = listingsService.applyFilters(listings, filters);
      expect(filteredListings).toHaveLength(1);
      expect(filteredListings[0].id).toBe('2');
    });
  });
});

// Human tasks:
// TODO: Implement error handling tests for all controller and service methods
// TODO: Add integration tests that use a test database instead of mocking the ZillowService
// TODO: Implement tests for pagination in the getListings method
// TODO: Add performance tests for methods that handle large datasets