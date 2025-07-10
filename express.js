import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/users.js'

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add JSON error handling middleware
app.use((error, req, res, next) => {
    // Check if the error is a SyntaxError from JSON parsing
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return res.status(400).json({ error: 'Invalid JSON format', req: error.body });
    }
    next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
