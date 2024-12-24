import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { RiContactsBook3Fill } from "react-icons/ri";
import { BsClipboardCheckFill } from "react-icons/bs";
import { FaStickyNote } from "react-icons/fa";

const Sidebar = ({ logout }) => {
  const [isLogoutConfirming, setIsLogoutConfirming] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <MdDashboard size={24}/> },
    { name: 'Contacts', path: '/contacts', icon: <RiContactsBook3Fill size={24} /> },
    { name: 'Tasks', path: '/tasks', icon: <BsClipboardCheckFill size={24} /> },
    { name: 'Notes', path: '/notes', icon: <FaStickyNote size={24} /> },
  ];

  const toggleLogoutConfirmation = () => {
    setIsLogoutConfirming(!isLogoutConfirming);
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed flex flex-col shadow-lg">
      <div className="p-6 text-3xl font-extrabold border-b border-gray-600">
        CRM System
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <nav className="flex-1 p-4 space-y-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center py-3 px-6 rounded-lg text-lg font-medium transition-all ease-in-out duration-200 ${
                isActive
                  ? 'bg-gray-600 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <span className="mr-4">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button with Confirmation */}
      <div className="px-4 py-3 mt-auto">
        {isLogoutConfirming ? (
          <div className="flex space-x-4 justify-center">
            <button
              onClick={logout}
              className="w-32 py-2 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold transition-all ease-in-out duration-200 rounded-lg shadow-md transform hover:scale-105"
            >
              Confirm Logout
            </button>
            <button
              onClick={toggleLogoutConfirmation}
              className="w-32 py-2 bg-gray-500 hover:bg-gray-600 text-white text-lg font-semibold transition-all ease-in-out duration-200 rounded-lg transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={toggleLogoutConfirmation}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold transition-all ease-in-out duration-200 rounded-lg shadow-md transform hover:scale-105"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
