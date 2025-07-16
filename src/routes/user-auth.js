/**
 * @fileoverview User routes for the Express.js API
 * @description Handles all user-related HTTP endpoints including CRUD operations
 * @module routes/user-auth
 * @requires express
 * @requires ../models/UserModel
 * @version 1.0.0
 */

import express from "express";
import { UserModel } from "../models/UserModel.js";
import { SessionModel } from "../models/SessionModel.js";
import jwt from "jsonwebtoken";
import { verifyPassword, encrypt, decrypt } from "../utils.js";
import { validateApiKey } from "../middleware/auth.js";

/**
 * Express router instance for user routes
 * @type {express.Router}
 * @description Router instance that handles all /users endpoints
 */
const router = express.Router();
/**
 * User authentication route
 * @route POST /user-auth
 * @function
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @description Authenticates a user based on username and password
 * @returns {express.Response} JSON response with user data or error message
 * @example
 * // POST /user-auth
 * // Request body: { "username": "johndoe", "password": "password123" }
 * // Response: 200 OK with user data or 400 Bad Request with error message
 */
router.post("/", validateApiKey, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    console.log("Login attempt for email:", email);
    const user = await UserModel.findByEmail(email);
    console.log("User found:", user ? "Yes" : "No");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify password using the utility function
    console.log("Verifying password...");
    const isPasswordValid = verifyPassword(
      password,
      user.password_hash,
      user.salt
    );
    console.log("Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "fallback-secret-key",
      {
        expiresIn: "1hr", // Set token expiration to 1 hour
      }
    );

    // Create session in database
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const session = await SessionModel.create(user.id, expiresAt);

    // Encrypt session data
    const encryptedSession = encrypt({
      sessionId: session.id,
      expiresAt: expiresAt.toISOString(),
    });

    // Return only safe user data
    const safeUserData = {
      id: user.id,
    };

    res.status(200).json({ 
      user: safeUserData, 
      token,
      session: encryptedSession,
      sessionExpires: expiresAt.toISOString()
    });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add this to your API routes
router.post("/verify-token", (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret-key"
    );
    res.json({
      userId: decoded.id,
      expiresAt: new Date(decoded.exp * 1000),
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// Session verification endpoint
router.post("/verify-session", validateApiKey, async (req, res) => {
  const { session } = req.body;

  if (!session) {
    return res.status(400).json({ error: "Session is required" });
  }

  try {
    // Decrypt session
    const decryptedSession = decrypt(session);
    
    if (!decryptedSession) {
      return res.status(401).json({ error: "Invalid session" });
    }

    const { sessionId, expiresAt } = decryptedSession;

    // Check if session is expired
    if (new Date(expiresAt) <= new Date()) {
      return res.status(401).json({ error: "Session expired" });
    }

    // Check if session exists in database
    const dbSession = await SessionModel.findById(sessionId);
    
    if (!dbSession) {
      return res.status(401).json({ error: "Session not found" });
    }

    // Check if database session is expired
    if (new Date(dbSession.expires_at) <= new Date()) {
      // Clean up expired session
      await SessionModel.deleteById(sessionId);
      return res.status(401).json({ error: "Session expired" });
    }

    // Get user data
    const user = await UserModel.findById(dbSession.user_id);
    
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Return user data
    res.json({
      userId: user.id,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      expiresAt: dbSession.expires_at,
    });

  } catch (error) {
    console.error("Session verification error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Logout endpoint
router.post("/logout", validateApiKey, async (req, res) => {
  const { session } = req.body;

  if (!session) {
    return res.status(400).json({ error: "Session is required" });
  }

  try {
    // Decrypt session
    const decryptedSession = decrypt(session);
    
    if (!decryptedSession) {
      return res.status(200).json({ message: "Logged out successfully" });
    }

    const { sessionId } = decryptedSession;

    // Delete session from database
    await SessionModel.deleteById(sessionId);

    res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Express router with all user routes
 * @type {express.Router}
 * @description Exported router instance containing all user-related endpoints
 */
export default router;
