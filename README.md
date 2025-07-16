# Node.js Authentication & User Management API

A secure microservice backend API built with Express.js and ES6 modules for authentication and user management. This project provides a complete authentication system with session management, password hashing, and JWT tokens designed for integration with frontend applications and microservice architectures.

## Features

### Authentication & Security
- **Session-Based Authentication** - Secure session management with database persistence
- **Password Hashing** - Bcrypt-style password hashing with salt
- **JWT Token Support** - JSON Web Token generation and verification
- **API Key Authentication** - Secure API key validation middleware
- **Session Encryption** - Encrypted session data for client-side storage
- **CORS Configuration** - Cross-origin resource sharing setup for frontend integration
- **Security Headers** - HTTP security headers and middleware

### User Management
- **RESTful API** - Full CRUD operations for user management
- **Email-based Authentication** - User login with email and password
- **User Registration** - New user creation with validation
- **Session Lifecycle** - Login, logout, and session verification endpoints
- **Data Validation** - Input validation with custom User model

### Database & Infrastructure
- **PostgreSQL Database** - Robust relational database with full ACID compliance
- **Knex.js ORM** - SQL query builder with migrations and seeds
- **Database Migrations** - Version-controlled database schema changes
- **Session Storage** - Persistent session storage in PostgreSQL
- **Docker Support** - Containerized deployment with Docker Compose
- **Database Admin** - Adminer web interface for database management

### Development & Documentation
- **ES6 Modules** - Modern JavaScript import/export syntax
- **Async/Await** - Clean asynchronous code with proper error handling
- **Error Handling** - Comprehensive error handling middleware
- **Hot Reload** - Development server with nodemon
- **JSDoc Documentation** - Comprehensive API documentation generation
- **Clean Architecture** - Organized src/ structure with models and routes

## Technologies Used

- **Express.js** - Web framework for REST API
- **PostgreSQL** - Relational database management system
- **Knex.js** - SQL query builder and ORM
- **pg** - PostgreSQL client for Node.js
- **jsonwebtoken** - JWT token generation and verification
- **crypto** - Node.js crypto module for session encryption
- **cors** - Cross-origin resource sharing middleware
- **uuid** - UUID generation for unique identifiers
- **Nodemon** - Development server with hot reload
- **Docker** - Containerization platform
- **Adminer** - Database administration web interface
- **JSDoc** - Documentation generation
- **Alpine Linux** - Lightweight Docker base image

## Architecture

- **Microservice Design** - Standalone authentication service for distributed systems
- **Session-Based Authentication** - Secure session management with database persistence
- **JWT Integration** - Token-based authentication for stateless clients
- **Database Layer** - PostgreSQL with Knex.js ORM for data persistence
- **Migration System** - Version-controlled database schema management
- **API Key Security** - Middleware for API key validation
- **CORS Configuration** - Cross-origin resource sharing for frontend integration
- **Middleware Stack** - Authentication, error handling, and request processing
- **ES6 Modules** - Modern JavaScript module system
- **Async/Await** - Clean asynchronous programming
- **Container Architecture** - Docker-based deployment with service orchestration
- **Documentation-First** - Comprehensive JSDoc comments
- **Environment Configuration** - Flexible .env setup for different environments

## Project Structure

```
api/
├── src/
│   ├── app.js              # Main Express application with CORS and middleware
│   ├── utils.js            # Password hashing and session encryption utilities
│   ├── config/
│   │   └── database.js     # Database connection configuration
│   ├── db/
│   │   ├── init.js         # Database initialization with migrations/seeds
│   │   ├── migrations/     # Knex database migrations
│   │   │   ├── 20250711_001_create_users_table.js
│   │   │   ├── 20250714_001_add_password_to_users.js
│   │   │   └── 20250715_001_create_sessions_table.js
│   │   └── seeds/          # Knex database seeds
│   ├── middleware/
│   │   └── auth.js         # API key validation middleware
│   ├── models/
│   │   ├── UserModel.js    # User model with authentication methods
│   │   └── SessionModel.js # Session model for session management
│   └── routes/
│       ├── users.js        # User CRUD routes with password hashing
│       └── user-auth.js    # Authentication routes (login, logout, verify)
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
# Application Environment
NODE_ENV=development
PORT=8000

# Database Configuration
DB_HOST=postgres
DB_PORT=5432
DB_NAME=nodejs_app
DB_USER=postgres
DB_PASSWORD=postgres

# Security Configuration
API_KEY=your-secure-api-key-here
JWT_SECRET=your-jwt-secret-key-change-in-production
SESSION_SECRET=your-session-secret-key-change-in-production

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Documentation
DOCS_PORT=8001
ADMINER_PORT=8002
DOMAIN=localhost
```

