// src/api/controllers/index.ts

// Import all controllers
import { AuthController } from './auth.controller';
import { FiltersController } from './filters.controller';
import { ListingsController } from './listings.controller';
import { SubscriptionsController } from './subscriptions.controller';

// Export all controllers
export {
  AuthController,
  FiltersController,
  ListingsController,
  SubscriptionsController
};

// Human tasks:
// TODO: Implement individual controller files (auth.controller.ts, filters.controller.ts, listings.controller.ts, subscriptions.controller.ts) with their respective route handlers
// TODO: Ensure that all imported controllers are properly implemented and follow consistent naming conventions
// TODO: Review and update imports if any additional controllers are added to the project in the future