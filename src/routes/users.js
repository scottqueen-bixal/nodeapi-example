/**
 * @fileoverview User routes for the Express.js API
 * @description Handles all user-related HTTP endpoints including CRUD operations
 * @module routes/users
 * @requires express
 * @requires ../models/UserModel
 * @version 1.0.0
 */

import express from "express";
import { UserModel } from "../models/UserModel.js";
import { hashPassword } from "../utils.js";
import { validateApiKey } from "../middleware/auth.js";

/**
 * Express router instance for user routes
 * @type {express.Router}
 * @description Router instance that handles all /users endpoints
 */
const router = express.Router();

/**
 * Get all users from the database
 * @route GET /users
 * @function
 * @async
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @description Retrieves all users from the PostgreSQL database
 * @returns {Promise<express.Response>} JSON response containing array of user objects
 * @throws {500} Internal server error if fetching users fails
 * @example
 * // GET /users
 * // Response: 200 OK
 * [
 *   {
 *     "id": 1,
 *     "first_name": "John",
 *     "last_name": "Doe",
 *     "email": "johndoe@example.com",
 *     "created_at": "2025-01-15T10:30:00.000Z",
 *     "updated_at": "2025-01-15T10:30:00.000Z"
 *   }
 * ]
 */
router.get("/", validateApiKey, async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

/**
 * Create a new user in the database
 * @route POST /users
 * @function
 * @async
 * @param {express.Request} req - Express request object
 * @param {Object} req.body - User data from request body
 * @param {string} req.body.first_name - User's first name (required)
 * @param {string} req.body.last_name - User's last name (required)
 * @param {string} req.body.email - User's email address (required)
 * @param {express.Response} res - Express response object
 * @description Creates a new user in the PostgreSQL database
 * @returns {Promise<express.Response>} JSON response with created user and success message
 * @throws {400} Bad request if required fields are missing or invalid
 * @throws {409} Conflict if email already exists
 * @throws {500} Internal server error if user creation fails
 * @example
 * // POST /users
 * // Request body:
 * {
 *   "first_name": "Jane",
 *   "last_name": "Smith",
 *   "email": "janesmith@example.com"
 * }
 * // Response: 201 Created
 * {
 *   "message": "Jane has been added to the Database",
 *   "user": {
 *     "id": 1,
 *     "first_name": "Jane",
 *     "last_name": "Smith",
 *     "email": "janesmith@example.com",
 *     "created_at": "2025-01-15T10:35:00.000Z",
 *     "updated_at": "2025-01-15T10:35:00.000Z"
 *   }
 * }
 */
router.post("/", validateApiKey, async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields: first_name, last_name, email, password" });
    }

    // Check if email already exists
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Hash the password
    const { hash, salt } = hashPassword(password);

    // Create new user with hashed password
    const newUser = await UserModel.create({
      first_name,
      last_name,
      email,
      password: hash,
      salt: salt
    });

    res.status(201).json({
      message: `${first_name} has been added to the Database`,
      user: newUser,
    });
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

/**
 * Get a specific user by ID
 * @route GET /users/:id
 * @function
 * @async
 * @param {express.Request} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {string} req.params.id - User ID (integer)
 * @param {express.Response} res - Express response object
 * @description Retrieves a single user by their unique identifier
 * @returns {Promise<express.Response>} JSON response with user object if found
 * @throws {404} Not found if user doesn't exist
 * @throws {500} Internal server error if fetching user fails
 * @example
 * // GET /users/1
 * // Response: 200 OK
 * {
 *   "id": 1,
 *   "first_name": "John",
 *   "last_name": "Doe",
 *   "email": "johndoe@example.com",
 *   "created_at": "2025-01-15T10:30:00.000Z",
 *   "updated_at": "2025-01-15T10:30:00.000Z"
 * }
 */
router.get("/:id", validateApiKey, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Get user by ID error:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

/**
 * Update a user by ID
 * @route PUT /users/:id
 * @function
 * @async
 * @param {express.Request} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {string} req.params.id - User ID (integer)
 * @param {Object} req.body - Updated user data
 * @param {string} [req.body.first_name] - User's first name
 * @param {string} [req.body.last_name] - User's last name
 * @param {string} [req.body.email] - User's email address
 * @param {express.Response} res - Express response object
 * @description Updates a user's information in the database
 * @returns {Promise<express.Response>} JSON response with updated user object
 * @throws {400} Bad request if user ID is invalid or email already exists
 * @throws {404} Not found if user doesn't exist
 * @throws {500} Internal server error if update fails
 * @example
 * // PUT /users/1
 * // Request body:
 * {
 *   "first_name": "Jane",
 *   "email": "jane.doe@example.com"
 * }
 * // Response: 200 OK
 * {
 *   "message": "User updated successfully",
 *   "user": {
 *     "id": 1,
 *     "first_name": "Jane",
 *     "last_name": "Doe",
 *     "email": "jane.doe@example.com",
 *     "created_at": "2025-01-15T10:30:00.000Z",
 *     "updated_at": "2025-01-15T10:40:00.000Z"
 *   }
 * }
 */
router.put("/:id", validateApiKey, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const { first_name, last_name, email } = req.body;

    // Check if user exists
    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if email is being updated and if it already exists
    if (email && email !== existingUser.email) {
      const emailExists = await UserModel.findByEmail(email);
      if (emailExists) {
        return res.status(409).json({ error: "Email already exists" });
      }
    }

    // Update user
    const updatedUser = await UserModel.update(userId, {
      first_name,
      last_name,
      email
    });

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

/**
 * Delete a user by ID
 * @route DELETE /users/:id
 * @function
 * @async
 * @param {express.Request} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {string} req.params.id - User ID to delete (integer)
 * @param {express.Response} res - Express response object
 * @description Removes a user from the database by their ID
 * @returns {Promise<express.Response>} JSON response with success message
 * @throws {400} Bad request if user ID is invalid
 * @throws {404} Not found if user doesn't exist
 * @throws {500} Internal server error if deletion fails
 * @example
 * // DELETE /users/1
 * // Response: 200 OK
 * {
 *   "message": "User 1 deleted successfully from database"
 * }
 */
router.delete("/:id", validateApiKey, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const deleted = await UserModel.delete(userId);

    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: `User ${id} deleted successfully from database`
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

/**
 * Express router with all user routes
 * @type {express.Router}
 * @description Exported router instance containing all user-related endpoints
 */
export default router;
