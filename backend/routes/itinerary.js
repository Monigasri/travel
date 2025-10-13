const express = require('express');
const router = express.Router();
const axios = require('axios');

const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Helper: attempt to extract a JSON object from arbitrary text
function extractJSONObject(text) {
  if (!text || typeof text !== 'string') throw new Error('No text to parse');
  let t = text.trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
  try { return JSON.parse(t); } catch (_) {}
  const first = t.indexOf('{');
  const last = t.lastIndexOf('}');
  if (first !== -1 && last !== -1 && last > first) {
    const cand = t.slice(first, last + 1).replace(/,\s*(?=[}\]])/g, '');
    try { return JSON.parse(cand); } catch (_) {
      const sanitized = cand.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');
      return JSON.parse(sanitized);
    }
  }
  throw new Error('Could not find JSON object');
}

// Detects clearly generic/placeholder names produced by fallback content
function isGenericName(name = '') {
  const n = String(name).toLowerCase();
  return /famous\s+tourist\s+spot|local\s+cuisine\s+restaurant|cultural\s+heritage\s+site|restaurant\s+\d+|hotel\s+\d+|spot\s+\d+/.test(n);
}

// Fetch specific lists (touristSpots, hotels, restaurants) for a destination via Groq
async function fetchSpecificLists(destination) {
  const resp = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'Output ONLY valid JSON with keys touristSpots, hiddenGems, hotels, restaurants. ' +
            'Each item MUST include: {"name": string, "address": string, "description": string, "lat"?: number, "lng"?: number, "rating"?: number}. ' +
            'hiddenGems are non-obvious places locals love (alleys, viewpoints, small museums). ' +
            'Do not use placeholders; use real, commonly-known names for touristSpots and realistic "gems" for hiddenGems.'
        },
        {
          role: 'user',
          content: `List at least 20 famous touristSpots and at least 20 hiddenGems, plus at least 10 hotels and 10 restaurants in ${destination}. Return ONLY JSON with keys: touristSpots, hiddenGems, hotels, restaurants.`
        }
      ]
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`
      }
    }
  );
  const text = String(resp.data?.choices?.[0]?.message?.content || '').trim();
  return extractJSONObject(text);
}

// Replace generic names in an itinerary using fetched specific lists
function replaceGenericItems(itineraryDays = [], lists = {}) {
  const spots = Array.isArray(lists.touristSpots) ? lists.touristSpots : [];
  const gems = Array.isArray(lists.hiddenGems) ? lists.hiddenGems : [];
  const restos = Array.isArray(lists.restaurants) ? lists.restaurants : [];
  const hotels = Array.isArray(lists.hotels) ? lists.hotels : [];
  let s = 0, g = 0, r = 0, h = 0;

  return itineraryDays.map(day => ({
    ...day,
    items: (day.items || []).map(item => {
      const out = { ...item };
      if (isGenericName(item.name)) {
        if ((item.category === 'spot' || item.type === 'sightseeing')) {
          const pool = (gems.length ? [gems[g % gems.length], (g+=1, null)] : [null]).concat(spots.length ? [spots[s % spots.length]] : []);
          const pick = pool.find(Boolean) || spots[s % (spots.length || 1)]; if (pick) { s += 1; }
          if (pick) {
            out.name = pick.name || out.name;
            out.address = pick.address || out.address;
            out.description = pick.description || out.description;
            out.bestTimeToVisit = pick.bestTimeToVisit || out.bestTimeToVisit;
            if (typeof pick.lat === 'number') out.lat = pick.lat;
            if (typeof pick.lng === 'number') out.lng = pick.lng;
            // Tag hidden gems when source matches hiddenGems list
            const fromGem = gems.some(gm => (gm.name || '').toLowerCase() === (pick.name || '').toLowerCase());
            if (fromGem) out.isHiddenGem = true;
          }
        } else if ((item.category === 'restaurant' || item.type === 'meal') && restos.length) {
          const pick = restos[r % restos.length]; r += 1;
          out.name = pick.name || out.name;
          out.address = pick.address || out.address;
          out.description = pick.description || out.description;
          if (typeof pick.lat === 'number') out.lat = pick.lat;
          if (typeof pick.lng === 'number') out.lng = pick.lng;
        } else if (item.category === 'hotel' && hotels.length) {
          const pick = hotels[h % hotels.length]; h += 1;
          out.name = pick.name || out.name;
          out.address = pick.address || out.address;
          out.description = pick.description || out.description;
          if (typeof pick.lat === 'number') out.lat = pick.lat;
          if (typeof pick.lng === 'number') out.lng = pick.lng;
        }
      }
      return out;
    })
  }));
}

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
    const { destination, startDate, days, budget, travelers, pace, interests, desiredPlacesPerDay } = req.body || {};
    console.log('🗺️ Itinerary request received:', { destination, startDate, days });

    // Target number of places per day (default 7, bounded 6-10)
    const targetPerDay = Math.max(6, Math.min(10, Number(desiredPlacesPerDay) || 7));

    if (!destination || !startDate || !days) {
      return res.status(400).json({ error: 'destination, startDate and days are required' });
    }

    // If no API key, return fallback immediately
    if (!GROQ_API_KEY) {
      console.log('⚠️ GROQ_API_KEY not configured, using fallback');
      return res.json(createFallbackItinerary(destination, startDate, days));
    }

    // Template with guide extras to merge into AI output
    const fallbackTemplate = createFallbackItinerary(destination, startDate, days);

    // Call Groq to generate a specific, destination-aware itinerary
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        temperature: 0.2,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content:
              'You are a travel planner. Output ONLY valid JSON that strictly follows this schema: ' +
              '{"city": string, "startDate": string (YYYY-MM-DD), "days": number, ' +
              '"itinerary": [{"day": number, "date": string, "summary": string, ' +
              '"items": [{"time": string, "type": "sightseeing"|"meal"|"hotel", ' +
              '"name": string, "address": string, "description": string, ' +
              '"durationMins": number, "category": "spot"|"restaurant"|"hotel", ' +
              '"tips"?: string, "entryFee"?: string, "openingHours"?: string, ' +
              '"bestTimeToVisit"?: string, "transportFromPrevious"?: string, ' +
              '"photoSpots"?: string, "localTips"?: string}]}], ' +
              '"topSpots"?: [{"name": string, "address": string, "description": string, "rating"?: number, "mustDo"?: string}], ' +
              '"hotels"?: [{"name": string, "address": string, "priceRange"?: string, "rating"?: number, "amenities"?: string, "bookingTip"?: string}], ' +
              '"restaurants"?: [{"name": string, "address": string, "specialties"?: string, "priceRange"?: string, "rating"?: number, "mustTry"?: string}]}. ' +
              'No markdown, no commentary.'
          },
          {
            role: 'user',
            content:
              `Create a ${days}-day day-by-day itinerary for ${destination} starting ${startDate}. ` +
              `Use specific famous tourist spots, actual addresses, and realistic durations. ` +
              `Include signature local restaurants and 2-3 hotels with budget range. ` +
              `Focus on minimal backtracking and efficient routing.`
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        }
      }
    );

    // Parse model output
    const aiText = String(response.data?.choices?.[0]?.message?.content || '').trim();
    let parsed;
    try {
      parsed = extractJSONObject(aiText);
    } catch (e) {
      console.warn('Groq itinerary parse failed; returning fallback.');
      return res.json(fallbackTemplate);
    }

    // Merge with guide extras from fallback
    let merged = {
      ...fallbackTemplate,
      city: parsed.city || destination,
      startDate: parsed.startDate || startDate,
      days: parsed.days || parseInt(days),
      itinerary: Array.isArray(parsed.itinerary) && parsed.itinerary.length ? parsed.itinerary : fallbackTemplate.itinerary,
      topSpots: Array.isArray(parsed.topSpots) && parsed.topSpots.length ? parsed.topSpots : fallbackTemplate.topSpots,
      hotels: Array.isArray(parsed.hotels) && parsed.hotels.length ? parsed.hotels : fallbackTemplate.hotels,
      restaurants: Array.isArray(parsed.restaurants) && parsed.restaurants.length ? parsed.restaurants : fallbackTemplate.restaurants
    };

    // Helper functions for ordering/filling
    const toCoord = (it) => (typeof it.lat === 'number' && typeof it.lng === 'number') ? { lat: it.lat, lng: it.lng } : null;
    const R = 6371; // km
    const distKm = (a, b) => {
      const toRad = (d) => d * Math.PI / 180;
      const dLat = toRad(b.lat - a.lat);
      const dLng = toRad(b.lng - a.lng);
      const aa = Math.sin(dLat/2)**2 + Math.cos(toRad(a.lat))*Math.cos(toRad(b.lat))*Math.sin(dLng/2)**2;
      const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1-aa));
      return R * c;
    };
    const orderByProximity = (items) => {
      const withC = items.filter(i => toCoord(i));
      const withoutC = items.filter(i => !toCoord(i));
      if (withC.length < 2) return items;
      const used = new Set();
      let route = [];
      let current = 0; // start from first with coords
      used.add(current);
      route.push(withC[current]);
      while (route.length < withC.length) {
        let bestIdx = -1, bestD = Infinity;
        for (let i = 0; i < withC.length; i++) {
          if (used.has(i)) continue;
          const d = distKm(toCoord(withC[current]), toCoord(withC[i]));
          if (d < bestD) { bestD = d; bestIdx = i; }
        }
        used.add(bestIdx);
        route.push(withC[bestIdx]);
        current = bestIdx;
      }
      return route.concat(withoutC);
    };

    // Try enrichment and ensure min 8 items/day
    const needsEnrichment = (merged.itinerary || []).some(day => (day.items || []).some(it => isGenericName(it.name)) || (day.items || []).length < targetPerDay);
    if (needsEnrichment) {
      try {
        const lists = await fetchSpecificLists(destination);

        // Replace generics first
        let newItin = replaceGenericItems(merged.itinerary, lists);

        // Fill missing to reach targetPerDay using hiddenGems -> touristSpots -> restaurants (last resort)
        const gems = Array.isArray(lists.hiddenGems) ? lists.hiddenGems : [];
        const spots = Array.isArray(lists.touristSpots) ? lists.touristSpots : [];
        const restos = Array.isArray(lists.restaurants) ? lists.restaurants : [];
        const gemCount = gems.length;
        const spotCount = spots.length;
        const combined = [...gems, ...spots, ...restos];

        // Build unique, destination-wide pool and distribute across days to avoid repeats
        // Dedupe combined by name (case-insensitive)
        const seen = new Set();
        const master = [];
        for (const pick of combined) {
          const key = (pick?.name || '').toLowerCase();
          if (!key || seen.has(key)) continue;
          seen.add(key);
          master.push(pick);
        }

        // Prepare per-day items without duplicates across days
        const dayCount = newItin.length;
        const perDay = newItin.map(day => ({ ...day, items: [] }));

        // First pass: keep existing per-day items but enforce global uniqueness
        const globalUsed = new Set();
        for (let d = 0; d < dayCount; d++) {
          const existing = Array.isArray(newItin[d].items) ? newItin[d].items : [];
          for (const it of existing) {
            const key = (it?.name || '').toLowerCase();
            if (!key || globalUsed.has(key)) continue; // drop duplicates across days
            globalUsed.add(key);
            perDay[d].items.push(it);
          }
        }

        // Second pass: fill up to targetPerDay using master list (hiddenGems -> spots -> restaurants order already in 'combined')
        let idx = 0;
        for (let d = 0; d < dayCount; d++) {
          while (perDay[d].items.length < targetPerDay && idx < master.length) {
            const pick = master[idx++];
            const key = (pick?.name || '').toLowerCase();
            if (!key || globalUsed.has(key)) continue;
            globalUsed.add(key);
            const isRestaurant = (idx - 1) >= (gemCount + spotCount);
            perDay[d].items.push({
              type: isRestaurant ? 'meal' : 'sightseeing',
              category: isRestaurant ? 'restaurant' : 'spot',
              name: pick.name,
              address: pick.address,
              description: pick.description,
              bestTimeToVisit: pick.bestTimeToVisit,
              lat: pick.lat,
              lng: pick.lng,
              isHiddenGem: !isRestaurant && (idx - 1) < gemCount
            });
          }
        }

        // Third pass (optional): distribute the rest round-robin up to max 10 per day
        const maxPerDay = Math.max(targetPerDay, 10);
        let safety = 0;
        while (idx < master.length && safety < master.length * 2) {
          let filledAny = false;
          for (let d = 0; d < dayCount && idx < master.length; d++) {
            if (perDay[d].items.length >= maxPerDay) continue;
            const pick = master[idx++];
            const key = (pick?.name || '').toLowerCase();
            if (!key || globalUsed.has(key)) continue;
            globalUsed.add(key);
            const isRestaurant = (idx - 1) >= (gemCount + spotCount);
            perDay[d].items.push({
              type: isRestaurant ? 'meal' : 'sightseeing',
              category: isRestaurant ? 'restaurant' : 'spot',
              name: pick.name,
              address: pick.address,
              description: pick.description,
              bestTimeToVisit: pick.bestTimeToVisit,
              lat: pick.lat,
              lng: pick.lng,
              isHiddenGem: !isRestaurant && (idx - 1) < gemCount
            });
            filledAny = true;
          }
          if (!filledAny) break;
          safety++;
        }

        // Finalize: strip time and order by proximity within each day
        newItin = perDay.map(day => {
          const noTime = (day.items || []).map(({ time, ...rest }) => rest);
          const ordered = orderByProximity(noTime);
          return { ...day, items: ordered };
        });
        

        merged = {
          ...merged,
          itinerary: newItin,
          topSpots: Array.isArray(lists.touristSpots) && lists.touristSpots.length ? lists.touristSpots : merged.topSpots,
          hotels: Array.isArray(lists.hotels) && lists.hotels.length ? lists.hotels : merged.hotels,
          restaurants: Array.isArray(lists.restaurants) && lists.restaurants.length ? lists.restaurants : merged.restaurants,
          hiddenGems: Array.isArray(lists.hiddenGems) && lists.hiddenGems.length ? lists.hiddenGems : merged.hiddenGems,
        };
      } catch (enrichErr) {
        console.warn('Enrichment/fill/order failed; proceeding with existing data.');
        // Strip time anyway
        merged.itinerary = (merged.itinerary || []).map(day => ({ ...day, items: (day.items || []).map(({ time, ...rest }) => rest) }));
      }
    } else {
      // Strip time anyway
      merged.itinerary = (merged.itinerary || []).map(day => ({ ...day, items: (day.items || []).map(({ time, ...rest }) => rest) }));
    }

    return res.json(merged);

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