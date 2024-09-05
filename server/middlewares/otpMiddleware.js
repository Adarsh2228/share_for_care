const File = require('../models/File');
const otpUtils = require('../utils/otpUtils');

module.exports = async (req, res, next) => {
  const { otp, fileUrl } = req.body;
  const file = await File.findOne({ fileUrl });

  if (!file) return res.status(404).json({ error: 'File not found' });

  if (file.otp !== otp) return res.status(400).json({ error: 'Invalid OTP' });

  next();
};
