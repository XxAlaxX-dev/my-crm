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
-----------------------------------------------------------
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTasks, updateTaskDetails } from "../../redux/actions/taskActions";
import { toast } from "react-toastify";

const UpdateTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get tasks and loading state from Redux
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const task = tasks.find((t) => t._id === id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    completed: false,
    assignedTo: "",
    contact: "",
  });

  // Fetch tasks if not available
  useEffect(() => {
    if (!tasks.length) {
      dispatch(fetchTasks());
    }
  }, [dispatch, tasks.length]);

  // Update form when task data is available
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "",
        completed: task.completed || false,
        assignedTo: task.assignedTo?._id || task.assignedTo || "",
        contact: task.contact?._id || task.contact || "",
      });
    }
  }, [task]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Title and description are required.");
      return;
    }
  
    const updatedData = {
      ...(formData.title && { title: formData.title }),
      ...(formData.description && { description: formData.description }),
      ...(formData.dueDate && { dueDate: formData.dueDate }),
      completed: formData.completed,
      ...(formData.assignedTo && { assignedTo: formData.assignedTo }),
      ...(formData.contact && { contact: formData.contact }),
    };
  
    try {
      await dispatch(updateTaskDetails(id, updatedData));
      toast.success("Task updated successfully!");
      dispatch(fetchTasks());
      navigate("/tasks");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task");
    }
  };
  

  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  // Show not found state
  if (!loading && !task) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Task not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Update Task</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title *
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
            Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignedTo">
            Assigned To
          </label>
          <input
            id="assignedTo"
            type="text"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
            Contact
          </label>
          <input
            id="contact"
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-gray-700">Mark as completed</span>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Task
          </button>
          <button
            type="button"
            onClick={() => navigate("/tasks")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTaskPage;
