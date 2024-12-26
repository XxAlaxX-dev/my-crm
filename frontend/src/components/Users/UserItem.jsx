import React from 'react';

const UserItem = ({ user }) => {
  return (
    <div className="border p-4 rounded-md shadow-sm">
      <div className="mb-4 text-center">
        <strong className="text-gray-700 block mb-2">Profile Picture:</strong>
        {user.image ? (
          <img
            src={`http://localhost:4000/${user.image}`} // Adjust the path if needed
            alt={`${user.name}'s profile`}
            className="w-32 h-32 rounded-full mx-auto object-cover"
          />
        ) : (
          <p className="text-gray-500 italic">No profile picture uploaded</p>
        )}
      </div>
      <div className="mb-4">
        <strong className="text-gray-700">Name:</strong>
        <p className="text-gray-600">{user.name}</p>
      </div>
      <div className="mb-4">
        <strong className="text-gray-700">Email:</strong>
        <p className="text-gray-600">{user.email}</p>
      </div>
      <div className="mb-4">
        <strong className="text-gray-700">Role:</strong>
        <p className="text-gray-600">{user.role || 'N/A'}</p>
      </div>
      <div className="mb-4">
        <strong className="text-gray-700">Created At:</strong>
        <p className="text-gray-600">{new Date(user.createdAt).toLocaleString()}</p>
      </div>
      <div className="mb-4">
        <strong className="text-gray-700">Last Updated:</strong>
        <p className="text-gray-600">{new Date(user.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default UserItem;
