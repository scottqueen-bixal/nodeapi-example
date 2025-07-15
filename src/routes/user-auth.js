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
import jwt from "jsonwebtoken";
import { verifyPassword } from "../utils.js";

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
router.post("/", async (req, res) => {
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

    // Return only safe user data
    const safeUserData = {
      id: user.id,
    };

    res.status(200).json({ user: safeUserData, token });
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

/**
 * Express router with all user routes
 * @type {express.Router}
 * @description Exported router instance containing all user-related endpoints
 */
export default router;
