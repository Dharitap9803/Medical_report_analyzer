const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const cors = require('cors');
const pdfParse = require('pdf-parse');

const app = express();
app.use(cors());
app.use(express.json()); // Ensure you can parse JSON

const genAI = new GoogleGenerativeAI('AIzaSyC3IUYEi5I1n9HWKBVxPUYE3TE1PGL9BOk');

async function generateDietPlan(userInformation) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
You are an AI bot designed to analyze the medical report. Here is my information:

${JSON.stringify(userInformation, null, 2)}
The report should be specific.
`;

    const result = await model.generateContent(prompt);
    const response = result.response.candidates[0].content.parts[0].text;

    // Process the response text instead of parsing it as JSON
    console.log('Response from API:', response);
    
    return response; // Return plain text response
  } catch (error) {
    console.error('Error generating diet plan:', error.message);
    throw error;
  }
}

app.post('/upload', async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  
  try {
    const userInformation = await pdfParse(req.file.buffer);
    console.log('Extracted User Information:', userInformation.text);
    
    const dietPlan = await generateDietPlan(userInformation.text);
    console.log('Diet Plan:', dietPlan);

    res.json({ success: true, gemini: dietPlan });
  } catch (error) {
    console.error('Error processing request:', error.message);
    res.status(500).json({ error: 'Error generating diet plan' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
