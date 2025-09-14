import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import '../styles/HomePage.css';
import '../styles/InfoBox.css';
import Lottie from "lottie-react";
import travelAnimation from "../assets/Man Planning A Sightseeing Route.json";

const HomePage = () => {
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDestination, setActiveDestination] = useState(null);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(null);
  const navigate = useNavigate();

  const destinations = [
    { name: 'Goa', image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Kerala', image: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Rajasthan', image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Himachal Pradesh', image: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Kashmir', image: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Ladakh', image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Uttarakhand', image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Tamil Nadu', image: 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ];

  const destinationDetails = {
    'Tamil Nadu': {
      heroImage: 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=1200',
      about:
        'Tamil Nadu, located in South India, is famous for its ancient Dravidian temples, classical Bharatanatyam dance, filter coffee, coastal beaches, and delicious South Indian cuisine.',
      highlights: ['🛕 Temples of Madurai', '🏖️ Beaches of Chennai', '☕ Filter Coffee', '🎭 Bharatanatyam'],
      mustVisit: [
        { name: 'Chennai', blurb: 'Marina Beach, Kapaleeshwarar Temple', image: 'https://images.pexels.com/photos/356284/pexels-photo-356284.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Madurai', blurb: 'Meenakshi Amman Temple', image: 'https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Rameswaram', blurb: 'Sacred Pilgrimage', image: 'https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Kanyakumari', blurb: 'Sunset Point, Vivekananda Rock', image: 'https://images.pexels.com/photos/356844/pexels-photo-356844.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ],
      experiences: [
        { icon: '🛕', label: 'Temples' },
        { icon: '🍛', label: 'Food' },
        { icon: '🏖️', label: 'Beaches' },
        { icon: '🎭', label: 'Culture' }
      ]
    },
    'Goa': {
      heroImage: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&w=1200',
      about:
        'Goa is known for its golden beaches, lively nightlife, Portuguese heritage, seafood, and water sports.',
      highlights: ['🏖️ Beaches', '🎉 Nightlife', '⛪ Churches', '🍤 Seafood'],
      mustVisit: [
        { name: 'Baga', blurb: 'Watersports & shacks', image: 'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Panaji', blurb: 'Latin Quarter, Churches', image: 'https://images.pexels.com/photos/460750/pexels-photo-460750.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Old Goa', blurb: 'Basilicas & cathedrals', image: 'https://images.pexels.com/photos/161616/san-francisco-church-architecture-religion-161616.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Palolem', blurb: 'Serene crescent beach', image: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ],
      experiences: [
        { icon: '🏖️', label: 'Beaches' },
        { icon: '🎶', label: 'Nightlife' },
        { icon: '⛪', label: 'Heritage' },
        { icon: '🍤', label: 'Seafood' }
      ]
    },
    'Kerala': {
      heroImage: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1200',
      about:
        'Kerala is famed for its tranquil backwaters, lush greenery, Ayurveda therapies, and houseboat stays.',
      highlights: ['🚤 Backwaters', '🌴 Greenery', '🧘 Ayurveda', '🏞️ Hills'],
      mustVisit: [
        { name: 'Alleppey', blurb: 'Houseboats & canals', image: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Munnar', blurb: 'Tea gardens & misty hills', image: 'https://images.pexels.com/photos/1007413/pexels-photo-1007413.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Kochi', blurb: 'Fort Kochi, Chinese nets', image: 'https://images.pexels.com/photos/3566227/pexels-photo-3566227.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Kovalam', blurb: 'Lighthouse beach', image: 'https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ],
      experiences: [
        { icon: '🚤', label: 'Backwaters' },
        { icon: '🌴', label: 'Nature' },
        { icon: '🧘', label: 'Ayurveda' },
        { icon: '🏞️', label: 'Hills' }
      ]
    },
    'Rajasthan': {
      heroImage: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=1200',
      about:
        'Rajasthan is the land of forts, palaces, desert safaris, vibrant textiles, and royal heritage.',
      highlights: ['🏰 Forts', '🐪 Desert', '🎨 Culture', '👑 Palaces'],
      mustVisit: [
        { name: 'Jaipur', blurb: 'Hawa Mahal, Amber Fort', image: 'https://images.pexels.com/photos/221415/pexels-photo-221415.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Udaipur', blurb: 'City of Lakes', image: 'https://images.pexels.com/photos/208733/pexels-photo-208733.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Jaisalmer', blurb: 'Thar Desert & Fort', image: 'https://images.pexels.com/photos/240564/pexels-photo-240564.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Jodhpur', blurb: 'Mehrangarh Fort', image: 'https://images.pexels.com/photos/356610/pexels-photo-356610.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ],
      experiences: [
        { icon: '🏰', label: 'Forts' },
        { icon: '🐪', label: 'Desert' },
        { icon: '🧵', label: 'Textiles' },
        { icon: '🎺', label: 'Folk Arts' }
      ]
    },
    'Himachal Pradesh': {
      heroImage: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1200',
      about:
        'Himachal Pradesh offers snow-capped mountains, serene valleys, adventure sports, and charming hill towns.',
      highlights: ['🏔️ Mountains', '🎿 Skiing', '🏕️ Camping', '🏞️ Valleys'],
      mustVisit: [
        { name: 'Manali', blurb: 'Solang Valley, Rohtang', image: 'https://images.pexels.com/photos/753196/pexels-photo-753196.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Shimla', blurb: 'Mall Road, Ridge', image: 'https://images.pexels.com/photos/1266831/pexels-photo-1266831.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Dalhousie', blurb: 'Colonial charm', image: 'https://images.pexels.com/photos/1054289/pexels-photo-1054289.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Dharamshala', blurb: 'Monasteries & cricket', image: 'https://images.pexels.com/photos/776536/pexels-photo-776536.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ],
      experiences: [
        { icon: '🏔️', label: 'Peaks' },
        { icon: '🥾', label: 'Treks' },
        { icon: '🧘', label: 'Calm' },
        { icon: '❄️', label: 'Snow' }
      ]
    },
    'Kashmir': {
      heroImage: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=1200',
      about:
        'Kashmir is renowned for its pristine lakes, meadows, houseboats, saffron, and snow-laden slopes.',
      highlights: ['🛶 Shikaras', '🏔️ Gulmarg', '🌼 Tulips', '🧣 Pashmina'],
      mustVisit: [
        { name: 'Srinagar', blurb: 'Dal Lake, Mughal Gardens', image: 'https://images.pexels.com/photos/753196/pexels-photo-753196.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Gulmarg', blurb: 'Skiing, Gondola', image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Pahalgam', blurb: 'Valleys & rivers', image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Sonmarg', blurb: 'Golden meadows', image: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ],
      experiences: [
        { icon: '🛶', label: 'Lakes' },
        { icon: '❄️', label: 'Snow' },
        { icon: '🧣', label: 'Crafts' },
        { icon: '🌼', label: 'Flowers' }
      ]
    },
    'Ladakh': {
      heroImage: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1200',
      about:
        'Ladakh is a high-altitude desert known for monasteries, stark landscapes, Pangong Lake, and adventure.',
      highlights: ['🏔️ High Passes', '🏞️ Pangong', '🛕 Monasteries', '🏍️ Rides'],
      mustVisit: [
        { name: 'Leh', blurb: 'Shanti Stupa, Leh Palace', image: 'https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Nubra', blurb: 'Sand dunes & Bactrian camels', image: 'https://images.pexels.com/photos/240564/pexels-photo-240564.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Pangong', blurb: 'Turquoise lake', image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Tso Moriri', blurb: 'Remote alpine lake', image: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ],
      experiences: [
        { icon: '🏔️', label: 'Passes' },
        { icon: '🛕', label: 'Monasteries' },
        { icon: '🏍️', label: 'Rides' },
        { icon: '🏞️', label: 'Lakes' }
      ]
    },
    'Uttarakhand': {
      heroImage: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=1200',
      about:
        'Uttarakhand is celebrated for pilgrimage sites, Himalayan treks, yoga retreats, and natural beauty.',
      highlights: ['🕉️ Char Dham', '🥾 Treks', '🧘 Yoga', '🏞️ Nature'],
      mustVisit: [
        { name: 'Rishikesh', blurb: 'Yoga capital, Ganga Aarti', image: 'https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Haridwar', blurb: 'Ghats & temples', image: 'https://images.pexels.com/photos/355935/pexels-photo-355935.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Nainital', blurb: 'Emerald lake town', image: 'https://images.pexels.com/photos/257727/pexels-photo-257727.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Auli', blurb: 'Ski slopes', image: 'https://images.pexels.com/photos/356808/pexels-photo-356808.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ],
      experiences: [
        { icon: '🕉️', label: 'Pilgrimage' },
        { icon: '🥾', label: 'Treks' },
        { icon: '🧘', label: 'Yoga' },
        { icon: '🏞️', label: 'Nature' }
      ]
    }
  };

  const openDestinationModal = (destination) => {
    setActiveDestination({ name: destination.name, ...(destinationDetails[destination.name] || {}) });
    setIsModalOpen(true);
  };

  const closeDestinationModal = () => {
    setIsModalOpen(false);
    setActiveDestination(null);
  };

  const openThemeModal = (theme) => {
    setActiveTheme(theme);
    setIsThemeModalOpen(true);
  };

  const closeThemeModal = () => {
    setIsThemeModalOpen(false);
    setActiveTheme(null);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        closeDestinationModal();
        closeThemeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const themes = [
    { name: 'Solo Trip', icon: '🎒', description: 'Perfect for independent explorers' },
    { name: 'Education Trip', icon: '📚', description: 'Learn while you travel' },
    { name: 'Inspirational Trip', icon: '✨', description: 'Find your inner peace' },
    { name: 'Devotional Trip', icon: '🙏', description: 'Spiritual journey awaits' }
  ];

  const touristSpots = [
    { id: 1, name: 'Taj Mahal, Agra', image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 2, name: 'Kerala Backwaters', image: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 3, name: 'Jaipur Pink City', image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 4, name: 'Golden Temple, Amritsar', image: 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 5, name: 'Red Fort, Delhi', image: 'https://images.pexels.com/photos/1542620/pexels-photo-1542620.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 6, name: 'Gateway of India, Mumbai', image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 7, name: 'Hawa Mahal, Jaipur', image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 8, name: 'Lotus Temple, Delhi', image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % touristSpots.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + touristSpots.length) % touristSpots.length);
  const handleSpotClick = (spotId) => navigate(`/spot/${spotId}`);

  return (
    <div className="home-container">
      <Navigation selectedCountry={selectedCountry} onCountryChange={setSelectedCountry} />
      <div className="home-content">
        {/* Search Section */}
        <div className="search-section">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Where would you like to go?"
              className="search-input"
            />
          </div>
        </div>



       {/* Hero Section */}

<div style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: '80vh',
  padding: '0 8%',
  backgroundColor: '#f8f9fa',
  gap: '60px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
}}>
  {/* Animation Left Side */}
  <div style={{
    flex: '0 0 45%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <Lottie 
      animationData={travelAnimation} 
      loop={true}
      style={{
        width: '100%',
        maxWidth: '800px',
        height: 'auto'
      }}
    />
  </div>

  {/* Content Right Side */}
  <div style={{
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'left',
    paddingLeft: '40px'
  }}>
    <h1 style={{
      fontSize: '3.5rem',
      fontWeight: '700',
      lineHeight: '0.9',
      color: '#1a1a1a',
      marginBottom: '30px',
      letterSpacing: '-0.02em',
      margin: '0 0 30px 0'
    }}>
      Smart
      Trip
      Planning
      Made
      Easy
    </h1><br></br>
    
    <p style={{
      fontSize: '1.2rem',
      fontWeight: '325',
      color: '#666666',
      lineHeight: '1.4',
      opacity: '0.9',
      margin: '0',
      marginLeft: '60px'
    }}>
      Plan your trips with
      the best hotels,
      food, and
      sightseeing spots
      in one place.
    </p>
  </div>
</div>



        {/* 🔹 New Info Container Section */}
        <div className="info-box">
          <div className="info-box-image">
            <img
              src="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Trip illustration"
            />
          </div>
          <div className="info-box-content">
            <h2>Explore the World Without Stress</h2>
            <p>
              Let our AI-powered planner create personalized itineraries that match your style.
              From hidden gems to must-see attractions, we’ll help you discover unforgettable
              experiences and make memories that last a lifetime.
            </p>
            <button className="info-box-button" onClick={() => navigate('/manual ')}>
              Start Planning <ArrowRight className="button-icon" />
            </button>
          </div>
        </div>  <br></br><br></br><br></br>

        {/* Destinations Section */}
        <section className="destinations-section">
          <div className="section-title">Suggestions for the trip within {selectedCountry}</div> <br></br><br></br>
          <div className="destinations-grid">
            {destinations.map((dest, i) => (
              <div key={i} className="destination-card" onClick={() => openDestinationModal(dest)}>
                <div className="destination-card-inner">
                  <div className="destination-image-container">
                    <img src={dest.image} alt={dest.name} className="destination-image" />
                    <div className="destination-overlay"></div>
                  </div>
                  <div className="destination-info">
                    <h3 className="destination-name">{dest.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>  <br></br>

        {/* Themes Section */}
        <section className="themes-section">
          <div className="section-title">Choose Theme</div>
          <div className="themes-grid">
            {themes.map((theme, i) => (
              <div key={i} className="theme-card" onClick={() => navigate('/theme')}>
                <div className="theme-icon">{theme.icon}</div>
                <h3 className="theme-title">{theme.name}</h3>
                <p className="theme-description">{theme.description}</p>
              </div>
            ))}
          </div>
        </section>



        {/* Tourist Spots Carousel */}
        <section className="carousel-section">
          <div className="section-title">Popular Tourist Spots</div>
          <div className="carousel-container">
            <div className="carousel-slide">
              <img
                src={touristSpots[currentSlide].image}
                alt={touristSpots[currentSlide].name}
                className="carousel-image"
                onClick={() => handleSpotClick(touristSpots[currentSlide].id)}
              />
              <div className="carousel-overlay">
                <div className="carousel-content">
                  <h3 className="carousel-title">{touristSpots[currentSlide].name}</h3>
                  <button className="carousel-button" onClick={() => handleSpotClick(touristSpots[currentSlide].id)}>Learn More</button>
                </div>
              </div>
            </div>

            <button className="carousel-nav carousel-nav-left" onClick={prevSlide}><ChevronLeft /></button>
            <button className="carousel-nav carousel-nav-right" onClick={nextSlide}><ChevronRight /></button>

            <div className="carousel-dots">
              {touristSpots.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot ${i === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(i)}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
      {isModalOpen && activeDestination && (
        <div className="destination-modal-overlay" onClick={closeDestinationModal}>
          <div className="destination-modal" onClick={(e) => e.stopPropagation()}>
            <button className="destination-modal-close" aria-label="Close" onClick={closeDestinationModal}>
              <X />
            </button>
            <div className="destination-modal-content">
              <div className="destination-modal-hero">
                <img
                  src={activeDestination.heroImage || destinations.find(d => d.name === activeDestination.name)?.image}
                  alt={activeDestination.name}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=60';
                  }}
                />
              </div>
              <div className="destination-modal-header">
                <h2>{activeDestination.name}</h2>
              </div>
              <div className="destination-modal-about">
                <p>{activeDestination.about}</p>
                {activeDestination.highlights && (
                  <ul className="destination-highlights">
                    {activeDestination.highlights.map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
              {activeDestination.mustVisit && (
                <div className="destination-modal-mustvisit">
                  <h3>Must Visit</h3>
                  <div className="mustvisit-grid">
                    {activeDestination.mustVisit.map((place, idx) => (
                      <div className="mustvisit-card" key={idx}>
                        <div className="mustvisit-thumb">
                          <img src={place.image} alt={place.name} />
                        </div>
                        <div className="mustvisit-info">
                          <div className="mustvisit-name">{place.name}</div>
                          <div className="mustvisit-blurb">{place.blurb}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* {activeDestination.experiences && (
                <div className="destination-modal-experiences">
                  {activeDestination.experiences.map((exp, idx) => (
                    <div className="experience-pill" key={idx}>
                      <span className="experience-icon">{exp.icon}</span>
                      <span className="experience-label">{exp.label}</span>
                    </div>
                  ))}
                </div>
              )} */}
              <div className="destination-modal-cta">
                <button className="destination-cta-button" onClick={() => navigate('/suggestion')}>
                  Start Planning
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isThemeModalOpen && activeTheme && (
        <div className="destination-modal-overlay" onClick={closeThemeModal}>
          <div className="destination-modal" onClick={(e) => e.stopPropagation()}>
            <button className="destination-modal-close" aria-label="Close" onClick={closeThemeModal}>
              <X />
            </button>
            <div className="destination-modal-content">
              <div className="destination-modal-header">
                <h2>{activeTheme.name}</h2>
                <p className="theme-modal-description">{activeTheme.description}</p>
              </div>
              <div className="destination-modal-mustvisit">
                <h3>Choose Your Destination</h3>
                <div className="mustvisit-grid">
                  {destinations.map((dest, idx) => (
                    <div className="mustvisit-card destination-card-clickable" key={idx} onClick={() => {
                      closeThemeModal();
                      openDestinationModal(dest);
                    }}>
                      <div className="mustvisit-thumb">
                        <img src={dest.image} alt={dest.name} />
                      </div>
                      <div className="mustvisit-info">
                        <div className="mustvisit-name">{dest.name}</div>
                        <div className="mustvisit-blurb">Click to explore</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default HomePage;
