/**
 * @fileoverview Seed file for initial user data
 * @description Populates the users table with sample data
 * @version 1.0.0
 */

import { hashPassword } from '../../utils.js';

/**
 * Seed users table with sample data
 * @param {Object} knex - Knex instance
 * @returns {Promise<void>}
 */
export async function seed(knex) {
  // Clear existing entries
  await knex("users").del();

  // Generate password hashes for sample users
  const johnPassword = hashPassword("password123");
  const janePassword = hashPassword("password456");
  const alicePassword = hashPassword("password789");

  // Insert sample users
  await knex("users").insert([
    {
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      password_hash: johnPassword.hash,
      salt: johnPassword.salt,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      first_name: "Jane",
      last_name: "Smith",
      email: "jane@example.com",
      password_hash: janePassword.hash,
      salt: janePassword.salt,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice@example.com",
      password_hash: alicePassword.hash,
      salt: alicePassword.salt,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
