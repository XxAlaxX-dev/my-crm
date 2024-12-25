import { FETCH_CONTACTS_REQUEST, FETCH_CONTACTS_SUCCESS, FETCH_CONTACTS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from "../types";
import { getContacts, getUsers } from "../../services/otherService";

// Fetch contacts
export const fetchContacts = () => async (dispatch) => {
  dispatch({ type: FETCH_CONTACTS_REQUEST });
  try {
    const contacts = await getContacts(); // Fetch contacts from the API
    dispatch({ type: FETCH_CONTACTS_SUCCESS, payload: contacts });
  } catch (error) {
    dispatch({
      type: FETCH_CONTACTS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Fetch users
export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_USERS_REQUEST });
  try {
    const users = await getUsers(); // Fetch users from the API
    dispatch({ type: FETCH_USERS_SUCCESS, payload: users });
  } catch (error) {
    dispatch({
      type: FETCH_USERS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
