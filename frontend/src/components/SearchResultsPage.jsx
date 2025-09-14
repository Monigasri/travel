import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Camera,
  Utensils,
  Hotel,
  Info,
  MapPin,
  Star,
  ExternalLink,
} from "lucide-react";
import "../styles/SearchResultsPage.css";

const SearchResultsPage = () => {
  const location = useLocation();
  const { state } = location;
  const { searchData, city } = state || {};

  const [activeTab, setActiveTab] = useState("spots");

  if (!searchData) {
    return (
      <div className="search-results-container">
        <p>No search results found.</p>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      {/* Header */}
      <header className="results-header">
        <h1>
          Discover {city} <MapPin size={24} />
        </h1>
        <p>
          Explore tourist spots, foods, hotels, and essential information about{" "}
          {city}.
        </p>
      </header>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "spots" ? "active" : ""}`}
          onClick={() => setActiveTab("spots")}
        >
          <Camera size={20} />
          Tourist Spots ({searchData.touristSpots?.length || 0})
        </button>
        <button
          className={`tab ${activeTab === "foods" ? "active" : ""}`}
          onClick={() => setActiveTab("foods")}
        >
          <Utensils size={20} />
          Foods ({searchData.foods?.length || 0})
        </button>
        <button
          className={`tab ${activeTab === "hotels" ? "active" : ""}`}
          onClick={() => setActiveTab("hotels")}
        >
          <Hotel size={20} />
          Hotels ({searchData.hotels?.length || 0})
        </button>
        <button
          className={`tab ${activeTab === "info" ? "active" : ""}`}
          onClick={() => setActiveTab("info")}
        >
          <Info size={20} />
          Information
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "spots" && (
          <div className="grid">
            {(searchData.touristSpots ?? []).map((spot, index) => (
              <div key={index} className="card">
                <img src={spot.image} alt={spot.name} />
                <h3>{spot.name}</h3>
                <p>{spot.description}</p>
                <a
                  href={spot.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-link"
                >
                  View on Map <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        )}

        {activeTab === "foods" && (
          <div className="grid">
            {(searchData.foods ?? []).map((food, index) => (
              <div key={index} className="card">
                <img src={food.image} alt={food.name} />
                <h3>{food.name}</h3>
                <p>{food.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "hotels" && (
          <div className="grid">
            {(searchData.hotels ?? []).map((hotel, index) => (
              <div key={index} className="card">
                <img src={hotel.image} alt={hotel.name} />
                <h3>{hotel.name}</h3>
                <p>{hotel.description}</p>
                <div className="hotel-meta">
                  <span className="rating">
                    <Star size={16} /> {hotel.rating}
                  </span>
                  <span
                    className={`category ${hotel.category?.toLowerCase()}`}
                  >
                    {hotel.category}
                  </span>
                </div>
                <a
                  href={hotel.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="book-link"
                >
                  Book Now <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        )}

        {activeTab === "info" && (
          <div className="info-section">
            <h2>About {city}</h2>
            <p>{searchData.cityInfo}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
