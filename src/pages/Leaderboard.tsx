import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Trophy, Calendar, Star } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import LeaderboardEntry from '../components/leaderboard/LeaderboardEntry';
import { buildMatchLeaderboard } from '../utils/leaderboardUtils';
import type { LeaderboardEntry as LeaderboardEntryType } from '../types/leaderboard';
import { db } from '../lib/firebase';
import type { Match } from '../types';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const matchesSnapshot = await getDocs(collection(db, 'matches'));
        const matchesData = matchesSnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp.toDate()
          }))
          .filter(match => match.status === 'completed')
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()) as Match[];

        setMatches(matchesData);
        
        if (matchesData.length > 0) {
          setSelectedMatch(matchesData[0].id);
        } else {
          setError('No completed matches found');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
        setError('Failed to load matches');
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!selectedMatch) return;
      
      setLoading(true);
      try {
        const data = await buildMatchLeaderboard(selectedMatch);
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError('Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [selectedMatch]);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 text-center">
            <Trophy className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <p className="text-purple-200">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <Trophy className="h-6 w-6 mr-2 text-yellow-400" />
              Match Leaderboard
            </h1>
            
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Calendar className="h-5 w-5 text-purple-200" />
              <select
                value={selectedMatch}
                onChange={(e) => setSelectedMatch(e.target.value)}
                className="bg-white/10 border border-purple-500/20 rounded-lg px-4 py-2 text-white w-full"
              >
                {matches.map(match => (
                  <option key={match.id} value={match.id}>
                    {match.description || `${match.team1} vs ${match.team2}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {leaderboard.map((entry, index) => (
              <LeaderboardEntry 
                key={entry.userId} 
                entry={entry} 
                index={index}
              />
            ))}

            {leaderboard.length === 0 && (
              <div className="text-center py-8">
                <Star className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <p className="text-purple-200">No predictions found for this match</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;