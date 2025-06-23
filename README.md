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
2. Configure the database connection string. By default, `server.js` connects to `mongodb://localhost:27017/yourDatabaseName`. Edit this URI or export an environment variable before running the server:
   ```bash
   export MONGODB_URI="mongodb://localhost:27017/yourDatabaseName"
   export PORT=3000  # optional
   ```
   Adjust the port if you change the listening port in `server.js`.

## Running the server

Start the application with Node.js:

```bash
node server.js
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

## Main technologies

- **Express** – web framework for Node.js
- **Mongoose** – MongoDB object modeling for Node.js

