import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import CreateMatch from './CreateMatch';
import ManageMatches from './ManageMatches';
import ManagePlayers from './ManagePlayers';
import MatchPredictions from './MatchPredictions';
import Analytics from './Analytics';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="matches/create" element={<CreateMatch />} />
      <Route path="matches" element={<ManageMatches />} />
      <Route path="players" element={<ManagePlayers />} />
      <Route path="match-predictions" element={<MatchPredictions />} />
      <Route path="analytics" element={<Analytics />} />
    </Routes>
  );
};

export default AdminRoutes;