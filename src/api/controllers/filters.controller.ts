import { Request, Response } from 'express';
import { FiltersService } from '../services/filters.service';
import { Filter } from '../models/filter.model';

class FiltersController {
  private filtersService: FiltersService;

  constructor(filtersService: FiltersService) {
    this.filtersService = filtersService;
  }

  /**
   * Creates a new filter for the authenticated user
   * @param req - Express Request object
   * @param res - Express Response object
   */
  async createFilter(req: Request, res: Response): Promise<void> {
    try {
      const filterData: Partial<Filter> = req.body;
      const userId = req.user?.id; // Assuming user ID is available in req.user

      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const createdFilter = await this.filtersService.createFilter(filterData, userId);
      res.status(201).json(createdFilter);
    } catch (error) {
      console.error('Error creating filter:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Retrieves all filters for the authenticated user
   * @param req - Express Request object
   * @param res - Express Response object
   */
  async getAllFilters(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const filters = await this.filtersService.getAllFilters(userId);
      res.json(filters);
    } catch (error) {
      console.error('Error retrieving filters:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Retrieves a specific filter by ID for the authenticated user
   * @param req - Express Request object
   * @param res - Express Response object
   */
  async getFilterById(req: Request, res: Response): Promise<void> {
    try {
      const filterId = req.params.id;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const filter = await this.filtersService.getFilterById(filterId, userId);

      if (!filter) {
        res.status(404).json({ message: 'Filter not found' });
        return;
      }

      res.json(filter);
    } catch (error) {
      console.error('Error retrieving filter:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Updates a specific filter for the authenticated user
   * @param req - Express Request object
   * @param res - Express Response object
   */
  async updateFilter(req: Request, res: Response): Promise<void> {
    try {
      const filterId = req.params.id;
      const filterData: Partial<Filter> = req.body;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const updatedFilter = await this.filtersService.updateFilter(filterId, filterData, userId);

      if (!updatedFilter) {
        res.status(404).json({ message: 'Filter not found' });
        return;
      }

      res.json(updatedFilter);
    } catch (error) {
      console.error('Error updating filter:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Deletes a specific filter for the authenticated user
   * @param req - Express Request object
   * @param res - Express Response object
   */
  async deleteFilter(req: Request, res: Response): Promise<void> {
    try {
      const filterId = req.params.id;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const deleted = await this.filtersService.deleteFilter(filterId, userId);

      if (!deleted) {
        res.status(404).json({ message: 'Filter not found' });
        return;
      }

      res.json({ message: 'Filter deleted successfully' });
    } catch (error) {
      console.error('Error deleting filter:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default FiltersController;

// Human tasks:
// TODO: Implement input validation for filter creation and update methods
// TODO: Add error logging for better debugging and monitoring
// TODO: Implement pagination for getAllFilters method
// TODO: Add unit tests for all controller methods
// TODO: Implement caching mechanism for frequently accessed filters