import React from 'react';
import { MapPin, Globe, MessageSquare, Home as HomeIcon, LogOut } from 'lucide-react';
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

          {/* Country Selector */}
          <div className="country-selector">
            <Globe className="globe-icon" />
            <select
              value={selectedCountry}
              onChange={(e) => onCountryChange?.(e.target.value)}
              className="country-select"
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Logout Button */}
          <button
            className="chatbot-button"
            onClick={async () => {
              try {
                await fetch('http://localhost:5000/auth/logout', { method: 'POST', credentials: 'include' });
              } catch { }
              navigate('/login');
            }}
          >
            <LogOut className="chatbot-icon" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
