// backend/controllers/contactController.js
const Contact = require('../models/Contact');

// Create new contact
const createContact = async (req, res) => {
  const { firstName, lastName, email, phone, company } = req.body;

  try {
    const newContact = new Contact({ firstName, lastName, email, phone, company });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get contact by ID
const getContactById = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);
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
  const { firstName, lastName, email, phone, company } = req.body;

  try {
    const contact = await Contact.findById(id);
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

  try {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createContact, getAllContacts, getContactById, updateContact, deleteContact };
