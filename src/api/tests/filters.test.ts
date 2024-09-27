import { FiltersController } from '../controllers/filters.controller';
import { FiltersService } from '../services/filters.service';
import { Filter } from '../models/filter.model';
import { Request, Response } from 'express';

jest.mock('../services/filters.service');

describe('FiltersController', () => {
  let filtersController: FiltersController;
  let filtersService: jest.Mocked<FiltersService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    filtersService = new FiltersService() as jest.Mocked<FiltersService>;
    filtersController = new FiltersController(filtersService);
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe('createFilter', () => {
    it('should create a new filter', async () => {
      const mockFilter: Filter = {
        id: '1',
        userId: 'user1',
        criterion: JSON.stringify({ minPrice: 1000, maxPrice: 2000 }),
      };
      mockRequest.body = mockFilter;
      filtersService.createFilter.mockResolvedValue(mockFilter);

      await filtersController.createFilter(mockRequest as Request, mockResponse as Response);

      expect(filtersService.createFilter).toHaveBeenCalledWith(mockFilter);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockFilter);
    });

    it('should handle errors when creating a filter', async () => {
      const error = new Error('Failed to create filter');
      mockRequest.body = {};
      filtersService.createFilter.mockRejectedValue(error);

      await filtersController.createFilter(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('getFilters', () => {
    it('should get all filters for a user', async () => {
      const mockFilters: Filter[] = [
        { id: '1', userId: 'user1', criterion: JSON.stringify({ minPrice: 1000, maxPrice: 2000 }) },
        { id: '2', userId: 'user1', criterion: JSON.stringify({ minBedrooms: 2, maxBedrooms: 3 }) },
      ];
      mockRequest.params = { userId: 'user1' };
      filtersService.getFilters.mockResolvedValue(mockFilters);

      await filtersController.getFilters(mockRequest as Request, mockResponse as Response);

      expect(filtersService.getFilters).toHaveBeenCalledWith('user1');
      expect(mockResponse.json).toHaveBeenCalledWith(mockFilters);
    });

    it('should handle errors when getting filters', async () => {
      const error = new Error('Failed to get filters');
      mockRequest.params = { userId: 'user1' };
      filtersService.getFilters.mockRejectedValue(error);

      await filtersController.getFilters(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('updateFilter', () => {
    it('should update an existing filter', async () => {
      const mockFilter: Filter = {
        id: '1',
        userId: 'user1',
        criterion: JSON.stringify({ minPrice: 1500, maxPrice: 2500 }),
      };
      mockRequest.params = { id: '1' };
      mockRequest.body = mockFilter;
      filtersService.updateFilter.mockResolvedValue(mockFilter);

      await filtersController.updateFilter(mockRequest as Request, mockResponse as Response);

      expect(filtersService.updateFilter).toHaveBeenCalledWith('1', mockFilter);
      expect(mockResponse.json).toHaveBeenCalledWith(mockFilter);
    });

    it('should handle errors when updating a filter', async () => {
      const error = new Error('Failed to update filter');
      mockRequest.params = { id: '1' };
      mockRequest.body = {};
      filtersService.updateFilter.mockRejectedValue(error);

      await filtersController.updateFilter(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('deleteFilter', () => {
    it('should delete an existing filter', async () => {
      mockRequest.params = { id: '1' };
      filtersService.deleteFilter.mockResolvedValue(true);

      await filtersController.deleteFilter(mockRequest as Request, mockResponse as Response);

      expect(filtersService.deleteFilter).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.json).toHaveBeenCalledWith();
    });

    it('should handle errors when deleting a filter', async () => {
      const error = new Error('Failed to delete filter');
      mockRequest.params = { id: '1' };
      filtersService.deleteFilter.mockRejectedValue(error);

      await filtersController.deleteFilter(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });
});

// Human tasks:
// - Implement integration tests with a test database
// - Add more edge case scenarios to improve test coverage
// - Implement performance tests for filter operations