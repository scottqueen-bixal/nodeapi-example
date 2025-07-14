/**
 * @fileoverview Utility functions for the API
 * @description Common utility functions used across the application
 * @version 1.0.0
 */

import crypto from 'crypto';

/**
 * Generate password hash and salt
 * @param {string} password - Plain text password
 * @returns {Object} Object containing hash and salt
 * @example
 * const { hash, salt } = hashPassword('mypassword123');
 * // Returns: { hash: 'abc123...', salt: 'def456...' }
 */
export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

/**
 * Verify password against stored hash and salt
 * @param {string} password - Plain text password to verify
 * @param {string} storedHash - Stored password hash
 * @param {string} storedSalt - Stored password salt
 * @returns {boolean} True if password matches, false otherwise
 * @example
 * const isValid = verifyPassword('mypassword123', storedHash, storedSalt);
 * // Returns: true or false
 */
export function verifyPassword(password, storedHash, storedSalt) {
  const hash = crypto.pbkdf2Sync(password, storedSalt, 10000, 64, 'sha512').toString('hex');
  return hash === storedHash;
}
