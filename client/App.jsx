import React, { useState } from 'react';
import { Plus, MessageCircle, X, Send } from 'lucide-react';

// NoteInput Component
const NoteInput = ({ onAdd }) => {
  const [noteText, setNoteText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (noteText.trim()) {
      setIsLoading(true);
      await onAdd(noteText);
      setNoteText('');
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="relative">
        
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write your note here... ✨"
          className="w-full p-4 pr-16 border-2 border-gray-200 rounded-xl resize-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md text-gray-700 placeholder-gray-400"
          rows="4"
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={!noteText.trim() || isLoading}
          className="absolute bottom-4 right-4 bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
          ) : (
            <Plus size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

// CategorizedNotes Component
const CategorizedNotes = ({ notes }) => {
  const categoryColors = {
    'Work': 'from-blue-500 to-blue-600',
    'Personal': 'from-green-500 to-green-600',
    'Ideas': 'from-purple-500 to-purple-600',
    'Shopping': 'from-orange-500 to-orange-600',
    'Health': 'from-red-500 to-red-600',
    'Learning': 'from-indigo-500 to-indigo-600',
    'Uncategorized': 'from-gray-500 to-gray-600'
  };

  const categoryEmojis = {
    'Work': '💼',
    'Personal': '🏠',
    'Ideas': '💡',
    'Shopping': '🛒',
    'Health': '🏥',
    'Learning': '📚',
    'Uncategorized': '📝'
  };

  return (
    <div className="space-y-6">
      {Object.entries(notes).map(([category, categoryNotes]) => (
        <div
          key={category}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
        >
          <div className={`bg-gradient-to-r ${categoryColors[category] || categoryColors['Uncategorized']} text-white p-4`}>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <span className="text-xl">{categoryEmojis[category] || categoryEmojis['Uncategorized']}</span>
              {category}
              <span className="ml-auto bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm">
                {categoryNotes.length}
              </span>
            </h3>
          </div>
          <div className="p-4 space-y-3">
            {categoryNotes.map((note, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in-out transform hover:scale-[1.02] border-l-4 border-transparent hover:border-blue-400"
              >
                <p className="text-gray-700 leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      {Object.keys(notes).length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No notes yet</h3>
          <p className="text-gray-500">Start by adding your first note above!</p>
        </div>
      )}
    </div>
  );
};

// Chatbot Component
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your note assistant. How can I help you today?", isBot: true }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSubmit = () => {
    if (inputText.trim()) {
      setMessages(prev => [...prev, { text: inputText, isBot: false }]);
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "Thanks for your message! I'm here to help with your notes.", 
          isBot: true 
        }]);
      }, 1000);
      setInputText('');
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-40 animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-2xl">
            <h3 className="font-semibold">🤖 Note Assistant</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-xl ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800 rounded-bl-sm'
                      : 'bg-blue-500 text-white rounded-br-sm'
                  } transition-all duration-200 ease-in-out transform hover:scale-105`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 ease-in-out"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <button
                onClick={handleSubmit}
                disabled={!inputText.trim()}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Main App Component
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
      // Fallback to Uncategorized if server is down
      setNotes((prevNotes) => ({
        ...prevNotes,
        ['Uncategorized']: [...(prevNotes['Uncategorized'] || []), noteText],
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Floating particles background effect */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-30"></div>
          <div className="absolute top-3/4 left-3/4 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-20" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-indigo-400 rounded-full animate-pulse opacity-40" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/6 right-1/4 w-2 h-2 bg-pink-400 rounded-full animate-pulse opacity-25" style={{animationDelay: '0.5s'}}></div>
        </div>

        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-fade-in">
            📝 Smart Note App
          </h1>
          <p className="text-gray-600 text-lg animate-fade-in-delay">Organize your thoughts with categorization</p>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-white/20 relative z-10 transition-all duration-500 ease-in-out hover:shadow-3xl">
          <NoteInput onAdd={addNote} />
          <CategorizedNotes notes={notes} />
        </div>

        {/* Chatbot */}
        <Chatbot />
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }
        
        .animate-in {
          animation: slideInFromBottom 0.3s ease-out;
        }
        
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default App;