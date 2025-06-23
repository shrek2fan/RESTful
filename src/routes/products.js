const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

router.get('/', controller.home);
router.get('/upload', controller.uploadForm);
router.get('/list', auth, controller.listProducts);
router.get('/query', controller.queryPage);
router.post('/product', auth, controller.createProduct);
router.get('/products', auth, controller.queryProducts);

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secretkey');
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
