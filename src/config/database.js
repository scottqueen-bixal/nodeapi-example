/**
 * @fileoverview Database connection configuration for PostgreSQL
 * @description Handles database connection setup and provides a connection pool
 * @module config/database
 * @requires pg
 * @version 1.0.0
 */

import pkg from 'pg';
const { Pool } = pkg;

/**
 * Database connection configuration
 * @type {Object}
 * @property {string} host - Database host
 * @property {number} port - Database port
 * @property {string} database - Database name
 * @property {string} user - Database username
 * @property {string} password - Database password
 * @property {number} max - Maximum number of connections in pool
 * @property {number} idleTimeoutMillis - Time before closing idle connections
 * @property {number} connectionTimeoutMillis - Time to wait for connection
 */
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'nodejs_app',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  max: 20, // Maximum number of connections in pool
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 2000, // Return error after 2 seconds if connection could not be established
};

/**
 * PostgreSQL connection pool
 * @type {Pool}
 * @description Connection pool for efficient database connections
 */
const pool = new Pool(dbConfig);

/**
 * Database connection event handlers
 */
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

/**
 * Test database connection
 * @async
 * @function
 * @description Tests the database connection and logs the result
 * @returns {Promise<boolean>} True if connection successful, false otherwise
 */
export const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Database connection test successful');
    client.release();
    return true;
  } catch (err) {
    console.error('Database connection test failed:', err.message);
    return false;
  }
};

/**
 * Execute a database query
 * @async
 * @function
 * @param {string} text - SQL query text
 * @param {Array} params - Query parameters
 * @returns {Promise<Object>} Query result
 * @throws {Error} Database query error
 */
export const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (err) {
    console.error('Database query error:', err.message);
    throw err;
  }
};

/**
 * Get a client from the connection pool
 * @async
 * @function
 * @returns {Promise<Object>} Database client
 */
export const getClient = async () => {
  return await pool.connect();
};

/**
 * Close the database connection pool
 * @async
 * @function
 * @returns {Promise<void>}
 */
export const closePool = async () => {
  await pool.end();
  console.log('Database connection pool closed');
};

export default pool;
