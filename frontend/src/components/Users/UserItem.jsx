import React from 'react';

const UserItem = ({ user }) => {
  return (
    <div>
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
