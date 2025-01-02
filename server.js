require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'gpt-4',
        prompt: userMessage,
        max_tokens: 150,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        }
      }
    );

    res.json({ reply: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Failed to get a response from AI.');
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
