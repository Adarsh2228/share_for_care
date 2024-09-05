const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  fileUrl: String,
  otp: String,
  type: { type: String, enum: ['text', 'other'] },
});

module.exports = mongoose.model('File', fileSchema);
