import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ManualPlanningPage.css';
import '../styles/Planner.css';

const ManualPlanningPage = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    places: '',
    genre: '',
    foodPreference: '',
    travelMode: '',
    stayPreference: '',
    groupType: '',
    interests: [],
    specialNotes: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [planError, setPlanError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        interests: checked 
          ? [...prev.interests, value]
          : prev.interests.filter(interest => interest !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const dateDiffDays = (start, end) => {
    try {
      const s = new Date(start);
      const e = new Date(end);
      if (isNaN(s) || isNaN(e)) return null;
      const msPerDay = 24 * 60 * 60 * 1000;
      const diff = Math.round((e - s) / msPerDay) + 1; // inclusive
      return diff > 0 ? diff : null;
    } catch { return null; }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPlanError(null);
    setIsGenerating(true);
    setItinerary(null);
    try {
      const days = dateDiffDays(formData.startDate, formData.endDate);
      if (!days) throw new Error('Invalid dates. Please check start and end dates.');
      const destination = (formData.destination || formData.places || '').trim();
      if (!destination) throw new Error('Please enter a destination.');

      const payload = {
        destination,
        startDate: formData.startDate,
        days,
        budget: 'mid',
        travelers: 2,
        pace: 'balanced',
        interests: formData.interests,
      };

      const res = await fetch('http://localhost:5000/api/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to generate itinerary');
      }
      const data = await res.json();
      // Navigate to results page with the generated itinerary
      navigate('/itinerary-results', { state: { itinerary: data } });
    } catch (err) {
      setPlanError(err.message);
      setIsGenerating(false);
    }
  };

  const interestOptions = [
    'Shopping', 'Local Culture', 'Temples', 'Beaches', 'Trekking', 
    'Wildlife', 'Nature', 'Photography', 'Adventure Sports', 'Museums'
  ];

  return (
    <div className="manual-planning-container">
      <div className="planning-header">
        <h1>Plan the trip</h1>
        {/* <div className="nav-buttons">
          <button onClick={() => onNavigate('theme')} className="nav-btn">
            Theme Planning
          </button>
          <button onClick={() => onNavigate('suggestion')} className="nav-btn">
            Suggestion Planning
          </button>
        </div> <br></br> */}
      </div>

      <form onSubmit={handleSubmit} className="planning-form">
        <div className="form-container">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="destination">Destination</label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                placeholder="e.g., Jaipur, India"
                required
              />
            </div>

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

            <div className="form-group full-width">
              <label htmlFor="places">Places to Visit</label>
              <textarea
                id="places"
                name="places"
                value={formData.places}
                onChange={handleInputChange}
                placeholder="Enter the places you'd like to visit..."
                rows={3}
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

            <div className="form-group full-width">
              <label>Interests</label>
              <div className="checkbox-grid">
                {interestOptions.map(interest => (
                  <label key={interest} className="checkbox-label">
                    <input
                      type="checkbox"
                      name="interests"
                      value={interest.toLowerCase()}
                      checked={formData.interests.includes(interest.toLowerCase())}
                      onChange={handleInputChange}
                    />
                    {interest}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="specialNotes">Special Notes</label>
              <textarea
                id="specialNotes"
                name="specialNotes"
                value={formData.specialNotes}
                onChange={handleInputChange}
                placeholder="Any special requirements or notes..."
                rows={3}
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate My Trip Plan'}
          </button>
          {planError && <div className="planner-error" style={{ marginTop: 12 }}>{planError}</div>}
        </div>
      </form>

    </div>
  );
};

export default ManualPlanningPage;