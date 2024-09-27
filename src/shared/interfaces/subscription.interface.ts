/**
 * This file defines the SubscriptionInterface, which represents the structure of a user subscription object
 * in the Apartment Finder application, as well as the SubscriptionStatus enum.
 */

/**
 * Enum representing the possible statuses of a subscription
 */
export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING'
}

/**
 * Interface defining the structure of a user subscription object
 */
export interface SubscriptionInterface {
  /**
   * Unique identifier for the subscription
   */
  id: string;

  /**
   * Identifier of the user associated with this subscription
   */
  userId: string;

  /**
   * Date when the subscription starts
   */
  startDate: Date;

  /**
   * Date when the subscription ends
   */
  endDate: Date;

  /**
   * Current status of the subscription
   */
  status: SubscriptionStatus;

  /**
   * PayPal subscription identifier
   */
  paypalSubscriptionId: string;

  /**
   * Date and time when the subscription was created
   */
  createdAt: Date;

  /**
   * Date and time when the subscription was last updated
   */
  updatedAt: Date;
}