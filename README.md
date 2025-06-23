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
2. Create a `.env` file at the project root to configure the database connection string and the server port. Example contents:
   ```env
   MONGODB_URI=mongodb://localhost:27017/yourDatabaseName
   PORT=3000
   ```
   `MONGODB_URI` has no default, so you must supply your own connection string.
   `PORT` defaults to `3000` if not set.

### Environment Variables

| Variable | Description | Default |
| -------- | ----------- | ------- |
| `PORT` | Port where the server listens | `3000` |
| `MONGODB_URI` | MongoDB connection string | *(required)* |
| `JWT_SECRET` | Secret used to sign JSON Web Tokens | `secretkey` |

## Running the server

Start the application using **npm**:

```bash
npm start
```

The server will start on `http://localhost:3000` unless you changed the port.

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

## Authentication

Generate a token by calling the `/login` endpoint with the demo credentials:

```bash
curl -X POST -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"password"}' \
     http://localhost:3000/login
```

Include the returned `token` in the `Authorization` header when calling protected routes as `Bearer <token>`.

Protected routes:

- `POST /product`
- `GET /list`
- `GET /products`

## API documentation

After starting the server you can view an interactive Swagger UI describing all available endpoints by visiting:

```
http://localhost:3000/api-docs
```

## Validation and error handling

The `/product` endpoint checks required fields using `express-validator`.
Validation errors return a `400` response with a JSON body describing all issues.
All other errors are formatted by a global middleware for consistent responses.

## Main technologies

- **Express** – web framework for Node.js
- **Mongoose** – MongoDB object modeling for Node.js
- **dotenv** – loads environment variables from `.env`


## Docker usage

To run the application and MongoDB using Docker Compose:

```bash
docker-compose up
```

This builds the Node.js image and starts a MongoDB container. The API will be available at `http://localhost:3000`.

