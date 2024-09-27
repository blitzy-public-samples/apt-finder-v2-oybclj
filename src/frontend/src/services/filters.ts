import { ApiService } from './api';
import { FILTER_ENDPOINTS } from '../shared/constants/apiEndpoints';
import { Filter } from '../types/filter';

export class FilterService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  /**
   * Retrieves all filters for the current user
   * @returns Promise resolving to an array of Filter objects
   */
  async getFilters(): Promise<Filter[]> {
    try {
      const response = await this.apiService.get(FILTER_ENDPOINTS.GET_FILTERS);
      return response.data;
    } catch (error) {
      // Error handling should be implemented here
      console.error('Error fetching filters:', error);
      throw error;
    }
  }

  /**
   * Retrieves a specific filter by its ID
   * @param filterId - The ID of the filter to retrieve
   * @returns Promise resolving to a Filter object
   */
  async getFilterById(filterId: string): Promise<Filter> {
    try {
      const response = await this.apiService.get(FILTER_ENDPOINTS.GET_FILTER_BY_ID, { params: { id: filterId } });
      return response.data;
    } catch (error) {
      // Error handling should be implemented here
      console.error(`Error fetching filter with ID ${filterId}:`, error);
      throw error;
    }
  }

  /**
   * Creates a new filter
   * @param filterData - The data for the new filter
   * @returns Promise resolving to the created Filter object
   */
  async createFilter(filterData: Filter): Promise<Filter> {
    try {
      const response = await this.apiService.post(FILTER_ENDPOINTS.CREATE_FILTER, filterData);
      return response.data;
    } catch (error) {
      // Error handling should be implemented here
      console.error('Error creating filter:', error);
      throw error;
    }
  }

  /**
   * Updates an existing filter
   * @param filterId - The ID of the filter to update
   * @param filterData - The updated filter data
   * @returns Promise resolving to the updated Filter object
   */
  async updateFilter(filterId: string, filterData: Filter): Promise<Filter> {
    try {
      const response = await this.apiService.put(`${FILTER_ENDPOINTS.UPDATE_FILTER}/${filterId}`, filterData);
      return response.data;
    } catch (error) {
      // Error handling should be implemented here
      console.error(`Error updating filter with ID ${filterId}:`, error);
      throw error;
    }
  }

  /**
   * Deletes a filter
   * @param filterId - The ID of the filter to delete
   * @returns Promise resolving to void on successful deletion
   */
  async deleteFilter(filterId: string): Promise<void> {
    try {
      await this.apiService.delete(`${FILTER_ENDPOINTS.DELETE_FILTER}/${filterId}`);
    } catch (error) {
      // Error handling should be implemented here
      console.error(`Error deleting filter with ID ${filterId}:`, error);
      throw error;
    }
  }

  /**
   * Applies a filter to get matching apartment listings
   * @param filterId - The ID of the filter to apply
   * @returns Promise resolving to the filtered apartment listings
   */
  async applyFilter(filterId: string): Promise<any> {
    try {
      const response = await this.apiService.get(`${FILTER_ENDPOINTS.APPLY_FILTER}/${filterId}`);
      return response.data;
    } catch (error) {
      // Error handling should be implemented here
      console.error(`Error applying filter with ID ${filterId}:`, error);
      throw error;
    }
  }
}

// Human tasks:
// TODO: Implement error handling for API calls
// TODO: Add input validation for filter data before making API calls
// TODO: Implement caching mechanism for frequently used filters (Optional)