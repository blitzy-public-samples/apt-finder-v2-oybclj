import { ApiService } from './api';
import { SUBSCRIPTION_ENDPOINTS } from '../shared/constants/apiEndpoints';
import { Subscription } from '../types/subscription';

export class SubscriptionService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  /**
   * Retrieves the list of subscriptions for the current user
   * @returns Promise resolving to an array of user subscriptions
   */
  async getSubscriptions(): Promise<Subscription[]> {
    try {
      const response = await this.apiService.get<Subscription[]>(SUBSCRIPTION_ENDPOINTS.GET_SUBSCRIPTIONS);
      return response.data;
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      throw error;
    }
  }

  /**
   * Retrieves a specific subscription by its ID
   * @param subscriptionId - The ID of the subscription to retrieve
   * @returns Promise resolving to the subscription details
   */
  async getSubscriptionById(subscriptionId: string): Promise<Subscription> {
    try {
      const response = await this.apiService.get<Subscription>(`${SUBSCRIPTION_ENDPOINTS.GET_SUBSCRIPTION_BY_ID}/${subscriptionId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching subscription with ID ${subscriptionId}:`, error);
      throw error;
    }
  }

  /**
   * Creates a new subscription for the current user
   * @param subscriptionData - The data for the new subscription
   * @returns Promise resolving to the created subscription
   */
  async createSubscription(subscriptionData: Partial<Subscription>): Promise<Subscription> {
    try {
      const response = await this.apiService.post<Subscription>(SUBSCRIPTION_ENDPOINTS.CREATE_SUBSCRIPTION, subscriptionData);
      return response.data;
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
  }

  /**
   * Updates an existing subscription
   * @param subscriptionId - The ID of the subscription to update
   * @param updateData - The data to update the subscription with
   * @returns Promise resolving to the updated subscription
   */
  async updateSubscription(subscriptionId: string, updateData: Partial<Subscription>): Promise<Subscription> {
    try {
      const response = await this.apiService.put<Subscription>(`${SUBSCRIPTION_ENDPOINTS.UPDATE_SUBSCRIPTION}/${subscriptionId}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating subscription with ID ${subscriptionId}:`, error);
      throw error;
    }
  }

  /**
   * Cancels an active subscription
   * @param subscriptionId - The ID of the subscription to cancel
   * @returns Promise resolving when the subscription is successfully canceled
   */
  async cancelSubscription(subscriptionId: string): Promise<void> {
    try {
      await this.apiService.delete(`${SUBSCRIPTION_ENDPOINTS.CANCEL_SUBSCRIPTION}/${subscriptionId}`);
    } catch (error) {
      console.error(`Error canceling subscription with ID ${subscriptionId}:`, error);
      throw error;
    }
  }

  /**
   * Reactivates a canceled subscription
   * @param subscriptionId - The ID of the subscription to reactivate
   * @returns Promise resolving to the reactivated subscription
   */
  async reactivateSubscription(subscriptionId: string): Promise<Subscription> {
    try {
      const response = await this.apiService.post<Subscription>(`${SUBSCRIPTION_ENDPOINTS.REACTIVATE_SUBSCRIPTION}/${subscriptionId}`);
      return response.data;
    } catch (error) {
      console.error(`Error reactivating subscription with ID ${subscriptionId}:`, error);
      throw error;
    }
  }
}

// Human tasks:
// TODO: Implement proper error handling for subscription-related API calls
// TODO: Add input validation for subscription data before making API calls
// TODO: Implement caching mechanism for frequently accessed subscription data