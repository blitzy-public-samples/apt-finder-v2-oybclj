import axios, { AxiosInstance } from 'axios';
import { ApiError } from '../utils/errors';
import { logger } from '../utils/logger';
import { ApartmentListing } from '../../shared/interfaces/apartment.interface';

class ZillowService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.ZILLOW_API_BASE_URL,
      headers: {
        'X-API-Key': process.env.ZILLOW_API_KEY,
      },
    });
  }

  async getListings(params: any): Promise<ApartmentListing[]> {
    try {
      const response = await this.axiosInstance.get('/listings', { params });
      return this.processListingData(response.data);
    } catch (error) {
      logger.error('Error fetching listings from Zillow API', error);
      throw new ApiError('Failed to fetch listings from Zillow API', 500);
    }
  }

  async getListingDetails(listingId: string): Promise<ApartmentListing> {
    try {
      const response = await this.axiosInstance.get(`/listings/${listingId}`);
      return this.processListingData(response.data);
    } catch (error) {
      logger.error(`Error fetching listing details for ID ${listingId} from Zillow API`, error);
      throw new ApiError(`Failed to fetch listing details for ID ${listingId} from Zillow API`, 500);
    }
  }

  private processListingData(rawData: any): ApartmentListing | ApartmentListing[] {
    // Implementation of data processing logic
    // This is a placeholder and should be replaced with actual data mapping logic
    if (Array.isArray(rawData)) {
      return rawData.map(this.mapToApartmentListing);
    }
    return this.mapToApartmentListing(rawData);
  }

  private mapToApartmentListing(data: any): ApartmentListing {
    // Implementation of mapping logic
    // This is a placeholder and should be replaced with actual data mapping logic
    return {
      id: data.id,
      address: data.address,
      price: data.price,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      squareFootage: data.squareFootage,
      // Add other relevant fields
    };
  }
}

export default new ZillowService();

// Human tasks:
// TODO: Implement error handling for API rate limits and temporary outages
// TODO: Add caching mechanism for frequently requested data to reduce API calls
// TODO: Implement retry logic for failed API requests
// TODO: Create unit tests for the ZillowService class
// TODO: Review and approve the Zillow API integration approach
// TODO: Ensure proper error logging and monitoring for the Zillow service