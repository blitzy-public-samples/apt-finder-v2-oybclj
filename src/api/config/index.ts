import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
const loadEnv = (): void => {
  const envPath = path.resolve(process.cwd(), '.env');
  dotenv.config({ path: envPath });

  if (process.env.NODE_ENV !== 'production') {
    console.log('Environment variables loaded');
  }
};

loadEnv();

// Environment variables
export const NODE_ENV: string = process.env.NODE_ENV || 'development';
export const PORT: number = parseInt(process.env.PORT || '3000', 10);
export const API_VERSION: string = 'v1';

// Database configuration
// TODO: Implement database configuration once database.ts is available
export const databaseConfig = {
  // Placeholder for database configuration
};

// Redis configuration
// TODO: Implement Redis configuration once redis.ts is available
export const redisConfig = {
  // Placeholder for Redis configuration
};

// Celery configuration
// TODO: Implement Celery configuration once celery.ts is available
export const celeryConfig = {
  // Placeholder for Celery configuration
};

// Export configurations
export default {
  NODE_ENV,
  PORT,
  API_VERSION,
  databaseConfig,
  redisConfig,
  celeryConfig,
};

// Human tasks
/**
 * TODO: Review and set appropriate values for environment variables in .env file
 * TODO: Ensure that database.ts, redis.ts, and celery.ts configuration files are created and properly exported
 */