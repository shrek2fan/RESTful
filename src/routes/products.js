const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const { validateProduct } = require('../middlewares/validation');

router.get('/', controller.home);
router.get('/upload', controller.uploadForm);
router.get('/list', controller.listProducts);
router.get('/query', controller.queryPage);
router.post('/product', validateProduct, controller.createProduct);
router.get('/products', controller.queryProducts);

module.exports = router;
