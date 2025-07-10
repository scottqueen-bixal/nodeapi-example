# Node.js Crash Course API

A RESTful API built with Express.js and ES6 modules for managing users. This project demonstrates modern Node.js development practices including async/await, error handling, and clean architecture.

## 🚀 Features

- **RESTful API** - Full CRUD operations for user management
- **ES6 Modules** - Modern JavaScript import/export syntax
- **Async/Await** - Clean asynchronous code with proper error handling
- **Data Validation** - Input validation with custom User model
- **Error Handling** - Comprehensive error handling middleware
- **Hot Reload** - Development server with nodemon
- **UUID Support** - Unique identifiers for all users

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

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

3. Create a `.env` file in the root directory (optional):
```bash
PORT=8000
```

## 🚀 Running the Application

### Development Mode
```bash
npm run serve
```

### Production Mode
```bash
node express.js
```

The server will start at `http://localhost:8000` (or the port specified in your `.env` file).

## 📁 Project Structure

```
nodejs-crash/
├── express.js          # Main application file
├── server.js           # Basic HTTP server (alternative)
├── package.json        # Project dependencies and scripts
├── models/
│   └── User.js         # User model with validation
├── routes/
│   └── users.js        # User routes and controllers
└── README.md           # Project documentation
```

## 🔧 API Endpoints

### Base URL
```
http://localhost:8000
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
curl http://localhost:8000/users
```

**Create a new user:**
```bash
curl -X POST http://localhost:8000/users \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "janesmith@example.com"
  }'
```

**Get a specific user:**
```bash
curl http://localhost:8000/users/USER_ID_HERE
```

**Delete a user:**
```bash
curl -X DELETE http://localhost:8000/users/USER_ID_HERE
```

### Using Postman

1. Set the base URL to `http://localhost:8000`
2. Set appropriate HTTP methods (GET, POST, DELETE)
3. For POST requests, set `Content-Type: application/json` in headers
4. Use the request body examples provided above

## ⚠️ Common Issues

### JSON Parsing Errors
- Ensure your JSON is properly formatted
- Remove trailing commas from JSON objects
- Use double quotes for property names and string values

### Module Import Errors
- Ensure you have `"type": "module"` in your `package.json`
- Use `.js` extensions in import statements for local modules

## 🔧 Technologies Used

- **Express.js** - Web framework
- **UUID** - Unique identifier generation
- **Nodemon** - Development server with hot reload
- **Body-parser** - Request body parsing middleware

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.
