const express = require('express');
const router = express.Router();
const axios = require('axios');

// Environment variables should be loaded in server.js
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Helper: try to extract a valid JSON object from arbitrary text
function extractJSONObject(text) {
  if (!text || typeof text !== 'string') {
    throw new Error('No text to parse');
  }

  // Strip code fences if present
  let t = text.trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  // First, try direct parse
  try {
    return JSON.parse(t);
  } catch (_) { /* continue */ }

  // Fallback: attempt to locate the first balanced JSON object by braces
  const firstBrace = t.indexOf('{');
  const lastBrace = t.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const candidate = t.slice(firstBrace, lastBrace + 1);
    // Remove trailing commas like ,} or ,]
    const cleaned = candidate.replace(/,\s*(?=[}\]])/g, '');
    try {
      return JSON.parse(cleaned);
    } catch (e2) {
      // As a final attempt, remove non-printable characters
      const sanitized = cleaned.replace(/\u0000|\u0001|\u0002|\u0003/g, '');
      return JSON.parse(sanitized);
    }
  }
  throw new Error('Could not find JSON object in text');
}

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
        temperature: 0.2,
        // Request JSON if supported; if not, downstream parsing still handles text
        response_format: { type: 'json_object' },
        messages: [
          {
            role: "system",
            content: "You are a travel data service. Output only valid JSON with keys touristSpots, dishes, hotels, restaurants. No markdown, no code fences, no commentary.",
          },
          {
            role: "user",
            content: `For the location "${query}", provide detailed information about famous tourist spots, popular and authentic dishes, famous hotels, and famous restaurants. Include addresses, descriptions, price ranges, and ratings where applicable. Return ONLY a JSON object with keys: touristSpots, dishes, hotels, restaurants.`,
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
      const aiText = String(response.data?.choices?.[0]?.message?.content || '').trim();
      const parsedData = extractJSONObject(aiText);
      // Return the parsed data directly (normalized structure)
      return res.json(parsedData);
    } catch (parseError) {
      console.warn('Groq text was not directly parseable as JSON, returning raw API JSON for frontend handling.');
      // Return the original Groq API JSON; the frontend already knows how to parse choices[0].message.content
      return res.json(response.data);
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
