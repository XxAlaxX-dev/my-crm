import React, { useState } from 'react';
import taskService from '../../services/taskService';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(''); // Store due date as string
  const [assignedTo, setAssignedTo] = useState(''); // Can be populated with user data
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim()) {
      setLoading(true); // Start loading state

      const newTask = {
        title: title,
        description: description,
        dueDate: dueDate,
        completed: false, // Default value for completed
        contact: "60d76d1f9b5f530015f1c1d2", // Replace with actual contact ID if dynamic
        assignedTo: assignedTo || "default-user-id", // Replace with actual user ID if dynamic
        createdAt: new Date().toISOString(),
      };

      try {
        await taskService.createTask(newTask);
        navigate('/tasks'); // Redirect to tasks after successful creation
      } catch (error) {
        setError('Failed to create task. Please try again.');
      } finally {
        setLoading(false); // End loading state
      }
    } else {
      setError('Task title is required.');
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/tasks')}
          className="text-blue-600 hover:text-blue-800 font-medium text-lg"
        >
          <MdAdd size={20} className="inline-block mr-2" />
          Back to Tasks
        </button>
      </div>

      <h2 className="text-3xl font-semibold text-gray-800 mb-8">Add New Task</h2>
      
      {error && <p className="text-red-500 text-lg mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Enter task title"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Provide a brief description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Due Date</label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Assigned To</label>
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Enter user ID or name"
          />
        </div>

        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            disabled={loading} // Disable button during loading state
            className={`bg-blue-600 text-white p-4 rounded-lg flex items-center space-x-2 transition-colors duration-200 hover:bg-blue-700 ${loading ? 'bg-gray-400 cursor-not-allowed' : ''}`}
          >
            <MdAdd size={24} />
            <span>{loading ? 'Creating Task...' : 'Add Task'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
