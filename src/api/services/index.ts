/**
 * src/api/services/index.ts
 * Main entry point for all API services
 */

// Import all services
import { AuthService } from './auth.service';
import { FiltersService } from './filters.service';
import { ListingsService } from './listings.service';
import { SubscriptionsService } from './subscriptions.service';
import { ZillowService } from './zillow.service';
import { PaypalService } from './paypal.service';

// Export all services
export {
  AuthService,
  FiltersService,
  ListingsService,
  SubscriptionsService,
  ZillowService,
  PaypalService,
};

/**
 * Human Tasks:
 * 1. Implement individual service files (auth.service.ts, filters.service.ts, listings.service.ts, subscriptions.service.ts, zillow.service.ts, paypal.service.ts)
 * 2. Ensure all exported services are properly implemented and tested
 * 3. Review and approve the overall service structure
 */