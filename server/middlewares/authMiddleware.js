const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).exec();
    if (!req.user) return res.status(404).json({ error: 'User not found' });
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token', details: err.message });
  }
};

module.exports = authenticateToken;
