import React from 'react'; // 👈 You missed this!

function CategorizedNotes({ notes }) {
  return (
    <div className="space-y-6">
      {Object.entries(notes).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-xl font-semibold capitalize mb-1">{category}</h2>
          <ul className="list-disc list-inside text-gray-800">
            {items.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CategorizedNotes;
