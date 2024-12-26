const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  uploadUserProfileImage,
   // Import the new controller function
} = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const upload = require('../utils/upload'); // Import the Multer middleware for file uploads

const router = express.Router();

// Get authenticated user profile
router.get('/profile/:id', getUserProfile);

// Get all users (Admin only)
router.get('/', authenticate, getAllUsers); // Admin-only route

// Update user profile (Authenticated user)
router.put('/:id', authenticate, updateUserProfile);

// Delete a user (Admin only)
router.delete('/:id', authenticate, authorize('Admin'), deleteUser);

// Upload user profile image
router.put('/upload/:id', upload.single('image'), uploadUserProfileImage); // Upload user profile image

module.exports = router;
