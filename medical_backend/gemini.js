const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(express.json());

const apiKey = "AIzaSyC3IUYEi5I1n9HWKBVxPUYE3TE1PGL9BOk";
const googleAI = new GoogleGenerativeAI(apiKey);

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const model = googleAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Choose the desired Gemini model
    const result = await model.generateContent(prompt);
    const response = result.response.candidates[0].content.parts[0].text;
    console.log(response)

    res.json({ response });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while generating content' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});