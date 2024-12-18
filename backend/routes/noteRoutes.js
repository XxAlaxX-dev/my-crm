// backend/routes/noteRoutes.js
const express = require('express');
const { createNote, getAllNotes, getNoteById, deleteNote } = require('../controllers/noteController');
const { authenticate } = require('../middleware/authMiddleware');  // Assuming you have a middleware to authenticate users
const router = express.Router();

// Create new note
router.post('/', authenticate, createNote);

// Get all notes
router.get('/', authenticate, getAllNotes);

// Get note by ID
router.get('/:id', authenticate, getNoteById);

// Delete note
router.delete('/:id', authenticate, deleteNote);

module.exports = router;
