import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createContact } from "../../redux/actions/contactActions";
import { toast } from "react-toastify"; // Import toast

const ContactForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createContact(formData)); // Dispatch action to add contact
      toast.success("Contact added successfully!"); // Show success toast
      onClose(); // Close the form modal or popup
    } catch (error) {
      console.error("Failed to create contact", error);
      toast.error("Failed to add contact. Please try again."); // Show error toast
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Add New Contact</h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="text"
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
