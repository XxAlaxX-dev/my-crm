import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import taskService from '../../services/taskService';
import userService from '../../services/userService';
import { MdEdit } from 'react-icons/md';

const UpdateTask = () => {
  const { id } = useParams(); // Get task ID from URL params
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [users, setUsers] = useState([]);
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const fetchedTask = await taskService.getTaskById(id); // Fetch task by ID using the service
        setTask(fetchedTask);
        setTitle(fetchedTask.title);
        setDescription(fetchedTask.description);
        setDueDate(fetchedTask.dueDate);
        setAssignedTo(fetchedTask.assignedTo ? fetchedTask.assignedTo._id : ''); // Check if assignedTo exists
      } catch (error) {
        setError('Failed to fetch task details.');
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await userService.getUsers(); // Assuming userService fetches the users
        setUsers(response);
      } catch (error) {
        setError('Failed to fetch users.');
      }
    };

    fetchTask();
    fetchUsers();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim()) {
      setLoading(true);
      const updatedTask = {
        title,
        description,
        dueDate,
        assignedTo: assignedTo || task.assignedTo._id, // Use selected or keep existing assignedTo
      };

      try {
        await taskService.updateTask(id, updatedTask); // Call the update service
        navigate('/tasks'); // Redirect to tasks page after successful update
      } catch (error) {
        setError('Failed to update task. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Task title is required.');
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <button
          onClick={() => navigate('/tasks')}
          className="text-blue-600 hover:text-blue-800 font-medium text-lg"
        >
          <MdEdit size={20} className="inline-block mr-2" />
          Back to Tasks
        </button>
      </div>

      <h2 className="text-3xl font-semibold text-gray-800 mb-8">Update Task</h2>

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
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Assigned To</label>
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
