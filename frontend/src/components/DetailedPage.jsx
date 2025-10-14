import React, { useState } from 'react';
import '../styles/DetailedPage.css';
import BackButton from './BackButton';

const DetailedPage = ({ cityData }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const defaultCityData = {
    name: "Paris",
    country: "France",
    description: "Known as the city of love with iconic landmarks and rich culture. Experience the magic of French cuisine, art, and timeless romance in every corner.",
    image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200",
    highlights: [
      "Romantic atmosphere and charming streets",
      "World-class museums and art galleries",
      "Exquisite French cuisine and wine",
      "Stunning architecture and monuments"
    ],
    places: [
      {
        id: 1,
        name: "Eiffel Tower",
        description: "Iconic iron lattice tower and symbol of Paris, offering breathtaking views of the city",
        icon: "🗼",
        category: "Monument",
        rating: 4.8,
        visitDuration: "2-3 hours",
        bestTime: "Evening for lights"
      },
      {
        id: 2,
        name: "Louvre Museum",
        description: "World's largest art museum housing the Mona Lisa and countless masterpieces",
        icon: "🏛️",
        category: "Museum",
        rating: 4.7,
        visitDuration: "Half day",
        bestTime: "Morning"
      },
      {
        id: 3,
        name: "Notre-Dame Cathedral",
        description: "Medieval Catholic cathedral with stunning Gothic architecture",
        icon: "⛪",
        category: "Religious",
        rating: 4.6,
        visitDuration: "1-2 hours",
        bestTime: "Afternoon"
      },
      {
        id: 4,
        name: "Arc de Triomphe",
        description: "Monumental arch honoring French military victories with panoramic views",
        icon: "🏛️",
        category: "Monument",
        rating: 4.5,
        visitDuration: "1 hour",
        bestTime: "Sunset"
      },
      {
        id: 5,
        name: "Champs-Élysées",
        description: "Famous avenue known for luxury shopping, cafés, and theaters",
        icon: "🛍️",
        category: "Shopping",
        rating: 4.4,
        visitDuration: "2-4 hours",
        bestTime: "Afternoon"
      },
      {
        id: 6,
        name: "Sacré-Cœur Basilica",
        description: "Beautiful white basilica atop Montmartre hill with stunning city views",
        icon: "⛪",
        category: "Religious",
        rating: 4.6,
        visitDuration: "1-2 hours",
        bestTime: "Morning"
      }
    ],
    travelTips: [
      "Best time to visit: April to June and September to October",
      "Metro system is efficient for getting around the city",
      "Many museums are free on the first Sunday of each month",
      "Learn basic French phrases for better local interactions"
    ]
  };

  const data = cityData || defaultCityData;

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
  };

  const handleStartPlanning = () => {
    alert(`Starting your ${data.name} adventure planning! 🚀`);
  };

  const closeModal = () => {
    setSelectedPlace(null);
  };

  return (
    <div className="detailed-page">
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <BackButton />
      </div>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="city-title">{data.name}</h1>
            <p className="city-subtitle">{data.country}</p>
            <p className="city-description">{data.description}</p>
          </div>
          <div className="hero-image">
            <img src={data.image} alt={data.name} />
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="highlights-section">
        <h2 className="section-title">Why Visit {data.name}?</h2>
        <div className="highlights-grid">
          {data.highlights.map((highlight, index) => (
            <div key={index} className="highlight-card">
              <div className="highlight-icon">✨</div>
              <p>{highlight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Places Section */}
      <div className="places-section">
        <h2 className="section-title">Must-Visit Places</h2>
        <div className="places-grid">
          {data.places.map((place) => (
            <div
              key={place.id}
              className="place-card"
              onClick={() => handlePlaceClick(place)}
            >
              <div className="place-header">
                <span className="place-icon">{place.icon}</span>
                <div className="place-rating">
                  <span className="star">⭐</span>
                  <span>{place.rating}</span>
                </div>
              </div>
              <h3 className="place-name">{place.name}</h3>
              <p className="place-description">{place.description}</p>
              <div className="place-meta">
                <span className="place-category">{place.category}</span>
                <span className="place-duration">{place.visitDuration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Tips Section */}
      <div className="tips-section">
        <h2 className="section-title">Travel Tips</h2>
        <div className="tips-list">
          {data.travelTips.map((tip, index) => (
            <div key={index} className="tip-item">
              <span className="tip-icon">💡</span>
              <p>{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Section */}
      <div className="action-section">
        <button className="start-planning-btn" onClick={handleStartPlanning}>
          <span>Start Planning Your Trip</span>
          <span className="btn-icon">✈️</span>
        </button>
      </div>

      {/* Modal for Place Details */}
      {selectedPlace && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-header">
              <span className="modal-icon">{selectedPlace.icon}</span>
              <h3>{selectedPlace.name}</h3>
            </div>
            <p className="modal-description">{selectedPlace.description}</p>
            <div className="modal-details">
              <div className="detail-item">
                <strong>Category:</strong> {selectedPlace.category}
              </div>
              <div className="detail-item">
                <strong>Duration:</strong> {selectedPlace.visitDuration}
              </div>
              <div className="detail-item">
                <strong>Best Time:</strong> {selectedPlace.bestTime}
              </div>
              <div className="detail-item">
                <strong>Rating:</strong> ⭐ {selectedPlace.rating}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedPage;