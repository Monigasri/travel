# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview

- This repository contains two separate JavaScript projects:
  - backend: Express server with session-based auth (Passport: Google OAuth + Local), MongoDB (Mongoose), and API routes for chatbot, Groq-powered search, itinerary generation (currently returns a local fallback), and feedback capture.
  - frontend: React (Vite) single-page app using React Router. Pages include sign-in/login, home, search results, planning flows (manual, suggestion, theme), detailed view, profile, feedback, chatbot, and itinerary results.

- Local service assumptions:
  - MongoDB is expected at mongodb://127.0.0.1:27017/ai-travel-planner (hardcoded in backend/server.js).
  - CORS origin is http://localhost:5173 (frontend dev server).
  - Sensitive settings are read from environment variables. Define them via a .env file or your shell environment without committing credentials.
    - Backend uses: SESSION_SECRET, GROQ_API_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET.

Common commands

- Backend (Express + MongoDB)
  - Install dependencies
    - Windows/macOS/Linux:
      - cd backend
      - npm install
  - Run in dev (nodemon)
    - cd backend
    - npm run dev
  - Start (node)
    - cd backend
    - npm start
  - Lint: no lint script is configured in backend/package.json.
  - Tests: no test framework is configured (the default script exits with an error placeholder).

- Frontend (React + Vite)
  - Install dependencies
    - cd frontend
    - npm install
  - Dev server (default http://localhost:5173)
    - cd frontend
    - npm run dev
  - Build
    - cd frontend
    - npm run build
  - Preview production build
    - cd frontend
    - npm run preview
  - Lint (ESLint via flat config)
    - cd frontend
    - npm run lint

High-level architecture

- Backend
  - Entry point: backend/server.js
    - Sets up Express, CORS (origin http://localhost:5173), JSON parsing, express-session, and Passport initialization; connects to MongoDB.
    - Registers routes:
      - /auth: OAuth and local auth (backend/routes/auth.js)
      - /api/groq: Groq proxy (backend/routes/groq.js)
      - /api/chatbot: Chat completions via Groq (backend/routes/chatbot.js)
      - /api/itinerary: Itinerary generation (backend/routes/itinerary.js) — returns a deterministic fallback payload at present
      - POST /api/feedback: Persists feedback to MongoDB
  - Auth: backend/config/passport.js
    - GoogleStrategy (requires GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET) and LocalStrategy (email/password vs stored passwordHash)
    - Sessions serialize by user.id
  - Data models (Mongoose)
    - backend/models/userModel.js: User with googleId, name, username, email, avatarUrl, passwordHash
    - backend/models/Feedback.js: Feedback with name, email, message, timestamps

- Frontend
  - Vite + React 19 app (frontend)
  - Router: frontend/src/App.jsx defines routes
    - /, /login, /auth/callback, /home, /search, /manual, /suggestion, /theme, /spot/:id, /details/:cityName, /profile, /feedbacks, /chatbot, /itinerary-results
  - ESLint: frontend/eslint.config.js (flat config)
    - Extends @eslint/js recommended, react-hooks, and react-refresh (Vite)

Notable integration points

- The frontend should call backend endpoints on http://localhost:5000 (default backend port) while dev-serving on 5173. Ensure the origin in server.js matches the dev URL in use.
- The itinerary route currently returns a locally generated fallback response regardless of GROQ_API_KEY presence; re-enable live Groq logic in backend/routes/itinerary.js when ready.

Environment setup notes

- Backend .env keys (names only; do not commit values): SESSION_SECRET, GROQ_API_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
- MongoDB must be running locally (or adjust the connection string in backend/server.js).

CI/agents/readme

- There is no existing WARP.md, CLAUDE.md, Cursor rules, or Copilot-specific instruction file in this repo.
- The frontend’s README is the default Vite template and does not alter the commands above.
