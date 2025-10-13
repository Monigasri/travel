const express = require('express');
const router = express.Router();
const axios = require('axios');

const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Simple fallback function that always works
function createFallbackItinerary(destination, startDate, days) {
  const startDateObj = new Date(startDate);
  const itinerary = [];
  
  for (let i = 1; i <= days; i++) {
    const currentDate = new Date(startDateObj);
    currentDate.setDate(startDateObj.getDate() + (i - 1));
    
    itinerary.push({
      day: i,
      date: currentDate.toISOString().split('T')[0],
      summary: `Exploring ${destination} - Day ${i}`,
      items: [
        {
          time: '09:00',
          type: 'sightseeing',
          name: `Famous Tourist Spot ${i}`,
          address: `Main Tourist Area, ${destination}`,
          description: `A must-visit attraction showcasing the beauty and culture of ${destination}`,
          durationMins: 120,
          category: 'spot',
          tips: 'Visit early morning for best experience and fewer crowds',
          entryFee: '₹50 per person',
          openingHours: '9:00 AM - 6:00 PM',
          bestTimeToVisit: 'Early morning',
          transportFromPrevious: i === 1 ? 'Starting point' : '15 min auto-rickshaw ride',
          photoSpots: 'Main entrance, garden area, and sunset viewpoint',
          localTips: 'Carry water, wear comfortable shoes, and respect local customs'
        },
        {
          time: '13:00',
          type: 'meal',
          name: `Local Cuisine Restaurant ${i}`,
          address: `Food Street, ${destination}`,
          description: 'Authentic local restaurant serving traditional dishes',
          durationMins: 90,
          category: 'restaurant',
          tips: 'Try the regional specialty and ask for mild spice level',
          entryFee: '₹300-500 per person',
          openingHours: '11:00 AM - 10:00 PM',
          bestTimeToVisit: 'Lunch time',
          transportFromPrevious: '10 min walk from previous location',
          photoSpots: 'Traditional food presentation and restaurant ambiance',
          localTips: 'Book table in advance during peak tourist season'
        },
        {
          time: '16:00',
          type: 'sightseeing',
          name: `Cultural Heritage Site ${i}`,
          address: `Heritage District, ${destination}`,
          description: 'Historical monument reflecting the rich cultural heritage',
          durationMins: 90,
          category: 'spot',
          tips: 'Hire a local guide for detailed historical information',
          entryFee: '₹100 per person',
          openingHours: '10:00 AM - 5:00 PM',
          bestTimeToVisit: 'Late afternoon',
          transportFromPrevious: '20 min taxi ride',
          photoSpots: 'Ancient architecture and intricate carvings',
          localTips: 'Photography may require additional fees'
        }
      ]
    });
  }
  
  return {
    city: destination,
    startDate: startDate,
    days: parseInt(days),
    itinerary: itinerary,
    // Tourist-focused additions
    quickFacts: {
      country: 'Unknown (example)',
      timezone: 'Local Time',
      language: 'Local Language + English widely spoken',
      currency: 'Local Currency (₹)',
      plugType: 'Type C/D/M (check your destination)',
      tipping: 'Not mandatory; 5-10% appreciated in restaurants',
      safetyLevel: 'Generally safe; normal precautions advised'
    },
    budget: {
      estimatedDailyPerPerson: '₹3000-6000',
      breakdown: {
        accommodation: '₹1500-3000',
        food: '₹800-1500',
        transport: '₹200-600',
        attractions: '₹300-900'
      },
      sampleCosts: {
        airportTaxi: '₹800-1500',
        metroRide: '₹20-60',
        museumTicket: '₹100-300',
        coffee: '₹80-150',
        lunch: '₹250-500'
      }
    },
    transport: {
      fromAirport: 'Prepaid taxi or ride-hailing is convenient; check official counters.',
      publicTransit: 'Local buses/metro widely available; purchase day passes where available.',
      rideHailing: 'Apps like Uber/Ola may operate; cashless preferred.',
      gettingAround: 'Mix walking, short rickshaw/taxi rides, and public transit for efficiency.'
    },
    seasons: [
      { name: 'Peak', months: 'Oct–Mar', notes: 'Pleasant weather; higher prices; book early' },
      { name: 'Shoulder', months: 'Apr–Jun', notes: 'Warm; fewer crowds; some heat adjustments' },
      { name: 'Monsoon', months: 'Jul–Sep', notes: 'Rains possible; greenery; carry rain gear' }
    ],
    visa: {
      requirement: 'Varies by nationality; verify official sources',
      onArrival: 'E-visa/on-arrival may be available for some nationalities',
      documents: 'Passport validity 6+ months, return ticket, hotel bookings'
    },
    connectivity: {
      simCard: 'Airport counters often sell tourist SIMs; carry passport & photo',
      eSIM: 'eSIM options available for many regions; compare data packs',
      wifi: 'Free Wi-Fi in many cafes/hotels; speeds vary'
    },
    packingList: [
      'Comfortable walking shoes',
      'Reusable water bottle',
      'Universal power adapter',
      'Light rain jacket/umbrella (seasonal)',
      'Sunscreen & hat',
      'Medication & small first-aid kit'
    ],
    tips: {
      etiquette: 'Dress modestly at religious sites; remove shoes where required',
      scams: 'Avoid unofficial guides; agree on fares before rides',
      money: 'Keep small change for local transport/markets; cards not accepted everywhere'
    },
    topSpots: [
      {
        name: `${destination} Fort`,
        address: `Fort Road, Historic District, ${destination}`,
        description: 'Magnificent fort showcasing architectural brilliance and historical significance',
        rating: 4.5,
        mustDo: 'Take guided tour and visit museum inside'
      },
      {
        name: `${destination} Temple`,
        address: `Temple Street, Religious Quarter, ${destination}`,
        description: 'Ancient temple with stunning architecture and spiritual significance',
        rating: 4.3,
        mustDo: 'Attend evening prayer ceremony'
      },
      {
        name: `${destination} Market`,
        address: `Market Square, Commercial Area, ${destination}`,
        description: 'Vibrant local market for shopping handicrafts and local products',
        rating: 4.1,
        mustDo: 'Bargain for local handicrafts and try street food'
      }
    ],
    hotels: [
      {
        name: `Heritage Hotel ${destination}`,
        address: `Palace Road, Heritage Quarter, ${destination}`,
        priceRange: '₹3000-5000 per night',
        rating: 4.4,
        amenities: 'WiFi, AC, Restaurant, Swimming Pool, Spa',
        bookingTip: 'Book 2-3 weeks in advance for better rates'
      },
      {
        name: `Budget Inn ${destination}`,
        address: `Station Road, City Center, ${destination}`,
        priceRange: '₹1500-2500 per night',
        rating: 3.9,
        amenities: 'WiFi, AC, Restaurant, Room Service',
        bookingTip: 'Good location with basic amenities at reasonable prices'
      }
    ],
    restaurants: [
      {
        name: `Royal Kitchen ${destination}`,
        address: `Palace Street, Heritage Area, ${destination}`,
        specialties: 'Traditional royal cuisine and regional delicacies',
        priceRange: '₹800-1200 per person',
        rating: 4.6,
        mustTry: 'Royal thali and traditional sweets',
        vegetarianOptions: true
      },
      {
        name: `Street Food Corner`,
        address: `Market Street, Commercial Area, ${destination}`,
        specialties: 'Authentic street food and local snacks',
        priceRange: '₹150-300 per person',
        rating: 4.2,
        mustTry: 'Local specialty chaat and lassi',
        vegetarianOptions: true
      }
    ],
    localInfo: {
      emergencyContacts: {
        police: '100',
        medical: '108',
        tourist: '1363'
      },
      currency: 'Indian Rupee (₹)',
      language: 'Hindi and English widely spoken',
      transportation: 'Auto-rickshaw, taxi, local buses, and app-based cabs available',
      weatherTips: 'Check weather forecast, carry umbrella during monsoon, stay hydrated in summer',
      culturalTips: 'Remove shoes before entering temples, dress modestly, respect local customs and traditions',
      safetyTips: 'Keep valuables secure, avoid isolated areas at night, drink bottled water, bargain at markets'
    }
  };
}

