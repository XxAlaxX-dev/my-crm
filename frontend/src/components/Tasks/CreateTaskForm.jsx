import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewTask } from "../../redux/actions/taskActions";

const CreateTaskForm = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    completed: false,
    contact: "",
    assignedTo: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setTaskData({ ...taskData, [name]: checked });
    } else {
      setTaskData({ ...taskData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewTask(taskData));
    setTaskData({
      title: "",
      description: "",
      dueDate: "",
      completed: false,
      contact: "",
      assignedTo: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create New Task</h2>

      {/* Task Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Task Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          className="mt-2 w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Task Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Task Description
        </label>
        <textarea
          id="description"
          name="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Enter task description"
          rows="4"
          className="mt-2 w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Due Date */}
      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleChange}
          className="mt-2 w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Completed Checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={taskData.completed}
          onChange={handleChange}
          className="h-5 w-5 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="completed" className="ml-2 text-sm font-medium text-gray-700">
          Task Completed
        </label>
      </div>

      {/* Contact */}
      <div>
        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
          Contact
        </label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={taskData.contact}
          onChange={handleChange}
          placeholder="Enter contact ID or name"
          className="mt-2 w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Assigned To */}
      <div>
        <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
          Assigned To
        </label>
        <input
          type="text"
          id="assignedTo"
          name="assignedTo"
          value={taskData.assignedTo}
          onChange={handleChange}
          placeholder="Enter user ID or name"
          className="mt-2 w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Task
        </button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
