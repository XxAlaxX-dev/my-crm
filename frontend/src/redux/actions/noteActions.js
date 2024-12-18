// frontend/src/redux/actions/noteActions.js
import axios from 'axios';
import { FETCH_NOTES_SUCCESS, FETCH_NOTES_FAILURE, CREATE_NOTE_SUCCESS, CREATE_NOTE_FAILURE } from '../types';

// Fetch notes
export const fetchNotes = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/notes');
    dispatch({
      type: FETCH_NOTES_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: FETCH_NOTES_FAILURE,
      payload: error.response.data.message || 'Failed to fetch notes'
    });
  }
};

// Create a new note
export const createNote = (noteData) => async (dispatch) => {
  try {
    const response = await axios.post('/api/notes', noteData);
    dispatch({
      type: CREATE_NOTE_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: CREATE_NOTE_FAILURE,
      payload: error.response.data.message || 'Failed to create note'
    });
  }
};
