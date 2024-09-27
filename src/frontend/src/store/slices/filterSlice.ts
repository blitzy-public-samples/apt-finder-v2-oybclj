import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FilterInterface } from '../../../shared/interfaces/filter.interface';
import * as filterService from '../../services/filters';

// Define the state interface
interface FilterState {
  filters: FilterInterface[];
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: FilterState = {
  filters: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchFilters = createAsyncThunk<FilterInterface[], string>(
  'filters/fetchFilters',
  async (userId: string) => {
    const filters = await filterService.getFilters(userId);
    return filters;
  }
);

export const createFilter = createAsyncThunk<FilterInterface, Omit<FilterInterface, 'id' | 'createdAt' | 'updatedAt'>>(
  'filters/createFilter',
  async (filterData) => {
    const createdFilter = await filterService.createFilter(filterData);
    return createdFilter;
  }
);

export const updateFilter = createAsyncThunk<FilterInterface, { filterId: string; filterData: Partial<FilterInterface> }>(
  'filters/updateFilter',
  async ({ filterId, filterData }) => {
    const updatedFilter = await filterService.updateFilter(filterId, filterData);
    return updatedFilter;
  }
);

export const deleteFilter = createAsyncThunk<void, string>(
  'filters/deleteFilter',
  async (filterId: string) => {
    await filterService.deleteFilter(filterId);
  }
);

// Create the slice
const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FilterInterface[]>) => {
      state.filters = action.payload;
    },
    addFilter: (state, action: PayloadAction<FilterInterface>) => {
      state.filters.push(action.payload);
    },
    updateFilterInState: (state, action: PayloadAction<FilterInterface>) => {
      const index = state.filters.findIndex(filter => filter.id === action.payload.id);
      if (index !== -1) {
        state.filters[index] = action.payload;
      }
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      state.filters = state.filters.filter(filter => filter.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filters = action.payload;
        state.loading = false;
      })
      .addCase(fetchFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch filters';
      })
      .addCase(createFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFilter.fulfilled, (state, action) => {
        state.filters.push(action.payload);
        state.loading = false;
      })
      .addCase(createFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create filter';
      })
      .addCase(updateFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFilter.fulfilled, (state, action) => {
        const index = state.filters.findIndex(filter => filter.id === action.payload.id);
        if (index !== -1) {
          state.filters[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update filter';
      })
      .addCase(deleteFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFilter.fulfilled, (state, action) => {
        state.filters = state.filters.filter(filter => filter.id !== action.meta.arg);
        state.loading = false;
      })
      .addCase(deleteFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete filter';
      });
  },
});

// Export actions and reducer
export const { setFilters, addFilter, updateFilterInState, removeFilter, setLoading, setError } = filterSlice.actions;
export default filterSlice.reducer;