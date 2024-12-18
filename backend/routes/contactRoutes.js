// backend/routes/contactRoutes.js
const express = require('express');
const { createContact, getAllContacts, getContactById, updateContact, deleteContact } = require('../controllers/contactController');
const { authenticate } = require('../middleware/authMiddleware');  // Assuming you have a middleware to authenticate users
const router = express.Router();

// Create new contact
router.post('/', authenticate, createContact);

// Get all contacts
router.get('/', authenticate, getAllContacts);

// Get contact by ID
router.get('/:id', authenticate, getContactById);

// Update contact
router.put('/:id', authenticate, updateContact);

// Delete contact
router.delete('/:id', authenticate, deleteContact);

module.exports = router;
