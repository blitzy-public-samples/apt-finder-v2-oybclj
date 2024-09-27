import { Request, Response } from 'express';
import { SubscriptionService } from '../services/subscriptions.service';
import { SubscriptionInterface, SubscriptionStatus } from '../../shared/interfaces/subscription.interface';

export class SubscriptionController {
  private subscriptionService: SubscriptionService;

  constructor() {
    this.subscriptionService = new SubscriptionService();
  }

  /**
   * Creates a new subscription for a user
   * @param req Express Request object
   * @param res Express Response object
   */
  public async createSubscription(req: Request, res: Response): Promise<void> {
    try {
      const { userId, ...subscriptionDetails } = req.body;

      // TODO: Implement input validation middleware
      // For now, we'll assume the input is valid

      const createdSubscription = await this.subscriptionService.createSubscription(userId, subscriptionDetails);

      res.status(201).json(createdSubscription);
    } catch (error) {
      // TODO: Implement error handling middleware
      res.status(500).json({ message: 'An error occurred while creating the subscription' });
    }
  }

  /**
   * Retrieves a subscription by its ID
   * @param req Express Request object
   * @param res Express Response object
   */
  public async getSubscription(req: Request, res: Response): Promise<void> {
    try {
      const subscriptionId = req.params.id;

      const subscription = await this.subscriptionService.getSubscriptionById(subscriptionId);

      if (subscription) {
        res.status(200).json(subscription);
      } else {
        res.status(404).json({ message: 'Subscription not found' });
      }
    } catch (error) {
      // TODO: Implement error handling middleware
      res.status(500).json({ message: 'An error occurred while retrieving the subscription' });
    }
  }

  /**
   * Updates an existing subscription
   * @param req Express Request object
   * @param res Express Response object
   */
  public async updateSubscription(req: Request, res: Response): Promise<void> {
    try {
      const subscriptionId = req.params.id;
      const updateData = req.body;

      // TODO: Implement input validation middleware
      // For now, we'll assume the input is valid

      const updatedSubscription = await this.subscriptionService.updateSubscription(subscriptionId, updateData);

      if (updatedSubscription) {
        res.status(200).json(updatedSubscription);
      } else {
        res.status(404).json({ message: 'Subscription not found' });
      }
    } catch (error) {
      // TODO: Implement error handling middleware
      res.status(500).json({ message: 'An error occurred while updating the subscription' });
    }
  }

  /**
   * Cancels an active subscription
   * @param req Express Request object
   * @param res Express Response object
   */
  public async cancelSubscription(req: Request, res: Response): Promise<void> {
    try {
      const subscriptionId = req.params.id;

      const cancelledSubscription = await this.subscriptionService.cancelSubscription(subscriptionId);

      if (cancelledSubscription) {
        res.status(200).json(cancelledSubscription);
      } else {
        res.status(404).json({ message: 'Subscription not found or already cancelled' });
      }
    } catch (error) {
      // TODO: Implement error handling middleware
      res.status(500).json({ message: 'An error occurred while cancelling the subscription' });
    }
  }

  /**
   * Retrieves all subscriptions for a given user
   * @param req Express Request object
   * @param res Express Response object
   */
  public async getUserSubscriptions(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;

      const subscriptions = await this.subscriptionService.getUserSubscriptions(userId);

      res.status(200).json(subscriptions);
    } catch (error) {
      // TODO: Implement error handling middleware
      res.status(500).json({ message: 'An error occurred while retrieving user subscriptions' });
    }
  }
}

// TODO: Implement error handling middleware for consistent error responses across the application
// TODO: Add input validation middleware to ensure data integrity before processing requests
// TODO: Implement authentication middleware to ensure only authorized users can access subscription endpoints