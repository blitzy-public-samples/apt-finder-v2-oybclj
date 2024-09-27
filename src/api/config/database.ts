import { Pool } from 'pg';

// Environment variables for database configuration
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);
const DB_NAME = process.env.DB_NAME || 'apartment_finder';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD;

// Configuration object for PostgreSQL database connection
const databaseConfig = {
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait when connecting a new client
};

// Create PostgreSQL connection pool
const pool = new Pool(databaseConfig);

// Export the pool and configuration
export default { pool, databaseConfig };

// Human tasks (commented)
/*
Human tasks:
1. [Critical] Set secure database credentials in the .env file
2. [Required] Review and adjust database connection pool settings if necessary
3. [Critical] Ensure that the database server is properly set up and accessible
*/