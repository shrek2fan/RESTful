const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const { validateProduct } = require('../middlewares/validation');
const authenticateToken = require('../middlewares/auth');

router.get('/', controller.home);
router.get('/upload', controller.uploadForm);
router.get('/list', authenticateToken, controller.listProducts);
router.get('/query', controller.queryPage);
router.post('/product', authenticateToken, validateProduct, controller.createProduct);
router.get('/products', authenticateToken, controller.queryProducts);

module.exports = router;
