# Node.js User API

A RESTful API built with Express.js and ES6 modules for managing users. This project demonstrates modern Node.js development practices including async/await, error handling, clean architecture, Docker containerization, and comprehensive JSDoc documentation.

## Features

- **RESTful API** - Full CRUD operations for user management
- **ES6 Modules** - Modern JavaScript import/export syntax
- **Async/Await** - Clean asynchronous code with proper error handling
- **Data Validation** - Input validation with custom User model
- **Error Handling** - Comprehensive error handling middleware
- **Hot Reload** - Development server with nodemon
- **UUID Support** - Unique identifiers for all users
- **Docker Support** - Containerized deployment with Docker Compose
- **JSDoc Documentation** - Comprehensive API documentation generation
- **Clean Architecture** - Organized src/ structure with models and routes

## Technologies Used

- **Express.js** - Web framework
- **UUID** - Unique identifier generation
- **Nodemon** - Development server with hot reload
- **Body-parser** - Request body parsing middleware
- **Docker** - Containerization platform
- **JSDoc** - Documentation generation
- **Alpine Linux** - Lightweight Docker base image

## Architecture

- **MVC Pattern** - Models, routes (controllers), and views separation
- **Middleware** - Error handling and request processing
- **ES6 Modules** - Modern JavaScript module system
- **Async/Await** - Clean asynchronous programming
- **Container Architecture** - Docker-based deployment
- **Documentation-First** - Comprehensive JSDoc comments
- **Environment Configuration** - Flexible .env setup

## Project Structure

```
nodejs-crash/
├── src/
│   ├── app.js              # Main Express application
│   ├── models/
│   │   └── User.js         # User model with validation and JSDoc
│   └── routes/
│       └── users.js        # User routes and controllers with JSDoc
├── docker-compose.yml      # Docker Compose configuration
├── docker-compose.prod.yml # Production Docker Compose
├── Dockerfile              # Docker container configuration
├── .dockerignore           # Docker ignore file
├── jsdoc.conf.json         # JSDoc configuration
├── package.json            # Dependencies and scripts
├── .env                    # Environment variables
├── server.js               # Basic HTTP server (alternative)
└── README.md               # Project documentation
```

## Prerequisites

- Node.js (v20 or higher)
- npm or yarn package manager
- Docker and Docker Compose (for containerized deployment)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory to override default environment variables. Example content:

```bash
PORT=5000
DOCS_PORT=5001
DOMAIN=localhost
NODE_ENV=development
```

3. Start the development server:

##Running the Application

### Development Mode (Local)
```bash
npm run serve
```

### Docker
```bash
# Start all services
docker-compose up --build

# Start in background
docker-compose up -d --build

# Start only the API
docker-compose up backend-node

# Start only the documentation
docker-compose up jsdoc
```

## API Endpoints

All API endpoints are documented with JSDoc. Access the comprehensive API documentation at `http://localhost:8001` when running with Docker Compose.


## API Documentation

The project includes comprehensive JSDoc documentation covering:

- **File-level documentation** - Purpose and module information
- **Class documentation** - User model with validation
- **Route documentation** - Complete API endpoint details
- **Parameter documentation** - Request/response formats
- **Error documentation** - HTTP status codes and error handling
- **Examples** - Practical usage examples

## Testing the API

### Using cURL

```bash
# Example GET request
curl -X GET http://localhost:8000/api/users

# Example POST request
curl -X POST http://localhost:8000/api/users -H "Content-Type: application/json" -d '{"first_name": "John", "last_name": "Doe", "email": "john.doe@example.com"}'
```

Refer to the JSDoc documentation for complete API endpoint details and examples.

### Using Postman

1. Set the base URL to your configured port
2. Set appropriate HTTP methods (GET, POST, DELETE)
3. For POST requests, set `Content-Type: application/json` in headers
4. Refer to JSDoc documentation for request body examples
