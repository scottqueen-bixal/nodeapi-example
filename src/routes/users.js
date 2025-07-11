/**
 * @fileoverview User routes for the Express.js API
 * @description Handles all user-related HTTP endpoints including CRUD operations
 * @module routes/users
 * @requires express
 * @requires uuid
 * @requires ../models/User
 * @version 1.0.0
 */

import express from "express";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/User.js";

/**
 * Express router instance for user routes
 * @type {express.Router}
 * @description Router instance that handles all /users endpoints
 */
const router = express.Router();

/**
 * Mock database for storing users
 * @type {User[]}
 * @description In-memory array that simulates a database for storing user objects
 * @example
 * // users array contains User instances
 * [
 *   {
 *     id: "123e4567-e89b-12d3-a456-426614174000",
 *     first_name: "John",
 *     last_name: "Doe",
 *     email: "johndoe@example.com",
 *     created_at: "2025-01-15T10:30:00.000Z"
 *   }
 * ]
 */
let users = [
  new User({
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@example.com",
    id: uuidv4(),
  }),
  new User({
    first_name: "Alice",
    last_name: "Smith",
    email: "alicesmith@example.com",
    id: uuidv4(),
  }),
];

/**
 * Get all users from the mock database
 * @route GET /users
 * @function
 * @async
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @description Retrieves all users from the mock database
 * @returns {Promise<express.Response>} JSON response containing array of user objects
 * @throws {500} Internal server error if fetching users fails
 * @example
 * // GET /users
 * // Response: 200 OK
 * [
 *   {
 *     "id": "123e4567-e89b-12d3-a456-426614174000",
 *     "first_name": "John",
 *     "last_name": "Doe",
 *     "email": "johndoe@example.com",
 *     "created_at": "2025-01-15T10:30:00.000Z"
 *   }
 * ]
 */
router.get("/", async (req, res) => {
  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

/**
 * Create a new user in the mock database
 * @route POST /users
 * @function
 * @async
 * @param {express.Request} req - Express request object
 * @param {Object} req.body - User data from request body
 * @param {string} req.body.first_name - User's first name (required)
 * @param {string} req.body.last_name - User's last name (required)
 * @param {string} req.body.email - User's email address (required)
 * @param {express.Response} res - Express response object
 * @description Creates a new user with auto-generated UUID and timestamp
 * @returns {Promise<express.Response>} JSON response with created user and success message
 * @throws {400} Bad request if required fields are missing or invalid
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
 *     "id": "456e7890-e89b-12d3-a456-426614174000",
 *     "first_name": "Jane",
 *     "last_name": "Smith",
 *     "email": "janesmith@example.com",
 *     "created_at": "2025-01-15T10:35:00.000Z"
 *   }
 * }
 */
router.post("/", async (req, res) => {
  try {
    const user = req.body;
    console.log(req.body);

    if (!user.first_name || !user.last_name || !user.email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create new User instance using object destructuring
    const newUser = new User({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      id: uuidv4(),
    });

    // Add to mock database
    users.push(newUser);

    res.status(201).json({
      message: `${user.first_name} has been added to the Database`,
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
 * @param {string} req.params.id - User ID (UUID format)
 * @param {express.Response} res - Express response object
 * @description Retrieves a single user by their unique identifier
 * @returns {Promise<express.Response>} JSON response with user object if found
 * @throws {404} Not found if user doesn't exist
 * @throws {500} Internal server error if fetching user fails
 * @example
 * // GET /users/123e4567-e89b-12d3-a456-426614174000
 * // Response: 200 OK
 * {
 *   "id": "123e4567-e89b-12d3-a456-426614174000",
 *   "first_name": "John",
 *   "last_name": "Doe",
 *   "email": "johndoe@example.com",
 *   "created_at": "2025-01-15T10:30:00.000Z"
 * }
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id);

    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(foundUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

/**
 * Delete a user by ID
 * @route DELETE /users/:id
 * @function
 * @async
 * @param {express.Request} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {string} req.params.id - User ID to delete (UUID format)
 * @param {express.Response} res - Express response object
 * @description Removes a user from the mock database by their ID
 * @returns {Promise<express.Response>} JSON response with success message
 * @throws {404} Not found if user doesn't exist
 * @throws {500} Internal server error if deletion fails
 * @example
 * // DELETE /users/123e4567-e89b-12d3-a456-426614174000
 * // Response: 200 OK
 * {
 *   "message": "User 123e4567-e89b-12d3-a456-426614174000 deleted successfully from database"
 * }
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    users = users.filter((user) => user.id !== id);

    res
      .status(200)
      .json({ message: `User ${id} deleted successfully from database` });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

/**
 * Express router with all user routes
 * @type {express.Router}
 * @description Exported router instance containing all user-related endpoints
 */
export default router;
