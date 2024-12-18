// frontend/src/redux/actions/authActions.js
import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../types';

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/login', { email, password });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data.token
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response.data.message || 'Login failed'
    });
  }
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};
