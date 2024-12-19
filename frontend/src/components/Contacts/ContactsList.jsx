import React, { useState, useEffect } from 'react';
import contactService from '../../services/contactService';
import { MdEmail, MdPhone } from 'react-icons/md';

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const token = JSON.parse(localStorage.getItem('user'))?.token; // Retrieve token from localStorage
      if (!token) {
        setError('Unauthorized: No token provided.');
        return;
      }

      try {
        const contacts = await contactService.getContacts(token);
        setContacts(contacts);
      } catch (error) {
        console.error('Error fetching contacts', error);
        setError('Error fetching contacts: ' + (error.response?.data?.message || error.message));
      }
    };
    fetchContacts();
  }, []);

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  return (
    <div className="p-8 bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen">
      <h2 className="text-4xl font-semibold text-gray-800 mb-8">Contacts</h2>
      <ul className="space-y-6">
        {contacts.map((contact) => (
          <li key={contact._id} className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:bg-gray-50">
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <div className="text-xl font-semibold text-gray-700">{contact.firstName} {contact.lastName}</div>
              </div>
              <div className="flex justify-end">
                <div className="text-sm text-gray-500">{contact.company}</div>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center hover:text-blue-600 transition-colors duration-300">
                <MdEmail size={22} className="mr-2" />
                <span>{contact.email}</span>
              </div>
              <div className="flex items-center hover:text-green-600 transition-colors duration-300">
                <MdPhone size={22} className="mr-2" />
                <span>{contact.phone}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsList;
