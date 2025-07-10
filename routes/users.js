import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/User.js';

const router = express.Router();

// Mock database
let users = [
    new User({ first_name: 'John', last_name: 'Doe', email: 'johndoe@example.com', id: uuidv4() }),
    new User({ first_name: 'Alice', last_name: 'Smith', email: 'alicesmith@example.com', id: uuidv4() })
];

/**
 * Get all users from the mock database
 * @route GET /users
 * @returns {Object[]} Array of user objects
 * @throws {500} Internal server error if fetching users fails
 */
router.get('/', async (req, res) => {
    try {
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

/**
 * Create a new user in the mock database
 * @route POST /users
 * @param {Object} req.body - User data
 * @param {string} req.body.first_name - User's first name
 * @param {string} req.body.last_name - User's last name
 * @param {string} req.body.email - User's email address
 * @returns {Object} Created user object with success message
 * @throws {400} Bad request if required fields are missing
 * @throws {500} Internal server error if user creation fails
 */
router.post('/', async (req, res) => {
    try {
        const user = req.body;
        console.log(req.body);

        if (!user.first_name || !user.last_name || !user.email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create new User instance using object destructuring
        const newUser = new User({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            id: uuidv4()
        });

        // Add to mock database
        users.push(newUser);

        res.status(201).json({
            message: `${user.first_name} has been added to the Database`,
            user: newUser
        });
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

/**
 * Get a specific user by ID
 * @route GET /users/:id
 * @param {string} req.params.id - User ID
 * @returns {Object} User object if found
 * @throws {404} Not found if user doesn't exist
 * @throws {500} Internal server error if fetching user fails
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const foundUser = users.find((user) => user.id === id);

        if (!foundUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(foundUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

/**
 * Delete a user by ID
 * @route DELETE /users/:id
 * @param {string} req.params.id - User ID to delete
 * @returns {Object} Success message if user is deleted
 * @throws {404} Not found if user doesn't exist
 * @throws {500} Internal server error if deletion fails
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }

        users = users.filter((user) => user.id !== id);

        res.status(200).json({ message: `User ${id} deleted successfully from database` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

export default router;
