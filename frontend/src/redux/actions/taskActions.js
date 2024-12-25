import { 
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
} from "../types";
import { getAllTasks, createTask, updateTask, deleteTaskFromAPI } from "../../services/taskService";

// Fetch tasks
export const fetchTasks = () => async (dispatch) => {
  dispatch({ type: FETCH_TASKS_REQUEST });
  try {
    const tasks = await getAllTasks();
    dispatch({ type: FETCH_TASKS_SUCCESS, payload: tasks });
  } catch (error) {
    dispatch({ type: FETCH_TASKS_FAILURE, payload: error.message });
  }
};

// Create task
export const createNewTask = (taskData) => async (dispatch) => {
  try {
    const newTask = await createTask(taskData);
    dispatch({ type: CREATE_TASK_SUCCESS, payload: newTask });
  } catch (error) {
    dispatch({ type: FETCH_TASKS_FAILURE, payload: error.message });
  }
};

// Delete task


export const deleteTask = (id) => async (dispatch) => {
  try {
    await deleteTaskFromAPI(id); // Call the service method
    dispatch({ type: DELETE_TASK_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: FETCH_TASKS_FAILURE, payload: error.response?.data?.message || error.message });
  }
};


// Update task
export const updateTaskDetails = (id, taskData) => async (dispatch) => {
  try {
    const updatedTask = await updateTask(id, taskData); // Call the service method
    dispatch({ type: UPDATE_TASK_SUCCESS, payload: updatedTask });
  } catch (error) {
    dispatch({ type: FETCH_TASKS_FAILURE, payload: error.response?.data?.message || error.message });
  }
};