## Authentication & Security

This API provides comprehensive authentication and security features designed for microservice architectures:

### API Key Authentication

All endpoints (except root `/`) require API key authentication:

1. Set your API key in the `.env` file:
```bash
API_KEY=your-secure-api-key-here
```

2. Include the API key in all requests using the `X-API-Key` header:
```bash
curl -H "X-API-Key: your-secure-api-key-here" http://localhost:8000/users
```

### Session-Based Authentication

The API provides secure session management with the following features:

- **Password Hashing**: Uses crypto.pbkdf2Sync with salt for secure password storage
- **Session Encryption**: Session data is encrypted before being sent to clients
- **Database Persistence**: Sessions are stored in PostgreSQL with expiration tracking
- **Automatic Cleanup**: Expired sessions are automatically removed

### JWT Token Support

The API generates JWT tokens for stateless authentication:

- **Token Generation**: Creates JWT tokens with configurable expiration
- **Token Verification**: Validates JWT tokens for protected routes
- **Secure Signing**: Uses strong JWT secrets for token signing

### Error Responses

Authentication errors return standardized responses:

- **401 Unauthorized**: Missing or invalid API key
- **401 Unauthorized**: Invalid credentials
- **401 Unauthorized**: Expired session
- **404 Not Found**: User not found

### JavaScript/Node.js Integration Example

```javascript
// Authentication request
const loginResponse = await fetch('http://localhost:8000/user-auth', {
  method: 'POST',
  headers: {
    'X-API-Key': 'your-secure-api-key-here',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const { user, token, session, sessionExpires } = await loginResponse.json();

// Using the session for subsequent requests
const verifyResponse = await fetch('http://localhost:8000/user-auth/verify-session', {
  method: 'POST',
  headers: {
    'X-API-Key': 'your-secure-api-key-here',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ session })
});
```

3. Start the development server:

## Database Setup

This project uses PostgreSQL with Knex.js for database operations. The database schema includes user management and session tracking tables.

### Database Schema

#### Users Table
- `id` - Auto-incrementing primary key
- `first_name` - User's first name (required)
- `last_name` - User's last name (required)
- `email` - User's email address (required, unique)
- `password_hash` - Bcrypt-hashed password
- `salt` - Password salt for additional security
- `created_at` - Timestamp of creation
- `updated_at` - Timestamp of last update

#### Sessions Table
- `id` - Auto-incrementing primary key
- `user_id` - Foreign key to users table
- `expires_at` - Session expiration timestamp
- `created_at` - Timestamp of creation
- `updated_at` - Timestamp of last update

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

# Run seeds (development only)
npm run seed

# Reset database (rollback, migrate, seed)
npm run db:reset
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

### Authentication Endpoints

