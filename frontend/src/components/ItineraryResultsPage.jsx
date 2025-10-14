import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Clock,
  IndianRupee,
  Camera,
  Navigation as NavigationIcon,
  Star,
  Phone,
  AlertTriangle,
  Utensils,
  Bed,
  Info,
  ArrowLeft,
  Download,
  Share2,
  Heart
} from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import '../styles/ItineraryResults.css';

const ItineraryResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState(null);
  const [activeDay, setActiveDay] = useState(1);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    if (location.state?.itinerary) {
      setItinerary(location.state.itinerary);
    } else {
      // If no data, redirect back to planning
      navigate('/manual');
    }
  }, [location.state, navigate]);

  const toggleFavorite = (itemId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId);
    } else {
      newFavorites.add(itemId);
    }
    setFavorites(newFavorites);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${itinerary?.city} Travel Itinerary`,
        text: `Check out my ${itinerary?.days}-day trip plan for ${itinerary?.city}!`,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleDownload = () => {
    // Simple download as text (could be enhanced to PDF)
    const content = `${itinerary.city} - ${itinerary.days} Day Itinerary\n\n${itinerary.itinerary.map(day =>
      `Day ${day.day} - ${new Date(day.date).toLocaleDateString()}\n${day.summary}\n\n${day.items.map(item =>
        `${item.time} - ${item.name}\n${item.address}\n${item.description}\n`
      ).join('\n')
      }\n`
    ).join('\n')
      }`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${itinerary.city}-itinerary.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toIcsDateTime = (dateStr, timeStr) => {
    try {
      const [h, m] = String(timeStr || '09:00').split(':').map(Number);
      const d = new Date(dateStr);
      d.setHours(h || 9, m || 0, 0, 0);
      const pad = (n) => String(n).padStart(2, '0');
      return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
    } catch {
      return `${dateStr.replaceAll('-', '')}T090000`;
    }
  };

  const addMinutes = (dateStr, timeStr, mins) => {
    const [h, m] = String(timeStr || '09:00').split(':').map(Number);
    const d = new Date(dateStr);
    d.setHours(h || 9, m || 0, 0, 0);
    d.setMinutes(d.getMinutes() + (mins || 60));
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  };

  const handleDownloadICS = () => {
    const CRLF = '\r\n';
    let ics = `BEGIN:VCALENDAR${CRLF}VERSION:2.0${CRLF}PRODID:-//AI Travel Planner//EN${CRLF}`;

    itinerary.itinerary.forEach(day => {
      (day.items || []).forEach(item => {
        const dtStart = toIcsDateTime(day.date, item.time);
        const dtEnd = addMinutes(day.date, item.time, item.durationMins || 60);
        const summary = `${item.name}`;
        const location = `${item.address || ''}`;
        const desc = `${item.description || ''}`.replace(/\n/g, ' ');
        ics += `BEGIN:VEVENT${CRLF}`;
        ics += `DTSTART:${dtStart}${CRLF}`;
        ics += `DTEND:${dtEnd}${CRLF}`;
        ics += `SUMMARY:${summary}${CRLF}`;
        if (location) ics += `LOCATION:${location}${CRLF}`;
        if (desc) ics += `DESCRIPTION:${desc}${CRLF}`;
        ics += `END:VEVENT${CRLF}`;
      });
    });

    ics += `END:VCALENDAR${CRLF}`;

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${itinerary.city}-${itinerary.days}days.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const openInMaps = (name, address) => {
    const q = encodeURIComponent(`${name || ''} ${address || ''} ${itinerary.city || ''}`.trim());
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, '_blank');
  };

  const copyAddress = async (text) => {
    try {
      await navigator.clipboard.writeText(text || '');
      alert('Address copied to clipboard');
    } catch {
      // ignore
    }
  };

  if (!itinerary) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your itinerary...</p>
      </div>
    );
  }

  return (
    <div className="itinerary-results">
      <Navigation />

      <div className="results-container">
        {/* Header */}
        <div className="results-header">
          <button className="back-btn" onClick={() => navigate('/manual')}>
            <ArrowLeft size={20} />
            Back to Planning
          </button>
          <div className="header-content">
            <div className="destination-info">
              <h1>{itinerary.city}</h1>
              <p className="trip-duration">{itinerary.days} Days • {new Date(itinerary.startDate).toLocaleDateString()} onwards</p>
            </div>
            <div className="header-actions">
              <button className="action-btn" onClick={handleShare}>
                <Share2 size={18} />
                Share
              </button>
              <button className="action-btn" onClick={handleDownload}>
                <Download size={18} />
                Download
              </button>
              <button className="action-btn" onClick={handleDownloadICS}>
                <Download size={18} />
                Add to Calendar (.ics)
              </button>
            </div>
          </div>
        </div>

        <div className="results-content">
          {/* Day Navigation */}
          <div className="day-navigation">
            {itinerary.itinerary?.map((day) => (
              <button
                key={day.day}
                className={`day-tab ${activeDay === day.day ? 'active' : ''}`}
                onClick={() => setActiveDay(day.day)}
              >
                <span className="day-number">Day {day.day}</span>
                <span className="day-date">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </button>
            ))}
          </div><br></br>

          {/* Active Day Content */}
          {itinerary.itinerary?.map((day) => (
            activeDay === day.day && (
              <div key={day.day} className="day-content">
                <div className="day-overview">
                  <h2>Day {day.day}</h2>
                  <p className="day-summary">{day.summary}</p>
                </div>

                <div className="timeline-container">
                  {day.items?.map((item, idx) => (
                    <div key={idx} className={`timeline-item ${item.category}`}>
                      <div className="timeline-content">
                        <div className="item-header">
                          <div className="item-title">
                            <h3>{item.name}</h3>
                            <span className={`item-type ${item.category}`}>
                              {item.category === 'spot' && <MapPin size={14} />}
                              {item.category === 'restaurant' && <Utensils size={14} />}
                              {item.category === 'hotel' && <Bed size={14} />}
                              {item.type}
                            </span>
                            {item.isHiddenGem && (
                              <span className="hidden-gem-badge">Hidden Gem</span>
                            )}
                          </div>
                          <button
                            className={`favorite-btn ${favorites.has(`${day.day}-${idx}`) ? 'active' : ''}`}
                            onClick={() => toggleFavorite(`${day.day}-${idx}`)}
                          >
                            <Heart size={16} />
                          </button>
                        </div>

                        <div className="item-details">
                          <div className="address-info">
                            <MapPin size={16} />
                            <span>{item.address}</span>
                            <button className="mini-btn" onClick={() => openInMaps(item.name, item.address)}>Open in Maps</button>
                            <button className="mini-btn" onClick={() => copyAddress(item.address)}>Copy</button>
                          </div>

                          <p className="item-description">{item.description}</p>

                          <div className="item-metadata">
                            {item.entryFee && (
                              <div className="metadata-item">
                                <IndianRupee size={14} />
                                <span>{item.entryFee}</span>
                              </div>
                            )}

                            {item.openingHours && (
                              <div className="metadata-item">
                                <Clock size={14} />
                                <span>{item.openingHours}</span>
                              </div>
                            )}

                            {item.durationMins && (
                              <div className="metadata-item">
                                <span>{item.durationMins} mins</span>
                              </div>
                            )}
                          </div>

                          {item.transportFromPrevious && idx > 0 && (
                            <div className="transport-info">
                              <NavigationIcon size={14} />
                              <span>From previous location: {item.transportFromPrevious}</span>
                            </div>
                          )}

                          <div className="additional-info">
                            {item.photoSpots && (
                              <div className="info-tag photo-spots">
                                <Camera size={14} />
                                <span>{item.photoSpots}</span>
                              </div>
                            )}

                            {item.bestTimeToVisit && (
                              <div className="info-tag best-time">
                                <Clock size={14} />
                                <span>Best time: {item.bestTimeToVisit}</span>
                              </div>
                            )}
                          </div>

                          {item.localTips && (
                            <div className="local-tips">
                              <Info size={14} />
                              <span>{item.localTips}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Left column extra sections (moved from sidebar below Hidden Gems) */}
                {/* Hotels */}
                {itinerary.hotels?.length > 0 && (
                  <div className="recommendation-section" style={{ margin: '24px' }}>
                    <h3>
                      <Bed size={18} />
                      Recommended Hotels
                    </h3>
                    <div className="recommendations-list">
                      {itinerary.hotels.map((hotel, i) => (
                        <div key={i} className="recommendation-card hotel">
                          <h4>{hotel.name}</h4>
                          <p className="address">{hotel.address}</p>
                          <div className="hotel-details">
                            <span className="rating">
                              <Star size={14} fill="gold" color="gold" />
                              {hotel.rating}
                            </span>
                            <span className="price">{hotel.priceRange}</span>
                          </div>
                          {hotel.amenities && <p className="amenities">Amenities: {hotel.amenities}</p>}
                          {hotel.bookingTip && (
                            <div className="booking-tip">
                              <Info size={12} />
                              <span>{hotel.bookingTip}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Restaurants */}
                {itinerary.restaurants?.length > 0 && (
                  <div className="recommendation-section" style={{ margin: '24px' }}>
                    <h3>
                      <Utensils size={18} />
                      Must-Try Restaurants
                    </h3>
                    <div className="recommendations-list">
                      {itinerary.restaurants.map((restaurant, i) => (
                        <div key={i} className="recommendation-card restaurant">
                          <h4>{restaurant.name}</h4>
                          <p className="address">{restaurant.address}</p>
                          <div className="restaurant-details">
                            <span className="rating">
                              <Star size={14} fill="gold" color="gold" />
                              {restaurant.rating}
                            </span>
                            <span className="price">{restaurant.priceRange}</span>
                            {restaurant.vegetarianOptions && (
                              <span className="veg-indicator">🌱 Veg Options</span>
                            )}
                          </div>
                          <p className="specialties">Specialties: {restaurant.specialties}</p>
                          {restaurant.mustTry && (
                            <div className="must-try">
                              <strong>Must try:</strong> {restaurant.mustTry}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Local Information */}
                {itinerary.localInfo && (
                  <div className="recommendation-section local-info" style={{ margin: '24px' }}>
                    <h3>
                      <Info size={18} />
                      Local Information
                    </h3>
                    <div className="info-cards">
                      {itinerary.localInfo.emergencyContacts && (
                        <div className="info-card emergency">
                          <h4>
                            <Phone size={16} />
                            Emergency Contacts
                          </h4>
                          <div className="emergency-contacts">
                            {itinerary.localInfo.emergencyContacts.police && (
                              <p>Police: {itinerary.localInfo.emergencyContacts.police}</p>
                            )}
                            {itinerary.localInfo.emergencyContacts.medical && (
                              <p>Medical: {itinerary.localInfo.emergencyContacts.medical}</p>
                            )}
                            {itinerary.localInfo.emergencyContacts.tourist && (
                              <p>Tourist Helpline: {itinerary.localInfo.emergencyContacts.tourist}</p>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="info-grid">
                        {itinerary.localInfo.currency && (
                          <div className="info-item">
                            <strong>Currency:</strong> {itinerary.localInfo.currency}
                          </div>
                        )}
                        {itinerary.localInfo.language && (
                          <div className="info-item">
                            <strong>Language:</strong> {itinerary.localInfo.language}
                          </div>
                        )}
                        {itinerary.localInfo.transportation && (
                          <div className="info-item">
                            <strong>Transportation:</strong> {itinerary.localInfo.transportation}
                          </div>
                        )}
                      </div>

                      {itinerary.localInfo.culturalTips && (
                        <div className="info-card cultural">
                          <h4>Cultural Tips</h4>
                          <p>{itinerary.localInfo.culturalTips}</p>
                        </div>
                      )}

                      {itinerary.localInfo.safetyTips && (
                        <div className="info-card safety">
                          <h4>
                            <AlertTriangle size={16} />
                            Safety Tips
                          </h4>
                          <p>{itinerary.localInfo.safetyTips}</p>
                        </div>
                      )}

                      {itinerary.localInfo.weatherTips && (
                        <div className="info-card weather">
                          <h4>Weather Tips</h4>
                          <p>{itinerary.localInfo.weatherTips}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          ))}

          {/* Recommendations Sidebar */}
          <div className="recommendations-sidebar">
            {/* Quick Facts */}
            {itinerary.quickFacts && (
              <div className="recommendation-section">
                <h3>
                  <Info size={18} />
                  Quick Facts
                </h3>
                <div className="recommendations-list">
                  <div className="facts-grid">
                    {itinerary.quickFacts.country && (
                      <div className="info-item"><strong>Country:</strong> {itinerary.quickFacts.country}</div>
                    )}
                    {itinerary.quickFacts.language && (
                      <div className="info-item"><strong>Language:</strong> {itinerary.quickFacts.language}</div>
                    )}
                    {itinerary.quickFacts.currency && (
                      <div className="info-item"><strong>Currency:</strong> {itinerary.quickFacts.currency}</div>
                    )}
                    {itinerary.quickFacts.timezone && (
                      <div className="info-item"><strong>Time Zone:</strong> {itinerary.quickFacts.timezone}</div>
                    )}
                    {itinerary.quickFacts.plugType && (
                      <div className="info-item"><strong>Plug Type:</strong> {itinerary.quickFacts.plugType}</div>
                    )}
                    {itinerary.quickFacts.tipping && (
                      <div className="info-item"><strong>Tipping:</strong> {itinerary.quickFacts.tipping}</div>
                    )}
                    {itinerary.quickFacts.safetyLevel && (
                      <div className="info-item"><strong>Safety:</strong> {itinerary.quickFacts.safetyLevel}</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Budget Overview */}
            {itinerary.budget && (
              <div className="recommendation-section">
                <h3>
                  <IndianRupee size={18} />
                  Budget Overview
                </h3>
                <div className="recommendations-list">
                  <div className="budget-card">
                    {itinerary.budget.estimatedDailyPerPerson && (
                      <div className="info-item"><strong>Est. Daily (per person):</strong> {itinerary.budget.estimatedDailyPerPerson}</div>
                    )}
                    {itinerary.budget.breakdown && (
                      <div className="info-grid two-cols">
                        <div className="info-item"><strong>Stay:</strong> {itinerary.budget.breakdown.accommodation}</div>
                        <div className="info-item"><strong>Food:</strong> {itinerary.budget.breakdown.food}</div>
                        <div className="info-item"><strong>Transport:</strong> {itinerary.budget.breakdown.transport}</div>
                        <div className="info-item"><strong>Attractions:</strong> {itinerary.budget.breakdown.attractions}</div>
                      </div>
                    )}
                    {itinerary.budget.sampleCosts && (
                      <div className="info-grid two-cols">
                        {Object.entries(itinerary.budget.sampleCosts).map(([k, v]) => (
                          <div key={k} className="info-item"><strong>{k.replace(/([A-Z])/g, ' $1')}:</strong> {v}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Transport */}
            {itinerary.transport && (
              <div className="recommendation-section">
                <h3>
                  <NavigationIcon size={18} />
                  Getting Around
                </h3>
                <div className="recommendations-list">
                  <div className="info-grid">
                    {itinerary.transport.fromAirport && (
                      <div className="info-item"><strong>From Airport:</strong> {itinerary.transport.fromAirport}</div>
                    )}
                    {itinerary.transport.publicTransit && (
                      <div className="info-item"><strong>Public Transit:</strong> {itinerary.transport.publicTransit}</div>
                    )}
                    {itinerary.transport.rideHailing && (
                      <div className="info-item"><strong>Ride-hailing:</strong> {itinerary.transport.rideHailing}</div>
                    )}
                    {itinerary.transport.gettingAround && (
                      <div className="info-item"><strong>Tips:</strong> {itinerary.transport.gettingAround}</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Seasons & Weather */}
            {Array.isArray(itinerary.seasons) && itinerary.seasons.length > 0 && (
              <div className="recommendation-section">
                <h3>
                  <Clock size={18} />
                  Seasons & Weather
                </h3>
                <div className="recommendations-list">
                  <div className="chips">
                    {itinerary.seasons.map((s, i) => (
                      <span key={i} className="chip">
                        <strong>{s.name}</strong> • {s.months} — {s.notes}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Visa & Entry */}
            {itinerary.visa && (
              <div className="recommendation-section">
                <h3>
                  <Info size={18} />
                  Visa & Entry
                </h3>
                <div className="recommendations-list">
                  <div className="info-grid">
                    {itinerary.visa.requirement && (
                      <div className="info-item"><strong>Requirement:</strong> {itinerary.visa.requirement}</div>
                    )}
                    {itinerary.visa.onArrival && (
                      <div className="info-item"><strong>On Arrival:</strong> {itinerary.visa.onArrival}</div>
                    )}
                    {itinerary.visa.documents && (
                      <div className="info-item"><strong>Documents:</strong> {itinerary.visa.documents}</div>
                    )}
                  </div>
                  <div className="section-note">Confirm with official sources before travel.</div>
                </div>
              </div>
            )}

            {/* Connectivity */}
            {itinerary.connectivity && (
              <div className="recommendation-section">
                <h3>
                  <Phone size={18} />
                  Connectivity
                </h3>
                <div className="recommendations-list">
                  <div className="info-grid">
                    {itinerary.connectivity.simCard && (
                      <div className="info-item"><strong>SIM Card:</strong> {itinerary.connectivity.simCard}</div>
                    )}
                    {itinerary.connectivity.eSIM && (
                      <div className="info-item"><strong>eSIM:</strong> {itinerary.connectivity.eSIM}</div>
                    )}
                    {itinerary.connectivity.wifi && (
                      <div className="info-item"><strong>Wi‑Fi:</strong> {itinerary.connectivity.wifi}</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Packing List */}
            {Array.isArray(itinerary.packingList) && itinerary.packingList.length > 0 && (
              <div className="recommendation-section">
                <h3>
                  <Info size={18} />
                  Packing List
                </h3>
                <div className="recommendations-list">
                  <ul className="bullet-list">
                    {itinerary.packingList.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Etiquette & Tips */}
            {itinerary.tips && (
              <div className="recommendation-section">
                <h3>
                  <AlertTriangle size={18} />
                  Etiquette & Tips
                </h3>
                <div className="recommendations-list">
                  <div className="info-grid">
                    {itinerary.tips.etiquette && (
                      <div className="info-item"><strong>Etiquette:</strong> {itinerary.tips.etiquette}</div>
                    )}
                    {itinerary.tips.scams && (
                      <div className="info-item"><strong>Watch-outs:</strong> {itinerary.tips.scams}</div>
                    )}
                    {itinerary.tips.money && (
                      <div className="info-item"><strong>Money:</strong> {itinerary.tips.money}</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Hidden Gems */}
            {Array.isArray(itinerary.hiddenGems) && itinerary.hiddenGems.length > 0 && (
              <div className="recommendation-section">
                <h3>
                  <MapPin size={18} />
                  Hidden Gems
                </h3>
                <div className="recommendations-list">
                  {itinerary.hiddenGems.map((gem, i) => (
                    <div key={i} className="recommendation-card spot">
                      <h4>{gem.name}</h4>
                      {gem.address && <p className="address">{gem.address}</p>}
                      {gem.description && <p className="specialties">{gem.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ItineraryResultsPage;