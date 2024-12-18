// frontend/src/pages/Tasks.js
import React from 'react';
import TaskList from '../components/Tasks/TaskList';  // Import the TaskList component

const TasksPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <TaskList />
    </div>
  );
};

export default TasksPage;
