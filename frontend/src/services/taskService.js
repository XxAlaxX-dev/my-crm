import axios from "axios";

const API_URL = "http://localhost:4000/api/tasks";

const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.token : null;
};

export const getAllTasks = async () => {
  const token = getAuthToken();
  if (!token) throw new Error("Unauthorized - No token found");
  
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  
  const response = await axios.get(API_URL, config);
  return response.data;
};

export const createTask = async (taskData) => {
  const token = getAuthToken();
  if (!token) throw new Error("Unauthorized - No token found");
  
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  
  const response = await axios.post(API_URL, taskData, config);
  return response.data;
};

export const deleteTaskFromAPI = async (id) => {
  const token = getAuthToken();
  if (!token) throw new Error("Unauthorized - No token found");
  
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  
  const response = await axios.delete(`${API_URL}/${id}`, config); 
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const token = getAuthToken();
  if (!token) throw new Error("Unauthorized - No token found");
  
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  
  const response = await axios.put(`${API_URL}/${id}`, taskData, config);
  return response.data;
};
