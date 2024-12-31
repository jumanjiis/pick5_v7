import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

interface GoogleSignInButtonProps {
  onClick: () => void;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onClick }) => (
  <div className="relative group w-full sm:w-auto">
    <button
      onClick={onClick}
      className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-purple-600 via-green-500 to-purple-600 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:from-purple-700 hover:via-green-600 hover:to-purple-700 w-full sm:w-auto border border-purple-400/20"
    >
      <div className="flex items-center">
        {/* Pick5 Logo */}
        <div className="relative mr-3">
          <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Star className="h-3 w-3 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full flex items-center justify-center text-white text-[8px] font-bold">
            5
          </div>
        </div>

        {/* Google Logo */}
        <div className="bg-white rounded-full p-1 mr-3">
          <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </div>
        Start Playing Now
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 bg-black/80 text-white text-sm py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
      Sign in with Google to start playing
    </div>
  </div>
);

export default GoogleSignInButton;