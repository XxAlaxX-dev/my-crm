import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import contactReducer from "./reducers/contactReducer";
import taskReducer from "./reducers/taskReducer";

const store = configureStore({
  reducer: {
    contacts: contactReducer,
    tasks: taskReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
