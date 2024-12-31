import React from 'react';
import { Crown, Medal, Star } from 'lucide-react';
import type { LeaderboardEntry } from '../../types/leaderboard';

interface LeaderboardEntryProps {
  entry: LeaderboardEntry;
  index: number;
  showTotal?: boolean;
}

const getRankIcon = (index: number) => {
  switch (index) {
    case 0:
      return <Crown className="h-6 w-6 text-yellow-400" />;
    case 1:
      return <Medal className="h-6 w-6 text-gray-400" />;
    case 2:
      return <Medal className="h-6 w-6 text-amber-600" />;
    default:
      return <Star className="h-6 w-6 text-purple-400" />;
  }
};

const LeaderboardEntry: React.FC<LeaderboardEntryProps> = ({ entry, index, showTotal = false }) => (
  <div
    className={`bg-white/5 rounded-lg p-4 flex items-center justify-between transition-transform hover:scale-102 ${
      index === 0 ? 'bg-yellow-500/10 border border-yellow-500/20' :
      index === 1 ? 'bg-gray-500/10 border border-gray-500/20' :
      index === 2 ? 'bg-amber-500/10 border border-amber-500/20' :
      'hover:bg-white/10'
    }`}
  >
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 flex items-center justify-center">
        {getRankIcon(index)}
      </div>
      <div>
        <h3 className="text-white font-semibold">{entry.displayName}</h3>
        {showTotal && (
          <p className="text-sm text-purple-200">
            {entry.correctPredictions} of {entry.totalPredictions} correct
          </p>
        )}
      </div>
    </div>
    <div className="text-right">
      <div className={`text-2xl font-bold ${
        index === 0 ? 'text-yellow-400' :
        index === 1 ? 'text-gray-400' :
        index === 2 ? 'text-amber-600' :
        'text-purple-400'
      }`}>
        {showTotal ? 
          `${entry.accuracy.toFixed(1)}%` :
          `${entry.correctPredictions}/5`
        }
      </div>
      <div className="text-purple-200 text-sm">
        {showTotal ? 'Accuracy' : 'Correct Predictions'}
      </div>
    </div>
  </div>
);

export default LeaderboardEntry;