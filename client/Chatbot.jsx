import React, { useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendQuery = async () => {
    setMessages((prev) => [...prev, { from: 'user', text: input }]);
    
    const response = await fetch('http://localhost:5001/search-notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: input }),
    });

    const data = await response.json();
    const reply = data.results.length
      ? data.results.map(r => `📌 ${r.note} (${r.category})`).join('\n')
      : 'Sorry, I couldn’t find any relevant notes.';

    setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
    setInput('');
  };

  return (
    <div className="border p-4 rounded-xl mt-8 shadow-md">
      <h2 className="text-xl font-semibold mb-2">🤖 Chat with your Notes</h2>
      <div className="h-48 overflow-y-auto bg-gray-50 p-2 rounded">
        {messages.map((m, i) => (
          <div key={i} className={m.from === 'user' ? 'text-right' : 'text-left'}>
            <p className={m.from === 'user' ? 'text-blue-600' : 'text-green-600'}>
              {m.from === 'user' ? 'You: ' : 'Bot: '}
              {m.text}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-2 flex">
        <input
          className="border rounded w-full px-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendQuery()}
          placeholder="Ask something like 'math notes'"
        />
        <button className="ml-2 bg-blue-500 text-white px-4 rounded" onClick={sendQuery}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
