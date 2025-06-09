import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { addNote, getAllNotes, searchNotes } from './noteStore.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Helper function to call Groq
async function categorizeNoteWithGroq(note) {
  const prompt = `Categorize this note into one word like "Study", "Entertainment", "Health", etc. Only return the category:\n\nNote: "${note}"`;

  const response = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      model: 'llama3-8b-8192',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that categorizes user notes.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.2,
    },
    {
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].message.content.trim();
}



// Route for categorizing note
app.post('/categorize', async (req, res) => {
  const { note } = req.body;

  try {
    const category = await categorizeNoteWithGroq(note);
    res.json({ category });
  } catch (error) {
    console.error('Groq API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to categorize note' });
  }
  
});












app.post('/search-notes', async (req, res) => {
  const { query } = req.body;

  // Format all notes into a string
  const allNotesText = Object.entries(global.notes).map(([category, notes]) =>
    `${category}:\n${notes.map((n, i) => `  ${i + 1}. ${n}`).join('\n')}`
  ).join('\n\n');

  const prompt = `
You are an intelligent assistant helping users find relevant notes.

Here are the saved notes:
${allNotesText}

User's question: "${query}"

Based on the above, return only the most relevant notes in clear plain text.
`;

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ result: reply });

  } catch (error) {
    console.error('Groq error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch from Groq' });
  }
});


app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
