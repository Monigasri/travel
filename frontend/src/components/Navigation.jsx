import React from 'react';
import { MapPin, Globe, MessageSquare, Home as HomeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation = ({ selectedCountry = 'India', onCountryChange }) => {
  const countries = ['India', 'Japan', 'Thailand', 'USA', 'France', 'Italy'];
  const navigate = useNavigate();

  return (
    <nav className="navigation">
      <div className="navigation-container">
        {/* Logo */}
        <div className="logo">
          <div className="logo-icon">
            <MapPin className="logo-map-pin" />
          </div>
          <span className="logo-text">TravelPlan</span>
        </div>

        <div className="nav-right-section">
          {/* Home Button */}
          <button
            className="chatbot-button"
            onClick={() => navigate('/home')}
          >
            <HomeIcon className="chatbot-icon" />
            <span>Home</span>
          </button>

          {/* Chatbot Button */}
          <button
            className="chatbot-button"
            onClick={() => navigate('/chatbot')}
          >
            <MessageSquare className="chatbot-icon" />
            <span>Chatbot</span>
          </button>

          

          {/* Go Home (no auth) */}
          {/* <button
            className="chatbot-button"
            onClick={() => navigate('/')}
          >
            <HomeIcon className="chatbot-icon" />
            <span>Go Home</span>
          </button> */}
        </div>
      </div>
    </nav>
  );
};


export default Navigation;
