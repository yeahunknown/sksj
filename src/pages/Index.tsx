
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Zap, Check } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [tokenCount, setTokenCount] = useState(0);
  const [liquidityCount, setLiquidityCount] = useState(0);
  const [volumeCount, setVolumeCount] = useState(0);

  // Animate counters on mount with realistic values
  useEffect(() => {
    const animateCounter = (
      setter: (value: number) => void,
      target: number,
      duration: number = 2000
    ) => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };

    setTimeout(() => animateCounter(setTokenCount, 1247), 500);
    setTimeout(() => animateCounter(setLiquidityCount, 2.1), 700);
    setTimeout(() => animateCounter(setVolumeCount, 847), 900);

    // Add realistic fluctuations
    const fluctuateStats = () => {
      setInterval(() => {
        setTokenCount(prev => prev + Math.floor(Math.random() * 3));
        setLiquidityCount(prev => prev + (Math.random() - 0.5) * 0.1);
        setVolumeCount(prev => prev + (Math.random() - 0.5) * 20);
      }, 4000);
    };

    setTimeout(fluctuateStats, 3000);
  }, []);

  return (
    <Layout>
      <div className="relative">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
          
          {/* Glass orb effects */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Launch Your
              <span className="text-gradient block mt-2">SPL Token</span>
              <span className="text-white">on Solana</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              The most trusted platform for creating and launching Solana SPL tokens.
              <br />
              Secure, fast, and professional.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button
                onClick={() => navigate('/create')}
                className="px-8 py-4 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
              >
                Create a Token
              </Button>
              
              <Button
                variant="outline"
                className="px-8 py-4 text-lg glass border-white/20 text-white hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-105"
              >
                View Documentation
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass rounded-2xl p-8 text-center animate-slide-up">
                <div className="text-4xl font-bold text-blue-500 mb-2">
                  {tokenCount.toLocaleString()}
                </div>
                <div className="text-gray-300">Tokens Created</div>
              </div>
              
              <div className="glass rounded-2xl p-8 text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="text-4xl font-bold text-green-500 mb-2">
                  ${liquidityCount.toFixed(1)}M
                </div>
                <div className="text-gray-300">Total Liquidity</div>
              </div>
              
              <div className="glass rounded-2xl p-8 text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="text-4xl font-bold text-purple-500 mb-2">
                  ${volumeCount.toLocaleString()}K
                </div>
                <div className="text-gray-300">24h Volume</div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section className="py-20 px-4 bg-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Why Choose Omnipad?</h2>
              <p className="text-xl text-gray-300">Built with security and reliability in mind</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass rounded-2xl p-8 animate-slide-up">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Freeze Authority</h3>
                <p className="text-gray-300">
                  Maintain complete control over your token with optional freeze capabilities for enhanced security.
                </p>
              </div>

              <div className="glass rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Lock className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Revoke Controls</h3>
                <p className="text-gray-300">
                  Permanently revoke mint and metadata authorities to ensure token integrity and build trust.
                </p>
              </div>

              <div className="glass rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Instant Deploy</h3>
                <p className="text-gray-300">
                  Deploy your token to Solana mainnet instantly with our optimized smart contract infrastructure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">SPL Token Benefits</h2>
              <p className="text-xl text-gray-300">Leverage the power of Solana blockchain</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Ultra-Fast Transactions</h3>
                    <p className="text-gray-300">Process thousands of transactions per second with sub-second finality.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Low Transaction Costs</h3>
                    <p className="text-gray-300">Enjoy minimal fees, typically less than $0.01 per transaction.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Ecosystem Integration</h3>
                    <p className="text-gray-300">Seamlessly integrate with major DEXs, wallets, and DeFi protocols.</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Ready to Launch?</h3>
                <p className="text-gray-300 mb-8">
                  Join thousands of projects that have successfully launched their tokens on Solana using Omnipad.
                </p>
                <Button
                  onClick={() => navigate('/create')}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Start Creating Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
