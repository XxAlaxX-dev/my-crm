import React from "react";
import { FaEnvelope, FaPhone, FaBuilding, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

const ContactItem = ({ contact }) => {
  const { firstName, lastName, email, phone, company, address, website } = contact;

  return (
    <div className="contact-item bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Header Section */}
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 text-blue-600 rounded-full h-12 w-12 flex items-center justify-center text-xl font-semibold">
          {firstName?.[0]?.toUpperCase() || ""}{lastName?.[0]?.toUpperCase() || ""}
        </div>
        <div className="ml-4">
          <h3 className="text-2xl font-bold text-gray-900">
            {`${firstName} ${lastName}`}
          </h3>
          <p className="text-sm text-gray-500">{company || "No company information"}</p>
        </div>
      </div>

      {/* Contact Details Section */}
      <div className="space-y-3 text-gray-700">
        {email ? (
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-blue-500" />
            <span className="text-sm">
              <a href={`mailto:${email}`} className="hover:text-blue-600">{email}</a>
            </span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-gray-400">
            <FaEnvelope />
            <span className="text-sm">No email provided</span>
          </div>
        )}
        {phone ? (
          <div className="flex items-center space-x-2">
            <FaPhone className="text-green-500" />
            <span className="text-sm">{`+216 ${phone}`}</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-gray-400">
            <FaPhone />
            <span className="text-sm">No phone number provided</span>
          </div>
        )}
        {address ? (
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-red-500" />
            <span className="text-sm">{address}</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-gray-400">
            <FaMapMarkerAlt />
            <span className="text-sm">No address provided</span>
          </div>
        )}
        {website ? (
          <div className="flex items-center space-x-2">
            <FaGlobe className="text-blue-500" />
            <span className="text-sm">
              <a href={website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                {website}
              </a>
            </span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-gray-400">
            <FaGlobe />
            <span className="text-sm">No website provided</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-3">
        {phone && (
          <a
            href={`tel:+216${phone}`}
            className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 transition-all"
          >
            Call
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-all"
          >
            Email
          </a>
        )}
      </div>
    </div>
  );
};

export default ContactItem;