router.post('/', async (req, res) => {
  try {
    const { destination, startDate, days, budget, travelers, pace, interests } = req.body || {};
    console.log('📝 Itinerary request received:', { destination, startDate, days });

    if (!destination || !startDate || !days) {
      return res.status(400).json({ error: 'destination, startDate and days are required' });
    }

    // For now, always return fallback response to ensure it works
    console.log('🔄 Generating fallback itinerary for testing...');
    const fallbackResponse = createFallbackItinerary(destination, startDate, days);
    
    // Add a small delay to simulate API processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('✅ Fallback itinerary generated successfully');
    return res.json(fallbackResponse);

    /* 
    // TODO: Re-enable Groq API once basic flow is working
    if (!GROQ_API_KEY) {
      console.log('⚠️ GROQ_API_KEY not configured, using fallback');
      return res.json(createFallbackItinerary(destination, startDate, days));
    }

    // Groq API logic here...
    */

  } catch (error) {
    console.error('❌ Itinerary generation error:', error.message);
    // Even if there's an error, return fallback
    try {
      const fallbackResponse = createFallbackItinerary(
        req.body?.destination || 'Sample Destination',
        req.body?.startDate || '2025-01-01',
        req.body?.days || 3
      );
      return res.json(fallbackResponse);
    } catch (fallbackError) {
      return res.status(500).json({ error: 'Server error while generating itinerary' });
    }
  }
});

module.exports = router;