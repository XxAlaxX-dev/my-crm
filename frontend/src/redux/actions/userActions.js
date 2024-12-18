// frontend/src/redux/actions/userActions.js
import axios from 'axios';
import { FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, CREATE_USER_SUCCESS, CREATE_USER_FAILURE } from '../types';

// Fetch users
export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/users');
    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: FETCH_USERS_FAILURE,
      payload: error.response.data.message || 'Failed to fetch users'
    });
  }
};

// Create a new user
export const createUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('/api/users', userData);
    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: CREATE_USER_FAILURE,
      payload: error.response.data.message || 'Failed to create user'
    });
  }
};
