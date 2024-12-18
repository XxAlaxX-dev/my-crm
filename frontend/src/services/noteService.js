// frontend/src/services/noteService.js
import axios from 'axios';

const API_URL = '/api/notes/';

// Fetch all notes
const getNotes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create new note
const createNote = async (noteData) => {
  const response = await axios.post(API_URL, noteData);
  return response.data;
};

// Update an existing note
const updateNote = async (noteId, noteData) => {
  const response = await axios.put(`${API_URL}${noteId}`, noteData);
  return response.data;
};

// Delete a note
const deleteNote = async (noteId) => {
  const response = await axios.delete(`${API_URL}${noteId}`);
  return response.data;
};

export default {
  getNotes,
  createNote,
  updateNote,
  deleteNote
};
