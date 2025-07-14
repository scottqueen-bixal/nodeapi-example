/**
 * @fileoverview Migration to add password and salt fields to users table
 * @description Adds password_hash and salt columns to the users table
 * @version 1.0.0
 */

/**
 * Add password and salt columns to users table
 * @param {Object} knex - Knex instance
 * @returns {Promise<void>}
 */
export async function up(knex) {
  return knex.schema.alterTable("users", (table) => {
    table.string("password_hash", 255).nullable();
    table.string("salt", 255).nullable();
  });
}

/**
 * Remove password and salt columns from users table
 * @param {Object} knex - Knex instance
 * @returns {Promise<void>}
 */
export async function down(knex) {
  return knex.schema.alterTable("users", (table) => {
    table.dropColumn("password_hash");
    table.dropColumn("salt");
  });
}
