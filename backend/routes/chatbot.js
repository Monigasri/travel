const express = require('express');
const router = express.Router();
const axios = require('axios');

// Environment variables should be loaded in server.js
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Endpoint for chatbot conversations
router.post('/', async (req, res) => {
  try {
    // Validate that we have the message parameter
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message parameter is required' });
    }

    // Check if API key is available
    if (!GROQ_API_KEY) {
      return res.status(500).json({ error: 'Groq API key is not configured on the server' });
    }
    
    console.log(`Processing chatbot request: "${message}"`);

    // Make request to Groq API
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a helpful travel assistant that provides information about destinations, travel tips, and recommendations. Be friendly, informative, and concise in your responses. Focus on providing practical travel advice and interesting facts about destinations."
          },
          {
            role: "user",
            content: message
          }
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
      }
    );

    // Process the response from Groq
    const botResponse = response.data.choices[0].message.content;
    res.json({ response: botResponse });

  } catch (error) {
    console.error('Error processing chatbot request:', error);
    
    // Handle different types of errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', error.response.data);
      res.status(error.response.status).json({ 
        error: 'Error from Groq API', 
        details: error.response.data 
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      res.status(500).json({ error: 'No response from Groq API' });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
      res.status(500).json({ error: 'Error setting up request to Groq API' });
    }
  }
});

module.exports = router;