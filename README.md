# RESTful Application

This application is a simple Express server using MongoDB via Mongoose.

## Environment Variables

Create a `.env` file in the project root with the following variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/yourDatabaseName
```

- **PORT**: The port number on which the server listens.
- **MONGODB_URI**: Connection string for the MongoDB database.

Install dependencies with `npm install` and start the server with `node server.js`.
