import express from 'express';
import redis from 'redis';
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';

// Global constants for rate limiting
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 100; // 100 requests per window

// Create Redis client
const redisClient = redis.createClient({
  // Redis connection details should be configured in environment variables
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
});

redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});

/**
 * Creates and configures the rate limiting middleware
 * @returns Configured rate limiting middleware
 */
const rateLimiterMiddleware = (): express.RequestHandler => {
  return rateLimit({
    store: new RedisStore({
      client: redisClient,
      prefix: 'rate-limit:',
    }),
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: RATE_LIMIT_MAX,
    message: 'Too many requests, please try again later.',
    headers: true,
    // Custom handler for rate limit exceeded scenarios
    handler: (req: express.Request, res: express.Response) => {
      res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Too many requests, please try again later.',
      });
    },
  });
};

export default rateLimiterMiddleware;

// Human tasks:
// TODO: Configure Redis connection details in environment variables
// TODO: Adjust RATE_LIMIT_WINDOW_MS and RATE_LIMIT_MAX values based on production requirements
// TODO: Implement custom error responses for rate limit exceeded scenarios