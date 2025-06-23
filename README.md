# RESTful Example API

This project is a simple Node.js server demonstrating a small RESTful API for managing products. It uses **Express** to handle HTTP requests and **Mongoose** to interact with a MongoDB database. The server exposes routes for creating products, listing them, and querying by price, along with some basic HTML forms for manual interaction.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [MongoDB](https://www.mongodb.com/) running locally or accessible via a connection URI.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and adjust the values as needed:
   ```bash
   cp .env.example .env
   ```
   The file defines the database connection string, the port used by the server, and a secret key for signing JWT tokens.

### Environment Variables

The `.env.example` file contains a minimal configuration:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/yourDatabaseName
JWT_SECRET=yourSecretKey
```

| Variable | Description | Default |
| -------- | ----------- | ------- |
| `PORT` | Port where the server listens | `3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/yourDatabaseName` |
| `JWT_SECRET` | Secret used to sign JWT tokens | `yourSecretKey` |

## Running the server

Start the application using npm:

```bash
npm start
```

The server will start on `http://localhost:3000` unless you changed the port.

## Running tests

Execute the automated test suite with:

```bash
npm test
```

## API usage

- **List products**
  ```bash
  curl http://localhost:3000/list
  ```

- **Create a product**
  ```bash
  curl -X POST -H "Content-Type: application/json" \
       -d '{"name":"Sample","price":19.99,"category":"General"}' \
       http://localhost:3000/product
  ```

- **Query by price**
  ```bash
  curl http://localhost:3000/products?maxPrice=20
  ```

You can also access `/upload` and `/query` in the browser to use HTML forms for uploading or querying data.

## Main technologies

- **Express** – web framework for Node.js
- **Mongoose** – MongoDB object modeling for Node.js
- **dotenv** – loads environment variables from `.env`

## Docker usage

Build and run the application in Docker:

```bash
docker build -t restful-api .
docker run --env-file .env -p 3000:3000 restful-api
```

To use Docker Compose with MongoDB:

```bash
docker-compose up --build
```

## Authentication workflow

1. Send credentials to `POST /auth/login` to receive a JWT token.
   ```bash
   curl -X POST -H "Content-Type: application/json" \
        -d '{"username":"user","password":"pass"}' \
        http://localhost:3000/auth/login
   ```
2. Include the token in the `Authorization` header for subsequent requests:

   ```bash
   Authorization: Bearer <token>
   ```

## Swagger documentation

When the server is running, browse to `http://localhost:3000/api-docs` for the interactive Swagger UI.

