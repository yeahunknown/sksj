
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react';
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
          <div className="max-w-6xl mx-auto text-center">
            <div className="animate-slide-up">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Create SPL Tokens
                <span className="block text-gradient">In Seconds</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Deploy Solana tokens instantly with professional-grade tools. 
                No coding required, just point, click, and launch.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link to="/create">
                  <Button 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Create Token Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                
                <Link to="/portfolio">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="glass border-white/20 px-8 py-4 text-lg hover:bg-white/10 transition-all duration-300"
                  >
                    View Portfolio
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="glass rounded-2xl p-6 text-center animate-counter">
                  <div className="text-3xl font-bold text-blue-500 mb-2">
                    {stats.tokens.toLocaleString()}+
                  </div>
                  <div className="text-gray-400">Tokens Created</div>
                </div>
                
                <div className="glass rounded-2xl p-6 text-center animate-counter" style={{animationDelay: '0.2s'}}>
                  <div className="text-3xl font-bold text-green-500 mb-2">
                    ${stats.liquidity.toFixed(1)}M
                  </div>
                  <div className="text-gray-400">Total Liquidity</div>
                </div>
                
                <div className="glass rounded-2xl p-6 text-center animate-counter" style={{animationDelay: '0.4s'}}>
                  <div className="text-3xl font-bold text-purple-500 mb-2">
                    ${stats.volume.toLocaleString()}K
                  </div>
                  <div className="text-gray-400">24h Volume</div>
                </div>
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

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Instant Deploy</h3>
                <p className="text-gray-400">
                  Deploy your token to Solana mainnet in under 30 seconds with our optimized infrastructure.
                </p>
              </div>

              <div className="glass rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Secure by Default</h3>
                <p className="text-gray-400">
                  Built-in security features including freeze authority, mint controls, and metadata protection.
                </p>
              </div>

              <div className="glass rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Add Liquidity</h3>
                <p className="text-gray-400">
                  Seamlessly add liquidity to DEX platforms and track your token's performance in real-time.
                </p>
              </div>
            </div>
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
      </div>
    </Layout>
  );
};

export default Index;
