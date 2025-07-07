
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import AnimatedChart from '@/components/AnimatedChart';
import { FeatureGrid } from '@/components/FeatureGrid';
import { TokensSection } from '@/components/TokensSection';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [stats, setStats] = useState({
    tokens: 1247,
    liquidity: 2.1,
    volume: 847
  });

  // Realistic counter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        tokens: prev.tokens + Math.floor(Math.random() * 3),
        liquidity: prev.liquidity + (Math.random() - 0.5) * 0.01,
        volume: prev.volume + (Math.random() - 0.5) * 2
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section - Reduced top padding */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-up">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  Create SPL Tokens
                  <span className="block text-gradient">In Seconds</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 mb-8">
                  Deploy Solana tokens instantly with professional-grade tools. 
                  No coding required, just point, click, and launch.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Link to="/create">
                    <Button 
                      size="lg" 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
                    >
                      Create Token Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass rounded-2xl p-4 text-center animate-counter">
                    <div className="text-2xl font-bold text-blue-500 mb-1">
                      {stats.tokens.toLocaleString()}+
                    </div>
                    <div className="text-gray-400 text-sm">Tokens Created</div>
                  </div>
                  
                  <div className="glass rounded-2xl p-4 text-center animate-counter" style={{animationDelay: '0.2s'}}>
                    <div className="text-2xl font-bold text-green-500 mb-1">
                      ${stats.liquidity.toFixed(1)}M
                    </div>
                    <div className="text-gray-400 text-sm">Total Liquidity</div>
                  </div>
                  
                  <div className="glass rounded-2xl p-4 text-center animate-counter" style={{animationDelay: '0.4s'}}>
                    <div className="text-2xl font-bold text-purple-500 mb-1">
                      ${stats.volume.toLocaleString()}K
                    </div>
                    <div className="text-gray-400 text-sm">24h Volume</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <AnimatedChart className="animate-fade-in" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Choose Omnipad?</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Professional token creation tools with enterprise-grade security and instant deployment.
              </p>
            </div>

            <FeatureGrid />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass rounded-3xl p-12">
              <h2 className="text-4xl font-bold mb-6">Ready to Launch Your Token?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of projects that trust Omnipad for their token creation needs.
              </p>
              <Link to="/create">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Tokens Made by Customers Section */}
        <TokensSection />

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <img 
                    src="https://i.ibb.co/8nVTNNzh/Omnipad.png" 
                    alt="Omnipad" 
                    className="w-8 h-8"
                  />
                  <span className="text-xl font-bold text-gradient">Omnipad</span>
                </div>
                <p className="text-gray-400 max-w-md">
                  The most trusted platform for creating and managing SPL tokens on Solana. 
                  Deploy professional-grade tokens in seconds.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <div className="space-y-2">
                  <Link to="/terms" className="block text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                  <Link to="/privacy" className="block text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                  <Link to="/security" className="block text-gray-400 hover:text-white transition-colors">
                    Security
                  </Link>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Community</h4>
                <div className="space-y-2">
                  <a 
                    href="https://t.me/omnipadllc" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Telegram
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Omnipad. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default Index;
