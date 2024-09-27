import axios from 'axios';
import { SubscriptionInterface, SubscriptionStatus } from '../../shared/interfaces/subscription.interface';
import { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } from '../../shared/config/environment';

/**
 * PaypalService class for handling PayPal API interactions
 */
export class PaypalService {
  private baseUrl: string;
  private clientId: string;
  private clientSecret: string;

  /**
   * Initializes the PaypalService with necessary credentials
   */
  constructor() {
    // Set the baseUrl for PayPal API (sandbox or live)
    this.baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://api.paypal.com'
      : 'https://api.sandbox.paypal.com';
    
    // Set the clientId and clientSecret from environment variables
    this.clientId = PAYPAL_CLIENT_ID;
    this.clientSecret = PAYPAL_CLIENT_SECRET;

    if (!this.clientId || !this.clientSecret) {
      throw new Error('PayPal client ID or secret is not set in the environment variables.');
    }
  }

  /**
   * Creates a new PayPal subscription for a user
   * @param subscriptionData The subscription data to create
   * @returns Promise<string> PayPal subscription ID
   */
  async createSubscription(subscriptionData: SubscriptionInterface): Promise<string> {
    try {
      // Generate access token
      const accessToken = await this.generateAccessToken();

      // Prepare subscription creation payload
      const payload = {
        plan_id: subscriptionData.planId,
        subscriber: {
          name: {
            given_name: subscriptionData.user.firstName,
            surname: subscriptionData.user.lastName
          },
          email_address: subscriptionData.user.email
        },
        application_context: {
          brand_name: 'Apartment Finder',
          locale: 'en-US',
          shipping_preference: 'NO_SHIPPING',
          user_action: 'SUBSCRIBE_NOW',
          payment_method: {
            payer_selected: 'PAYPAL',
            payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED'
          },
          return_url: `${process.env.FRONTEND_URL}/subscription/success`,
          cancel_url: `${process.env.FRONTEND_URL}/subscription/cancel`
        }
      };

      // Send POST request to PayPal API to create subscription
      const response = await axios.post(
        `${this.baseUrl}/v1/billing/subscriptions`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      // Return the PayPal subscription ID
      return response.data.id;
    } catch (error) {
      console.error('Error creating PayPal subscription:', error);
      throw new Error('Failed to create PayPal subscription');
    }
  }

  /**
   * Cancels an existing PayPal subscription
   * @param paypalSubscriptionId The PayPal subscription ID to cancel
   * @returns Promise<boolean> True if cancellation was successful
   */
  async cancelSubscription(paypalSubscriptionId: string): Promise<boolean> {
    try {
      // Generate access token
      const accessToken = await this.generateAccessToken();

      // Send POST request to PayPal API to cancel subscription
      await axios.post(
        `${this.baseUrl}/v1/billing/subscriptions/${paypalSubscriptionId}/cancel`,
        { reason: 'User requested cancellation' },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      return true;
    } catch (error) {
      console.error('Error cancelling PayPal subscription:', error);
      return false;
    }
  }

  /**
   * Retrieves details of an existing PayPal subscription
   * @param paypalSubscriptionId The PayPal subscription ID to fetch details for
   * @returns Promise<SubscriptionInterface> Subscription details
   */
  async getSubscriptionDetails(paypalSubscriptionId: string): Promise<SubscriptionInterface> {
    try {
      // Generate access token
      const accessToken = await this.generateAccessToken();

      // Send GET request to PayPal API to fetch subscription details
      const response = await axios.get(
        `${this.baseUrl}/v1/billing/subscriptions/${paypalSubscriptionId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      // Map PayPal response to SubscriptionInterface
      const subscriptionDetails: SubscriptionInterface = {
        id: response.data.id,
        status: this.mapPayPalStatusToSubscriptionStatus(response.data.status),
        planId: response.data.plan_id,
        startDate: new Date(response.data.start_time),
        endDate: new Date(response.data.billing_info.next_billing_time),
        user: {
          firstName: response.data.subscriber.name.given_name,
          lastName: response.data.subscriber.name.surname,
          email: response.data.subscriber.email_address
        }
      };

      return subscriptionDetails;
    } catch (error) {
      console.error('Error fetching PayPal subscription details:', error);
      throw new Error('Failed to fetch PayPal subscription details');
    }
  }

  /**
   * Generates an access token for PayPal API authentication
   * @returns Promise<string> Access token
   */
  private async generateAccessToken(): Promise<string> {
    try {
      // Encode client ID and client secret
      const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');

      // Send POST request to PayPal API to get access token
      const response = await axios.post(
        `${this.baseUrl}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${auth}`
          }
        }
      );

      // Return the access token
      return response.data.access_token;
    } catch (error) {
      console.error('Error generating PayPal access token:', error);
      throw new Error('Failed to generate PayPal access token');
    }
  }

  /**
   * Maps PayPal subscription status to SubscriptionStatus enum
   * @param paypalStatus PayPal subscription status
   * @returns SubscriptionStatus
   */
  private mapPayPalStatusToSubscriptionStatus(paypalStatus: string): SubscriptionStatus {
    switch (paypalStatus.toUpperCase()) {
      case 'APPROVAL_PENDING':
        return SubscriptionStatus.PENDING;
      case 'APPROVED':
      case 'ACTIVE':
        return SubscriptionStatus.ACTIVE;
      case 'SUSPENDED':
        return SubscriptionStatus.SUSPENDED;
      case 'CANCELLED':
      case 'EXPIRED':
        return SubscriptionStatus.CANCELLED;
      default:
        return SubscriptionStatus.UNKNOWN;
    }
  }
}

// Human tasks:
// 1. Implement error handling and logging for PayPal API interactions
// 2. Set up PayPal sandbox environment for testing
// 3. Create unit tests for PaypalService methods
// 4. Review and approve the PayPal integration implementation