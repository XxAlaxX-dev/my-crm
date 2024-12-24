import React from "react";

const ContactItem = ({ contact }) => {
  const { firstName, lastName, email, phone, company } = contact;

  return (
    <div className="contact-item bg-white p-6 mb-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      {/* Nom et prénom */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        {`${firstName} ${lastName}`}
      </h3>

      {/* Informations de contact */}
      <div className="space-y-2">
        <p className="text-gray-600 text-sm">
          <strong>Email:</strong> <span className="text-gray-800">{email}</span>
        </p>
        <p className="text-gray-600 text-sm">
          <strong>Phone:</strong> <span className="text-gray-800">{phone}</span>
        </p>
        <p className="text-gray-600 text-sm">
          <strong>Company:</strong> <span className="text-gray-800">{company}</span>
        </p>
      </div>

      {/* Bouton ou action supplémentaire (si nécessaire) */}
      <div className="mt-4 flex justify-end">
        <button className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
          Contact
        </button>
      </div>
    </div>
  );
};

export default ContactItem;