#### POST `/user-auth` - User Login
Authenticates a user and creates a new session.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "user": {
    "id": 1
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "session": "encrypted-session-data",
  "sessionExpires": "2025-01-22T10:30:00.000Z"
}
```

#### POST `/user-auth/verify-session` - Session Verification
Verifies if a session is valid and returns user data.

**Request:**
```json
{
  "session": "encrypted-session-data"
}
```

**Response (Success):**
```json
{
  "userId": 1,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe"
  },
  "expiresAt": "2025-01-22T10:30:00.000Z"
}
```

#### POST `/user-auth/logout` - User Logout
Invalidates a session and logs out the user.

**Request:**
```json
{
  "session": "encrypted-session-data"
}
```

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

#### POST `/user-auth/verify-token` - JWT Token Verification
Verifies a JWT token and returns user data.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (Success):**
```json
{
  "userId": 1,
  "expiresAt": "2025-01-15T11:30:00.000Z"
}
```

### User Management Endpoints

#### GET `/users` - Get All Users
Returns a list of all users.

#### GET `/users/:id` - Get User by ID
Returns a specific user by ID.

#### POST `/users` - Create New User
Creates a new user with hashed password.

**Request:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

#### PUT `/users/:id` - Update User
Updates an existing user.

#### DELETE `/users/:id` - Delete User
Deletes a user and all associated sessions.

### Security Headers

All requests must include:
- `X-API-Key`: Your API key
- `Content-Type`: `application/json` (for POST/PUT requests)


## API Documentation

The project includes comprehensive JSDoc documentation covering:

- **File-level documentation** - Purpose and module information
- **Class documentation** - User model with validation
- **Route documentation** - Complete API endpoint details
- **Parameter documentation** - Request/response formats
- **Error documentation** - HTTP status codes and error handling
- **Examples** - Practical usage examples

## Testing the API

### Authentication Flow Testing

#### 1. User Registration
```bash
# Create a new user
curl -X POST http://localhost:8000/users \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-secure-api-key-here" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }'
```

#### 2. User Login
```bash
# Login and get session
curl -X POST http://localhost:8000/user-auth \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-secure-api-key-here" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }'
```

#### 3. Session Verification
```bash
# Verify session (use session from login response)
curl -X POST http://localhost:8000/user-auth/verify-session \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-secure-api-key-here" \
  -d '{
    "session": "encrypted-session-data-from-login"
  }'
```

#### 4. User Logout
```bash
# Logout and invalidate session
curl -X POST http://localhost:8000/user-auth/logout \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-secure-api-key-here" \
  -d '{
    "session": "encrypted-session-data-from-login"
  }'
```

### User Management Testing

#### Get All Users
```bash
curl -X GET http://localhost:8000/users \
  -H "X-API-Key: your-secure-api-key-here"
```

#### Get User by ID
```bash
curl -X GET http://localhost:8000/users/1 \
  -H "X-API-Key: your-secure-api-key-here"
```

#### Update User
```bash
curl -X PUT http://localhost:8000/users/1 \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-secure-api-key-here" \
  -d '{
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane.smith@example.com"
  }'
```

#### Delete User
```bash
curl -X DELETE http://localhost:8000/users/1 \
  -H "X-API-Key: your-secure-api-key-here"
```

### JWT Token Testing

#### Verify JWT Token
```bash
curl -X POST http://localhost:8000/user-auth/verify-token \
  -H "Authorization: Bearer <jwt-token-from-login>" \
  -H "X-API-Key: your-secure-api-key-here"
```

### Frontend Integration Example

```javascript
// Complete authentication flow
class AuthService {
  constructor(apiUrl, apiKey) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
    this.headers = {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey
    };
  }

  async login(email, password) {
    const response = await fetch(`${this.apiUrl}/user-auth`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    const data = await response.json();
    // Store session in secure HTTP-only cookie or local storage
    return data;
  }

  async verifySession(session) {
    const response = await fetch(`${this.apiUrl}/user-auth/verify-session`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ session })
    });
    
    return response.ok ? await response.json() : null;
  }

  async logout(session) {
    await fetch(`${this.apiUrl}/user-auth/logout`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ session })
    });
  }
}

// Usage
const auth = new AuthService('http://localhost:8000', 'your-api-key');
const { session, sessionExpires } = await auth.login('user@example.com', 'password');
```

## Microservice Integration

### Architecture Patterns

This API is designed to serve as a dedicated authentication and user management microservice:

#### Service Communication
- **REST API**: HTTP-based communication with JSON payloads
- **API Gateway**: Can be placed behind an API gateway for routing and rate limiting
- **Load Balancing**: Stateless design allows for horizontal scaling
- **Service Discovery**: Can be registered with service discovery mechanisms

#### Frontend Integration
- **Next.js Integration**: Built-in support for Next.js Server Actions and middleware
- **React/Vue/Angular**: Compatible with any frontend framework
- **Mobile Apps**: RESTful API suitable for mobile app authentication
- **SPA Applications**: Session-based authentication for single-page applications

#### Backend Integration
- **Microservice Architecture**: Can authenticate users for other microservices
- **API Gateway**: Integrate with Kong, Zuul, or other API gateways
- **Container Orchestration**: Deploy with Kubernetes, Docker Swarm, or similar
- **Database Sharing**: Shared PostgreSQL database or service-specific databases

### Deployment Patterns

#### Container Deployment
```yaml
# docker-compose.yml for production
version: '3.8'
services:
  auth-api:
    image: your-registry/auth-api:latest
    environment:
      - NODE_ENV=production
      - API_KEY=${API_KEY}
      - JWT_SECRET=${JWT_SECRET}
      - SESSION_SECRET=${SESSION_SECRET}
      - DB_HOST=postgres
    depends_on:
      - postgres
    networks:
      - microservices
