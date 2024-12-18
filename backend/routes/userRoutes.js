// backend/routes/userRoutes.js
const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');  // Assuming you have a middleware to authenticate users
const router = express.Router();

// Get user profile (authenticated user)
router.get('/profile', authenticate, getUserProfile);

// Update user profile (authenticated user)
router.put('/profile', authenticate, updateUserProfile);

module.exports = router;
