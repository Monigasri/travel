import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";
import { MapPin, Star, DollarSign, Clock } from "lucide-react";
import "../styles/SearchResult.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResult = () => {
  const query = useQuery().get("query") || "";
  const [results, setResults] = useState({
    touristSpots: [],
    dishes: [],
    hotels: [],
    restaurants: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // We're now using the backend API instead of directly calling Groq API
  // No need to handle API keys in the frontend anymore

  useEffect(() => {
    if (!query) return;

    const fetchGroqData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Sending request to backend with query:", query);
        
        // Prepare the prompt to get tourist information for the location
        const promptData = {
          query: `Provide detailed tourist information about ${query}. Include:
          1. Famous tourist spots with names, addresses, descriptions, best times to visit, and ratings
          2. Popular and authentic dishes with names, descriptions, where to try them, and price ranges
          3. Famous hotels with names, addresses, descriptions, price ranges, and ratings
          4. Famous restaurants with names, addresses, descriptions, specialties, price ranges, and ratings
          Format the response as a JSON object with these keys: touristSpots, dishes, hotels, restaurants`
        };
        
        // Call our backend API
        const response = await fetch(
          "http://localhost:5000/api/groq/search",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(promptData),
            credentials: "include", // Add credentials for CORS
          }
        );
        
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          // Check if the response is HTML (common error case)
          const text = await response.text();
          console.error("Error response text:", text);
          
          // If it looks like HTML, provide a clearer error
          if (text.includes('<!DOCTYPE') || text.includes('<html')) {
            throw new Error("Received HTML instead of JSON. The backend server might be returning a web page instead of API data.");
          }
          
          // Try to parse as JSON if it doesn't look like HTML
          try {
            const errorData = JSON.parse(text);
            console.error("Error data:", errorData);
            throw new Error(errorData.error || "Failed to fetch search results");
          } catch (parseError) {
            // If we can't parse as JSON either, just use the text
            throw new Error(`Server error: ${text.substring(0, 100)}...`);
          }
        }

        // Get the response as text first to inspect it
        const responseText = await response.text();
        console.log("Raw response text:", responseText);
        
        // Try to parse the response as JSON
        let data;
        try {
          data = JSON.parse(responseText);
          console.log("Parsed response data:", data);
        } catch (parseError) {
          console.error("Error parsing response as JSON:", parseError);
          throw new Error(`Failed to parse response as JSON: ${responseText.substring(0, 100)}...`);
        }
        
        // Handle different response formats
        let finalResults;
        
        // Case 1: Direct structure with touristSpots, dishes, etc.
        if (data.touristSpots && data.dishes && data.hotels && data.restaurants) {
          console.log("Using direct response structure");
          finalResults = data;
        }
        // Case 2: Groq API response format with choices
        else if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
          console.log("Using Groq API response format");
          const aiText = data.choices[0].message.content.trim();
          
          try {
            const parsedContent = JSON.parse(aiText);
            
            if (
              parsedContent.touristSpots &&
              parsedContent.dishes &&
              parsedContent.hotels &&
              parsedContent.restaurants
            ) {
              finalResults = parsedContent;
            } else {
              throw new Error("Incomplete data structure in AI response");
            }
          } catch (contentParseError) {
            console.error("Error parsing AI content:", contentParseError);
            console.error("Raw AI text:", aiText);
            throw new Error("Invalid JSON in AI response content");
          }
        }
        // Case 3: Unknown format
        else {
          console.error("Unexpected response format:", data);
          throw new Error("Unexpected response format from server");
        }
        
        setResults(finalResults);
      } catch (error) {
        console.error(error);
        setError(error.message);
        setResults({
          touristSpots: [],
          dishes: [],
          hotels: [],
          restaurants: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGroqData();
  }, [query]);

  const renderTouristSpots = (spots) => (
    <div className="category-section">
      <h3>Famous Tourist Spots</h3>
      {spots.length > 0 ? (
        <ul className="category-list">
          {spots.map((spot, index) => (
            <li key={index} className="category-item">
              <div className="item-name">{spot.name}</div>
              {spot.address && (
                <div className="item-address">
                  <MapPin size={16} /> {spot.address}
                </div>
              )}
              {spot.description && (
                <div className="item-description">{spot.description}</div>
              )}
              {spot.bestTimeToVisit && (
                <div className="item-time">
                  <Clock size={16} /> Best time: {spot.bestTimeToVisit}
                </div>
              )}
              {spot.rating && (
                <div className="item-rating">
                  <Star size={16} fill="#f59e0b" /> {spot.rating}/5
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tourist spots found for this location.</p>
      )}
    </div>
  );

  const renderDishes = (dishes) => (
    <div className="category-section">
      <h3>Popular and Authentic Dishes</h3>
      {dishes.length > 0 ? (
        <ul className="category-list">
          {dishes.map((dish, index) => (
            <li key={index} className="category-item">
              <div className="item-name">{dish.name}</div>
              {dish.description && (
                <div className="item-description">{dish.description}</div>
              )}
              {dish.whereToTry && (
                <div className="item-address">
                  <MapPin size={16} /> Where to try: {dish.whereToTry}
                </div>
              )}
              {dish.price && (
                <div className="item-budget">
                  <DollarSign size={16} /> {dish.price}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No dishes found for this location.</p>
      )}
    </div>
  );

  const renderHotels = (hotels) => (
    <div className="category-section">
      <h3>Famous Hotels</h3>
      {hotels.length > 0 ? (
        <ul className="category-list">
          {hotels.map((hotel, index) => (
            <li key={index} className="category-item">
              <div className="item-name">{hotel.name}</div>
              {hotel.address && (
                <div className="item-address">
                  <MapPin size={16} /> {hotel.address}
                </div>
              )}
              {hotel.description && (
                <div className="item-description">{hotel.description}</div>
              )}
              {hotel.priceRange && (
                <div className="item-budget">
                  <DollarSign size={16} /> {hotel.priceRange}
                </div>
              )}
              {hotel.rating && (
                <div className="item-rating">
                  <Star size={16} fill="#f59e0b" /> {hotel.rating}/5
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hotels found for this location.</p>
      )}
    </div>
  );

  const renderRestaurants = (restaurants) => (
    <div className="category-section">
      <h3>Famous Restaurants</h3>
      {restaurants.length > 0 ? (
        <ul className="category-list">
          {restaurants.map((restaurant, index) => (
            <li key={index} className="category-item">
              <div className="item-name">{restaurant.name}</div>
              {restaurant.address && (
                <div className="item-address">
                  <MapPin size={16} /> {restaurant.address}
                </div>
              )}
              {restaurant.description && (
                <div className="item-description">{restaurant.description}</div>
              )}
              {restaurant.specialties && (
                <div className="item-description">
                  <strong>Specialties:</strong> {restaurant.specialties}
                </div>
              )}
              {restaurant.priceRange && (
                <div className="item-budget">
                  <DollarSign size={16} /> {restaurant.priceRange}
                </div>
              )}
              {restaurant.rating && (
                <div className="item-rating">
                  <Star size={16} fill="#f59e0b" /> {restaurant.rating}/5
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No restaurants found for this location.</p>
      )}
    </div>
  );

  return (
    <div className="search-results-page">
      <Navigation />

      <div className="results-container">
        <h2 className="results-title">Search Results for "{query}"</h2>

        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>Error: {error}</p>
          </div>
        ) : (
          <>
            {renderTouristSpots(results.touristSpots)}
            {renderDishes(results.dishes)}
            {renderHotels(results.hotels)}
            {renderRestaurants(results.restaurants)}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResult;