import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, CssBaseline } from '@mui/material';

// Layout components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Page components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Listings from './pages/Listings';
import FilterCreation from './pages/FilterCreation';
import SubscriptionManagement from './pages/SubscriptionManagement';
import Profile from './pages/Profile';

// Types
import { RootState } from './store';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/listings" element={isAuthenticated ? <Listings /> : <Navigate to="/login" />} />
            <Route path="/filter-creation" element={isAuthenticated ? <FilterCreation /> : <Navigate to="/login" />} />
            <Route path="/subscription-management" element={isAuthenticated ? <SubscriptionManagement /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </Container>
    </Router>
  );
};

export default App;

// Human tasks:
// 1. Implement proper authentication checks for protected routes (Critical)
// 2. Add error boundary to catch and display any runtime errors (Required)
// 3. Consider implementing lazy loading for route components to improve initial load time (Optional)