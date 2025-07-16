/**
 * @fileoverview Session model for database operations
 * @description Handles all session-related database operations
 * @module models/SessionModel
 * @requires ../db/init
 * @version 1.0.0
 */

import db from "../db/init.js";

/**
 * Session model class
 * @class SessionModel
 * @description Handles all session-related database operations
 */
export class SessionModel {
  /**
   * Create a new session
   * @param {number} userId - User ID
   * @param {Date} expiresAt - Session expiration date
   * @returns {Promise<Object>} Created session object
   * @example
   * const session = await SessionModel.create(1, new Date());
   * // Returns: { id: 1, user_id: 1, expires_at: '2025-01-01T00:00:00Z', ... }
   */
  static async create(userId, expiresAt) {
    const [session] = await db("sessions")
      .insert({
        user_id: userId,
        expires_at: expiresAt,
      })
      .returning("*");
    
    return session;
  }

  /**
   * Find a session by ID
   * @param {number} id - Session ID
   * @returns {Promise<Object|null>} Session object or null if not found
   * @example
   * const session = await SessionModel.findById(1);
   * // Returns: { id: 1, user_id: 1, expires_at: '2025-01-01T00:00:00Z', ... } or null
   */
  static async findById(id) {
    const session = await db("sessions")
      .where({ id })
      .first();
    
    return session || null;
  }

  /**
   * Find all sessions for a user
   * @param {number} userId - User ID
   * @returns {Promise<Array>} Array of session objects
   * @example
   * const sessions = await SessionModel.findByUserId(1);
   * // Returns: [{ id: 1, user_id: 1, expires_at: '2025-01-01T00:00:00Z', ... }, ...]
   */
  static async findByUserId(userId) {
    const sessions = await db("sessions")
      .where({ user_id: userId })
      .orderBy("created_at", "desc");
    
    return sessions;
  }

  /**
   * Find active sessions for a user (not expired)
   * @param {number} userId - User ID
   * @returns {Promise<Array>} Array of active session objects
   * @example
   * const activeSessions = await SessionModel.findActiveByUserId(1);
   * // Returns: [{ id: 1, user_id: 1, expires_at: '2025-01-01T00:00:00Z', ... }, ...]
   */
  static async findActiveByUserId(userId) {
    const sessions = await db("sessions")
      .where({ user_id: userId })
      .where("expires_at", ">", new Date())
      .orderBy("created_at", "desc");
    
    return sessions;
  }

  /**
   * Delete a session by ID
   * @param {number} id - Session ID
   * @returns {Promise<number>} Number of deleted rows
   * @example
   * const deleted = await SessionModel.deleteById(1);
   * // Returns: 1 if deleted, 0 if not found
   */
  static async deleteById(id) {
    const deleted = await db("sessions")
      .where({ id })
      .del();
    
    return deleted;
  }

  /**
   * Delete all sessions for a user
   * @param {number} userId - User ID
   * @returns {Promise<number>} Number of deleted rows
   * @example
   * const deleted = await SessionModel.deleteByUserId(1);
   * // Returns: number of deleted sessions
   */
  static async deleteByUserId(userId) {
    const deleted = await db("sessions")
      .where({ user_id: userId })
      .del();
    
    return deleted;
  }

  /**
   * Delete expired sessions
   * @returns {Promise<number>} Number of deleted rows
   * @example
   * const deleted = await SessionModel.deleteExpired();
   * // Returns: number of deleted expired sessions
   */
  static async deleteExpired() {
    const deleted = await db("sessions")
      .where("expires_at", "<", new Date())
      .del();
    
    return deleted;
  }

  /**
   * Update session expiration
   * @param {number} id - Session ID
   * @param {Date} expiresAt - New expiration date
   * @returns {Promise<Object|null>} Updated session object or null if not found
   * @example
   * const session = await SessionModel.updateExpiration(1, new Date());
   * // Returns: { id: 1, user_id: 1, expires_at: '2025-01-01T00:00:00Z', ... } or null
   */
  static async updateExpiration(id, expiresAt) {
    const [session] = await db("sessions")
      .where({ id })
      .update({ expires_at: expiresAt, updated_at: new Date() })
      .returning("*");
    
    return session || null;
  }

  /**
   * Check if a session is valid (exists and not expired)
   * @param {number} id - Session ID
   * @returns {Promise<boolean>} True if session is valid, false otherwise
   * @example
   * const isValid = await SessionModel.isValid(1);
   * // Returns: true or false
   */
  static async isValid(id) {
    const session = await db("sessions")
      .where({ id })
      .where("expires_at", ">", new Date())
      .first();
    
    return !!session;
  }
}
