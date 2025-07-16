/**
 * @fileoverview Migration to create sessions table
 * @description Creates the sessions table for user session management
 * @version 1.0.0
 */

/**
 * Create sessions table
 * @param {Object} knex - Knex instance
 * @returns {Promise<void>}
 */
export async function up(knex) {
  return knex.schema.createTable('sessions', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.timestamp('expires_at').notNullable();
    table.timestamps(true, true); // created_at and updated_at

    // Foreign key constraint
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    
    // Indexes
    table.index('user_id');
    table.index('expires_at');
    table.index('created_at');
  });
}

/**
 * Drop sessions table
 * @param {Object} knex - Knex instance
 * @returns {Promise<void>}
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('sessions');
}
