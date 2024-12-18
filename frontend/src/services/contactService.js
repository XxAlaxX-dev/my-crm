// frontend/src/services/contactService.js
import axios from 'axios';

const API_URL = '/api/contacts/';

// Fetch all contacts
const getContacts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create new contact
const createContact = async (contactData) => {
  const response = await axios.post(API_URL, contactData);
  return response.data;
};

// Update an existing contact
const updateContact = async (contactId, contactData) => {
  const response = await axios.put(`${API_URL}${contactId}`, contactData);
  return response.data;
};

// Delete a contact
const deleteContact = async (contactId) => {
  const response = await axios.delete(`${API_URL}${contactId}`);
  return response.data;
};

export default {
  getContacts,
  createContact,
  updateContact,
  deleteContact
};
