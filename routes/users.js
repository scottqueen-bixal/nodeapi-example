import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Mock database
let users = [
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@example.com',
  },
  {
    first_name: 'Alice',
    last_name: 'Smith',
    email: 'alicesmith@example.com',
  },
];

// Getting the list of users from the mock database
router.get('/', async (req, res) => {
    try {
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

router.post('/', async (req, res) => {
    try {
        const user = req.body;

        if (!user.first_name || !user.last_name || !user.email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newUser = { ...user, id: uuidv4() };
        users.push(newUser);

        res.status(201).json({
            message: `${user.first_name} has been added to the Database`,
            user: newUser
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

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
