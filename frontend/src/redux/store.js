// frontend/src/redux/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // For handling asynchronous actions
import authReducer from './reducers/authReducer';
import contactReducer from './reducers/contactReducer';
import taskReducer from './reducers/taskReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  contacts: contactReducer,
  tasks: taskReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
