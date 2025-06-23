// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Initializing Express app
const app = express();
const port = process.env.PORT || 3000;

const auth = (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header) {
    return res.status(401).json({ message: 'Missing Authorization header' });
  }

  const token = header.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Invalid Authorization header' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secretkey', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// Middleware to parse JSON data
app.use(bodyParser.json());

// Connection to MongoDB
// Pre-condition: MongoDB server is running and accessible at the given URI.
// Post-condition: Establishes a connection with the MongoDB database.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Defining a Schema for Products
// Pre-condition: None
// Post-condition: Defines the structure of product documents in the MongoDB database.
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  dateAdded: { type: Date, default: Date.now }
});

// Creating a Model based on the schema
const Product = mongoose.model('Product', productSchema);

// Route to serve the home page
// Pre-condition: None
// Post-condition: Sends "Hello World!" as a response.
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Simple login route that returns a JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secretkey');
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Route to serve the upload form
// Pre-condition: None
// Post-condition: Sends HTML form for product data entry.
app.get('/upload', (req, res) => {
  res.send('<form action="/product" method="post"><input type="text" name="name" placeholder="Name"><input type="number" name="price" placeholder="Price"><input type="text" name="category" placeholder="Category"><button type="submit">Submit</button></form>');
});

// Route to list all products
// Pre-condition: Products stored in the database.
// Post-condition: Fetches and sends all product records as JSON.
app.get('/list', auth, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to serve the query form
// Pre-condition: None
// Post-condition: Sends HTML form for querying products by price.
app.get('/query', (req, res) => {
    const queryPageHTML = `
    <form id="queryForm">
      <input type="number" name="maxPrice" placeholder="Max Price">
      <button type="button" onclick="queryProducts()">Query</button>
    </form>
    <div id="results"></div>
    <script>
      // Function: queryProducts
      // Pre-condition: The server must be running and capable of handling '/products' route queries.
      // Post-condition: Retrieves products based on the specified maximum price and displays them.
      function queryProducts() {
        // Getting the max price value from the input field
        const maxPrice = document.querySelector('input[name="maxPrice"]').value;

        // Using the Fetch API to send an asynchronous request to the server
        fetch('/products?maxPrice=' + maxPrice)
          .then(response => response.json()) // Parsing the JSON response
          .then(data => {
            // Displaying the results in the 'results' div
            // Pre-condition: The response must be a valid JSON object.
            // Post-condition: The data is rendered in a readable format (pretty-printed JSON) in the 'results' div.
            document.getElementById('results').innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
          })
          .catch(error => {
            // Error handling
            // Pre-condition: An error or exception occurs during the fetch request or data processing.
            // Post-condition: Logs the error to the console.
            console.error('Error:', error);
          });
      }
    </script>`;
  res.send(queryPageHTML);
});

// Route to handle product creation
// Pre-condition: Valid product data provided through POST request.
// Post-condition: New product record added to the database.
app.post('/product', auth, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.send('Product added successfully');
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route for querying products by price
// Pre-condition: Price provided as a query parameter.
// Post-condition: Fetches and sends product records less than or equal to the given price.
app.get('/products', auth, async (req, res) => {
  try {
    const { maxPrice } = req.query;
    const products = await Product.find({ price: { $lte: maxPrice } }).sort('price');
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Starting the server
// Pre-condition: None
// Post-condition: Server starts and listens on the specified port.
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
