import React from 'react';

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  emoji: string;
}

const StepCard: React.FC<StepCardProps> = ({ icon, title, description, emoji }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
    <div className="relative mb-4">
      <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="absolute -top-2 -right-2 text-2xl animate-bounce">{emoji}</span>
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-purple-200">{description}</p>
  </div>
);

export default StepCard;