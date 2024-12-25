import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import TaskList from "../components/Tasks/TaskList";
import CreateTaskForm from "../components/Tasks/CreateTaskForm";

const TasksPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Task Management
        </h1>

        {/* Button to navigate to CreateTask page */}
        

        {/* Task List */}
        <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-6">
          <Link
            to="/create-task" // Navigate to the Create Task page
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create New Task
          </Link>
        </div>
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
