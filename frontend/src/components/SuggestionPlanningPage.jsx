import React, { useState } from 'react';
import '../styles/SuggestionPlanningPage.css';

const SuggestionPlanningPage = ({ destination = 'Your Destination', onNavigate }) => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    genre: '',
    foodPreference: '',
    travelMode: '',
    stayPreference: '',
    groupType: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Suggestion-based trip plan:', { destination, ...formData });
    alert(`Trip plan confirmed for ${destination}!`);
  };

  return (
    <div className="suggestion-planning-container">
      <div className="planning-header">
        <h1>Plan your trip to {destination}</h1>
        {/* <div className="nav-buttons">
          <button onClick={() => onNavigate('manual')} className="nav-btn">
            Manual Planning
          </button>
          <button onClick={() => onNavigate('theme')} className="nav-btn">
            Theme Planning
          </button>
        </div> */}
      </div>

      <form onSubmit={handleSubmit} className="planning-form">
        <div className="form-container">
          <div className="destination-visual">
            <div className="destination-image">
              <img 
                src={`https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=800`}
                alt={destination}
              />
            </div>
          </div>

          <div className="form-grid-simple">
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <select
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                required
              >
                <option value="">Select genre</option>
                <option value="solo">Solo</option>
                <option value="family">Family</option>
                <option value="friends">Friends</option>
                <option value="couples">Couples</option>
                <option value="business">Business</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="travelMode">Mode of Travel</label>
              <select
                id="travelMode"
                name="travelMode"
                value={formData.travelMode}
                onChange={handleInputChange}
                required
              >
                <option value="">Select travel mode</option>
                <option value="flight">Flight</option>
                <option value="train">Train</option>
                <option value="bus">Bus</option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="stayPreference">Stay Preference</label>
              <select
                id="stayPreference"
                name="stayPreference"
                value={formData.stayPreference}
                onChange={handleInputChange}
                required
              >
                <option value="">Select accommodation</option>
                <option value="hotel">Hotel</option>
                <option value="villa">Villa</option>
                <option value="guesthouse">Guest House</option>
                <option value="hostel">Hostel</option>
                <option value="resort">Resort</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Food Preference</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="foodPreference"
                    value="vegetarian"
                    checked={formData.foodPreference === 'vegetarian'}
                    onChange={handleInputChange}
                  />
                  Vegetarian
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="foodPreference"
                    value="non-vegetarian"
                    checked={formData.foodPreference === 'non-vegetarian'}
                    onChange={handleInputChange}
                  />
                  Non-Vegetarian
                </label>
              </div>
            </div>

            <div className="form-group full-width">
              <label>Group Type</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="groupType"
                    value="male"
                    checked={formData.groupType === 'male'}
                    onChange={handleInputChange}
                  />
                  Male
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="groupType"
                    value="female"
                    checked={formData.groupType === 'female'}
                    onChange={handleInputChange}
                  />
                  Female
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="groupType"
                    value="mixed"
                    checked={formData.groupType === 'mixed'}
                    onChange={handleInputChange}
                  />
                  Mixed
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Confirm Trip Plan
          </button>
        </div>
      </form>
    </div>
  );
};

export default SuggestionPlanningPage;