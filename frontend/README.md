# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


crm-mern/
├── backend/
│   ├── config/
│   │   ├── db.js              # Database connection
│   │   ├── dotenv.config.js   # Environment variable configuration
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   ├── userController.js  # User-related logic
│   │   ├── contactController.js # Contacts management
│   │   ├── taskController.js  # Tasks handling
│   │   ├── noteController.js  # Notes management
│   ├── middleware/
│   │   ├── authMiddleware.js  # Authentication middleware
│   │   ├── errorMiddleware.js # Error handling middleware
│   ├── models/
│   │   ├── User.js            # User model
│   │   ├── Contact.js         # Contact model
│   │   ├── Task.js            # Task model
│   │   ├── Note.js            # Note model
│   │   ├── Meeting.js         # Meeting model
│   ├── routes/
│   │   ├── authRoutes.js      # Authentication routes
│   │   ├── userRoutes.js      # User routes
│   │   ├── contactRoutes.js   # Contact routes
│   │   ├── taskRoutes.js      # Task routes
│   │   ├── noteRoutes.js      # Note routes
│   ├── utils/
│   │   ├── tokenUtils.js      # Token generation and validation
│   │   ├── emailUtils.js      # Email-related utilities
│   ├── .env                   # Environment variables
│   ├── server.js              # Entry point for the backend
│   ├── package.json
│
├── frontend/
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── assets/            # Images, icons, etc.
│   │   ├── components/
│   │   │   ├── Auth/          # Login, Register forms
│   │   │   ├── Dashboard/     # Main dashboard components
│   │   │   ├── Contacts/      # Contact components
│   │   │   ├── Tasks/         # Task components
│   │   │   ├── Notes/         # Note components
│   │   ├── contexts/          # React context for state management
│   │   ├── hooks/             # Custom React hooks
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Contacts.js
│   │   │   ├── Tasks.js
│   │   │   ├── Notes.js
│   │   ├── redux/
│   │   │   ├── actions/       # Redux action creators
│   │   │   ├── reducers/      # Redux reducers
│   │   │   ├── store.js       # Redux store
│   │   ├── services/          # API services
│   │   │   ├── authService.js # Authentication services
│   │   │   ├── contactService.js # Contacts services
│   │   │   ├── taskService.js # Tasks services
│   │   ├── utils/             # Helper functions
│   │   ├── App.js             # Main React app
│   │   ├── main.jsx           # React entry point
│   ├── .env                   # Environment variables
│   ├── tailwind.config.js     # TailwindCSS configuration
│   ├── vite.config.js         # Vite configuration
│   ├── package.json
│
├── README.md















import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchContacts, deleteContact } from "../../redux/actions/contactActions";
import { Link, useNavigate } from "react-router-dom";

const ContactList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contacts = [], loading, error } = useSelector((state) => state.contacts);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleRowClick = (contact) => {
    setSelectedContact(contact);
    navigate(`/update-contact/${contact._id}`);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await dispatch(deleteContact(id));
        alert("Contact deleted successfully!");
        dispatch(fetchContacts()); // Refresh contacts after deletion
      } catch (error) {
        console.error("Error deleting contact:", error.message);
        alert("Failed to delete contact: " + error.message);
      }
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const firstName = (contact.firstName || "").toLowerCase();
    const lastName = (contact.lastName || "").toLowerCase();
    const email = (contact.email || "").toLowerCase();

    return (
      firstName.includes(filters.firstName.toLowerCase()) &&
      lastName.includes(filters.lastName.toLowerCase()) &&
      email.includes(filters.email.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 font-semibold text-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact List</h2>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          name="firstName"
          value={filters.firstName}
          onChange={handleFilterChange}
          placeholder="Filter by First Name"
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          name="lastName"
          value={filters.lastName}
          onChange={handleFilterChange}
          placeholder="Filter by Last Name"
          className="border p-2 rounded-md"
        />
        <input
          type="email"
          name="email"
          value={filters.email}
          onChange={handleFilterChange}
          placeholder="Filter by Email"
          className="border p-2 rounded-md"
        />
      </div>

      {filteredContacts.length === 0 ? (
        <p className="text-center text-gray-600">No contacts available.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200 text-sm text-left text-gray-700">
              <tr>
                <th className="py-3 px-6">First Name</th>
                <th className="py-3 px-6">Last Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr
                  key={contact._id}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(contact)}
                >
                  <td className="py-4 px-6">{contact.firstName}</td>
                  <td className="py-4 px-6">{contact.lastName}</td>
                  <td className="py-4 px-6">{contact.email}</td>
                  <td className="py-4 px-6">
                    <Link
                      to={`/update-contact/${contact._id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </Link>
                    <button
                      className="ml-3 text-red-500 hover:text-red-700"
                      onClick={(e) => handleDelete(contact._id, e)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactList;
