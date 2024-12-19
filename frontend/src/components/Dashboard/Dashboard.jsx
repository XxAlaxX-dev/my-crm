// frontend/src/components/Dashboard/Dashboard.js

import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-6">Dashboard</h2>
      <div className="flex space-x-6">
        <div className="w-1/2 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Tasks</h3>

          <Link to="/tasks" className="text-blue-500">
            View all tasks
          </Link>
        </div>
        <div className="w-1/2 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Contacts</h3>

          <Link to="/contacts" className="text-blue-500">
            View all contacts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
