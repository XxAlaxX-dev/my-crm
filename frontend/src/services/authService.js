import axios from 'axios';

const API_URL = 'http://localhost:4000/api/auth/';

// Login service
const login = async (email, password) => {
  try {
    
    const response = await axios.post(`${API_URL}login`, { email, password }, { headers: { 'Content-Type': 'application/json' } });
      
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } else {
      throw new Error("Token is missing in the response");
    }
  } catch (error) {
    if (error.response) {
      console.error("Error during login:", error.response.data);
      throw new Error(error.response.data.message || "An error occurred during login");
    } else if (error.request) {
      console.error("No response from server");
      throw new Error("No response from server");
    } else {
      console.error("Error:", error.message);
      throw new Error("An unexpected error occurred");
    }
  }
};


// Register service
const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}register`, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error during registration:', error.response.data.message || error.response.statusText);
      throw new Error(error.response.data.message || 'An error occurred during registration');
    } else if (error.request) {
      console.error('No response from server');
      throw new Error('No response from server');
    } else {
      console.error('Error', error.message);
      throw new Error('An unexpected error occurred');
    }
  }
};

// Logout service
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

// Get current user service (from local storage)
const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export default {
  login,
  register,
  logout,
  getCurrentUser
};
