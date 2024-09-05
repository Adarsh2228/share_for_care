const express = require('express');
const multer = require('multer');
const { shareTextFile, shareOtherFile, initiateVideoCall } = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');
const otpMiddleware = require('../middlewares/otpMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// File sharing routes
router.post('/files/text', authMiddleware, shareTextFile);
router.post('/files/other', authMiddleware, upload.single('file'), shareOtherFile);

// Video call route
router.post('/video-call', authMiddleware, initiateVideoCall);

// OTP verification route
router.post('/verify-otp/:type', otpMiddleware, (req, res) => {
  res.status(200).send('OTP verified');
});

module.exports = router;
