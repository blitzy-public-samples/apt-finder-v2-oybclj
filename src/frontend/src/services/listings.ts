import { ApiService } from './api';
import { LISTING_ENDPOINTS } from '../shared/constants/apiEndpoints';
import { Listing, ListingFilter } from '../types/listing';

export class ListingsService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  /**
   * Fetches apartment listings based on provided filters
   * @param filters - The filters to apply to the listing search
   * @returns Promise resolving to an array of Listing objects
   */
  async getListings(filters: ListingFilter): Promise<Listing[]> {
    try {
      const queryParams = this.constructQueryParams(filters);
      const response = await this.apiService.get<Listing[]>(LISTING_ENDPOINTS.GET_LISTINGS, { params: queryParams });
      return response.data;
    } catch (error) {
      console.error('Error fetching listings:', error);
      throw error;
    }
  }

  /**
   * Fetches a single apartment listing by its ID
   * @param id - The ID of the listing to fetch
   * @returns Promise resolving to a single Listing object
   */
  async getListingById(id: string): Promise<Listing> {
    try {
      const response = await this.apiService.get<Listing>(LISTING_ENDPOINTS.GET_LISTING_BY_ID.replace(':id', id));
      return response.data;
    } catch (error) {
      console.error('Error fetching listing by ID:', error);
      throw error;
    }
  }

  /**
   * Fetches the user's favorite apartment listings
   * @returns Promise resolving to an array of favorite Listing objects
   */
  async getFavoriteListings(): Promise<Listing[]> {
    try {
      const response = await this.apiService.get<Listing[]>(LISTING_ENDPOINTS.GET_FAVORITE_LISTINGS);
      return response.data;
    } catch (error) {
      console.error('Error fetching favorite listings:', error);
      throw error;
    }
  }

  /**
   * Adds a listing to the user's favorites
   * @param listingId - The ID of the listing to add to favorites
   * @returns Promise resolving when the operation is complete
   */
  async addFavoriteListing(listingId: string): Promise<void> {
    try {
      await this.apiService.post(LISTING_ENDPOINTS.ADD_FAVORITE_LISTING, { listingId });
    } catch (error) {
      console.error('Error adding favorite listing:', error);
      throw error;
    }
  }

  /**
   * Removes a listing from the user's favorites
   * @param listingId - The ID of the listing to remove from favorites
   * @returns Promise resolving when the operation is complete
   */
  async removeFavoriteListing(listingId: string): Promise<void> {
    try {
      await this.apiService.delete(LISTING_ENDPOINTS.REMOVE_FAVORITE_LISTING.replace(':id', listingId));
    } catch (error) {
      console.error('Error removing favorite listing:', error);
      throw error;
    }
  }

  /**
   * Constructs query parameters from the filters object
   * @param filters - The filters to convert to query parameters
   * @returns Object containing query parameters
   */
  private constructQueryParams(filters: ListingFilter): Record<string, string | number | boolean> {
    const queryParams: Record<string, string | number | boolean> = {};
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null) {
        queryParams[key] = value;
      }
    }
    return queryParams;
  }
}

/**
 * Creates and returns an instance of the ListingsService
 * @returns An instance of the ListingsService
 */
export function createListingsService(): ListingsService {
  const apiService = new ApiService(); // Assuming ApiService doesn't require parameters
  return new ListingsService(apiService);
}

// Human tasks:
// TODO: Implement error handling for API calls
// TODO: Add pagination support for getListings method
// TODO: Implement caching mechanism for frequently accessed listings