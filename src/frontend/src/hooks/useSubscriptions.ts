import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SubscriptionInterface } from '../../shared/interfaces/subscription.interface';
import { RootState } from '../store';
import {
  fetchSubscription,
  createSubscription,
  updateSubscription,
  cancelSubscription,
} from '../store/slices/subscriptionSlice';

interface UseSubscriptionsResult {
  subscription: SubscriptionInterface | null;
  loading: boolean;
  error: string | null;
  getSubscription: (userId: string) => Promise<void>;
  createNewSubscription: (subscriptionData: Partial<SubscriptionInterface>) => Promise<void>;
  updateExistingSubscription: (subscriptionData: Partial<SubscriptionInterface>) => Promise<void>;
  cancelExistingSubscription: (subscriptionId: string) => Promise<void>;
}

export const useSubscriptions = (): UseSubscriptionsResult => {
  const dispatch = useDispatch();
  const { subscription, loading, error } = useSelector((state: RootState) => state.subscription);

  const getSubscription = useCallback(
    async (userId: string) => {
      try {
        await dispatch(fetchSubscription(userId));
      } catch (error) {
        console.error('Error fetching subscription:', error);
      }
    },
    [dispatch]
  );

  const createNewSubscription = useCallback(
    async (subscriptionData: Partial<SubscriptionInterface>) => {
      try {
        await dispatch(createSubscription(subscriptionData));
      } catch (error) {
        console.error('Error creating subscription:', error);
      }
    },
    [dispatch]
  );

  const updateExistingSubscription = useCallback(
    async (subscriptionData: Partial<SubscriptionInterface>) => {
      try {
        await dispatch(updateSubscription(subscriptionData));
      } catch (error) {
        console.error('Error updating subscription:', error);
      }
    },
    [dispatch]
  );

  const cancelExistingSubscription = useCallback(
    async (subscriptionId: string) => {
      try {
        await dispatch(cancelSubscription(subscriptionId));
      } catch (error) {
        console.error('Error canceling subscription:', error);
      }
    },
    [dispatch]
  );

  return {
    subscription,
    loading,
    error,
    getSubscription,
    createNewSubscription,
    updateExistingSubscription,
    cancelExistingSubscription,
  };
};

// Human tasks:
// TODO: Implement proper error handling and user feedback for subscription operations
// TODO: Add input validation for subscription data before dispatching actions
// TODO: Consider implementing a caching mechanism for subscription data to reduce API calls