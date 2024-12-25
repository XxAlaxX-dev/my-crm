import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api"; // Replace with your API URL

// Function to get the authentication token from localStorage
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.token : null;
};

// Common Axios configuration with Authorization header
const getConfig = () => {
  const token = getAuthToken();
  if (!token) throw new Error("Unauthorized - No token found");

  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// Fetch all contacts with proper authorization
export const getContacts = async () => {
  try {
    const config = getConfig();
    const response = await axios.get(`${API_BASE_URL}/contacts`, config);
    return response.data;
  } catch (error) {
    // Handle error with meaningful message
    const message = error.response?.data?.message || error.message;
    throw new Error(`Failed to fetch contacts: ${message}`);
  }
};

// Fetch all users with proper authorization
export const getUsers = async () => {
  try {
    const config = getConfig();
    const response = await axios.get(`${API_BASE_URL}/users`, config);
    return response.data;
  } catch (error) {
    // Handle error with meaningful message
    const message = error.response?.data?.message || error.message;
    throw new Error(`Failed to fetch users: ${message}`);
  }
};
