import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTasks, updateTaskDetails } from "../../redux/actions/taskActions";
import { fetchContacts } from "../../redux/actions/otherActions";
import { toast } from "react-toastify";

const UpdateTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get tasks and contacts from Redux
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const { contacts } = useSelector((state) => state.contacts);
  const task = tasks.find((t) => t._id === id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    completed: false,
    contact: "", // This will hold the contact ID for the task
  });

  // Fetch tasks and contacts if not already available
  useEffect(() => {
    if (!tasks.length) {
      dispatch(fetchTasks());
    }
    if (!contacts.length) {
      dispatch(fetchContacts());
    }
  }, [dispatch, tasks.length, contacts.length]);

  // Update form when task data is available
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "",
        completed: task.completed || false,
        contact: task.contact?._id || task.contact || "", // Set contact ID
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
      ...(formData.contact && { contact: formData.contact }), // Update with the selected contact
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
            Assigned To
          </label>
          <select
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a contact</option>
            {contacts.map((contact) => (
              <option key={contact._id} value={contact._id}>
                {contact.firstName} {contact.lastName}
              </option>
            ))}
          </select>
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
