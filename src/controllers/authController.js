const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Simple demo check - replace with real user validation
  if (username && password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h'
    });
    return res.json({ token });
  }

  res.status(401).json({ error: 'Invalid credentials' });
};
