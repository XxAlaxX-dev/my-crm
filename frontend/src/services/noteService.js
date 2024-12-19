import axios from 'axios';

const API_URL = 'http://localhost:4000/api/notes/'; // Ensure the correct API base URL

// Fetch all notes
const getNotes = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch notes');
  }
};

// Create new note
const createNote = async (noteData, token) => {
  try {
    const response = await axios.post(API_URL, noteData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Failed to create note');
  }
};

// Update an existing note
const updateNote = async (noteId, noteData, token) => {
  try {
    const response = await axios.put(`${API_URL}${noteId}`, noteData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating note:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Failed to update note');
  }
};

// Delete a note
const deleteNote = async (noteId, token) => {
  try {
    const response = await axios.delete(`${API_URL}${noteId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting note:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Failed to delete note');
  }
};

export default {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
