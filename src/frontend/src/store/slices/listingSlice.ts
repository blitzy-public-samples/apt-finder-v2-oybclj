import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ApartmentInterface } from '../../../shared/interfaces/apartment.interface';
import * as listingsService from '../../services/listings';

// Define the interface for the listing state
interface ListingState {
  listings: ApartmentInterface[];
  currentListing: ApartmentInterface | null;
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: ListingState = {
  listings: [],
  currentListing: null,
  loading: false,
  error: null,
};

// Create async thunk for fetching listings
export const fetchListings = createAsyncThunk<
  ApartmentInterface[],
  FilterCriteria,
  { rejectValue: string }
>('listings/fetchListings', async (filterCriteria, { rejectWithValue }) => {
  try {
    const listings = await listingsService.getListings(filterCriteria);
    return listings;
  } catch (error) {
    return rejectWithValue('Failed to fetch listings');
  }
});

// Create async thunk for fetching listing details
export const fetchListingDetails = createAsyncThunk<
  ApartmentInterface,
  string,
  { rejectValue: string }
>('listings/fetchListingDetails', async (listingId, { rejectWithValue }) => {
  try {
    const listingDetails = await listingsService.getListingDetails(listingId);
    return listingDetails;
  } catch (error) {
    return rejectWithValue('Failed to fetch listing details');
  }
});

// Create the listing slice
const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action: PayloadAction<ApartmentInterface[]>) => {
        state.loading = false;
        state.listings = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'An error occurred';
      })
      .addCase(fetchListingDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListingDetails.fulfilled, (state, action: PayloadAction<ApartmentInterface>) => {
        state.loading = false;
        state.currentListing = action.payload;
      })
      .addCase(fetchListingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'An error occurred';
      });
  },
});

// Export the reducer
export const listingReducer = listingSlice.reducer;

// Export selectors
export const selectListings = (state: { listing: ListingState }) => state.listing.listings;
export const selectCurrentListing = (state: { listing: ListingState }) => state.listing.currentListing;
export const selectListingLoading = (state: { listing: ListingState }) => state.listing.loading;
export const selectListingError = (state: { listing: ListingState }) => state.listing.error;

// Export the slice
export default listingSlice;