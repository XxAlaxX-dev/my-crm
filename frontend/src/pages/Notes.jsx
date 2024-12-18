// frontend/src/pages/Notes.js
import React from 'react';
import NoteList from '../components/Notes/NoteList';  // Import the NoteList component

const NotesPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NoteList />
    </div>
  );
};

export default NotesPage;
