import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterInterface } from '../types/filter';
import { fetchFilters, createFilter, updateFilter, deleteFilter } from '../store/slices/filterSlice';
import { RootState } from '../store';
import FilterService from '../services/filters';

const useFilters = () => {
  const dispatch = useDispatch();
  const { filters, loading, error } = useSelector((state: RootState) => state.filter);
  const [currentFilter, setCurrentFilter] = useState<FilterInterface | null>(null);

  const fetchFiltersData = useCallback(async () => {
    try {
      await dispatch(fetchFilters());
    } catch (err) {
      console.error('Error fetching filters:', err);
    }
  }, [dispatch]);

  const createFilterData = useCallback(async (filterData: Omit<FilterInterface, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newFilter = await dispatch(createFilter(filterData));
      setCurrentFilter(newFilter.payload);
    } catch (err) {
      console.error('Error creating filter:', err);
    }
  }, [dispatch]);

  const updateFilterData = useCallback(async (filterId: string, filterData: Partial<FilterInterface>) => {
    try {
      const updatedFilter = await dispatch(updateFilter({ id: filterId, ...filterData }));
      if (currentFilter && currentFilter.id === filterId) {
        setCurrentFilter(updatedFilter.payload);
      }
    } catch (err) {
      console.error('Error updating filter:', err);
    }
  }, [dispatch, currentFilter]);

  const deleteFilterData = useCallback(async (filterId: string) => {
    try {
      await dispatch(deleteFilter(filterId));
      if (currentFilter && currentFilter.id === filterId) {
        setCurrentFilter(null);
      }
    } catch (err) {
      console.error('Error deleting filter:', err);
    }
  }, [dispatch, currentFilter]);

  const applyFilter = useCallback(async (filterId: string) => {
    try {
      const response = await FilterService.applyFilter(filterId);
      return response.data;
    } catch (err) {
      console.error('Error applying filter:', err);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchFiltersData();
  }, [fetchFiltersData]);

  return {
    filters,
    loading,
    error,
    currentFilter,
    setCurrentFilter,
    fetchFilters: fetchFiltersData,
    createFilter: createFilterData,
    updateFilter: updateFilterData,
    deleteFilter: deleteFilterData,
    applyFilter,
  };
};

export default useFilters;

// Human tasks:
// TODO: Implement proper error handling and user feedback for filter operations
// TODO: Add input validation for filter data before making API calls
// TODO: Implement pagination or infinite scrolling for large numbers of filters
// TODO: Add unit tests for the useFilters hook