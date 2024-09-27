import { describe, it, expect, beforeEach, afterEach, jest } from 'jest';
import supertest from 'supertest';
import express from 'express';
import { SubscriptionsController } from '../controllers/subscriptions.controller';
import { SubscriptionsService } from '../services/subscriptions.service';
import { SubscriptionInterface } from '../../shared/interfaces/subscription.interface';

describe('SubscriptionsController', () => {
  let app: express.Application;
  let mockSubscriptionsService: jest.Mocked<SubscriptionsService>;

  beforeEach(() => {
    mockSubscriptionsService = {
      createSubscription: jest.fn(),
      getSubscription: jest.fn(),
      updateSubscription: jest.fn(),
      cancelSubscription: jest.fn(),
      getUserSubscriptions: jest.fn(),
    } as any;

    app = express();
    const subscriptionsController = new SubscriptionsController(mockSubscriptionsService);
    app.use(express.json());
    app.use('/subscriptions', subscriptionsController.router);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createSubscription', () => {
    it('should create a new subscription and return 201 status', async () => {
      const mockSubscription: SubscriptionInterface = {
        id: '1',
        userId: 'user1',
        planId: 'plan1',
        status: 'active',
        startDate: new Date(),
        endDate: new Date(),
      };

      mockSubscriptionsService.createSubscription.mockResolvedValue(mockSubscription);

      const response = await supertest(app)
        .post('/subscriptions')
        .send({ userId: 'user1', planId: 'plan1' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockSubscription);
      expect(mockSubscriptionsService.createSubscription).toHaveBeenCalledWith('user1', 'plan1');
    });
  });

  describe('getSubscription', () => {
    it('should return a subscription by ID and 200 status', async () => {
      const mockSubscription: SubscriptionInterface = {
        id: '1',
        userId: 'user1',
        planId: 'plan1',
        status: 'active',
        startDate: new Date(),
        endDate: new Date(),
      };

      mockSubscriptionsService.getSubscription.mockResolvedValue(mockSubscription);

      const response = await supertest(app).get('/subscriptions/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSubscription);
      expect(mockSubscriptionsService.getSubscription).toHaveBeenCalledWith('1');
    });
  });

  describe('updateSubscription', () => {
    it('should update a subscription and return 200 status', async () => {
      const mockUpdatedSubscription: SubscriptionInterface = {
        id: '1',
        userId: 'user1',
        planId: 'plan2',
        status: 'active',
        startDate: new Date(),
        endDate: new Date(),
      };

      mockSubscriptionsService.updateSubscription.mockResolvedValue(mockUpdatedSubscription);

      const response = await supertest(app)
        .put('/subscriptions/1')
        .send({ planId: 'plan2' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUpdatedSubscription);
      expect(mockSubscriptionsService.updateSubscription).toHaveBeenCalledWith('1', { planId: 'plan2' });
    });
  });

  describe('cancelSubscription', () => {
    it('should cancel a subscription and return 200 status', async () => {
      mockSubscriptionsService.cancelSubscription.mockResolvedValue(undefined);

      const response = await supertest(app).delete('/subscriptions/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Subscription cancelled successfully' });
      expect(mockSubscriptionsService.cancelSubscription).toHaveBeenCalledWith('1');
    });
  });

  describe('getUserSubscriptions', () => {
    it('should return user subscriptions and 200 status', async () => {
      const mockSubscriptions: SubscriptionInterface[] = [
        {
          id: '1',
          userId: 'user1',
          planId: 'plan1',
          status: 'active',
          startDate: new Date(),
          endDate: new Date(),
        },
        {
          id: '2',
          userId: 'user1',
          planId: 'plan2',
          status: 'cancelled',
          startDate: new Date(),
          endDate: new Date(),
        },
      ];

      mockSubscriptionsService.getUserSubscriptions.mockResolvedValue(mockSubscriptions);

      const response = await supertest(app).get('/users/user1/subscriptions');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSubscriptions);
      expect(mockSubscriptionsService.getUserSubscriptions).toHaveBeenCalledWith('user1');
    });
  });
});

describe('SubscriptionsService', () => {
  let subscriptionsService: SubscriptionsService;
  let mockPaypalService: any;
  let mockDatabase: any;

  beforeEach(() => {
    mockPaypalService = {
      createSubscription: jest.fn(),
      updateSubscription: jest.fn(),
      cancelSubscription: jest.fn(),
    };

    mockDatabase = {
      subscriptions: {
        create: jest.fn(),
        findById: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findByUserId: jest.fn(),
      },
    };

    subscriptionsService = new SubscriptionsService(mockPaypalService, mockDatabase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createSubscription', () => {
    it('should create a subscription in PayPal and database', async () => {
      const mockPaypalSubscription = { id: 'paypal1', status: 'ACTIVE' };
      const mockDbSubscription = { id: '1', paypalId: 'paypal1', userId: 'user1', planId: 'plan1', status: 'active' };

      mockPaypalService.createSubscription.mockResolvedValue(mockPaypalSubscription);
      mockDatabase.subscriptions.create.mockResolvedValue(mockDbSubscription);

      const result = await subscriptionsService.createSubscription('user1', 'plan1');

      expect(result).toEqual(mockDbSubscription);
      expect(mockPaypalService.createSubscription).toHaveBeenCalledWith('plan1');
      expect(mockDatabase.subscriptions.create).toHaveBeenCalledWith({
        paypalId: 'paypal1',
        userId: 'user1',
        planId: 'plan1',
        status: 'active',
      });
    });
  });

  // Add more tests for other SubscriptionsService methods...
});

// Human tasks:
// TODO: Implement integration tests with a test database
// TODO: Add tests for error scenarios and edge cases
// TODO: Implement mock for PayPal service in subscription tests