/**
 * @fileoverview Express.js application entry point
 * @description Main application file that sets up the Express server with middleware,
 * routes, and error handling for a Node.js REST API
 * @version 1.0.0
 * @author Your Name
 */

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/users.js";
import userAuth from "./routes/user-auth.js";
import { testConnection } from "./config/database.js";
import { initializeDatabase } from "./db/init.js";

/**
 * Express application instance
 * @type {express.Application}
 */
const app = express();

/**
 * Server port number from environment variable or default 8000
 * @type {number}
 * @default 8000
 */
const port = process.env.PORT || 8000;

/** * Domain name for the server, defaults to 'localhost'
 * @type {string}
 * @default "localhost"
 */
const domain = process.env.DOMAIN || "localhost";

/**
 * Configure CORS middleware
 * @description Allows cross-origin requests from the frontend
 */
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-API-Key"],
  })
);

/**
 * Configure JSON parsing middleware
 * @description Parses incoming JSON requests with a limit
 */
app.use(bodyParser.json());

/**
 * Configure URL-encoded parsing middleware
 * @description Parses incoming URL-encoded form data
 */
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Global error handling middleware for JSON parsing errors
 * @function
 * @param {Error} error - The error object
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 * @description Catches and handles JSON syntax errors from malformed request bodies
 * @returns {express.Response|void} JSON error response or calls next()
 */
app.use((error, req, res, next) => {
  // Check if the error is a SyntaxError from JSON parsing
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res
      .status(400)
      .json({ error: "Invalid JSON format", req: error.body });
  }
  next();
});

/**
 * Root endpoint handler
 * @route GET /
 * @function
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @description Returns a welcome message for the API
 * @returns {express.Response} Welcome message response
 * @example
 * // GET /
 * // Response: "Hello World!"
 */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

/**
 * User routes middleware
 * @description Mounts user-related routes under the /users path
 * @see {@link ./routes/users.js} for user route implementations
 */
app.use("/users", userRoutes);

/**
 * User routes middleware
 * @description Mounts user-auth-related routes under the /user-auth path
 * @see {@link ./routes/user-auth.js} for user route implementations
 */
app.use("/user-auth", userAuth);

/**
 * Start the Express server
 * @function
 * @description Starts the server on the specified port and logs the startup message
 * @param {number} port - The port number to listen on
 * @param {Function} callback - Callback function executed when server starts
 * @example
 * // Server running at http://localhost:8000/
 */
app.listen(port, async () => {
  console.log(`Server running at http://${domain}:${port}/`);

  // Test database connection on startup
  await testConnection();

  // Initialize database (run migrations and seeds)
  await initializeDatabase();
});
