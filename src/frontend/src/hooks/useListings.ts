import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchListings,
  fetchListingDetails,
  selectListings,
  selectCurrentListing,
  selectListingLoading,
  selectListingError
} from '../store/slices/listingSlice';
import { Listing, ListingFilter } from '../types/listing';

const useListings = () => {
  const dispatch = useDispatch();
  const listings = useSelector(selectListings);
  const currentListing = useSelector(selectCurrentListing);
  const loading = useSelector(selectListingLoading);
  const error = useSelector(selectListingError);

  const [filter, setFilter] = useState<ListingFilter>({});

  const getListings = useCallback((filterCriteria: ListingFilter = {}) => {
    dispatch(fetchListings(filterCriteria));
  }, [dispatch]);

  const getListingDetails = useCallback((listingId: string) => {
    dispatch(fetchListingDetails(listingId));
  }, [dispatch]);

  const updateFilter = useCallback((newFilter: Partial<ListingFilter>) => {
    setFilter(prevFilter => ({ ...prevFilter, ...newFilter }));
  }, []);

  const clearFilter = useCallback(() => {
    setFilter({});
  }, []);

  useEffect(() => {
    getListings(filter);
  }, [filter, getListings]);

  return {
    listings,
    currentListing,
    loading,
    error,
    filter,
    getListings,
    getListingDetails,
    updateFilter,
    clearFilter,
  };
};

export default useListings;

// Human tasks:
// TODO: Implement error handling and display for API call failures
// TODO: Add support for pagination in listing fetching
// TODO: Implement caching mechanism for previously fetched listings