const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

router.get('/', controller.home);
router.get('/upload', controller.uploadForm);
router.get('/list', controller.listProducts);
router.get('/query', controller.queryPage);
router.post('/product', controller.createProduct);
router.get('/products', controller.queryProducts);

module.exports = router;
