// backend/routes/taskRoutes.js
const express = require('express');
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const { authenticate } = require('../middleware/authMiddleware');  // Assuming you have a middleware to authenticate users
const router = express.Router();

// Create new task
router.post('/', authenticate, createTask);

// Get all tasks
router.get('/', authenticate, getAllTasks);

// Get task by ID
router.get('/:id', authenticate, getTaskById);

// Update task
router.put('/:id', authenticate, updateTask);

// Delete task
router.delete('/:id', authenticate, deleteTask);

module.exports = router;
