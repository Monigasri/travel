import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import TouristSpotDetail from "./components/TouristSpotDetail";
import LoginPage from "./components/LoginPage";
import SignInPage from "./components/SignInPage";
import ProfilePage from "./components/ProfilePage";
import ManualPlanningPage from "./components/ManualPlanningPage";
import SuggestionPlanningPage from "./components/SuggestionPlanningPage";
import ThemePlanningPage from "./components/ThemePlanningPage";
import DetailedPage from "./components/DetailedPage";
import AuthCallback from "./components/AuthCallback";
import FeedbackPage from "./components/FeedbackPage";
import SearchResult from "./components/SearchResult"; 
import ChatbotPage from "./components/ChatbotPage";
import ItineraryResultsPage from "./components/ItineraryResultsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/search" element={<SearchResult />} />
      <Route path="/manual" element={<ManualPlanningPage />} />
      <Route path="/suggestion" element={<SuggestionPlanningPage />} />
      <Route path="/theme" element={<ThemePlanningPage />} />
      <Route path="/spot/:id" element={<TouristSpotDetail />} />
      <Route path="/details/:cityName" element={<DetailedPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/feedbacks" element={<FeedbackPage />} />
      <Route path="/chatbot" element={<ChatbotPage />} />
      <Route path="/itinerary-results" element={<ItineraryResultsPage />} />
    </Routes>
  );
}

export default App;

