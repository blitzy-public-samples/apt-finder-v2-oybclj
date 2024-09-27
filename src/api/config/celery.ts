import { Celery } from 'celery';

// Redis configuration
// Note: In a real-world scenario, these values should be imported from a redis config file
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
};

// Celery broker and backend URLs
const CELERY_BROKER_URL = process.env.CELERY_BROKER_URL || `redis://${redisConfig.host}:${redisConfig.port}`;
const CELERY_RESULT_BACKEND = process.env.CELERY_RESULT_BACKEND || `redis://${redisConfig.host}:${redisConfig.port}`;

// Celery configuration object
const celeryConfig = {
  broker_url: CELERY_BROKER_URL,
  result_backend: CELERY_RESULT_BACKEND,
  task_serializer: 'json',
  result_serializer: 'json',
  accept_content: ['json'],
  timezone: 'UTC',
  enable_utc: true,
  task_routes: {
    'tasks.update_listings': {
      queue: 'listings'
    },
    'tasks.send_notifications': {
      queue: 'notifications'
    }
  },
  task_queues: [
    {
      name: 'listings',
      exchange: 'listings',
      routing_key: 'listings'
    },
    {
      name: 'notifications',
      exchange: 'notifications',
      routing_key: 'notifications'
    }
  ]
};

// Create Celery application instance
const celeryApp = new Celery('apartment_finder', {
  broker: celeryConfig.broker_url,
  backend: celeryConfig.result_backend,
  task_serializer: celeryConfig.task_serializer,
  result_serializer: celeryConfig.result_serializer,
  accept_content: celeryConfig.accept_content,
  timezone: celeryConfig.timezone,
  enable_utc: celeryConfig.enable_utc,
});

// Configure task routes
celeryApp.conf.task_routes = celeryConfig.task_routes;

// Configure task queues
celeryApp.conf.task_queues = celeryConfig.task_queues;

export { celeryConfig, celeryApp };

// Human tasks
/**
 * TODO:
 * 1. Review and set appropriate values for CELERY_BROKER_URL and CELERY_RESULT_BACKEND in the .env file if different from default Redis configuration
 * 2. Ensure that the Celery worker processes are properly set up and configured to use this configuration
 * 3. Verify that the task routing and queue configurations align with the actual tasks implemented in the application
 */