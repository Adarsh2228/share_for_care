const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const shortid = require('shortid');
const bodyParser = require('body-parser');
const fs = require('fs');
require('dotenv').config();
const os = require('os');

const app = express();

app.use(cors());
app.use(express.json()); // To parse JSON requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Function to get the server's IP address
const getServerIPAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address; // Return the external IP address
      }
    }
  }
  return 'localhost'; // Fallback if no external IP is found
};

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${shortid.generate()}${path.extname(file.originalname)}`;
    cb(null, uniqueName); // Save the file with a unique name
  }
});

const upload = multer({ storage: storage });

// MongoDB schema and model for URLs and OTPs
const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  otp: Number // Store the generated OTP
});

const Url = mongoose.model('Url', urlSchema);

// Generate OTP (6 digits)
const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

// File upload route for other files (images, documents, etc.)
app.post('/api/files/other', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const ip = getServerIPAddress();
  const port = process.env.PORT || 5000;
  
  // Generate a short ID for the URL and an OTP
  const shortUrlId = shortid.generate().slice(0, 8);
  const otp = generateOtp();

  // Construct the original and short URLs
  const originalUrl = `http://${ip}:${port}/uploads/${req.file.filename}`;
  const shortUrl = `http://${ip}:${port}/${shortUrlId}`;

  // Save the original URL, short URL, and OTP in the database
  const newUrl = new Url({
    originalUrl,
    shortUrl: shortUrlId,
    otp: otp
  });

  await newUrl.save();

  // Return the short URL and OTP to the user
  res.json({ shortUrl, otp });
});

// New route to handle text file uploads
app.post('/api/files/text', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  const ip = getServerIPAddress();
  const port = process.env.PORT || 5000;

  // Save text to a file
  const textFileName = `${Date.now()}-${shortid.generate()}.txt`;
  const textFilePath = path.join(__dirname, 'uploads', textFileName);
  fs.writeFileSync(textFilePath, text);

  // Generate a short ID for the text URL and an OTP
  const shortUrlId = shortid.generate().slice(0, 8);
  const otp = generateOtp();

  // Construct the original and short URLs
  const originalUrl = `http://${ip}:${port}/uploads/${textFileName}`;
  const shortUrl = `http://${ip}:${port}/${shortUrlId}`;

  // Save the original URL, short URL, and OTP in the database
  const newUrl = new Url({
    originalUrl,
    shortUrl: shortUrlId,
    otp: otp
  });

  await newUrl.save();

  // Return the short URL and OTP to the user
  res.json({ url: shortUrl, otp });
});

// Serve the OTP input form when user visits the short URL
app.get('/:shortUrlId', async (req, res) => {
  const shortUrlId = req.params.shortUrlId;

  // Find the entry with the short URL ID
  const urlEntry = await Url.findOne({ shortUrl: shortUrlId });

  if (urlEntry) {
    // Serve a simple HTML form for OTP input
    res.send(`
      <html>
        <body>
          <h1>Enter OTP</h1>
          <form action="/verify-otp" method="POST">
            <input type="hidden" name="shortUrlId" value="${shortUrlId}" />
            <label for="otp">OTP:</label>
            <input type="text" id="otp" name="otp" required />
            <button type="submit">Verify OTP</button>
          </form>
        </body>
      </html>
    `);
  } else {
    res.status(404).json({ error: 'URL not found' });
  }
});

// Route to handle OTP verification
app.post('/verify-otp', async (req, res) => {
  const { shortUrlId, otp } = req.body;

  // Find the original URL based on the short URL ID and verify OTP
  const urlEntry = await Url.findOne({ shortUrl: shortUrlId });

  if (urlEntry && urlEntry.otp === parseInt(otp)) {
    // If OTP is correct, redirect to the original URL
    res.redirect(urlEntry.originalUrl);
  } else {
    res.status(401).send('<h1>Invalid OTP</h1><a href="javascript:history.back()">Go Back</a>');
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
