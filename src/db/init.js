/**
 * @fileoverview Database initialization with Knex migrations and seeds
 * @description Handles database schema creation and initial data population
 * @version 1.0.0
 */

import knex from 'knex';
import knexConfig from '../../knexfile.js';

/**
 * Database environment (development, production, etc.)
 * @type {string}
 */
const environment = process.env.NODE_ENV || 'development';

/**
 * Knex instance configured for the current environment
 * @type {import('knex').Knex}
 */
const db = knex(knexConfig[environment]);

/**
 * Initialize database by running migrations and seeds
 * @async
 * @function
 * @returns {Promise<void>}
 * @throws {Error} Database initialization error
 */
export async function initializeDatabase() {
  try {
    console.log('🔧 Running database migrations...');

    // Run migrations
    await db.migrate.latest();
    console.log('✅ Database migrations completed successfully');

    // Run seeds in development only
    if (environment === 'development') {
      console.log('🌱 Running database seeds...');
      await db.seed.run();
      console.log('✅ Database seeds completed successfully');
    }

    console.log('🎉 Database initialization completed');
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    throw error;
  }
}

/**
 * Get the Knex database instance
 * @function
 * @returns {import('knex').Knex} Knex database instance
 */
export function getKnexInstance() {
  return db;
}

/**
 * Close database connection
 * @async
 * @function
 * @returns {Promise<void>}
 */
export async function closeDatabase() {
  await db.destroy();
  console.log('📦 Database connection closed');
}

export default db;
