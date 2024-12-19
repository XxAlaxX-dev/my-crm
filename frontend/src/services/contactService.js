import axios from 'axios';

const API_URL = 'http://localhost:4000/api/contacts/';

// Fetch all contacts
const getContacts = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
  });
  return response.data;
};

// Create new contact
const createContact = async (contactData, token) => {
  const response = await axios.post(API_URL, contactData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Include the token
    },
  });
  return response.data;
};

// Update an existing contact
const updateContact = async (contactId, contactData, token) => {
  const response = await axios.put(`${API_URL}${contactId}`, contactData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Include the token
    },
  });
  return response.data;
};

// Delete a contact
const deleteContact = async (contactId, token) => {
  const response = await axios.delete(`${API_URL}${contactId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Include the token
    },
  });
  return response.data;
};

export default {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
