import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Target, Trophy } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import StepCard from '../components/home/StepCard';
import CTAButtons from '../components/home/CTAButtons';

const Home: React.FC = () => {
  const { signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = async () => {
    if (user) {
      navigate('/dashboard');
      return;
    }

    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to sign in:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-20 pb-8 sm:pb-16 relative">
        <div className="text-center mb-8 sm:mb-16 relative">
          <div className="flex justify-center mb-16 sm:mb-24">
            <div className="relative animate-float">
              <div className="w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                <Star className="h-8 sm:h-12 w-8 sm:w-12 text-white animate-spin-slow" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 sm:w-8 h-6 sm:h-8 bg-green-400 rounded-full flex items-center justify-center text-white font-bold animate-bounce">
                5
              </div>
            </div>
              
          </div>

          <div className="animate-fade-in max-w-4xl mx-auto">
            
            <h1 className="text-5xl sm:text-8xl font-extrabold mb-8 bg-gradient-to-r from-yellow-300 via-green-300 to-pink-300 text-transparent bg-clip-text drop-shadow-lg animate-pulse">
              Win ₹10,000 Every Match!
            </h1>
             

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <StepCard
                  icon={<Target className="h-8 w-8 text-green-400" />}
                  title="Pick 5 Players"
                  description="Choose your winning squad"
                  emoji="🏏"
                />
                <StepCard
                  icon={<Trophy className="h-8 w-8 text-blue-400" />}
                  title="Beat Targets"
                  description="Meet performance goals"
                  emoji="🎯"
                />
                <StepCard
                  icon={<Star className="h-8 w-8 text-yellow-400" />}
                  title="Win ₹10,000"
                  description="Instant prize money"
                  emoji="💰"
                />
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 sm:p-6 border border-green-500/20">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left">
                    <p className="text-lg text-white mb-2">
                      <span className="font-bold text-green-400">Example:</span> Pick Virat Kohli
                    </p>
                    <p className="text-base text-purple-200">Target: 30 runs • Score 30+ = Win! 🎯</p>
                  </div>
                  <div className="text-center px-6 py-3 bg-green-500/20 rounded-xl">
                    <p className="text-green-400 font-bold text-lg">Get all 5 right = ₹10,000! 🏆</p>
                  </div>
                </div>
              </div>
            </div>

            <CTAButtons onGetStarted={handleGetStarted} isLoggedIn={!!user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;