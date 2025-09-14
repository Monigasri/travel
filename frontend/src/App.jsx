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
import SearchResultsPage from "./components/SearchResultsPage";
import FeedbackPage from "./components/FeedbackPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/manual" element={<ManualPlanningPage />} />
      <Route path="/suggestion" element={<SuggestionPlanningPage />} />
      <Route path="/theme" element={<ThemePlanningPage />} />
      <Route path="/spot/:id" element={<TouristSpotDetail />} />
      <Route path="/details/:cityName" element={<DetailedPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/feedbacks" element={<FeedbackPage />} />
    </Routes>
  );
}

export default App;

