import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  FETCH_USERS_REQUEST
} from "../types";

const initialState = {
  users: [],
  error: null,
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_USERS_FAILURE:
    case CREATE_USER_FAILURE:
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [action.payload, ...state.users],
        loading: false,
        error: null,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default userReducer;
