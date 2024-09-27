// src/frontend/src/types/subscription.ts

/**
 * Enum representing the possible statuses of a subscription.
 */
export enum SubscriptionStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Cancelled = 'cancelled'
}

/**
 * Interface representing a subscription in the Apartment Finder application.
 */
export interface Subscription {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  status: SubscriptionStatus;
  paypalSubscriptionId: string;
}

/**
 * Interface representing the payload for creating a new subscription.
 */
export interface CreateSubscriptionPayload {
  userId: string;
  paypalSubscriptionId: string;
}

/**
 * Interface representing the payload for updating an existing subscription.
 */
export interface UpdateSubscriptionPayload {
  status?: SubscriptionStatus;
  endDate?: Date;
}

/**
 * Interface representing the response structure for a single subscription.
 */
export interface SubscriptionResponse {
  subscription: Subscription;
}

/**
 * Interface representing the response structure for multiple subscriptions.
 */
export interface SubscriptionsResponse {
  subscriptions: Subscription[];
}

// Human tasks:
// TODO: Review and validate the subscription types to ensure they match the backend API and database schema
// TODO: Consider adding more specific types for subscription plans if there are different tiers or options