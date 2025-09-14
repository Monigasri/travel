import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Star, Bed, Clock, Plane, Train, Car, Bus, Heart, Camera, Utensils, ShoppingBag, Mountain, Waves, Building, TreePine } from 'lucide-react';
import Navigation from './Navigation';
import '../styles/TouristSpotDetails.css';

const TouristSpotDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Comprehensive tourist spot data with detailed information
  const spotDetails = {
    1: {
      name: 'Taj Mahal, Agra',
      image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1200',
      heroImage: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1600',
      days: 3,
      location: 'Agra, Uttar Pradesh, India',
      bestTime: 'October to March',
      history: 'The Taj Mahal was built by Mughal Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal, who died during childbirth in 1631. Construction began in 1632 and took 22 years to complete, involving over 20,000 artisans and craftsmen. This magnificent white marble mausoleum stands as a symbol of eternal love and is considered one of the Seven Wonders of the World.',
      whySpecial: 'The Taj Mahal is renowned for its perfect symmetry, intricate marble inlay work, and the way it changes color throughout the day - appearing pinkish in the morning, milky white in the evening, and golden under moonlight. Its architectural brilliance combines Persian, Islamic, and Indian architectural styles, creating a masterpiece that has inspired countless poets, artists, and lovers for centuries.',
      transportation: {
        byAir: 'Fly to Indira Gandhi International Airport (DEL) in Delhi, then take a 3-hour drive or train to Agra',
        byTrain: 'Direct trains from Delhi (2-3 hours), Mumbai (18-20 hours), and other major cities to Agra Cantt Station',
        byRoad: 'Well-connected by National Highway 19 from Delhi (200 km, 3-4 hours drive)',
        localTransport: 'Auto-rickshaws, cycle-rickshaws, and taxis are available for local sightseeing'
      },
      mustVisitInside: [
        { name: 'Main Mausoleum', description: 'The central white marble structure housing the tombs of Shah Jahan and Mumtaz Mahal', icon: '🏛️' },
        { name: 'Gardens (Charbagh)', description: 'Persian-style gardens with fountains, pathways, and reflecting pools', icon: '🌿' },
        { name: 'Mosque (West Side)', description: 'Red sandstone mosque used for prayers, facing Mecca', icon: '🕌' },
        { name: 'Guest House (East Side)', description: 'Mirror image of the mosque, used for accommodation', icon: '🏠' },
        { name: 'Main Gateway (Darwaza)', description: 'Grand entrance with intricate calligraphy and geometric patterns', icon: '🚪' }
      ],
      nearbyAttractions: [
        { name: 'Agra Fort', distance: '2.5 km', description: 'Red sandstone fortress with stunning views of the Taj Mahal', image: 'https://images.pexels.com/photos/1542620/pexels-photo-1542620.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Mehtab Bagh', distance: '1 km', description: 'Moonlight Garden offering the best sunset views of Taj Mahal', image: 'https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Fatehpur Sikri', distance: '40 km', description: 'UNESCO World Heritage site - abandoned Mughal capital', image: 'https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Itimad-ud-Daulah Tomb', distance: '7 km', description: 'Baby Taj - precursor to the Taj Mahal with similar architecture', image: 'https://images.pexels.com/photos/356284/pexels-photo-356284.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ],
      experiences: [
        { icon: '🌅', label: 'Sunrise Visit', description: 'Witness the magical golden hour lighting' },
        { icon: '🌙', label: 'Full Moon Night', description: 'Special night viewing during full moon' },
        { icon: '📸', label: 'Photography', description: 'Capture the perfect shot from various angles' },
        { icon: '🎨', label: 'Marble Inlay', description: 'Watch artisans create intricate marble work' }
      ],
      hotels: [
        { name: 'The Oberoi Amarvilas', rating: 5, price: '$300/night', description: 'Luxury hotel with direct Taj Mahal views', image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'ITC Mughal', rating: 4, price: '$150/night', description: 'Heritage hotel with Mughal architecture', image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Courtyard by Marriott', rating: 4, price: '$120/night', description: 'Modern comfort with traditional touches', image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ],
      funSpots: [
        'Sunset boat ride on Yamuna River',
        'Heritage walk in old Agra markets',
        'Traditional cooking class with local family',
        'Rickshaw tour of local bazaars',
        'Marble inlay workshop experience'
      ]
    },
    2: {
      name: 'Kerala Backwaters',
      image: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1200',
      heroImage: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1600',
      days: 4,
      location: 'Alleppey, Kerala, India',
      bestTime: 'September to March',
      history: 'The Kerala Backwaters are a network of interconnected canals, rivers, lakes, and inlets that stretch over 900 kilometers. This unique ecosystem was formed over thousands of years by the action of waves and shore currents creating low barrier islands. The backwaters have been the lifeline of Kerala, supporting agriculture, fishing, and transportation for centuries. The traditional houseboats (kettuvallams) were originally used to transport rice and spices.',
      whySpecial: 'Kerala Backwaters offer a unique ecosystem where freshwater from rivers meets saltwater from the Arabian Sea, creating a perfect habitat for diverse marine life. The serene waterways, lined with coconut palms and paddy fields, provide an unparalleled experience of slow travel. The traditional houseboats, made without using a single nail, showcase Kerala\'s architectural ingenuity. This peaceful water world offers a complete escape from modern life, allowing visitors to reconnect with nature.',
      transportation: {
        byAir: 'Fly to Cochin International Airport (COK), then take a 2-hour drive to Alleppey',
        byTrain: 'Direct trains from major cities to Alleppey Railway Station (2-3 hours from Cochin)',
        byRoad: 'Well-connected by road from Cochin (85 km), Trivandrum (150 km), and other cities',
        localTransport: 'Houseboats, local ferries, and auto-rickshaws for exploring the backwaters'
      },
      mustVisitInside: [
        { name: 'Vembanad Lake', description: 'India\'s longest lake, perfect for houseboat cruises', icon: '🏞️' },
        { name: 'Kumarakom Bird Sanctuary', description: 'Home to migratory birds and local species', icon: '🦅' },
        { name: 'Pathiramanal Island', description: 'Small island in Vembanad Lake, accessible by boat', icon: '🏝️' },
        { name: 'Punnamada Lake', description: 'Famous for the Nehru Trophy Boat Race', icon: '🚣' },
        { name: 'Kuttanad Region', description: 'Rice bowl of Kerala, below sea level farming', icon: '🌾' }
      ],
      nearbyAttractions: [
        { name: 'Cochin (Kochi)', distance: '85 km', description: 'Historic port city with Chinese fishing nets and colonial architecture', image: 'https://images.pexels.com/photos/3566227/pexels-photo-3566227.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Munnar', distance: '120 km', description: 'Hill station famous for tea plantations and misty mountains', image: 'https://images.pexels.com/photos/1007413/pexels-photo-1007413.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Kovalam Beach', distance: '150 km', description: 'Famous beach destination with lighthouse and golden sands', image: 'https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Thekkady', distance: '140 km', description: 'Wildlife sanctuary and spice plantations', image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ],
      experiences: [
        { icon: '🚤', label: 'Houseboat Cruise', description: 'Overnight stay in traditional kettuvallam' },
        { icon: '🦅', label: 'Bird Watching', description: 'Spot migratory birds and local species' },
        { icon: '🌾', label: 'Village Life', description: 'Experience authentic Kerala village culture' },
        { icon: '🧘', label: 'Ayurveda', description: 'Traditional wellness treatments' }
      ],
      hotels: [
        { name: 'Kumarakom Lake Resort', rating: 5, price: '$250/night', description: 'Luxury resort on Vembanad Lake shores', image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Backwater Ripples', rating: 4, price: '$100/night', description: 'Traditional houseboat accommodation', image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Lake Palace Resort', rating: 4, price: '$80/night', description: 'Waterfront resort with backwater views', image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ],
      funSpots: [
        'Traditional houseboat stay with local cuisine',
        'Kerala cooking demonstration with local families',
        'Coconut farm visit and toddy tapping',
        'Sunset photography at Vembanad Lake',
        'Village cycling through paddy fields'
      ]
    },
    3: {
      name: 'Jaipur Pink City',
      image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=1200',
      heroImage: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=1600',
      days: 3,
      location: 'Jaipur, Rajasthan, India',
      bestTime: 'October to March',
      history: 'Jaipur, known as the Pink City, was founded in 1727 by Maharaja Sawai Jai Singh II, a great astronomer and mathematician. The city was planned according to Vedic architecture principles, with the entire city painted pink in 1876 to welcome the Prince of Wales (later King Edward VII). Jaipur was the first planned city of India and remains one of the most well-preserved examples of medieval Indian urban planning.',
      whySpecial: 'Jaipur is famous for its unique pink-colored buildings, magnificent palaces, and vibrant culture. The city showcases the perfect blend of Rajput and Mughal architecture. It\'s a treasure trove of handicrafts, textiles, and jewelry. The city\'s grid-based planning, wide streets, and beautiful architecture make it a photographer\'s paradise. Jaipur is also known for its rich traditions, colorful festivals, and warm hospitality.',
      transportation: {
        byAir: 'Fly to Jaipur International Airport (JAI) - well connected to major Indian cities',
        byTrain: 'Jaipur Junction is connected to Delhi (4-5 hours), Mumbai (12-14 hours), and other major cities',
        byRoad: 'Excellent road connectivity from Delhi (280 km, 5-6 hours), Agra (240 km, 4-5 hours)',
        localTransport: 'Auto-rickshaws, cycle-rickshaws, taxis, and local buses for city exploration'
      },
      mustVisitInside: [
        { name: 'City Palace', description: 'Royal residence with museums, courtyards, and stunning architecture', icon: '🏰' },
        { name: 'Hawa Mahal', description: 'Iconic honeycomb facade with 953 windows for royal women', icon: '🪟' },
        { name: 'Jantar Mantar', description: 'UNESCO World Heritage site - astronomical observatory', icon: '🔭' },
        { name: 'Amber Fort', description: 'Magnificent hilltop fort with mirror palace and elephant rides', icon: '🏔️' },
        { name: 'Johari Bazaar', description: 'Famous jewelry market with traditional Rajasthani designs', icon: '💎' }
      ],
      nearbyAttractions: [
        { name: 'Amber Fort', distance: '11 km', description: 'Hilltop fort with stunning architecture and elephant rides', image: 'https://images.pexels.com/photos/221415/pexels-photo-221415.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Nahargarh Fort', distance: '12 km', description: 'Hill fort offering panoramic views of Jaipur city', image: 'https://images.pexels.com/photos/208733/pexels-photo-208733.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Jal Mahal', distance: '8 km', description: 'Water palace in the middle of Man Sagar Lake', image: 'https://images.pexels.com/photos/240564/pexels-photo-240564.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Sisodia Rani Garden', distance: '6 km', description: 'Beautiful terraced garden with fountains and murals', image: 'https://images.pexels.com/photos/356610/pexels-photo-356610.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ],
      experiences: [
        { icon: '🐘', label: 'Elephant Ride', description: 'Ride elephants up to Amber Fort' },
        { icon: '🎈', label: 'Hot Air Balloon', description: 'Aerial view of the Pink City' },
        { icon: '🎭', label: 'Cultural Shows', description: 'Traditional puppet shows and folk dances' },
        { icon: '🛍️', label: 'Shopping', description: 'Explore bazaars for textiles and jewelry' }
      ],
      hotels: [
        { name: 'Rambagh Palace', rating: 5, price: '$400/night', description: 'Former royal residence turned luxury hotel', image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Fairmont Jaipur', rating: 5, price: '$200/night', description: 'Luxury resort with traditional architecture', image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Holiday Inn City Centre', rating: 4, price: '$90/night', description: 'Modern comfort in the heart of the city', image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ],
      funSpots: [
        'Elephant ride at Amber Fort',
        'Hot air balloon over the Pink City',
        'Traditional puppet show and folk dance',
        'Royal dinner experience at heritage hotels',
        'Shopping in colorful bazaars for textiles and jewelry'
      ]
    },
    4: {
      name: 'Golden Temple, Amritsar',
      image: 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=1200',
      heroImage: 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=1600',
      days: 2,
      location: 'Amritsar, Punjab, India',
      bestTime: 'October to March',
      history: 'The Golden Temple (Harmandir Sahib) was founded in 1577 by Guru Ram Das, the fourth Sikh Guru. The temple was built in the center of a sacred pool (Amrit Sarovar) and was later covered with gold by Maharaja Ranjit Singh in the 19th century. The temple represents the highest seat of Sikh authority and is considered the holiest shrine in Sikhism. It symbolizes equality, humility, and the oneness of humanity.',
      whySpecial: 'The Golden Temple is unique for its four entrances, symbolizing that people from all walks of life are welcome. The temple\'s architecture combines Hindu and Islamic styles, creating a distinctive Sikh architectural style. The sacred pool (Amrit Sarovar) is believed to have healing properties. The temple serves free meals (langar) to over 100,000 people daily, regardless of religion, caste, or creed. The golden dome and white marble create a stunning visual spectacle.',
      transportation: {
        byAir: 'Fly to Sri Guru Ram Dass Jee International Airport (ATQ) - 11 km from the temple',
        byTrain: 'Amritsar Junction is well connected to Delhi (6-8 hours) and other major cities',
        byRoad: 'Good road connectivity from Delhi (450 km, 8-9 hours), Chandigarh (230 km, 4-5 hours)',
        localTransport: 'Auto-rickshaws, cycle-rickshaws, and local buses for city exploration'
      },
      mustVisitInside: [
        { name: 'Harmandir Sahib', description: 'The main golden temple in the center of the sacred pool', icon: '🕊️' },
        { name: 'Amrit Sarovar', description: 'Sacred pool surrounding the temple with healing properties', icon: '💧' },
        { name: 'Akal Takht', description: 'Highest temporal seat of Sikh authority', icon: '⚔️' },
        { name: 'Langar Hall', description: 'Community kitchen serving free meals to all visitors', icon: '🍽️' },
        { name: 'Central Sikh Museum', description: 'Museum showcasing Sikh history and artifacts', icon: '🏛️' }
      ],
      nearbyAttractions: [
        { name: 'Wagah Border', distance: '28 km', description: 'Famous border ceremony between India and Pakistan', image: 'https://images.pexels.com/photos/356284/pexels-photo-356284.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Jallianwala Bagh', distance: '1 km', description: 'Memorial garden commemorating the 1919 massacre', image: 'https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Partition Museum', distance: '2 km', description: 'Museum dedicated to the 1947 partition of India', image: 'https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Durgiana Temple', distance: '3 km', description: 'Hindu temple dedicated to Goddess Durga', image: 'https://images.pexels.com/photos/356284/pexels-photo-356284.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ],
      experiences: [
        { icon: '🕊️', label: 'Spiritual Experience', description: 'Participate in prayers and meditation' },
        { icon: '🍽️', label: 'Langar Seva', description: 'Volunteer in the community kitchen' },
        { icon: '🌅', label: 'Morning Aarti', description: 'Witness the beautiful morning prayers' },
        { icon: '📿', label: 'Sikh Heritage', description: 'Learn about Sikh culture and traditions' }
      ],
      hotels: [
        { name: 'Hyatt Amritsar', rating: 5, price: '$150/night', description: 'Luxury hotel near the Golden Temple', image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Radisson Blu', rating: 4, price: '$100/night', description: 'Modern hotel with temple views', image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { name: 'Hotel Ritz Plaza', rating: 4, price: '$60/night', description: 'Comfortable stay near the temple complex', image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ],
      funSpots: [
        'Participate in the community kitchen (langar)',
        'Attend morning and evening prayers',
        'Take a walk around the sacred pool',
        'Visit the Sikh museum and learn about history',
        'Experience the peaceful atmosphere and meditation'
      ]
    }
  };

  const spot = spotDetails[id] || spotDetails[1];

  return (
    <div className="spot-detail-container">
      <Navigation />

      <div className="spot-detail-content">
        {/* Back Button */}
        <button
          onClick={() => navigate('/home')}
          className="back-button"
        >
          <ArrowLeft className="back-icon" />
          Back to Home
        </button>

        {/* Hero Section */}
        <div className="hero-section">
  <img src={spot.heroImage || spot.image} alt={spot.name} className="hero-image" />
  
  <div className="hero-overlay"></div> 

  <div className="hero-content">
    <h1 className="hero-title">{spot.name}</h1><br></br>
    <div className="hero-duration">
      <Calendar className="duration-icon" />
      <span>Recommended {spot.days} days • {spot.location}</span>
    </div>
    <div className="hero-best-time">
      <Clock className="duration-icon" />
      <span>Best Time: {spot.bestTime}</span>
    </div>
  </div>
</div>


        {/* Main Content */}
        <div className="main-content">
          {/* History Section */}
          <section className="content-section">
            <div className="section-header">
              <h2 className="section-title">History & Heritage</h2>
            </div>
            <div className="history-content">
              <p className="history-text">{spot.history}</p>
            </div>
          </section>

          {/* Why Special Section */}
          <section className="content-section">
            <div className="section-header">
              <h2 className="section-title">Why It's Special</h2>
            </div>
            <div className="special-content">
              <p className="special-text">{spot.whySpecial}</p>
            </div>
          </section>

          {/* Transportation Section */}
          <section className="content-section">
            <div className="section-header">
              <h2 className="section-title">How to Get There</h2>
            </div>
            <div className="transportation-grid">
              <div className="transport-option">
                <div className="transport-icon">
                  <Plane className="w-6 h-6" />
                </div>
                <div className="transport-content">
                  <h3>By Air</h3>
                  <p>{spot.transportation.byAir}</p>
                </div>
              </div>
              <div className="transport-option">
                <div className="transport-icon">
                  <Train className="w-6 h-6" />
                </div>
                <div className="transport-content">
                  <h3>By Train</h3>
                  <p>{spot.transportation.byTrain}</p>
                </div>
              </div>
              <div className="transport-option">
                <div className="transport-icon">
                  <Car className="w-6 h-6" />
                </div>
                <div className="transport-content">
                  <h3>By Road</h3>
                  <p>{spot.transportation.byRoad}</p>
                </div>
              </div>
              <div className="transport-option">
                <div className="transport-icon">
                  <Bus className="w-6 h-6" />
                </div>
                <div className="transport-content">
                  <h3>Local Transport</h3>
                  <p>{spot.transportation.localTransport}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Must Visit Inside */}
          <section className="content-section">
            <div className="section-header">
              <h2 className="section-title">Must-Visit Spots Inside</h2>
            </div>
            <div className="must-visit-grid">
              {spot.mustVisitInside.map((place, index) => (
                <div key={index} className="must-visit-card">
                  <div className="must-visit-icon">{place.icon}</div>
                  <div className="must-visit-content">
                    <h3 className="must-visit-name">{place.name}</h3>
                    <p className="must-visit-description">{place.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Nearby Attractions */}
          <section className="content-section">
            <div className="section-header">
              <h2 className="section-title">Nearby Attractions</h2>
            </div>
            <div className="nearby-grid">
              {spot.nearbyAttractions.map((attraction, index) => (
                <div key={index} className="nearby-card">
                  <div className="nearby-image">
                    <img src={attraction.image} alt={attraction.name} />
                  </div>
                  <div className="nearby-content">
                    <h3 className="nearby-name">{attraction.name}</h3>
                    <p className="nearby-distance">{attraction.distance}</p>
                    <p className="nearby-description">{attraction.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experiences */}
          <section className="content-section">
            <div className="section-header">
              <h2 className="section-title">Unique Experiences</h2>
            </div>
            <div className="experiences-grid">
              {spot.experiences.map((experience, index) => (
                <div key={index} className="experience-card">
                  <div className="experience-icon">{experience.icon}</div>
                  <div className="experience-content">
                    <h3 className="experience-label">{experience.label}</h3>
                    <p className="experience-description">{experience.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Hotels Section */}
          <section className="content-section">
            <div className="section-header">
              <h2 className="section-title">Recommended Hotels</h2>
            </div>
            <div className="hotels-grid">
              {spot.hotels.map((hotel, index) => (
                <div key={index} className="hotel-card">
                  <div className="hotel-image">
                    <img src={hotel.image} alt={hotel.name} />
                  </div>
                  <div className="hotel-content">
                    <h3 className="hotel-name">{hotel.name}</h3>
                    <p className="hotel-description">{hotel.description}</p>
                    <div className="hotel-rating">
                      <div className="stars">
                        {[...Array(hotel.rating)].map((_, i) => (
                          <Star key={i} className="star" />
                        ))}
                      </div>
                      <span className="hotel-price">{hotel.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Fun Activities */}
          <section className="content-section">
            <div className="section-header">
              <h2 className="section-title">Fun Activities & Experiences</h2>
            </div>
            <div className="fun-activities">
              {spot.funSpots.map((activity, index) => (
                <div key={index} className="fun-activity-item">
                  <div className="fun-activity-bullet"></div>
                  <span className="fun-activity-text">{activity}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <button
            onClick={() => navigate('/suggestion')}
            className="cta-button"
          >
            Plan Your Trip Here
            <ArrowLeft className="cta-icon" style={{ transform: 'rotate(180deg)' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TouristSpotDetail;