// frontend/src/redux/reducers/contactReducer.js
import { FETCH_CONTACTS_SUCCESS, FETCH_CONTACTS_FAILURE } from '../types';

const initialState = {
  contacts: [],
  error: null
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.payload,
        error: null
      };
    case FETCH_CONTACTS_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default contactReducer;
