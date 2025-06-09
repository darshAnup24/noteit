
  import React from 'react'; // 👈 You missed this!
  import { useState } from 'react';
  import NoteInput from './components/NoteInput';
  import CategorizedNotes from './components/CategorizedNotes';

  function App() {
    const [notes, setNotes] = useState({});

    const addNote = async (noteText) => {
      try {
        const response = await fetch('http://localhost:5001/categorize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ note: noteText }),
        });

        const data = await response.json();
        const category = data.category || 'Uncategorized';

        setNotes((prevNotes) => ({
          ...prevNotes,
          [category]: [...(prevNotes[category] || []), noteText],
        }));
      } catch (err) {
        console.error('Error categorizing note:', err);
        alert('Error connecting to server');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">📝 Smart Note App</h1>
        <NoteInput onAdd={addNote} />
        <CategorizedNotes notes={notes} />
      </div>
    </div>
    
    );

      // ...existing code
  return (
    <div>
      {/* Notes UI */}
      <NoteInput onAdd={addNote} />
      <CategorizedNotes notes={notes} />
      
      {/* 👇 New chatbot section */}
      <Chatbot />
    </div>
  );
  }

  export default App;
