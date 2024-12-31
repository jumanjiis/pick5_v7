import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, HelpCircle, ArrowRight } from 'lucide-react';
import GoogleSignInButton from './GoogleSignInButton';

interface CTAButtonsProps {
  onGetStarted: () => void;
  isLoggedIn: boolean;
}

const CTAButtons: React.FC<CTAButtonsProps> = ({ onGetStarted, isLoggedIn }) => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
    {isLoggedIn ? (
      <button
        onClick={onGetStarted}
        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
      >
        Go to Dashboard
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </button>
    ) : (
      <GoogleSignInButton onClick={onGetStarted} />
    )}

    <div className="flex items-center gap-4 w-full sm:w-auto">
      <Link
        to="/how-to-play"
        className="group inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-white transition-all duration-300 w-full sm:w-auto"
      >
        <HelpCircle className="h-5 w-5 mr-2" />
        How to Play
      </Link>

      <a
        href="https://x.com/Pick5India"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-full bg-black/30 hover:bg-black/40 text-white transition-all duration-300 border border-blue-400/30 hover:border-blue-400/50 w-full sm:w-auto"
      >
        <Twitter className="h-5 w-5 text-blue-400 mr-2" />
        Follow for Giveaways
        <span className="ml-2 px-2 py-0.5 bg-blue-500/20 rounded-full text-sm text-blue-300">₹500</span>
      </a>
    </div>
  </div>
);

export default CTAButtons;