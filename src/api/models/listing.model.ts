import { Schema, model, Document } from 'mongoose';

// Assuming ApartmentInterface structure based on the schema
interface ApartmentInterface {
  dateOnMarket: Date;
  rent: number;
  brokerFee: number;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  availableDate: Date;
  streetAddress: string;
  zipCode: string;
  city: string;
  state: string;
  zillowUrl: string;
  images: string[];
  amenities: string[];
}

// Interface extending ApartmentInterface and Document for Mongoose
export interface ListingDocument extends ApartmentInterface, Document {}

// Mongoose schema for the Listing model
const listingSchema = new Schema<ListingDocument>(
  {
    dateOnMarket: { type: Date, required: true },
    rent: { type: Number, required: true },
    brokerFee: { type: Number, default: 0 },
    squareFootage: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    availableDate: { type: Date, required: true },
    streetAddress: { type: String, required: true },
    zipCode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zillowUrl: { type: String, required: true },
    images: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Mongoose model for the Listing schema
export const Listing = model<ListingDocument>('Listing', listingSchema);