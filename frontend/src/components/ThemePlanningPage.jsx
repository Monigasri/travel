import React, { useState, useEffect } from 'react';
import '../styles/ThemePlanningPage.css';

const ThemePlanningPage = ({ onNavigate }) => {
  const [selectedTheme, setSelectedTheme] = useState('solo');
  const [popupDestination, setPopupDestination] = useState(null);

  // Escape key closes popup
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setPopupDestination(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Themes Data
  const themeDetails = {
    solo: {
      title: 'Solo Travel',
      heroImage:
        'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=1200',
      
      destinations: [
        {
          name: 'Goa',
          description: 'Beaches & relaxation',
          image:
            'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Rishikesh',
          description: 'Yoga & adventure',
          image:
            'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Pondicherry',
          description: 'French vibes',
          image:
            'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Udaipur',
          description: 'Culture & lakes',
          image:
            'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Manali',
          description: 'Mountain retreat',
          image:
            'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Hampi',
          description: 'Ancient ruins',
          image:
            'https://images.pexels.com/photos/1542620/pexels-photo-1542620.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Pushkar',
          description: 'Desert charm',
          image:
            'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Mcleod Ganj',
          description: 'Himalayan peace',
          image:
            'https://images.pexels.com/photos/29988973/pexels-photo-29988973.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
      ],
    },
    devotional: {
      title: 'Devotional Travel',
      heroImage:
        'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=1200',
      
      destinations: [
        {
          name: 'Tirupati',
          description: 'Sacred temple',
          image:
            'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Kedarnath',
          description: 'Himalayan shrine',
          image:
            'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Varanasi',
          description: 'Spiritual center',
          image:
            'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Vaishno Devi',
          description: 'Divine pilgrimage',
          image:
            'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Shirdi',
          description: 'Sai Baba temple',
          image:
            'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Golden Temple',
          description: 'Sikh holiness',
          image:
            'https://images.pexels.com/photos/1542620/pexels-photo-1542620.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Rameshwaram',
          description: 'Island temple',
          image:
            'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Badrinath',
          description: 'Char Dham yatra',
          image:
            'https://images.pexels.com/photos/29988973/pexels-photo-29988973.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
      ],
    },
    educational: {
      title: 'Educational Travel',
      heroImage:
        'https://images.pexels.com/photos/1542620/pexels-photo-1542620.jpeg?auto=compress&cs=tinysrgb&w=1200',
      
      destinations: [
        {
          name: 'Agra',
          description: 'Mughal architecture',
          image:
            'https://images.pexels.com/photos/1542620/pexels-photo-1542620.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Leh Ladakh',
          description: 'Geography & culture',
          image:
            'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Jaipur',
          description: 'Rajasthani heritage',
          image:
            'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Kerala',
          description: 'Biodiversity',
          image:
            'https://images.pexels.com/photos/29988973/pexels-photo-29988973.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Khajuraho',
          description: 'Temple sculptures',
          image:
            'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Ellora Caves',
          description: 'Rock-cut temples',
          image:
            'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Konark',
          description: 'Sun temple',
          image:
            'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Mamallapuram',
          description: 'Stone carvings',
          image:
            'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
      ],
    },
    inspirational: {
      title: 'Inspirational Travel',
      heroImage:
        'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1200',
      
      destinations: [
        {
          name: 'Varanasi',
          description: 'Spiritual awakening',
          image:
            'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Kerala Backwaters',
          description: 'Peaceful reflection',
          image:
            'https://images.pexels.com/photos/29988973/pexels-photo-29988973.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Rishikesh',
          description: 'Yoga capital',
          image:
            'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Udaipur',
          description: 'City of lakes',
          image:
            'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Dharamshala',
          description: 'Buddhist wisdom',
          image:
            'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Auroville',
          description: 'Universal township',
          image:
            'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Spiti Valley',
          description: 'Cold desert beauty',
          image:
            'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Coorg',
          description: 'Coffee plantation',
          image:
            'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
      ],
    },
  };

  const handleDestinationClick = (destination) => {
    setPopupDestination(destination);
  };

  const handleRandomSelect = () => {
    const currentDestinations = themeDetails[selectedTheme].destinations;
    const randomDestination =
      currentDestinations[Math.floor(Math.random() * currentDestinations.length)];
    setPopupDestination(randomDestination);
  };

  return (
    <div className="theme-planning-container">
      <div className="planning-header">
        <h1>{themeDetails[selectedTheme].title}</h1>
        <p>{themeDetails[selectedTheme].about}</p>
      </div>

      <div className="theme-selector">
        {Object.keys(themeDetails).map((key) => (
          <button
            key={key}
            className={`theme-btn ${selectedTheme === key ? 'active' : ''}`}
            onClick={() => setSelectedTheme(key)}
          >
            {themeDetails[key].title}
          </button>
        ))}
      </div>

      <div className="destinations-grid">
        {themeDetails[selectedTheme].destinations.map((destination, index) => (
          <div
            key={index}
            className="destination-card"
            onClick={() => handleDestinationClick(destination)}
          >
            <div className="card-image">
              <img src={destination.image} alt={destination.name} />
            </div>
            <div className="card-content">
              <h3>{destination.name}</h3>
              <p>{destination.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="random-btn" onClick={handleRandomSelect}>
        Choose Randomly →
      </button>

      {/* Popup Modal */}
      {popupDestination && (
        <div className="popup-overlay" onClick={() => setPopupDestination(null)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button className="close-btn" onClick={() => setPopupDestination(null)}>
              ✖
            </button>

            {/* Destination Image */}
            <div className="popup-image-container">
              <img
                src={popupDestination.image}
                alt={popupDestination.name}
                className="popup-image"
              />
            </div>

            {/* Destination Title */}
            <h2 className="popup-title">{popupDestination.name}</h2>

            {/* Short Description */}
            <p className="popup-description">{popupDestination.description}</p>

            {/* Start Planning Button */}
            <button className="start-btn">Start Planning</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemePlanningPage;