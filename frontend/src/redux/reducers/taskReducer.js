// frontend/src/redux/reducers/taskReducer.js
import { FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE } from '../types';

const initialState = {
  tasks: [],
  error: null
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        error: null
      };
    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default taskReducer;
