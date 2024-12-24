import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import contactReducer from "./reducers/contactReducer";

const store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
