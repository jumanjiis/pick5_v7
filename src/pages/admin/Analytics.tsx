import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Users, Target, Calendar } from 'lucide-react';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { format, startOfDay, endOfDay, subDays } from 'date-fns';
import AnalyticsCard from '../../components/analytics/AnalyticsCard';
import UserActivityChart from '../../components/analytics/UserActivityChart';
import PredictionStats from '../../components/analytics/PredictionStats';
import { calculateAnalytics } from '../../utils/analyticsUtils';

const Analytics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalPredictions: 0,
    avgAccuracy: 0,
    userActivity: [],
    predictionDistribution: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const endDate = endOfDay(new Date());
      const startDate = startOfDay(subDays(endDate, timeRange === '7d' ? 7 : 30));

      const data = await calculateAnalytics(startDate, endDate);
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <Link
            to="/admin"
            className="inline-flex items-center text-purple-200 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Admin Dashboard
          </Link>

          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white/10 border border-purple-500/20 rounded-lg px-4 py-2 text-white"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnalyticsCard
            title="Total Users"
            value={analytics.totalUsers}
            icon={<Users className="h-6 w-6 text-blue-400" />}
            trend={+5}
          />
          <AnalyticsCard
            title="Active Users"
            value={analytics.activeUsers}
            icon={<Target className="h-6 w-6 text-green-400" />}
            trend={+12}
          />
          <AnalyticsCard
            title="Total Predictions"
            value={analytics.totalPredictions}
            icon={<TrendingUp className="h-6 w-6 text-purple-400" />}
            trend={+8}
          />
          <AnalyticsCard
            title="Avg. Accuracy"
            value={`${analytics.avgAccuracy.toFixed(1)}%`}
            icon={<Calendar className="h-6 w-6 text-pink-400" />}
            trend={+2.5}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserActivityChart data={analytics.userActivity} />
          <PredictionStats data={analytics.predictionDistribution} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;