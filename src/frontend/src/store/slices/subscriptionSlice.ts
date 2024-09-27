import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { SubscriptionInterface, SubscriptionStatus } from '../../../shared/interfaces/subscription.interface';
import * as subscriptionService from '../../services/subscriptions';

// Define the state interface
interface SubscriptionState {
  subscription: SubscriptionInterface | null;
  loading: boolean;
  error: string | null;
}

// Define initial state
const initialState: SubscriptionState = {
  subscription: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchSubscription = createAsyncThunk<SubscriptionInterface, string>(
  'subscription/fetchSubscription',
  async (userId: string) => {
    const response = await subscriptionService.getSubscription(userId);
    return response;
  }
);

export const createSubscription = createAsyncThunk<SubscriptionInterface, Partial<SubscriptionInterface>>(
  'subscription/createSubscription',
  async (subscriptionData: Partial<SubscriptionInterface>) => {
    const response = await subscriptionService.createSubscription(subscriptionData);
    return response;
  }
);

export const updateSubscription = createAsyncThunk<SubscriptionInterface, Partial<SubscriptionInterface>>(
  'subscription/updateSubscription',
  async (subscriptionData: Partial<SubscriptionInterface>) => {
    const response = await subscriptionService.updateSubscription(subscriptionData);
    return response;
  }
);

export const cancelSubscription = createAsyncThunk<void, string>(
  'subscription/cancelSubscription',
  async (subscriptionId: string) => {
    await subscriptionService.cancelSubscription(subscriptionId);
  }
);

// Create the slice
const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    resetSubscriptionState: (state) => {
      state.subscription = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchSubscription
      .addCase(fetchSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscription.fulfilled, (state, action: PayloadAction<SubscriptionInterface>) => {
        state.loading = false;
        state.subscription = action.payload;
        state.error = null;
      })
      .addCase(fetchSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch subscription';
      })
      // createSubscription
      .addCase(createSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubscription.fulfilled, (state, action: PayloadAction<SubscriptionInterface>) => {
        state.loading = false;
        state.subscription = action.payload;
        state.error = null;
      })
      .addCase(createSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create subscription';
      })
      // updateSubscription
      .addCase(updateSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubscription.fulfilled, (state, action: PayloadAction<SubscriptionInterface>) => {
        state.loading = false;
        state.subscription = action.payload;
        state.error = null;
      })
      .addCase(updateSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update subscription';
      })
      // cancelSubscription
      .addCase(cancelSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelSubscription.fulfilled, (state) => {
        state.loading = false;
        if (state.subscription) {
          state.subscription.status = SubscriptionStatus.CANCELLED;
        }
        state.error = null;
      })
      .addCase(cancelSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to cancel subscription';
      });
  },
});

// Export actions and reducer
export const { resetSubscriptionState } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;