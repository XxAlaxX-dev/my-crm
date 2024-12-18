// frontend/src/pages/Contacts.js
import React from 'react';
import ContactsList from '../components/Contacts/ContactsList';  // Import the ContactsList component

const ContactsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <ContactsList />
    </div>
  );
};

export default ContactsPage;
