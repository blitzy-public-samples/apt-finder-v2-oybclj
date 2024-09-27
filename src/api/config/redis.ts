import Redis from 'ioredis';

// Environment variables for Redis configuration
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379', 10);
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || '';

// Redis configuration object
export const redisConfig = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
  retryStrategy: (times: number) => {
    if (times < 3) {
      return 200; // Retry after 200ms for the first 2 attempts
    }
    if (times < 10) {
      return 1000; // Retry after 1000ms for attempts 3-9
    }
    return null; // Stop retrying after 10 attempts
  },
};

// Function to create and return a new Redis client instance
export const createRedisClient = (): Redis.Redis => {
  return new Redis(redisConfig);
};

// Human tasks
/**
 * TODO: Human tasks
 * 1. Review and set appropriate values for REDIS_HOST, REDIS_PORT, and REDIS_PASSWORD in the .env file
 * 2. Ensure that the Redis server is properly set up and accessible with the provided configuration
 */