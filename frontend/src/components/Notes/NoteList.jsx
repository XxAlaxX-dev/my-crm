import React, { useEffect, useState } from 'react';
import noteService from '../../services/noteService';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // Retrieve the token from localStorage
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          setError('Unauthorized: Please log in');
          return;
        }
        
        const token = JSON.parse(storedUser).token;
        const data = await noteService.getNotes(token);
        setNotes(data); // Update state with fetched notes
      } catch (err) {
        setError(err.message || 'Failed to fetch notes');
      }
    };

    fetchNotes(); // Fetch notes on component mount
  }, []); // Empty dependency array ensures it runs only once

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-6">Notes</h2>
      {notes.length > 0 ? (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li key={note._id} className="p-4 bg-white rounded-lg shadow-md">
              <div>{note.content}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
};

export default NoteList;
