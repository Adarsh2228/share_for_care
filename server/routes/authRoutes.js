const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, mobileNumber } = req.body;

  // Basic validation
  if (!name || !email || !mobileNumber) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Generate a unique login ID and random password
    const loginId = Math.random().toString(36).substr(2, 9);
    const password = Math.random().toString(36).substr(2, 9);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      mobileNumber,
      password: hashedPassword,
      loginId,
      ipAddress: req.ip,
    });

    await user.save();

    res.status(201).json({ message: 'Registration successful', loginId, password });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { emailOrLoginId, password } = req.body;

  // Basic validation
  if (!emailOrLoginId || !password) {
    return res.status(400).json({ error: 'Email/Login ID and password are required' });
  }

  try {
    const user = await User.findOne({
      $or: [{ email: emailOrLoginId }, { loginId: emailOrLoginId }],
    });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    user.lastLoginAt = new Date();
    user.ipAddress = req.ip;
    await user.save();

    res.json({ token, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;
