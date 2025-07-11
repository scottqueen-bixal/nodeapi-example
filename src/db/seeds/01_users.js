/**
 * @fileoverview Seed file for initial user data
 * @description Populates the users table with sample data
 * @version 1.0.0
 */

/**
 * Seed users table with sample data
 * @param {Object} knex - Knex instance
 * @returns {Promise<void>}
 */
export async function seed(knex) {
  // Clear existing entries
  await knex('users').del();

  // Insert sample users
  await knex('users').insert([
    {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane@example.com',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      first_name: 'Alice',
      last_name: 'Johnson',
      email: 'alice@example.com',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}
