// frontend/src/services/userService.js
import axios from 'axios';

const API_URL = '/api/users/';

// Fetch all users
const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create new user
const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

// Update an existing user
const updateUser = async (userId, userData) => {
  const response = await axios.put(`${API_URL}${userId}`, userData);
  return response.data;
};

// Delete a user
const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}${userId}`);
  return response.data;
};

export default {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
