// routes/files.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware'); // Import the authentication middleware

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Route to handle file uploads
router.post('/other', authenticateToken, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({ message: 'File uploaded successfully', fileUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` });
});

module.exports = router;