import React, { useState } from "react";
import ContactList from "../components/Contacts/ContactsList";
import ContactForm from "../components/Contacts/ContactForm";

const Contacts = () => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="contacts-page p-6">
      <h1 className="text-3xl font-bold mb-4">Contacts</h1>
      <button
        onClick={() => setIsAdding(!isAdding)}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        {isAdding ? "Cancel" : "Add Contact"}
      </button>
      {isAdding && <ContactForm onClose={() => setIsAdding(false)} />}
      <ContactList />
    </div>
  );
};

export default Contacts;
