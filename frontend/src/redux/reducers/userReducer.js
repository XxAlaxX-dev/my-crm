// frontend/src/redux/reducers/userReducer.js
import { FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, CREATE_USER_SUCCESS, CREATE_USER_FAILURE } from '../types';

const initialState = {
  users: [],
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        error: null
      };
    case FETCH_USERS_FAILURE:
    case CREATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [action.payload, ...state.users],
        error: null
      };
    default:
      return state;
  }
};

export default userReducer;
