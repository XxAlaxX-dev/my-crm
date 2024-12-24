import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify"; // Import toast
import { fetchContacts, deleteContact } from "../../redux/actions/contactActions";
import { Link, useNavigate } from "react-router-dom";
import ContactItem from "./ContactItem";

const ContactList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contacts = [], loading, error } = useSelector((state) => state.contacts);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
  });

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleRowClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await dispatch(deleteContact(id));
        toast.success("Contact deleted successfully!"); // Success toast
        dispatch(fetchContacts()); // Refresh contacts after deletion
      } catch (error) {
        console.error("Error deleting contact:", error.message);
        toast.error("Failed to delete contact: " + error.message); // Error toast
      }
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const firstName = (contact.firstName || "").toLowerCase();
    const lastName = (contact.lastName || "").toLowerCase();
    const email = (contact.email || "").toLowerCase();
    const company = (contact.company || "").toLowerCase();
    const phone = (contact.phone || "").toLowerCase();

    return (
      firstName.includes(filters.firstName.toLowerCase()) &&
      lastName.includes(filters.lastName.toLowerCase()) &&
      email.includes(filters.email.toLowerCase()) &&
      company.includes(filters.company.toLowerCase()) &&
      phone.includes(filters.phone.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-primary"></div>
      </div>
    );
  }

  if (error) {
    toast.error(`Error: ${error}`); // Error toast for fetch operation
    return (
      <div className="text-red-600 font-semibold text-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact List</h2>

      {/* Filter Inputs */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          name="firstName"
          value={filters.firstName}
          onChange={handleFilterChange}
          placeholder="Filter by First Name"
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          name="lastName"
          value={filters.lastName}
          onChange={handleFilterChange}
          placeholder="Filter by Last Name"
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
        <input
          type="text"
          name="company"
          value={filters.company}
          onChange={handleFilterChange}
          placeholder="Filter by Company"
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          name="phone"
          value={filters.phone}
          onChange={handleFilterChange}
          placeholder="Filter by Phone"
          className="border p-2 rounded-md"
        />
      </div>

      {/* Contact Table */}
      {filteredContacts.length === 0 ? (
        <p className="text-center text-gray-600">No contacts available.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200 text-sm text-left text-gray-700">
              <tr>
                <th className="py-3 px-6">First Name</th>
                <th className="py-3 px-6">Last Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Company</th>
                <th className="py-3 px-6">Phone</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
  {filteredContacts.map((contact) => (
    <tr
      key={contact._id}
      className="border-t hover:bg-gray-50 cursor-pointer"
      onClick={() => handleRowClick(contact)}
    >
      <td className="py-4 px-6">{contact.firstName}</td>
      <td className="py-4 px-6">{contact.lastName}</td>
      <td className="py-4 px-6">{contact.email}</td>
      <td className="py-4 px-6">{contact.company}</td>
      <td className="py-4 px-6">{contact.phone ? `+216 ${contact.phone}` : "N/A"}</td>
      <td className="py-4 px-6">
        <Link
          to={`/update-contact/${contact._id}`}
          className="text-blue-500 hover:text-blue-700"
        >
          Edit
        </Link>

        <button
          className="ml-3 text-red-500 hover:text-red-700"
          onClick={(e) => handleDelete(contact._id, e)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      )}

      {/* Contact Modal */}
      {selectedContact && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50"
          role="dialog"
          aria-labelledby="contact-modal-title"
          aria-describedby="contact-modal-description"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3
              id="contact-modal-title"
              className="text-xl font-bold mb-4"
            >{`${selectedContact.firstName} ${selectedContact.lastName}`}</h3>
            <ContactItem contact={selectedContact} />
            <button
              className="mt-4 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={() => setSelectedContact(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;
