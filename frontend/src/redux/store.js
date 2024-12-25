import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import contactReducer from "./reducers/contactReducer";
import taskReducer from "./reducers/taskReducer";
import { otherReducer } from "./reducers/otherReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    contacts: contactReducer,
    tasks: taskReducer,
    others: otherReducer,
    users:userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
