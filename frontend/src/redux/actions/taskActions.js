// frontend/src/redux/actions/taskActions.js
import axios from 'axios';
import { FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE, CREATE_TASK_SUCCESS, CREATE_TASK_FAILURE, UPDATE_TASK_SUCCESS, DELETE_TASK_SUCCESS } from '../types';

// Fetch tasks
export const fetchTasks = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/tasks');
    dispatch({
      type: FETCH_TASKS_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: FETCH_TASKS_FAILURE,
      payload: error.response.data.message || 'Failed to fetch tasks'
    });
  }
};

// Create a new task
export const createTask = (taskData) => async (dispatch) => {
  try {
    const response = await axios.post('/api/tasks', taskData);
    dispatch({
      type: CREATE_TASK_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: CREATE_TASK_FAILURE,
      payload: error.response.data.message || 'Failed to create task'
    });
  }
};

// Update a task
export const updateTask = (taskId, taskData) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/tasks/${taskId}`, taskData);
    dispatch({
      type: UPDATE_TASK_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: CREATE_TASK_FAILURE,
      payload: error.response.data.message || 'Failed to update task'
    });
  }
};

// Delete a task
export const deleteTask = (taskId) => async (dispatch) => {
  try {
    await axios.delete(`/api/tasks/${taskId}`);
    dispatch({
      type: DELETE_TASK_SUCCESS,
      payload: taskId
    });
  } catch (error) {
    dispatch({
      type: CREATE_TASK_FAILURE,
      payload: error.response.data.message || 'Failed to delete task'
    });
  }
};
