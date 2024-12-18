// backend/controllers/noteController.js
const Note = require('../models/Note');

// Create new note
const createNote = async (req, res) => {
  const { content, contact } = req.body;

  try {
    const newNote = new Note({
      content,
      contact,
      createdBy: req.user.id,
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate('createdBy', 'name').populate('contact', 'firstName lastName');
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get note by ID
const getNoteById = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id).populate('createdBy', 'name').populate('contact', 'firstName lastName');
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete note
const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createNote, getAllNotes, getNoteById, deleteNote };
