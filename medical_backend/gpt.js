const express = require('express');
const axios = require('axios');
const pdfParse = require('pdf-parse');
const multer = require('multer');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = 3000;

// Set up Multer for file upload
const upload = multer({ storage: multer.memoryStorage() });

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle PDF upload, parsing, and sending parsed text to ChatGPT
app.post('/api/upload-pdf', upload.single('pdf'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'PDF file is required' });
    }

    try {
        // Parse the PDF content
        const data = await pdfParse(req.file.buffer);

        // const prompt = data.text; 
        const prompt =`You are an AI bot designed to analyze the medical report. Here is patient information:

${JSON.stringify(data, null, 2)}

and you have to stricly follow the following output structure and give all the information of json you have to analyse and give them diagnos and treatment recomandation also medication this all are very import part of analysis add them into corresponding field

{
  "patient_info": {
    "patient_id": "string",
    "name": "string",
    "age": "integer",
    "gender": "string",
    "date_of_birth": "YYYY-MM-DD",
    "report_date": "YYYY-MM-DD",
    "doctor": "string",
    "hospital": "string"
  },
  "report_details": {
    "report_type": "string", 
    "report_summary": "string",
    "report_sections": [
      {
        "section_title": "string",
        "findings": "string",
        "conclusion": "string",
        "data": {
          "parameters": [
            {
              "name": "string",
              "value": "string/number",
              "units": "string",
              "reference_range": "string"
            }
          ]
          ]
        }
      }
    ]
  },
  "analysis": {
    "diagnosis": [
      {
        "condition": "string",
        "severity": "mild/moderate/severe",
        "description": "string"
      }
    ],
    "treatment_recommendations": [
      {
        "treatment": "string",
        "medication": {
          "name": "string",
          "dosage": "string",
          "duration": "string"
        },
        "other_treatment": "string"
      }
    ],
    "lifestyle_recommendations": [
      {
        "recommendation": "string",
        "description": "string"
      }
    ],
    "follow_up": {
      "required": true,
      "follow_up_date": "YYYY-MM-DD",
      "tests_suggested": [
        {
          "test_name": "string",
          "reason": "string"
        }
      ]
    }
  },
  "additional_info": {
    "general_health_advice": [
      {
        "topic": "string",
        "advice": "string"
      }
    ],
    "related_articles": [
      {
        "title": "string",
        "link": "string"
      }
    ]
  }
}

`
        // Ensure prompt has content
        if (!prompt) {
            return res.status(400).json({ error: 'No text extracted from PDF' });
        }

        // Send the extracted PDF text as a prompt to OpenAI GPT
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo", // Use GPT-4 if necessary
                messages: [{ role: 'user', content: prompt }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Securely access API key
                    'Content-Type': 'application/json',
                },
            }
        );

        // Log and send GPT response back to the client
        console.log(response.data.choices[0]?.message?.content);
        res.json({ gptResponse: response.data.choices[0]?.message?.content });

    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to process PDF or communicate with ChatGPT API' });
    }
});

// Start the Express.js server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
