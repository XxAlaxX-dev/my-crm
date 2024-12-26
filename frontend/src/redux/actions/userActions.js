import axios from 'axios';
import { FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, CREATE_USER_SUCCESS, CREATE_USER_FAILURE, DELETE_USER_SUCCESS, DELETE_USER_FAILURE, FETCH_USERS_REQUEST, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE } from '../types';
import { getUsers,deleteUser as DeleteFromApi } from "../../services/userService";



// Fetch users
export const fetchUsers = () => async (dispatch) => {

  dispatch({ type: FETCH_USERS_REQUEST });
  try {
    const data = await getUsers();
    dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_USERS_FAILURE,
      payload: error.message,
    });
  }
};
export const fetchUser = () => async (dispatch) => {

  dispatch({ type: FETCH_USERS_REQUEST });
  try {
    const data = await getUserProfile();
    dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
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


export const deleteUser = (id) => async (dispatch) => {
  try {
    await DeleteFromApi(id);
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAILURE,
      payload: error.message
    });
  }
};
// Update user details action
export const updateUser = (id, userData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });  // Dispatch the request action type
  try {
    const response = await axios.put(`/api/users/${id}`, userData);
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: response.data,
    });
    toast.success('User updated successfully!');
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAILURE,
      payload: error.message,
    });
    toast.error('Failed to update user');
  }
};
