# Node.js Crash Course API

A RESTful API built with Express.js and ES6 modules for managing users. This project demonstrates modern Node.js development practices including async/await, error handling, clean architecture, Docker containerization, and comprehensive JSDoc documentation.

## 🚀 Features

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

## 📋 Prerequisites

- Node.js (v20 or higher)
- npm or yarn package manager
- Docker and Docker Compose (for containerized deployment)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nodejs-crash
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
PORT=8000
DOCS_PORT=3000
NODE_ENV=development
```

## 🚀 Running the Application

### Development Mode (Local)
```bash
npm run serve
```

### Production Mode (Local)
```bash
node src/app.js
```

### Docker Deployment
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

## 📁 Project Structure

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
├── Dockerfile             # Docker container configuration
├── .dockerignore          # Docker ignore file
├── jsdoc.conf.json        # JSDoc configuration
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── server.js              # Basic HTTP server (alternative)
└── README.md              # Project documentation
```

## 🔧 API Endpoints

### Base URL
```
http://localhost:${PORT}
```

### Documentation
```
http://localhost:${DOCS_PORT}
```

### Routes

#### **GET /**
- **Description**: Welcome message
- **Response**: `"Hello World!"`

#### **GET /users**
- **Description**: Get all users
- **Response**: Array of user objects
- **Example Response**:
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@example.com",
    "created_at": "2025-01-15T10:30:00.000Z"
  }
]
```

#### **POST /users**
- **Description**: Create a new user
- **Request Body**:
```json
{
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "janesmith@example.com"
}
```
- **Response**: Created user object with success message
- **Status Codes**:
  - `201`: User created successfully
  - `400`: Missing required fields or invalid data
  - `500`: Internal server error

#### **GET /users/:id**
- **Description**: Get a specific user by ID
- **Parameters**: `id` (string) - User UUID
- **Response**: User object
- **Status Codes**:
  - `200`: User found
  - `404`: User not found
  - `500`: Internal server error

#### **DELETE /users/:id**
- **Description**: Delete a user by ID
- **Parameters**: `id` (string) - User UUID
- **Response**: Success message
- **Status Codes**:
  - `200`: User deleted successfully
  - `404`: User not found
  - `500`: Internal server error

## 📚 Documentation

### JSDoc Documentation
The project includes comprehensive JSDoc documentation for all components:

- **User Model**: Complete class documentation with examples
- **API Routes**: Detailed endpoint documentation with parameters
- **Express App**: Middleware and configuration documentation

### Accessing Documentation
1. **Docker**: `http://localhost:${DOCS_PORT}` (when running docker-compose)
2. **Local Generation**:
   ```bash
   npm install -g jsdoc
   jsdoc src/**/*.js -d docs -c jsdoc.conf.json
   ```

## 🐳 Docker Deployment

### Services
- **backend-node**: Main API service
- **jsdoc**: Documentation generation and serving

### Environment Variables
```bash
# API Configuration
PORT=8000
NODE_ENV=development

# Documentation
DOCS_PORT=3000
```

### Docker Commands
```bash
# Build and start all services
docker-compose up --build

# Production deployment
docker-compose -f docker-compose.prod.yml up --build -d

# View logs
docker-compose logs -f backend-node

# Stop services
docker-compose down
```

## 📝 User Model

### User Properties
- `id`: UUID (auto-generated)
- `first_name`: String (required)
- `last_name`: String (required)
- `email`: String (required, must be valid email format)
- `created_at`: ISO date string (auto-generated)

### Validation Rules
- First name: Required, non-empty string
- Last name: Required, non-empty string
- Email: Required, valid email format

## 🧪 Testing the API

### Using cURL

**Get all users:**
```bash
curl http://localhost:${PORT}/users
```

**Create a new user:**
```bash
curl -X POST http://localhost:${PORT}/users \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "janesmith@example.com"
  }'
```

**Get a specific user:**
```bash
curl http://localhost:${PORT}/users/USER_ID_HERE
```

**Delete a user:**
```bash
curl -X DELETE http://localhost:${PORT}/users/USER_ID_HERE
```

### Using Postman

1. Set the base URL to `http://localhost:${PORT}`
2. Set appropriate HTTP methods (GET, POST, DELETE)
3. For POST requests, set `Content-Type: application/json` in headers
4. Use the request body examples provided above

### Docker Testing
```bash
# Start services
docker-compose up -d

# Test API
curl http://localhost:8000/users

# View documentation
open http://localhost:3000
```

## ⚠️ Common Issues

### JSON Parsing Errors
- Ensure your JSON is properly formatted
- Remove trailing commas from JSON objects
- Use double quotes for property names and string values

### Module Import Errors
- Ensure you have `"type": "module"` in your `package.json`
- Use `.js` extensions in import statements for local modules

### Docker Issues
- Ensure Docker is running
- Check port availability (8000 for API, 3000 for docs)
- Verify environment variables are set in `.env` file

## 🔧 Technologies Used

- **Express.js** - Web framework
- **UUID** - Unique identifier generation
- **Nodemon** - Development server with hot reload
- **Body-parser** - Request body parsing middleware
- **Docker** - Containerization platform
- **JSDoc** - Documentation generation
- **Alpine Linux** - Lightweight Docker base image

## 📦 Dependencies

```json
{
  "express": "^5.1.0",
  "nodemon": "^3.1.10",
  "uuid": "^11.1.0"
}
```

## 🏗️ Architecture

- **MVC Pattern** - Models, routes (controllers), and views separation
- **Middleware** - Error handling and request processing
- **ES6 Modules** - Modern JavaScript module system
- **Async/Await** - Clean asynchronous programming
- **Container Architecture** - Docker-based deployment
- **Documentation-First** - Comprehensive JSDoc comments
- **Environment Configuration** - Flexible .env setup

## 🌐 Deployment

### Local Development
```bash
npm run serve
```

### Docker Development
```bash
docker-compose up --build
```

### Production
```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

## 📖 API Documentation

The project includes comprehensive JSDoc documentation covering:

- **File-level documentation** - Purpose and module information
- **Class documentation** - User model with validation
- **Route documentation** - Complete API endpoint details
- **Parameter documentation** - Request/response formats
- **Error documentation** - HTTP status codes and error handling
- **Examples** - Practical usage examples

Access the generated documentation at `http://localhost:${DOCS_PORT}` when running with Docker Compose.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.
