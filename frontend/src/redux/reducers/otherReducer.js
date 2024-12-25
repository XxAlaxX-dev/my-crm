import {
    FETCH_CONTACTS_REQUEST,
    FETCH_CONTACTS_SUCCESS,
    FETCH_CONTACTS_FAILURE,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
  } from "../types";
  
  const initialState = {
    contacts: [],
    users: [],
    loading: false,
    error: null,
  };
  
  export const otherReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CONTACTS_REQUEST:
      case FETCH_USERS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_CONTACTS_SUCCESS:
        return { ...state, loading: false, contacts: action.payload };
      case FETCH_USERS_SUCCESS:
        return { ...state, loading: false, users: action.payload };
      case FETCH_CONTACTS_FAILURE:
      case FETCH_USERS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  