const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./src/routes/products');

const app = express();
app.use(bodyParser.json());
app.use('/', productRoutes);

module.exports = app;
