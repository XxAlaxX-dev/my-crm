import axios from 'axios';

// API URL
const API_URL = "http://localhost:4000/api/users";

// Function to retrieve auth token from local storage
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.token : null;
};

// Function to get the config for the request, including Authorization header
const getConfig = () => {
  const token = getAuthToken();
  if (!token) throw new Error("Unauthorized - No token found");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch all users
export const getUsers = async () => {
  try {
    const config = getConfig();
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Re-throw the error after logging it
  }
};

// Create new user
export const createUser = async (userData) => {
  try {
    const config = getConfig();
    const response = await axios.post(API_URL, userData, config);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update an existing user
export const updateUser = async (userId, userData) => {
  try {
    const config = getConfig();
    const response = await axios.put(`${API_URL}/${userId}`, userData, config);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (userId) => {
  try {
    const config = getConfig();
    const response = await axios.delete(`${API_URL}/${userId}`, config);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export default {
 
  createUser,
  updateUser,
  deleteUser,
};
