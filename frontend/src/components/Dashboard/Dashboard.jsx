// frontend/src/components/Dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const tasksResponse = await axios.get('/api/tasks');
        setTasks(tasksResponse.data);
        const contactsResponse = await axios.get('/api/contacts');
        setContacts(contactsResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-6">Dashboard</h2>
      <div className="flex space-x-6">
        <div className="w-1/2 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Tasks</h3>
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task._id}>
                <div>{task.title}</div>
                <div className="text-gray-500 text-sm">{task.status}</div>
              </li>
            ))}
          </ul>
          <Link to="/tasks" className="text-blue-500">View all tasks</Link>
        </div>
        <div className="w-1/2 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Contacts</h3>
          <ul className="space-y-2">
            {contacts.map((contact) => (
              <li key={contact._id}>
                <div>{contact.name}</div>
                <div className="text-gray-500 text-sm">{contact.email}</div>
              </li>
            ))}
          </ul>
          <Link to="/contacts" className="text-blue-500">View all contacts</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
