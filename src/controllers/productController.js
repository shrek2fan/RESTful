const Product = require('../models/product');

exports.home = (req, res) => {
  res.send('Hello World!');
};

exports.uploadForm = (req, res) => {
  res.send('<form action="/product" method="post">' +
           '<input type="text" name="name" placeholder="Name">' +
           '<input type="number" name="price" placeholder="Price">' +
           '<input type="text" name="category" placeholder="Category">' +
           '<button type="submit">Submit</button></form>');
};

exports.listProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.queryPage = (req, res) => {
  const queryPageHTML = `
    <form id="queryForm">
      <input type="number" name="maxPrice" placeholder="Max Price">
      <button type="button" onclick="queryProducts()">Query</button>
    </form>
    <div id="results"></div>
    <script>
      function queryProducts() {
        const maxPrice = document.querySelector('input[name="maxPrice"]').value;
        fetch('/products?maxPrice=' + maxPrice)
          .then(response => response.json())
          .then(data => {
            document.getElementById('results').innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
          })
          .catch(error => console.error('Error:', error));
      }
    </script>`;
  res.send(queryPageHTML);
};

exports.createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.send('Product added successfully');
  } catch (error) {
    next(error);
  }
};

exports.queryProducts = async (req, res, next) => {
  try {
    const { maxPrice } = req.query;
    const products = await Product.find({ price: { $lte: maxPrice } }).sort('price');
    res.json(products);
  } catch (error) {
    next(error);
  }
};
