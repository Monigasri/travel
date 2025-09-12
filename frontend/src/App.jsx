import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import TouristSpotDetail from "./components/TouristSpotDetail";
import LoginPage from "./components/LoginPage";
import ManualPlanningPage from "./components/ManualPlanningPage";
import SuggestionPlanningPage from "./components/SuggestionPlanningPage";
import ThemePlanningPage from "./components/ThemePlanningPage";
import DetailedPage from "./components/DetailedPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/manual" element={<ManualPlanningPage />} />
      <Route path="/suggestion" element={<SuggestionPlanningPage />} />
      <Route path="/theme" element={<ThemePlanningPage />} />
      <Route path="/spot" element={<TouristSpotDetail />} />
      <Route path="/details/:cityName" element={<DetailedPage />} />
    </Routes>
  );
}

export default App;
