# Lendesk Authentication API Project

## Description

Lendesk Authentication Project is a fast and secure API for internal services to create and authenticate users.

## Goal

Provide a RESTful API for internal services to create users and authenticate them using a username + password. The API must be fast, secure, and pass a basic security audit (password complexity, safe hashing, non-leaky errors, etc.).

## Approach

Development was guided by a test-driven checklist (see TDD.md), starting with integration tests to ensure API correctness and security requirements were met before implementation details.


## Project Structure

- **src/**: Main source code
- **src/db**: Redis as database
- **package.json**: Project metadata and dependencies.
- **.env.example**: Sample environment variables file.
- **.gitignore**: Specifies files to be ignored by Git.
- **docker-compose.yml**: Configuration for Docker services.

---

## Getting Started

### Prerequisites

- Node.js 21+
- Docker & Docker Compose
- Redis (if running locally without Docker)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd lendesk

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
PORT=3000
REDIS_HOST=redis://localhost
REDIS_PORT=6379
NODE_ENV=development
```

---

## Running the Application

### Option 1: Local Development (without Docker)

```bash
# Start Redis locally
# Make sure Redis is running on localhost:6379

# Run in development mode with hot reload
npm run dev

# Access the API
# http://localhost:3000
```

### Option 2: Docker Development Environment

```bash
# Start Redis + App in development mode
docker compose --profile dev up

# Or in detached mode (background)
docker compose --profile dev up -d

# View logs
docker compose logs -f app

# Stop
docker compose --profile dev down
```

### Option 3: Docker Production Environment

```bash
# Build and start in production mode
docker compose --profile prod build
docker compose --profile prod up

# Or in detached mode
docker compose --profile prod up -d

# Stop
docker compose --profile prod down
```

---

## API Documentation

Once the application is running, access the interactive Swagger documentation:

```
http://localhost:3000/docs
```

---

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- auth.test.ts
```

---

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier

---

## Endpoints

### POST /v1/users
Create a new user account.

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "StrongPass123!@#"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "username": "johndoe"
}
```

### POST /v1/auth
Authenticate a user.

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "StrongPass123!@#"
}
```

**Response (200):**
```json
{
  "ok": true
}
```

**Rate Limit:** 5 requests per minute

---

## Quick Test

```bash
# Create a user
curl -X POST http://localhost:3000/v1/users \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"SuperStrong123!@#"}'

# Authenticate
curl -X POST http://localhost:3000/v1/auth \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"SuperStrong123!@#"}'
```

---
## Future Implementations

- Account lockout or progressive delays to mitigate brute-force attacks.
- Refresh token support with rotation.
- Audit logging for authentication events.
- User management CRUD endpoints.
- Additional automated tests for security scenarios.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.