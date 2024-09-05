// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobileNumber: String,
  password: String,
  loginId: { type: String, unique: true },
  lastLoginAt: Date,
  ipAddress: String,
});

module.exports = mongoose.model('User', userSchema);