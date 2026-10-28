


const express = require('express');
const PORT = process.env.PORT || 3000;
const Groq = require('groq-sdk');
const cors = require('cors');

require('dotenv').config({ quiet: true });
const app = express();
app.use(cors());
app.use(express.json());
const groq = new Groq({ 
    
    apiKey: process.env.GROQ_API_KEY });

if (!process.env.GROQ_API_KEY) {
throw new Error('GROQ_API_KEY is missing. Add it to your .env file.');
}

app.post('/ai', async (req, res) => {
const { message } = req.body ?? {};

if (typeof message !== 'string' || !message.trim()) {
  return res.status(400).json({ error: 'Message cannot be empty' });
}

try {
  const chatCompletion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: message }],
    model:'Openai/gpt-oss-120b'
  });

  return res.status(200).json({
    message: chatCompletion.choices[0]?.message?.content || 'No response generated',
  });

  
} catch (error) {
  console.error('Groq chat completion failed:', error);
  return res.status(500).json({ error: 'Failed to generate a response' });
}
});

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
