import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateUser = () => {
  const { id } = useParams(); // Get user ID from URL params
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'User', // Default to 'User' if not provided
    image: null, // New state for image
  });
  const [loading, setLoading] = useState(false);

  // Get logged-in user's role
  const loggedInUserRole = JSON.parse(localStorage.getItem('user'))?.role;

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const token = JSON.parse(localStorage.getItem('user'))?.token;
        const response = await axios.get(`http://localhost:4000/api/users/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = response.data.user; // Extract the user object from the response
        setFormData({
          name: user.name || '',
          email: user.email || '',
          role: user.role || 'User',
          image: null, // Initialize with null
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({
        ...formData,
        image: files[0], // Set the uploaded file
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      const form = new FormData(); // Create a FormData object to handle file upload
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('role', formData.role);
      if (formData.image) {
        form.append('image', formData.image); // Append the image if selected
      }

      await axios.put(
        `http://localhost:4000/api/users/upload/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Set the correct content type
          },
        }
      );
      toast.success('User updated successfully!');
      navigate('/users'); // Redirect to user list page
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Update User</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md"
          />
        </div>
        {/* Render Role selection only for Admin */}
        {loggedInUserRole === 'Admin' && (
          <div>
            <label className="block text-gray-700" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        )}
        <div>
          <label className="block text-gray-700" htmlFor="image">
            Profile Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
