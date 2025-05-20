// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import EventsList from './pages/EventsList';
import ClubList from './pages/ClubList';
import EventFeedback from './pages/EventFeedback';
import ClubFeedback from './pages/ClubFeedback';
import AdminDashboard from './pages/AdminDashboard';
import ThankYouPage from './pages/ThankYouPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Called from Login component on successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        
        {/* Login route - if already logged in, redirect to dashboard */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        {/* Feedback routes (assumed public or could protect similarly) */}
        <Route path="/feedback/events" element={<EventsList />} />
        <Route path="/feedback/clubs" element={<ClubList />} />
        <Route path="/eventfeedback" element={<EventFeedback />} />
        <Route path="/clubfeedback" element={<ClubFeedback />} />
        <Route path="/thank-you" element={<ThankYouPage />} />

        {/* Protected dashboard route - only if logged in */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch-all redirect for unknown routes could be added here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
