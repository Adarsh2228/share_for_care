const crypto = require('crypto');

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const validateOTP = (inputOtp, storedOtp) => {
  return inputOtp === storedOtp;
};

module.exports = { generateOTP, validateOTP };
