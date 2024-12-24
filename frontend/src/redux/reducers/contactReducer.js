import { 
  FETCH_CONTACTS_REQUEST, 
  FETCH_CONTACTS_SUCCESS, 
  FETCH_CONTACTS_FAILURE, 
  CREATE_CONTACT_SUCCESS, 
  DELETE_CONTACT_SUCCESS,
  UPDATE_CONTACT_SUCCESS, 
} from "../types";

const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTACTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    
    case FETCH_CONTACTS_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: action.payload,
        error: null,
      };
    
    case FETCH_CONTACTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    
    case CREATE_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        error: null,
      };
    
    case DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact._id !== action.payload),
      };
      case UPDATE_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact._id === action.payload._id ? action.payload : contact
        ),
      };
    
    default:
      return state;
  }
};

export default contactReducer;