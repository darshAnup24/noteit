
// noteStore.js

// In-memory store for categorized notes
const notes = {}; // Example: { Study: ["React notes"], Health: ["Drink more water"] }

// Add a note to a category
function addNote(category, note) {
  if (!notes[category]) {
    notes[category] = [];
  }
  notes[category].push(note);
}

// Get all stored notes
function getAllNotes() {
  return notes;
}

// Search notes by query string (case-insensitive)
function searchNotes(query) {
  const results = [];

  for (const [category, categoryNotes] of Object.entries(notes)) {
    categoryNotes.forEach((note, index) => {
      if (note.toLowerCase().includes(query.toLowerCase())) {
        results.push({ category, note, index });
      }
    });
  }

  return results;
}

export { addNote, getAllNotes, searchNotes };
