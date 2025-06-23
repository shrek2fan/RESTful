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
   You can modify these values or set them as environment variables if preferred.

### Environment Variables

| Variable | Description | Default |
| -------- | ----------- | ------- |
| `PORT` | Port where the server listens | `3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/yourDatabaseName` |

## Running the server

Start the application with Node.js:

```bash
node server.js
```


The server will start on `http://localhost:3000` unless you changed the port.

## Authentication

A demonstration login route is available to obtain a JSON Web Token (JWT). Send
a POST request with the hardcoded credentials `admin`/`password`:

```bash
curl -X POST -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"password"}' \
     http://localhost:3000/login
```

Use the returned token in the `Authorization` header when calling protected
routes:

```
Authorization: Bearer <token>
```

The routes `/product`, `/list` and `/products` require a valid token.

## API usage

- **List products**
  ```bash
  curl -H "Authorization: Bearer <token>" http://localhost:3000/list
  ```

- **Create a product**
  ```bash
  curl -X POST -H "Authorization: Bearer <token>" \
       -H "Content-Type: application/json" \
       -d '{"name":"Sample","price":19.99,"category":"General"}' \
       http://localhost:3000/product
  ```

- **Query by price**
  ```bash
  curl -H "Authorization: Bearer <token>" \
       http://localhost:3000/products?maxPrice=20
  ```

You can also access `/upload` and `/query` in the browser to use HTML forms for uploading or querying data.

## Main technologies

- **Express** – web framework for Node.js
- **Mongoose** – MongoDB object modeling for Node.js
- **dotenv** – loads environment variables from `.env`

