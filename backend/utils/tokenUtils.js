// backend/utils/tokenUtils.js
const jwt = require('jsonwebtoken');

// Function to generate JWT
const generateToken = (userId) => {
  // Create a token with the userId as the payload and set expiration time
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Function to verify JWT
const verifyToken = (token) => {
  try {
    // Verify the token using the secret key from the environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;  // Return the decoded token if valid
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

// Optionally, you can also extract the user from a token
const extractUserFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;  // Return the user ID or any relevant data from the token
  } catch (error) {
    throw new Error('Failed to extract user from token');
  }
};

module.exports = { generateToken, verifyToken, extractUserFromToken };
