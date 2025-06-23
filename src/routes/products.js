const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const { productValidationRules, validate } = require('../middleware/validation');

router.get('/', controller.home);
router.get('/upload', controller.uploadForm);
router.get('/list', controller.listProducts);
router.get('/query', controller.queryPage);
router.post('/product', productValidationRules, validate, controller.createProduct);
router.get('/products', controller.queryProducts);

module.exports = router;
