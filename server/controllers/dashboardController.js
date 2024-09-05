const User = require('../models/User');
const File = require('../models/File');
const otpUtils = require('../utils/otpUtils');
const shortid = require('shortid');
const url = require('url');
const fs = require('fs');
const path = require('path');
const { generateOTP, validateOTP } = otpUtils;

// Share a text file
exports.shareTextFile = async (req, res) => {
  const { text } = req.body;
  const otp = generateOTP();
  const fileUrl = `http://localhost:3000/files/${shortid.generate()}.txt`;

  try {
    const newFile = new File({
      userId: req.user._id,
      fileUrl,
      otp,
      type: 'text',
    });
    await newFile.save();

    // Save text to a file
    const filePath = path.join(__dirname, `../../public/files/${shortid.generate()}.txt`);
    fs.writeFileSync(filePath, text);

    res.json({ url: fileUrl, otp });
  } catch (err) {
    console.error('Error sharing text file:', err);
    res.status(500).json({ error: 'Error sharing text file' });
  }
};

// Share other types of files
exports.shareOtherFile = async (req, res) => {
  const otp = generateOTP();
  const file = req.file;
  const fileUrl = `http://localhost:3000/files/${shortid.generate()}_${file.originalname}`;

  try {
    const newFile = new File({
      userId: req.user._id,
      fileUrl,
      otp,
      type: 'other',
    });
    await newFile.save();

    // Move the file to the public directory
    const filePath = path.join(__dirname, `../../public/files/${shortid.generate()}_${file.originalname}`);
    fs.renameSync(file.path, filePath);

    res.json({ url: fileUrl, otp });
  } catch (err) {
    console.error('Error sharing file:', err);
    res.status(500).json({ error: 'Error sharing file' });
  }
};

// Initiate a video call
exports.initiateVideoCall = async (req, res) => {
  const { recipientId, meetingLink } = req.body;
  const otp = generateOTP();

  try {
    // Implement logic to send video call request to recipient
    // You might want to store this information in the database or send an email/notification

    res.json({ otp });
  } catch (err) {
    console.error('Error initiating video call:', err);
    res.status(500).json({ error: 'Error initiating video call' });
  }
};
