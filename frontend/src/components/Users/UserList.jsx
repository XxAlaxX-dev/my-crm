import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchUsers, deleteUser } from '../../redux/actions/userActions';
import { Link, useNavigate } from 'react-router-dom';
import UserItem from '../../components/Users/UserItem'; // Assuming this is a component to display user details
import { AuthContext } from '../../contexts/AuthContext'; // Assuming you have an AuthContext to handle user data

const UserList = () => {
  const { user } = useContext(AuthContext); // Getting user context data

  const userRole = useMemo(() => {
    const storedData = localStorage.getItem('user');
    const parsedData = storedData ? JSON.parse(storedData) : null;
    return parsedData?.user?.role || 'Guest'; // Default to 'Guest' if no role found
  }, [user]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users = [], loading, error } = useSelector((state) => state.users || { users: [] });

  const [selectedUser, setSelectedUser] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Prevent row click handler from triggering
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await dispatch(deleteUser(id)); // Dispatch the delete action
        toast.success('User deleted successfully!');
        dispatch(fetchUsers()); // Refresh the user list after deletion
      } catch (error) {
        console.error('Error deleting user:', error.message);
        toast.error('Failed to delete user. ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const filteredUsers =
    userRole === 'Admin'
      ? users.filter((user) => {
          const name = (user.name || '').toLowerCase();
          const email = (user.email || '').toLowerCase();
          return (
            name.includes(filters.name.toLowerCase()) &&
            email.includes(filters.email.toLowerCase())
          );
        })
      : users.filter((user) => {
          const currentUserEmail = JSON.parse(localStorage.getItem('user'))?.user?.email;
          return user.email === currentUserEmail;
        });

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-primary"></div>
      </div>
    );
  }

  if (error) {
    toast.error(`Error: ${error}`);
    return (
      <div className="text-red-600 font-semibold text-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User List</h2>

      {/* Filter Inputs */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          placeholder="Filter by Name"
          className="border p-2 rounded-md"
        />
        <input
          type="email"
          name="email"
          value={filters.email}
          onChange={handleFilterChange}
          placeholder="Filter by Email"
          className="border p-2 rounded-md"
        />
      </div>

      {/* User Table */}
      {filteredUsers.length === 0 ? (
        <p className="text-center text-gray-600">No users available.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200 text-sm text-left text-gray-700">
              <tr>
                <th className="py-3 px-6">Image</th>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(user)}
                >
                  <td className="py-4 px-6">
                    {user.image ? (
                      <img
                        src={`http://localhost:4000/${user.image}`} // Adjust the path if needed
                        alt={`${user.name}'s profile`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 italic">No Image</span>
                    )}
                  </td>
                  <td className="py-4 px-6">{user.name}</td>
                  <td className="py-4 px-6">{user.email}</td>
                  <td className="py-4 px-6">{user.role || 'N/A'}</td>
                  <td className="py-4 px-6">
                    <Link
                      to={`/update-user/${user._id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </Link>

                    {userRole === 'Admin' && (
                      <button
                        className="ml-3 text-red-500 hover:text-red-700"
                        onClick={(e) => handleDelete(user._id, e)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* User Modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50"
          role="dialog"
          aria-labelledby="user-modal-title"
          aria-describedby="user-modal-description"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 id="user-modal-title" className="text-xl font-bold mb-4">{`${selectedUser.name}`}</h3>
            <UserItem user={selectedUser} />
            <button
              className="mt-4 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={() => setSelectedUser(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
