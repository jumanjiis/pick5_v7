import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Save, ArrowLeft, Calendar, MapPin, Clock, XCircle, Activity } from 'lucide-react';
import { format } from 'date-fns';
import type { Match } from '../../types';
import { updateAllTimeLeaderboard } from '../../utils/leaderboardAggregator';

const ManageMatches: React.FC = () => {
  const [matches, setMatches] = useState<(Match & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMatch, setEditingMatch] = useState<(Match & { id: string }) | null>(null);
  const [editForm, setEditForm] = useState({
    team1: '',
    team2: '',
    venue: '',
    date: '',
    time: '',
    description: '',
    status: 'upcoming' as Match['status']
  });

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const matchesSnapshot = await getDocs(collection(db, 'matches'));
      const matchesData = matchesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate()
      })) as (Match & { id: string })[];

      setMatches(matchesData.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (match: Match & { id: string }) => {
    setEditingMatch(match);
    setEditForm({
      team1: match.team1,
      team2: match.team2,
      venue: match.venue,
      date: format(match.timestamp, 'yyyy-MM-dd'),
      time: format(match.timestamp, 'HH:mm'),
      description: match.description || '',
      status: match.status || 'upcoming'
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMatch) return;

    try {
      const timestamp = new Date(`${editForm.date}T${editForm.time}`);
      
      await updateDoc(doc(db, 'matches', editingMatch.id), {
        team1: editForm.team1,
        team2: editForm.team2,
        venue: editForm.venue,
        timestamp,
        description: editForm.description,
        status: editForm.status
      });

      setEditingMatch(null);
      fetchMatches();
    } catch (error) {
      console.error('Error updating match:', error);
    }
  };

  const handleDelete = async (matchId: string) => {
    if (!window.confirm('Are you sure you want to delete this match?')) return;

    try {
      await deleteDoc(doc(db, 'matches', matchId));
      fetchMatches();
    } catch (error) {
      console.error('Error deleting match:', error);
    }
  };

  const handleStatusChange = async (matchId: string, newStatus: Match['status']) => {
    try {
      await updateDoc(doc(db, 'matches', matchId), {
        status: newStatus
      });

      // Update all-time leaderboard when a match is completed
      if (newStatus === 'completed') {
        await updateAllTimeLeaderboard(matchId);
      }

      fetchMatches();
    } catch (error) {
      console.error('Error updating match status:', error);
    }
  };

  const getStatusColor = (status: Match['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-green-500/20 text-green-400';
      case 'live':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <Link
            to="/admin"
            className="inline-flex items-center text-purple-200 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Admin Dashboard
          </Link>

          <Link
            to="/admin/matches/create"
            className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center"
          >
            Create New Match
          </Link>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
          <h1 className="text-2xl font-bold text-white mb-6">Manage Matches</h1>

          <div className="space-y-4">
            {matches.map(match => (
              <div
                key={match.id}
                className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors"
              >
                {editingMatch?.id === match.id ? (
                  <form onSubmit={handleUpdate} className="space-y-4">
                    {/* Form fields */}
                    {/* ... [Previous form implementation remains the same] ... */}
                  </form>
                ) : (
                  <div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-white mb-2">
                          {match.description || `${match.team1} vs ${match.team2}`}
                        </h2>
                        <div className="space-y-1">
                          <p className="text-purple-200 flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {format(match.timestamp, 'PPP p')}
                          </p>
                          <p className="text-purple-200 flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {match.venue}
                          </p>
                          {match.description && (
                            <p className="text-purple-200 mt-2">{match.description}</p>
                          )}
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            getStatusColor(match.status)
                          }`}>
                            <Activity className="h-4 w-4 mr-1" />
                            {match.status}
                          </span>
                          <select
                            value={match.status}
                            onChange={(e) => handleStatusChange(match.id, e.target.value as Match['status'])}
                            className="bg-white/5 border border-purple-500/20 rounded-lg px-3 py-1 text-white text-sm"
                          >
                            <option value="upcoming">Set as Upcoming</option>
                            <option value="live">Set as Live</option>
                            <option value="completed">Set as Completed</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(match)}
                          className="p-2 text-blue-400 hover:text-blue-300 transition-colors rounded-lg hover:bg-blue-500/10"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(match.id)}
                          className="p-2 text-red-400 hover:text-red-300 transition-colors rounded-lg hover:bg-red-500/10"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageMatches;