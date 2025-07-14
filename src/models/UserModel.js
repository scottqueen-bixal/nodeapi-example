/**
 * @fileoverview User model with Knex.js database operations
 * @description Handles user data operations using Knex query builder
 * @version 1.0.0
 */

import db from "../db/init.js";

/**
 * User model class for database operations
 * @class
 */
export class UserModel {
  /**
   * Get all users from the database
   * @async
   * @static
   * @returns {Promise<Array>} Array of user objects
   * @throws {Error} Database query error
   */
  static async findAll() {
    try {
      return await db("users").select("*").orderBy("created_at", "desc");
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  /**
   * Find a user by ID
   * @async
   * @static
   * @param {number} id - User ID
   * @returns {Promise<Object|null>} User object or null if not found
   * @throws {Error} Database query error
   */
  static async findById(id) {
    try {
      const user = await db("users").where({ id }).first();
      return user || null;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  }

  /**
   * Find a user by email
   * @async
   * @static
   * @param {string} email - User email
   * @returns {Promise<Object|null>} User object or null if not found
   * @throws {Error} Database query error
   */
  static async findByEmail(email) {
    try {
      const user = await db("users").where({ email }).first();
      return user || null;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw error;
    }
  }

  /**
   * Create a new user
   * @async
   * @static
   * @param {Object} userData - User data
   * @param {string} userData.first_name - First name
   * @param {string} userData.last_name - Last name
   * @param {string} userData.email - Email address
   * @param {string} userData.password - Hashed password
   * @param {string} userData.salt - Password salt
   * @returns {Promise<Object>} Created user object
   * @throws {Error} Database query error
   */
  static async create(userData) {
    try {
      const [newUser] = await db("users")
        .insert({
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          password_hash: userData.password,
          salt: userData.salt,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning("*");
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  /**
   * Update a user by ID
   * @async
   * @static
   * @param {number} id - User ID
   * @param {Object} userData - Updated user data
   * @returns {Promise<Object|null>} Updated user object or null if not found
   * @throws {Error} Database query error
   */
  static async update(id, userData) {
    try {
      const [updatedUser] = await db("users")
        .where({ id })
        .update({
          ...userData,
          updated_at: new Date(),
        })
        .returning("*");
      return updatedUser || null;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  /**
   * Delete a user by ID
   * @async
   * @static
   * @param {number} id - User ID
   * @returns {Promise<boolean>} True if deleted, false if not found
   * @throws {Error} Database query error
   */
  static async delete(id) {
    try {
      const deletedCount = await db("users").where({ id }).del();
      return deletedCount > 0;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  /**
   * Get user count
   * @async
   * @static
   * @returns {Promise<number>} Total number of users
   * @throws {Error} Database query error
   */
  static async count() {
    try {
      const [{ count }] = await db("users").count("id as count");
      return parseInt(count);
    } catch (error) {
      console.error("Error counting users:", error);
      throw error;
    }
  }
}
