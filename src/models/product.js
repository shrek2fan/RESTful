const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
