import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Star, Bed } from 'lucide-react';
import Navigation from './Navigation';
import '../styles/TouristSpotDetails.css';

const TouristSpotDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in a real app, this would come from an API
  const spotDetails = {
    1: {
      name: 'Taj Mahal, Agra',
      image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=800',
      days: 3,
      places: [
        'Taj Mahal at sunrise',
        'Agra Fort exploration',
        'Mehtab Bagh gardens',
        'Local bazaar shopping',
        'Tomb of Itimad-ud-Daulah'
      ],
      hotels: [
        { name: 'The Oberoi Amarvilas', rating: 5, price: '$300/night' },
        { name: 'ITC Mughal', rating: 4, price: '$150/night' },
        { name: 'Courtyard by Marriott', rating: 4, price: '$120/night' }
      ],
      funSpots: [
        'Sunset boat ride on Yamuna',
        'Heritage walk in old Agra',
        'Traditional cooking class',
        'Rickshaw tour of local markets'
      ]
    },
    2: {
      name: 'Kerala Backwaters',
      image: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800',
      days: 4,
      places: [
        'Houseboat cruise in Alleppey',
        'Kumarakom Bird Sanctuary',
        'Spice plantation tour',
        'Village cycling experience',
        'Ayurvedic spa treatment'
      ],
      hotels: [
        { name: 'Kumarakom Lake Resort', rating: 5, price: '$250/night' },
        { name: 'Backwater Ripples', rating: 4, price: '$100/night' },
        { name: 'Lake Palace Resort', rating: 4, price: '$80/night' }
      ],
      funSpots: [
        'Traditional houseboat stay',
        'Kerala cooking demonstration',
        'Coconut farm visit',
        'Sunset photography at Vembanad Lake'
      ]
    },
    3: {
      name: 'Jaipur Pink City',
      image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800',
      days: 3,
      places: [
        'Amber Fort and Palace',
        'City Palace complex',
        'Hawa Mahal facade',
        'Jantar Mantar observatory',
        'Johari Bazaar shopping'
      ],
      hotels: [
        { name: 'Rambagh Palace', rating: 5, price: '$400/night' },
        { name: 'Fairmont Jaipur', rating: 5, price: '$200/night' },
        { name: 'Holiday Inn City Centre', rating: 4, price: '$90/night' }
      ],
      funSpots: [
        'Elephant ride at Amber Fort',
        'Hot air balloon over the city',
        'Traditional puppet show',
        'Royal dinner experience'
      ]
    }
  };

  const spot = spotDetails[id] || spotDetails[1];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        {/* Hero Image and Title */}
        <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg mb-8">
          <img
            src={spot.image}
            alt={spot.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="p-8">
              <h1 className="text-4xl font-bold text-white mb-2">{spot.name}</h1>
              <div className="flex items-center gap-2 text-white">
                <Calendar className="w-5 h-5" />
                <span className="text-lg">Recommended {spot.days} days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Places to Visit */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-900">Places to Visit</h2>
            </div>
            <ul className="space-y-3">
              {spot.places.map((place, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{place}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested Hotels */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-6">
              <Bed className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-900">Suggested Hotels</h2>
            </div>
            <div className="space-y-4">
              {spot.hotels.map((hotel, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">{hotel.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(hotel.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-blue-600 font-semibold">{hotel.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fun Spots */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-900">Fun Experiences</h2>
            </div>
            <ul className="space-y-3">
              {spot.funSpots.map((spot, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{spot}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/planning')}
            className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            style={{ backgroundColor: '#687FE5' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#5a6fd8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#687FE5'}
          >
            Plan Your Trip Here
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TouristSpotDetail;