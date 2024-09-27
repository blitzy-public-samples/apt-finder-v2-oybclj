import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import filterReducer from './slices/filterSlice';
import listingReducer from './slices/listingSlice';
import subscriptionReducer from './slices/subscriptionSlice';

/**
 * Configures and returns the Redux store for the Apartment Finder application.
 * This store combines all the reducers from different slices and sets up any middleware.
 * 
 * @returns {Store} Configured Redux store
 */
const configureAppStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      filter: filterReducer,
      listing: listingReducer,
      subscription: subscriptionReducer,
    },
    // Add any additional middleware here if needed
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

// Create the store
const store = configureAppStore();

// Export the store and its types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;