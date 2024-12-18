// backend/models/Meeting.js
const mongoose = require('mongoose');

const meetingSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
  },
  agenda: {
    type: String,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
