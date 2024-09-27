/**
 * ApartmentInterface: Defines the structure of an apartment listing object
 * This interface is used throughout the application to ensure consistency
 * in the representation of apartment data.
 */
export interface ApartmentInterface {
  /** Unique identifier for the apartment listing */
  id: string;

  /** Date when the apartment was listed on the market */
  dateOnMarket: Date;

  /** Monthly rent for the apartment */
  rent: number;

  /** Broker fee associated with renting the apartment */
  brokerFee: number;

  /** Total square footage of the apartment */
  squareFootage: number;

  /** Number of bedrooms in the apartment */
  bedrooms: number;

  /** Number of bathrooms in the apartment */
  bathrooms: number;

  /** Date when the apartment becomes available for move-in */
  availableDate: Date;

  /** Street address of the apartment */
  streetAddress: string;

  /** ZIP code of the apartment's location */
  zipCode: string;

  /** City where the apartment is located */
  city: string;

  /** State where the apartment is located */
  state: string;

  /** URL to the apartment's listing on Zillow */
  zillowUrl: string;

  /** Array of image URLs for the apartment */
  images: string[];

  /** Array of amenities available in the apartment */
  amenities: string[];

  /** Timestamp of when the listing was created in our system */
  createdAt: Date;

  /** Timestamp of when the listing was last updated in our system */
  updatedAt: Date;
}