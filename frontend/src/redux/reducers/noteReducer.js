// frontend/src/redux/reducers/noteReducer.js
import { FETCH_NOTES_SUCCESS, FETCH_NOTES_FAILURE, CREATE_NOTE_SUCCESS, CREATE_NOTE_FAILURE } from '../types';

const initialState = {
  notes: [],
  error: null
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTES_SUCCESS:
      return {
        ...state,
        notes: action.payload,
        error: null
      };
    case FETCH_NOTES_FAILURE:
    case CREATE_NOTE_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case CREATE_NOTE_SUCCESS:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
        error: null
      };
    default:
      return state;
  }
};

export default noteReducer;
