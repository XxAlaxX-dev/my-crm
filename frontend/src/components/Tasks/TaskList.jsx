// frontend/src/components/Tasks/TaskList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-6">Tasks</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task._id} className="p-4 bg-white rounded-lg shadow-md">
            <div>{task.title}</div>
            <div className="text-gray-500">{task.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
