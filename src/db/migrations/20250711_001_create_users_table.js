/**
 * @fileoverview Initial migration to create users table
 * @description Creates the users table with basic fields and indexes
 * @version 1.0.0
 */

/**
 * Create users table
 * @param {import('knex').Knex} knex - Knex instance
 * @returns {Promise<void>}
 */
export async function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('first_name', 255).notNullable();
    table.string('last_name', 255).notNullable();
    table.string('email', 255).notNullable().unique();
    table.timestamps(true, true); // created_at and updated_at

    // Indexes
    table.index('email');
    table.index('created_at');
  });
}

/**
 * Drop users table
 * @param {import('knex').Knex} knex - Knex instance
 * @returns {Promise<void>}
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('users');
}
