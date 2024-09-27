import { injectable, inject } from 'inversify';
import { Subscription } from '../models/subscription.model';
import { PaypalService } from './paypal.service';
import { NotFoundException } from '../exceptions/not-found.exception';
import { BadRequestException } from '../exceptions/bad-request.exception';

@injectable()
export class SubscriptionsService {
  constructor(
    @inject(PaypalService) private paypalService: PaypalService
  ) {}

  async createSubscription(subscriptionData: any, userId: string): Promise<Subscription> {
    // Validate subscription data
    this.validateSubscriptionData(subscriptionData);

    try {
      // Create PayPal subscription
      const paypalSubscription = await this.paypalService.createSubscription(subscriptionData);

      // Create subscription record in the database
      const subscription = new Subscription({
        ...subscriptionData,
        userId,
        paypalSubscriptionId: paypalSubscription.id,
        status: 'active'
      });

      await subscription.save();

      return subscription;
    } catch (error) {
      throw new BadRequestException('Failed to create subscription');
    }
  }

  async getSubscription(subscriptionId: string): Promise<Subscription> {
    const subscription = await Subscription.findById(subscriptionId);

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    return subscription;
  }

  async getUserSubscriptions(userId: string): Promise<Subscription[]> {
    return Subscription.find({ userId });
  }

  async updateSubscription(subscriptionId: string, updateData: any): Promise<Subscription> {
    // Validate update data
    this.validateUpdateData(updateData);

    const subscription = await this.getSubscription(subscriptionId);

    if (updateData.plan && updateData.plan !== subscription.plan) {
      // Update PayPal subscription if plan changed
      await this.paypalService.updateSubscription(subscription.paypalSubscriptionId, updateData);
    }

    // Update subscription record in the database
    Object.assign(subscription, updateData);
    await subscription.save();

    return subscription;
  }

  async cancelSubscription(subscriptionId: string): Promise<void> {
    const subscription = await this.getSubscription(subscriptionId);

    // Cancel PayPal subscription
    await this.paypalService.cancelSubscription(subscription.paypalSubscriptionId);

    // Update subscription status in the database
    subscription.status = 'cancelled';
    await subscription.save();
  }

  async handlePaypalWebhook(webhookEvent: any): Promise<void> {
    // Validate webhook event
    this.validateWebhookEvent(webhookEvent);

    const { event_type, resource } = webhookEvent;

    switch (event_type) {
      case 'BILLING.SUBSCRIPTION.ACTIVATED':
      case 'BILLING.SUBSCRIPTION.UPDATED':
        await this.updateSubscriptionStatus(resource.id, 'active');
        break;
      case 'BILLING.SUBSCRIPTION.CANCELLED':
        await this.updateSubscriptionStatus(resource.id, 'cancelled');
        break;
      case 'BILLING.SUBSCRIPTION.SUSPENDED':
        await this.updateSubscriptionStatus(resource.id, 'suspended');
        break;
      // Add more event types as needed
    }
  }

  private async updateSubscriptionStatus(paypalSubscriptionId: string, status: string): Promise<void> {
    const subscription = await Subscription.findOne({ paypalSubscriptionId });
    if (subscription) {
      subscription.status = status;
      await subscription.save();
    }
  }

  private validateSubscriptionData(data: any): void {
    // Implement validation logic
    if (!data.plan || !data.userId) {
      throw new BadRequestException('Invalid subscription data');
    }
  }

  private validateUpdateData(data: any): void {
    // Implement validation logic
    if (Object.keys(data).length === 0) {
      throw new BadRequestException('No update data provided');
    }
  }

  private validateWebhookEvent(event: any): void {
    // Implement webhook event validation logic
    if (!event.event_type || !event.resource) {
      throw new BadRequestException('Invalid webhook event');
    }
  }
}

// Human tasks:
// TODO: Implement error handling for PayPal API failures
// TODO: Set up PayPal webhook endpoint in the application
// TODO: Create unit tests for all subscription service methods
// TODO: Implement logging for all subscription-related actions
// TODO: Review and approve the subscription service implementation