import mongoose from 'mongoose';
import { FilterInterface } from '../../shared/interfaces/filter.interface';
import { FilterModel } from '../models/filter.model';

export class FiltersService {
  private filterModel: mongoose.Model<FilterInterface>;

  constructor() {
    this.filterModel = FilterModel;
  }

  /**
   * Creates a new filter for a user
   * @param filterData The filter data to be created
   * @returns The created filter object
   */
  async createFilter(filterData: FilterInterface): Promise<FilterInterface> {
    try {
      // Validate the input filterData
      // TODO: Implement input validation

      // Create a new filter document using the filterModel
      const newFilter = new this.filterModel(filterData);

      // Save the filter document to the database
      const savedFilter = await newFilter.save();

      return savedFilter;
    } catch (error) {
      // TODO: Implement proper error handling and logging
      throw new Error(`Error creating filter: ${error.message}`);
    }
  }

  /**
   * Retrieves a filter by its ID
   * @param filterId The ID of the filter to retrieve
   * @returns The found filter object or null if not found
   */
  async getFilterById(filterId: string): Promise<FilterInterface | null> {
    try {
      // Validate the input filterId
      if (!mongoose.Types.ObjectId.isValid(filterId)) {
        throw new Error('Invalid filter ID');
      }

      // Query the database for a filter with the given ID
      const filter = await this.filterModel.findById(filterId);

      return filter;
    } catch (error) {
      // TODO: Implement proper error handling and logging
      throw new Error(`Error retrieving filter: ${error.message}`);
    }
  }

  /**
   * Updates an existing filter
   * @param filterId The ID of the filter to update
   * @param updateData The data to update the filter with
   * @returns The updated filter object or null if not found
   */
  async updateFilter(filterId: string, updateData: Partial<FilterInterface>): Promise<FilterInterface | null> {
    try {
      // Validate the input filterId and updateData
      if (!mongoose.Types.ObjectId.isValid(filterId)) {
        throw new Error('Invalid filter ID');
      }
      // TODO: Implement input validation for updateData

      // Query the database to find the filter by ID and update it
      const updatedFilter = await this.filterModel.findByIdAndUpdate(
        filterId,
        updateData,
        { new: true, runValidators: true }
      );

      return updatedFilter;
    } catch (error) {
      // TODO: Implement proper error handling and logging
      throw new Error(`Error updating filter: ${error.message}`);
    }
  }

  /**
   * Deletes a filter by its ID
   * @param filterId The ID of the filter to delete
   * @returns True if the filter was deleted, false otherwise
   */
  async deleteFilter(filterId: string): Promise<boolean> {
    try {
      // Validate the input filterId
      if (!mongoose.Types.ObjectId.isValid(filterId)) {
        throw new Error('Invalid filter ID');
      }

      // Query the database to find and delete the filter by ID
      const result = await this.filterModel.findByIdAndDelete(filterId);

      return result !== null;
    } catch (error) {
      // TODO: Implement proper error handling and logging
      throw new Error(`Error deleting filter: ${error.message}`);
    }
  }

  /**
   * Retrieves all filters for a specific user
   * @param userId The ID of the user
   * @returns An array of filter objects belonging to the user
   */
  async getUserFilters(userId: string): Promise<FilterInterface[]> {
    try {
      // Validate the input userId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID');
      }

      // Query the database to find all filters with the given userId
      const filters = await this.filterModel.find({ userId });

      return filters;
    } catch (error) {
      // TODO: Implement proper error handling and logging
      throw new Error(`Error retrieving user filters: ${error.message}`);
    }
  }
}

// Human tasks:
// TODO: Implement proper error handling and logging for database operations
// TODO: Add input validation for filter creation and update operations
// TODO: Implement pagination for getUserFilters method to handle large numbers of filters