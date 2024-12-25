import { 
  FETCH_TASKS_REQUEST, 
  FETCH_TASKS_SUCCESS, 
  FETCH_TASKS_FAILURE, 
  CREATE_TASK_SUCCESS, 
  DELETE_TASK_SUCCESS, 
  UPDATE_TASK_SUCCESS 
} from "../types";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload,
        error: null,
      };

    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        error: null,
      };

      case DELETE_TASK_SUCCESS:
        return {
          ...state,
          tasks: state.tasks.filter((task) => task._id !== action.payload), // Remove the task from state
          error: null,
        };
      case UPDATE_TASK_SUCCESS:
        return {
          ...state,
          tasks: state.tasks.map((task) =>
            task._id === action.payload._id ? action.payload : task
          ),
          error: null,
        };
      
    default:
      return state;
  }
};

export default taskReducer;
