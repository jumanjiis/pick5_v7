import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend: number;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, value, icon, trend }) => {
  const isPositive = trend >= 0;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
          {icon}
        </div>
        <div className={`flex items-center px-3 py-1 rounded-full text-sm ${
          isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {isPositive ? (
            <TrendingUp className="h-4 w-4 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1" />
          )}
          {Math.abs(trend)}%
        </div>
      </div>
      <h3 className="text-purple-200 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
};

export default AnalyticsCard;