import { useState } from 'react';
import React from 'react'; // 👈 You missed this!

function NoteInput({ onAdd }) {
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    if (note.trim()) {
      onAdd(note);
      setNote('');
    }
  };

  return (
    <div className="mb-4">
      <textarea
        className="w-full p-2 border rounded"
        rows={3}
        placeholder="Enter your note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Note
      </button>
    </div>
  );
}

export default NoteInput;
