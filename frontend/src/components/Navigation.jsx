import React from 'react';
import { MapPin, Globe } from 'lucide-react';
import '../styles/Navigation.css';

const Navigation = ({ selectedCountry = 'India', onCountryChange }) => {
  const countries = ['India', 'Japan', 'Thailand', 'USA', 'France', 'Italy'];

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
      </div>
    </nav>
  );
};

export default Navigation;
