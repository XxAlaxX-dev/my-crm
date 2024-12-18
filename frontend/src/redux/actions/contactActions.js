// frontend/src/redux/actions/contactActions.js
import axios from 'axios';
import { FETCH_CONTACTS_SUCCESS, FETCH_CONTACTS_FAILURE } from '../types';

export const fetchContacts = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/contacts');
    dispatch({
      type: FETCH_CONTACTS_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: FETCH_CONTACTS_FAILURE,
      payload: error.response.data.message || 'Failed to fetch contacts'
    });
  }
};
