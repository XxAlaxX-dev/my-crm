// frontend/src/redux/reducers/authReducer.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../types';

const initialState = {
  token: localStorage.getItem('token') || '',
  isAuthenticated: !!localStorage.getItem('token'),
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: '',
        isAuthenticated: false,
        error: null
      };
    default:
      return state;
  }
};

export default authReducer;
