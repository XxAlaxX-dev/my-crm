// backend/controllers/taskController.js
const Task = require('../models/Task');

// Create new task
const createTask = async (req, res) => {
  const { title, description, dueDate, contact, assignedTo } = req.body;

  try {
    const newTask = new Task({ title, description, dueDate, contact, assignedTo });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'name').populate('contact', 'firstName lastName');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get task by ID
const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id).populate('assignedTo', 'name').populate('contact', 'firstName lastName');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, completed } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (dueDate) task.dueDate = dueDate;
    if (completed !== undefined) task.completed = completed;

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createTask, getAllTasks, getTaskById, updateTask,deleteTask};