```

#### Kubernetes Deployment
```yaml
# k8s-deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: auth-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: auth-api
  template:
    metadata:
      labels:
        app: auth-api
    spec:
      containers:
      - name: auth-api
        image: your-registry/auth-api:latest
        env:
        - name: NODE_ENV
          value: "production"
        - name: API_KEY
          valueFrom:
            secretKeyRef:
              name: auth-secrets
              key: api-key
```

#### Environment-Specific Configuration
```bash
# Production environment variables
NODE_ENV=production
API_KEY=prod-secure-key-32-chars-long
JWT_SECRET=prod-jwt-secret-64-chars-long
SESSION_SECRET=prod-session-secret-64-chars-long
DB_HOST=prod-postgres-cluster.internal
DB_SSL=true
ALLOWED_ORIGINS=https://app.yourdomain.com,https://admin.yourdomain.com
```

### Security Considerations

#### Production Security
- **HTTPS Only**: Enforce HTTPS in production environments
- **Secrets Management**: Use proper secret management (HashiCorp Vault, K8s secrets)
- **Rate Limiting**: Implement rate limiting to prevent brute force attacks
- **Database Security**: Use SSL connections and proper database credentials
- **CORS Configuration**: Restrict CORS to specific domains
- **Input Validation**: Comprehensive input validation and sanitization

#### Monitoring & Logging
- **Health Checks**: Built-in health check endpoints
- **Metrics**: Integration with Prometheus/Grafana for monitoring
- **Logging**: Structured logging with request correlation IDs
- **Audit Trail**: User authentication events logging

### Performance Optimization

#### Database Optimization
- **Connection Pooling**: Configure appropriate connection pool sizes
- **Indexing**: Optimized database indexes for common queries
- **Session Cleanup**: Automatic cleanup of expired sessions
- **Database Sharding**: For high-volume deployments

#### Caching Strategies
- **Redis Integration**: Add Redis for session caching
- **CDN Integration**: Cache static assets and API responses
- **Database Query Caching**: Cache frequent database queries

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

# Reset database (development only)
npm run db:reset
```

### Advanced Features

#### Session Management
- **Session Expiration**: Configurable session expiration (default: 7 days)
- **Session Renewal**: Automatic session renewal on activity
- **Session Cleanup**: Automatic cleanup of expired sessions
- **Multi-Device Support**: Users can have multiple active sessions

#### Password Security
- **Password Hashing**: Uses Node.js crypto.pbkdf2Sync with salt
- **Password Validation**: Configurable password strength requirements
- **Password Reset**: Framework for password reset functionality
- **Account Lockout**: Protection against brute force attacks

#### API Features
- **Request Validation**: Comprehensive input validation
- **Error Handling**: Standardized error responses
- **Rate Limiting**: Protection against abuse
- **Logging**: Structured logging for debugging and monitoring

### Production Best Practices

#### Security Hardening
```javascript
// Example production configuration
const productionConfig = {
  // Strong secrets (minimum 32 characters)
  apiKey: process.env.API_KEY, // 32+ character random string
  jwtSecret: process.env.JWT_SECRET, // 64+ character random string
  sessionSecret: process.env.SESSION_SECRET, // 64+ character random string
  
  // Database security
  database: {
    ssl: process.env.NODE_ENV === 'production',
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    pool: {
      min: 2,
      max: 10
    }
  },
  
  // CORS configuration
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || [],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key']
  }
};
```

