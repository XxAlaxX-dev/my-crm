// frontend/src/services/taskService.js
import axios from 'axios';

const API_URL = '/api/tasks/';

// Fetch all tasks
const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create new task
const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  return response.data;
};

// Update an existing task
const updateTask = async (taskId, taskData) => {
  const response = await axios.put(`${API_URL}${taskId}`, taskData);
  return response.data;
};

// Delete a task
const deleteTask = async (taskId) => {
  const response = await axios.delete(`${API_URL}${taskId}`);
  return response.data;
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
