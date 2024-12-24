// backend/controllers/contactController.js
const Contact = require('../models/Contact');
const mongoose = require("mongoose")
// Create new contact
// Create new contact
const createContact = async (req, res) => {
  const { firstName, lastName, email, phone, company } = req.body;
  const userId = req.user._id; // Assuming user is authenticated and userId is available

  try {
    const newContact = new Contact({ firstName, lastName, email, phone, company, userId });
    await newContact.save();
    res.status(201).json({ message: 'Contact created successfully', contact: newContact });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create contact', error: error.message });
  }
};



const getAllContacts = async (req, res) => {
  const userId = req.user._id; // Assuming user is authenticated

  try {
    const contacts = await Contact.find({ userId });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get contact by ID
const getContactById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const contact = await Contact.findOne({ _id: id, userId });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Update contact
const updateContact = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const { firstName, lastName, email, phone, company } = req.body;

  try {
    const contact = await Contact.findOne({ _id: id, userId });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    if (firstName) contact.firstName = firstName;
    if (lastName) contact.lastName = lastName;
    if (email) contact.email = email;
    if (phone) contact.phone = phone;
    if (company) contact.company = company;

    await contact.save();
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Delete contact
const deleteContact = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const contact = await Contact.findOneAndDelete({ _id: id, userId });
    if (!contact) {
      return res.status(404).json({ error: "Contact not found." });
    }
    res.status(200).json({ message: "Contact deleted successfully!" });
  } catch (error) {
    console.error("Error deleting contact:", error.message);
    res.status(500).json({ error: "Failed to delete contact." });
  }
};




module.exports = { createContact, getAllContacts, getContactById, updateContact, deleteContact };
