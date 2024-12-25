// frontend/src/redux/actions/userActions.js
import axios from 'axios';
import { FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, CREATE_USER_SUCCESS, CREATE_USER_FAILURE, DELETE_USER_SUCCESS, DELETE_USER_FAILURE, FETCH_USERS_REQUEST } from '../types';
import {getUsers} from "../../services/userService"
// Fetch users
// In your userActions.js
export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_USERS_REQUEST });
  try {
    const data = await getUsers();
    dispatch({ type: FETCH_USERS_SUCCESS, payload: data }); // Correct success type
  } catch (error) {
    dispatch({
      type: FETCH_USERS_FAILURE,
      payload: error.message,
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

// Delete a user
export const deleteUser = (userId) => async (dispatch) => {
  try {
    await axios.delete(`/api/users/${userId}`);
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: userId  // You can send the userId to remove the deleted user from the state
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAILURE,
      payload: error.response.data.message || 'Failed to delete user'
    });
  }
};