#### Monitoring & Health Checks
```javascript
// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    await db.raw('SELECT 1');
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});
```

#### Performance Monitoring
- **Response Time Tracking**: Monitor API response times
- **Database Query Performance**: Track slow queries
- **Memory Usage**: Monitor memory consumption
- **Error Rate Monitoring**: Track error rates and patterns

### Integration Examples

#### Next.js App Router Integration
```typescript
// app/lib/auth.ts
import { cookies } from 'next/headers';

export async function getServerSession() {
  const sessionCookie = cookies().get('session');
  if (!sessionCookie) return null;
  
  const response = await fetch(`${process.env.API_URL}/user-auth/verify-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.API_KEY!
    },
    body: JSON.stringify({ session: sessionCookie.value })
  });
  
  return response.ok ? response.json() : null;
}
```

#### API Gateway Integration
```yaml
# Kong API Gateway configuration
services:
  - name: auth-service
    url: http://auth-api:8000
    
routes:
  - name: auth-routes
    service: auth-service
    paths:
      - /api/auth
    
plugins:
  - name: rate-limiting
    config:
      minute: 100
      hour: 1000
```

### Docker Commands

```bash
# View logs
docker-compose logs [service-name]

# Execute commands in container
docker-compose exec backend-node npm run migrate

# Rebuild specific service
docker-compose up --build [service-name]

# Check container health
docker-compose ps
```

### Troubleshooting

#### Common Issues

**Database Connection Issues**
```bash
# Check database connectivity
docker-compose exec backend-node npm run migrate

# Verify database is running
docker-compose ps postgres

# Check database logs
docker-compose logs postgres
```

**Authentication Failures**
```bash
# Check API key configuration
echo $API_KEY

# Verify JWT secret
echo $JWT_SECRET

# Check session encryption
echo $SESSION_SECRET
```

**CORS Issues**
```bash
# Check CORS configuration
echo $ALLOWED_ORIGINS

# Verify frontend URL
echo $FRONTEND_URL
```

#### Debugging Tips

1. **Enable Debug Logging**: Set `NODE_ENV=development` for detailed logs
2. **Check API Documentation**: Visit http://localhost:8001 for JSDoc documentation
3. **Database Administration**: Use Adminer at http://localhost:8002
4. **Network Connectivity**: Ensure proper Docker network configuration
5. **Environment Variables**: Verify all required environment variables are set

#### Maintenance Tasks

**Regular Maintenance**
```bash
# Clean up expired sessions (can be automated)
docker-compose exec backend-node node -e "
  const db = require('./src/config/database.js').default;
  db('sessions').where('expires_at', '<', new Date()).del()
    .then(count => console.log(\`Deleted \${count} expired sessions\`))
    .finally(() => process.exit());
"

# Database backup
docker-compose exec postgres pg_dump -U postgres nodejs_app > backup.sql

# Update dependencies
npm audit fix
npm update
```

**Performance Optimization**
```bash
# Analyze database performance
docker-compose exec postgres psql -U postgres -d nodejs_app -c "
  SELECT query, calls, total_time, mean_time 
  FROM pg_stat_statements 
  ORDER BY total_time DESC 
  LIMIT 10;
"

# Monitor memory usage
docker stats
```

### Development Workflow

#### Local Development Setup
```bash
# Clone repository
git clone <repository-url>
cd nextjs-auth-example/api

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run serve
```

#### Testing Workflow
```bash
# Run database migrations
npm run migrate

# Seed test data
npm run seed

# Test authentication endpoints
curl -X POST http://localhost:8000/user-auth \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{"email": "test@example.com", "password": "password"}'
```

#### Production Deployment
```bash
# Build production image
docker build -t auth-api:latest .

# Deploy with production configuration
docker-compose -f docker-compose.prod.yml up -d

# Run health checks
curl http://localhost:8000/health
```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and ensure documentation is updated
5. Submit a pull request

### License

This project is licensed under the ISC License. See the LICENSE file for details.

### Support

For issues and questions:
- Check the troubleshooting section above
- Review the JSDoc documentation at http://localhost:8001
- Open an issue on the project repository
- Review the API endpoint documentation and examples
