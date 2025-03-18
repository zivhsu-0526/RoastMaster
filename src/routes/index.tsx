import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/Auth/LoginPage';
import HomePage from '../pages/Home/HomePage';
import RoastingRecordsPage from '../pages/RoastingRecords/RoastingRecordsPage';
import DataVisualizationPage from '../pages/Visualization/DataVisualizationPage';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../contexts/AuthContext';

// Placeholder components for other pages
const StatisticsPage: React.FC = () => (
  <div style={{ padding: '20px' }}>
    <h1>Statistics</h1>
    <p>Coming Soon</p>
  </div>
);

const ProfilePage: React.FC = () => (
  <div style={{ padding: '20px' }}>
    <h1>Profile</h1>
    <p>Coming Soon</p>
  </div>
);

const SettingsPage: React.FC = () => (
  <div style={{ padding: '20px' }}>
    <h1>Settings</h1>
    <p>Coming Soon</p>
  </div>
);

const ContactPage: React.FC = () => (
  <div style={{ padding: '20px' }}>
    <h1>Contact</h1>
    <p>Coming Soon</p>
  </div>
);

// Protected Route component
const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Layout />;
};

/**
 * AppRoutes component sets up the application's routing structure.
 * It defines the paths and corresponding components for each route within the app
 * using a <Routes> component wrapped in a <Layout>. 
 * It includes routes for home, roasting records, data visualization, statistics,
 * profile, settings, and contact pages. An additional route is defined to handle
 * any unmatched paths by redirecting to the home page.
 */
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route index element={<HomePage />} />
        <Route path="/roasting-records" element={<RoastingRecordsPage />} />
        <Route path="/visualization" element={<DataVisualizationPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
