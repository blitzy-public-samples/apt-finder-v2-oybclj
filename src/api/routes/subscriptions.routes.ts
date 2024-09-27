import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import * as SubscriptionsController from '../controllers/subscriptions.controller';

const createSubscriptionRoutes = (): Router => {
  const router = Router();

  // POST route for creating a new subscription
  router.post(
    '/',
    authMiddleware,
    SubscriptionsController.createSubscription
  );

  // GET route for retrieving user's current subscription
  router.get(
    '/current',
    authMiddleware,
    SubscriptionsController.getCurrentSubscription
  );

  // PUT route for updating a subscription
  router.put(
    '/:subscriptionId',
    authMiddleware,
    SubscriptionsController.updateSubscription
  );

  // DELETE route for canceling a subscription
  router.delete(
    '/:subscriptionId',
    authMiddleware,
    SubscriptionsController.cancelSubscription
  );

  return router;
};

export default createSubscriptionRoutes;

// Human tasks:
// TODO: Implement rate limiting for subscription-related routes
// TODO: Add validation middleware for subscription creation and update payloads
// TODO: Implement error handling for PayPal API integration