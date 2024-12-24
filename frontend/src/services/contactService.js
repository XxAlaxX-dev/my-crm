import axios from "axios";

const API_URL = "http://localhost:4000/api/contacts";

const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.token : null;
};

const getAllContacts = async () => {
  const token = getAuthToken();
  if (!token) throw new Error("Unauthorized - No token found");
  
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  
  const response = await axios.get(API_URL, config);
  return response.data;
};

const createContact = async (contactData) => {
  const token = getAuthToken();
  if (!token) throw new Error("Unauthorized - No token found");
  
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  
  const response = await axios.post(API_URL, contactData, config);
  return response.data;
};

const deleteContactFromAPI = async (id) => {
  const token = getAuthToken();
  if (!token) throw new Error("Unauthorized - No token found");
  
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  
  const response = await axios.delete(`${API_URL}/${id}`, config); 
  return response.data;
};
const updateContact = async (id, contactData) => {
  const token = getAuthToken();
  if (!token) throw new Error("Unauthorized - No token found");
  
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  
  const response = await axios.put(`${API_URL}/${id}`, contactData, config);
  return response.data;
};



export { getAllContacts, createContact,deleteContactFromAPI,updateContact };
