// frontend/src/services/authService.js
import axios from 'axios';

const API_URL = '/api/auth/';

// Login service
const login = async (email, password) => {
  const response = await axios.post(`${API_URL}login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data)); // Save user and token in local storage
  }
  return response.data;
};

// Register service
const register = async (userData) => {
  const response = await axios.post(`${API_URL}register`, userData);
  return response.data;
};

// Logout service
const logout = () => {
  localStorage.removeItem('user'); // Remove user and token from local storage
};

// Get current user service (from local storage)
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  login,
  register,
  logout,
  getCurrentUser
};
