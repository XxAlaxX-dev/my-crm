const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
} = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Get authenticated user profile
router.get('/profile', authenticate, getUserProfile);

// Get all users (Admin only)
router.get('/', authenticate, authorize(['Admin']), getAllUsers);

// Update user profile (Authenticated user)
router.put('/profile', authenticate, updateUserProfile);

// Delete a user (Admin only)
router.delete('/:id', authenticate, authorize(['Admin']), deleteUser);

module.exports = router;
