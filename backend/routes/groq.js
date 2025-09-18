const express = require('express');
const router = express.Router();
const axios = require('axios');

// Environment variables should be loaded in server.js
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Endpoint to proxy Groq API requests
router.post('/search', async (req, res) => {
  try {
    // Validate that we have the query parameter
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // Check if API key is available
    if (!GROQ_API_KEY) {
      return res.status(500).json({ error: 'Groq API key is not configured on the server' });
    }
    
    console.log(`Processing search request for query: "${query}"`);


    // Make request to Groq API
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a helpful travel assistant. Respond only with valid JSON in the following structure: { \"touristSpots\": [{\"name\": \"Spot Name\", \"address\": \"Full Address\", \"description\": \"Brief description\", \"rating\": 4.5, \"bestTimeToVisit\": \"Season or time\"}], \"dishes\": [{\"name\": \"Dish Name\", \"description\": \"Brief description\", \"whereToTry\": \"Restaurant or area\", \"price\": \"Budget range\"}], \"hotels\": [{\"name\": \"Hotel Name\", \"address\": \"Full Address\", \"description\": \"Brief description\", \"priceRange\": \"Budget range\", \"rating\": 4.5}], \"restaurants\": [{\"name\": \"Restaurant Name\", \"address\": \"Full Address\", \"description\": \"Brief description\", \"specialties\": \"Famous dishes\", \"priceRange\": \"Budget range\", \"rating\": 4.5}] }. Include at least 3-5 items per category if possible. Do not include any additional text outside the JSON.",
          },
          {
            role: "user",
            content: `For the location "${query}", provide detailed information about famous tourist spots, popular and authentic dishes, famous hotels, and famous restaurants. Include addresses, descriptions, price ranges, and ratings where applicable.`,
          },
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
    try {
      // Extract the content from the Groq response
      const aiText = response.data.choices[0].message.content.trim();
      
      // Parse the JSON from the AI response
      const parsedData = JSON.parse(aiText);
      
      // Return the parsed data directly
      res.json(parsedData);
    } catch (parseError) {
      console.error('Error parsing Groq response:', parseError);
      console.log('Raw response:', response.data);
      
      // Return the original response if parsing fails
      res.json(response.data);
    }
  } catch (error) {
    console.error('Error calling Groq API:', error.message);
    
    // Log more detailed error information
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
      
      return res.status(error.response.status).json({
        error: 'Failed to fetch data from Groq API',
        details: error.message,
        data: error.response.data
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
      
      return res.status(500).json({
        error: 'No response received from Groq API',
        details: error.message
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error config:', error.config);
      
      return res.status(500).json({
        error: 'Failed to set up request to Groq API',
        details: error.message
      });
    }
  }
});

module.exports = router;