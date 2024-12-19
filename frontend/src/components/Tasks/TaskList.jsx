import React, { useEffect, useState } from 'react';
import { MdCheckCircle, MdHourglassEmpty, MdCancel, MdEdit, MdDelete, MdAdd, MdSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import taskService from '../../services/taskService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await taskService.getTasks();
        setTasks(response);
      } catch (error) {
        console.error('Error fetching tasks', error);
        setError('Failed to fetch tasks. Please try again later.');
        toast.error('Failed to fetch tasks. Please try again later.');
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = (taskId) => {
    setTaskToDelete(taskId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (taskToDelete) {
      try {
        await taskService.deleteTask(taskToDelete);
        setTasks(tasks.filter((task) => task._id !== taskToDelete));
        toast.success('Task deleted successfully!');
        setDeleteModalOpen(false);
      } catch (error) {
        console.error('Error deleting task', error);
        setError('Failed to delete task. Please try again later.');
        toast.error('Failed to delete task. Please try again later.');
      }
    }
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleEdit = (taskId) => {
    navigate(`/update-task/${taskId}`);
  };

  const navigateToAddTask = () => {
    navigate('/add-task');
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const DeleteConfirmationModal = ({ onClose, onConfirm }) => (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center transition-all duration-300 ease-in-out">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 transform scale-100 hover:scale-105 transition-all duration-300 ease-in-out">
        <h3 className="text-lg font-semibold text-gray-800">Are you sure you want to delete this task?</h3>
        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-semibold text-gray-800">Tasks</h2>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <MdSearch size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              className="w-72 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search tasks"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={navigateToAddTask}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            <MdAdd size={20} className="inline-block mr-2" />
            Add Task
          </button>
        </div>
      </div>

      {error && <div className="text-red-600 text-lg">{error}</div>}

      <ul>
        {filteredTasks.length === 0 ? (
          <li className="text-center text-lg text-gray-700">No tasks found.</li>
        ) : (
          filteredTasks.map((task) => (
            <li key={task._id} className="flex justify-between items-center p-4 mb-4 bg-white shadow-lg rounded-lg">
              <div className="flex items-center">
                <span className="font-semibold">{task.title}</span>
                <span className="ml-2 text-sm text-gray-500">{task.dueDate}</span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleEdit(task._id)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <MdEdit size={24} />
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <MdDelete size={24} />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default TaskList;
