import { getAllContacts, createContact as createContactAPI, deleteContactFromAPI,updateContact as updateContactFromAPI } from "../../services/contactService";
import {
  FETCH_CONTACTS_REQUEST,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_FAILURE,
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAILURE,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAILURE,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_FAILURE
} from "../types";

export const fetchContacts = () => async (dispatch) => {
  dispatch({ type: FETCH_CONTACTS_REQUEST });
  try {
    const data = await getAllContacts();
    dispatch({ type: FETCH_CONTACTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_CONTACTS_FAILURE,
      payload: error.message,
    });
  }
};

export const createContact = (contactData) => async (dispatch) => {
  try {
    const newContact = await createContactAPI(contactData);
    dispatch({ type: CREATE_CONTACT_SUCCESS, payload: newContact });
    dispatch(fetchContacts()); // Refresh the list after creating
    return newContact; // Return for handling in the component
  } catch (error) {
    dispatch({
      type: CREATE_CONTACT_FAILURE,
      payload: error.message,
    });
    throw error; // Rethrow for error handling in component
  }
};

export const deleteContact = (id) => async (dispatch) => {
  try {
    await deleteContactFromAPI(id);
    dispatch({
      type: DELETE_CONTACT_SUCCESS,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: DELETE_CONTACT_FAILURE,
      payload: error.message
    });
  }
};
// Action to update a contact
export const updateContact = (contactId, contactData) => async (dispatch) => {
  try {
    const updatedContact = await updateContactFromAPI(contactId, contactData); // Use the updateContact from services
    dispatch({ type: UPDATE_CONTACT_SUCCESS, payload: updatedContact });
  } catch (error) {
    dispatch({
      type: UPDATE_CONTACT_FAILURE,
      payload: error.message
    });
  }
};
