// frontend/src/components/Notes/NoteList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('/api/notes');
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes', error);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-6">Notes</h2>
      <ul className="space-y-4">
        {notes.map((note) => (
          <li key={note._id} className="p-4 bg-white rounded-lg shadow-md">
            <div>{note.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
