import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './AppRoutes';
import { initializeAuctionPlayers } from './data/auctionPlayers';

const App: React.FC = () => {
  useEffect(() => {
    const loadAuctionPlayers = async () => {
      try {
        await initializeAuctionPlayers();
        console.log('Auction players initialized successfully');
      } catch (error) {
        console.error('Error initializing auction players:', error);
      }
    };

    loadAuctionPlayers();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;