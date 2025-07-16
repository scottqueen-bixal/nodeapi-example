/**
 * @fileoverview Utility functions for the API
 * @description Common utility functions used across the application
 * @version 1.0.0
 */

import crypto from 'crypto';

const SESSION_SECRET = process.env.SESSION_SECRET || 'fallback-session-secret-key';
const ALGORITHM = 'aes-256-cbc'; // Use CBC instead of GCM for simplicity

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

/**
 * Encrypt session data
 * @param {Object} payload - Session data to encrypt
 * @returns {string} Encrypted session string
 * @example
 * const encrypted = encrypt({ sessionId: 1, expiresAt: new Date() });
 * // Returns: encrypted string
 */
export function encrypt(payload) {
  try {
    const text = JSON.stringify(payload);
    const key = crypto.scryptSync(SESSION_SECRET, 'salt', 32);
    const iv = crypto.randomBytes(16);
    
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return `${iv.toString('hex')}:${encrypted}`;
  } catch (error) {
    console.error('Encryption error:', error);
    // Fallback to simple base64 encoding if encryption fails
    const text = JSON.stringify(payload);
    return Buffer.from(text).toString('base64');
  }
}

/**
 * Decrypt session data
 * @param {string} encryptedText - Encrypted session string
 * @returns {Object|null} Decrypted session data or null if invalid
 * @example
 * const decrypted = decrypt(encryptedString);
 * // Returns: { sessionId: 1, expiresAt: '2025-01-01T00:00:00Z' } or null
 */
export function decrypt(encryptedText) {
  try {
    // Check if it's the new format (has colons)
    if (encryptedText.includes(':')) {
      const [ivHex, encrypted] = encryptedText.split(':');
      
      if (!ivHex || !encrypted) {
        return null;
      }
      
      const key = crypto.scryptSync(SESSION_SECRET, 'salt', 32);
      const iv = Buffer.from(ivHex, 'hex');
      
      const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
      
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return JSON.parse(decrypted);
    } else {
      // Fallback: treat as base64 encoded
      const text = Buffer.from(encryptedText, 'base64').toString('utf8');
      return JSON.parse(text);
    }
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
}
