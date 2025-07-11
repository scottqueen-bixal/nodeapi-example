# Node.js User API

A RESTful API built with Express.js and ES6 modules for managing users. This project demonstrates modern Node.js development practices including async/await, error handling, clean architecture, Docker containerization, and comprehensive JSDoc documentation.

## Features

- **RESTful API** - Full CRUD operations for user management
- **PostgreSQL Database** - Robust relational database with full ACID compliance
- **Knex.js ORM** - SQL query builder with migrations and seeds
- **Database Migrations** - Version-controlled database schema changes
- **ES6 Modules** - Modern JavaScript import/export syntax
- **Async/Await** - Clean asynchronous code with proper error handling
- **Data Validation** - Input validation with custom User model
- **Error Handling** - Comprehensive error handling middleware
- **Hot Reload** - Development server with nodemon
- **Database Admin** - Adminer web interface for database management
- **Docker Support** - Containerized deployment with Docker Compose
- **JSDoc Documentation** - Comprehensive API documentation generation
- **Clean Architecture** - Organized src/ structure with models and routes

## Technologies Used

- **Express.js** - Web framework
- **PostgreSQL** - Relational database management system
- **Knex.js** - SQL query builder and ORM
- **pg** - PostgreSQL client for Node.js
- **Nodemon** - Development server with hot reload
- **Body-parser** - Request body parsing middleware
- **Docker** - Containerization platform
- **Adminer** - Database administration web interface
- **JSDoc** - Documentation generation
- **Alpine Linux** - Lightweight Docker base image

## Architecture

- **MVC Pattern** - Models, routes (controllers), and views separation
- **Database Layer** - PostgreSQL with Knex.js ORM for data persistence
- **Migration System** - Version-controlled database schema management
- **Middleware** - Error handling and request processing
- **ES6 Modules** - Modern JavaScript module system
- **Async/Await** - Clean asynchronous programming
- **Container Architecture** - Docker-based deployment with service orchestration
- **Documentation-First** - Comprehensive JSDoc comments
- **Environment Configuration** - Flexible .env setup

## Project Structure

```
nodejs-crash/
├── src/
│   ├── app.js              # Main Express application
│   ├── config/
│   │   └── database.js     # Database connection configuration
│   ├── db/
│   │   ├── init.js         # Database initialization with migrations/seeds
│   │   ├── migrations/     # Knex database migrations
│   │   └── seeds/          # Knex database seeds
│   ├── models/
│   │   ├── User.js         # Legacy User model with validation
│   │   └── UserModel.js    # Knex-based User model
│   └── routes/
│       └── users.js        # User routes and controllers with JSDoc
├── docker-compose.yml      # Docker Compose configuration
├── Dockerfile              # Docker container configuration
├── knexfile.js             # Knex configuration for migrations/seeds
├── jsdoc.conf.json         # JSDoc configuration
├── package.json            # Dependencies and scripts
├── .env                    # Environment variables
├── .env.example            # Environment variables template
└── README.md               # Project documentation
```

## Prerequisites

- Node.js (v20 or higher)
- npm or yarn package manager
- Docker and Docker Compose (for containerized deployment)
- PostgreSQL (if running locally without Docker)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory to override default environment variables. Example content:

```bash
PORT=5000
DOCS_PORT=5001
ADMINER_PORT=8002
DOMAIN=localhost
NODE_ENV=development
DB_HOST=postgres
DB_PORT=5432
DB_NAME=nodejs_app
DB_USER=postgres
DB_PASSWORD=postgres
```

3. Start the development server:

## Database Setup

This project uses PostgreSQL with Knex.js for database operations. The database is automatically configured when using Docker Compose.

### Database Services

- **PostgreSQL** - Main database server (port 5432)
- **Adminer** - Web-based database administration (port 8002)

### Database Migrations

The project uses Knex.js migrations for version-controlled database schema management:

```bash
# Run migrations
npm run migrate

# Rollback migrations
npm run migrate:rollback

# Run seeds
npm run seed
```

### Database Initialization

The database is automatically initialized when the application starts:
1. Database connection is tested
2. Migrations are run to create/update schema
3. Seeds are run (development only) to populate initial data

### Accessing the Database

- **Adminer Web Interface**: http://localhost:8002
  - Server: `postgres`
  - Username: `postgres`
  - Password: `postgres`
  - Database: `nodejs_app`

- **Direct Connection**:
  - Host: `localhost`
  - Port: `5432`
  - Database: `nodejs_app`
  - Username: `postgres`
  - Password: `postgres`

##Running the Application

### Development Mode (Local)
```bash
npm run serve
```

### Docker (Recommended)
```bash
# Start all services (API + PostgreSQL + Adminer + JSDoc)
docker-compose up --build

# Start in background
docker-compose up -d --build

# Start only the API and database
docker-compose up backend-node postgres

# Start only the documentation
docker-compose up jsdoc
```

### Services

When running with Docker Compose, the following services are available:

- **API Server**: http://localhost:8000
- **JSDoc Documentation**: http://localhost:8001
- **Adminer Database Admin**: http://localhost:8002
- **PostgreSQL Database**: localhost:5432

## API Endpoints

All API endpoints are documented with JSDoc. Access the comprehensive API documentation at `http://localhost:8001` when running with Docker Compose.

### User Management

- **GET** `/users` - Get all users
- **GET** `/users/:id` - Get user by ID
- **POST** `/users` - Create new user
- **PUT** `/users/:id` - Update user
- **DELETE** `/users/:id` - Delete user

### Database Schema

The `users` table contains the following fields:
- `id` - Auto-incrementing primary key
- `first_name` - User's first name (required)
- `last_name` - User's last name (required)
- `email` - User's email address (required, unique)
- `created_at` - Timestamp of creation
- `updated_at` - Timestamp of last update


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
# Get all users
curl -X GET http://localhost:8000/users

# Get user by ID
curl -X GET http://localhost:8000/users/1

# Create new user
curl -X POST http://localhost:8000/users \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com"
  }'

# Update user
curl -X PUT http://localhost:8000/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane.smith@example.com"
  }'

# Delete user
curl -X DELETE http://localhost:8000/users/1
```

Refer to the JSDoc documentation for complete API endpoint details and examples.

### Database Operations

```bash
# Create new migration
npx knex migrate:make migration_name

# Run migrations
npm run migrate

# Rollback last migration
npm run migrate:rollback

# Create new seed
npx knex seed:make seed_name

# Run seeds
npm run seed
```

### Docker Commands

```bash
# View logs
docker-compose logs [service-name]

# Execute commands in container
docker-compose exec backend-node npm run migrate

# Rebuild specific service
docker-compose up --build [service-name]
```

### Using Postman

1. Set the base URL to your configured port
2. Set appropriate HTTP methods (GET, POST, DELETE)
3. For POST requests, set `Content-Type: application/json` in headers
4. Refer to JSDoc documentation for request body examples
