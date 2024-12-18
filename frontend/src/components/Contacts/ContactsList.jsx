// frontend/src/components/Contacts/ContactsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/api/contacts');
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts', error);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-6">Contacts</h2>
      <ul className="space-y-4">
        {contacts.map((contact) => (
          <li key={contact._id} className="p-4 bg-white rounded-lg shadow-md">
            <div>{contact.name}</div>
            <div>{contact.email}</div>
            <div>{contact.phone}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsList;
