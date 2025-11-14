import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import TouristSpotDetail from "./components/TouristSpotDetail";
// Auth pages removed for no-auth flow
import ManualPlanningPage from "./components/ManualPlanningPage";
import SuggestionPlanningPage from "./components/SuggestionPlanningPage";
import ThemePlanningPage from "./components/ThemePlanningPage";
import DetailedPage from "./components/DetailedPage";
// Auth callback removed
import FeedbackPage from "./components/FeedbackPage";
import SearchResult from "./components/SearchResult"; 
import ChatbotPage from "./components/ChatbotPage";
import ItineraryResultsPage from "./components/ItineraryResultsPage";

function App() {
  return (
    <Routes>
      {/* Root goes directly to Home without authentication */}
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/search" element={<SearchResult />} />
      <Route path="/manual" element={<ManualPlanningPage />} />
      <Route path="/suggestion" element={<SuggestionPlanningPage />} />
      <Route path="/theme" element={<ThemePlanningPage />} />
      <Route path="/spot/:id" element={<TouristSpotDetail />} />
      <Route path="/details/:cityName" element={<DetailedPage />} />
      {/* Profile route removed in no-auth flow */}
      <Route path="/feedbacks" element={<FeedbackPage />} />
      <Route path="/chatbot" element={<ChatbotPage />} />
      <Route path="/itinerary-results" element={<ItineraryResultsPage />} />
    </Routes>
  );
}

export default App;

