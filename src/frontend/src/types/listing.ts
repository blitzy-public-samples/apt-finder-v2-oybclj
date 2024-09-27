// src/frontend/src/types/listing.ts

/**
 * Enum representing the status of a listing
 */
export enum ListingStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  RENTED = 'RENTED',
  EXPIRED = 'EXPIRED'
}

/**
 * Interface representing an individual apartment listing
 */
export interface ApartmentListing {
  id: string;
  dateOnMarket: Date;
  rent: number;
  brokerFee: number;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  availableDate: Date;
  streetAddress: string;
  zillowUrl: string;
  images: string[];
  status: ListingStatus;
}

/**
 * Interface for parameters used in searching apartment listings
 */
export interface ListingSearchParams {
  zipCodes: string[];
  minRent?: number;
  maxRent?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  minSquareFootage?: number;
  availableFrom?: Date;
  availableTo?: Date;
}

/**
 * Interface for the API response format for listing queries
 */
export interface ListingResponse {
  listings: ApartmentListing[];
  totalCount: number;
  page: number;
  pageSize: number;
}

// Human tasks:
// TODO: Review and validate the ApartmentListing interface to ensure all necessary properties are included
// TODO: Confirm that the ListingSearchParams interface covers all required search criteria
// TODO: Verify that the ListingStatus enum includes all possible listing statuses