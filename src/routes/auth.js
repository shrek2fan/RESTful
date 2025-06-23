const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Simple demo login with hardcoded credentials
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
