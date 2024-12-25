import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { fetchTasks, deleteTask } from "../../redux/actions/taskActions";
import { MdOutlineUpdate } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [filters, setFilters] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignedTo: "",
    status: "",
  });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(id))
        .then(() => {
          toast.success("Task deleted successfully"); // Show success toast
          dispatch(fetchTasks()); // Refresh the task list
        })
        .catch((error) => {
          toast.error(error.response?.data?.message || "Failed to delete task"); // Show error toast
        });
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let filtered = tasks;
    if (filters.title)
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    if (filters.description)
      filtered = filtered.filter((task) =>
        task.description
          .toLowerCase()
          .includes(filters.description.toLowerCase())
      );
    if (filters.dueDate)
      filtered = filtered.filter(
        (task) =>
          task.dueDate &&
          new Date(task.dueDate).toLocaleDateString().includes(filters.dueDate)
      );
    if (filters.assignedTo)
      filtered = filtered.filter(
        (task) =>
          task.assignedTo &&
          task.assignedTo.name
            .toLowerCase()
            .includes(filters.assignedTo.toLowerCase())
      );
    if (filters.status)
      filtered = filtered.filter(
        (task) => task.completed === (filters.status === "Completed")
      );
    setFilteredTasks(filtered);
  };

  if (loading)
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-lg font-semibold text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="bg-white shadow-xl rounded-lg p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Your Tasks
      </h2>

      {/* Filters */}
      <div className="bg-gray-50 p-4 rounded-md shadow-md mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            name="title"
            value={filters.title}
            onChange={handleFilterChange}
            placeholder="Filter by Title"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="description"
            value={filters.description}
            onChange={handleFilterChange}
            placeholder="Filter by Description"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="dueDate"
            value={filters.dueDate}
            onChange={handleFilterChange}
            placeholder="Filter by Due Date"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="assignedTo"
            value={filters.assignedTo}
            onChange={handleFilterChange}
            placeholder="Filter by Assigned To"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Filter by Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
          <button
            onClick={applyFilters}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Task List Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Assigned To
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                  {task.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {task.description}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {task.assignedTo ? task.assignedTo.name : "Unassigned"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm ${
                      task.completed
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm flex space-x-2">
                  {/* Edit Icon to navigate to UpdateTaskPage */}
                  <Link to={`/update-task/${task._id}`}>
                    <MdOutlineUpdate className="text-xl text-blue-500 hover:text-blue-700 transition cursor-pointer" />
                  </Link>
                  {/* Delete Icon */}
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="delete-button"
                  >
                    <MdDelete className="text-xl text-red-500 hover:text-red-700 transition cursor-pointer" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Toastify container */}
      <ToastContainer />
    </div>
  );
};

export default TaskList;
