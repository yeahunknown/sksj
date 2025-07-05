
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import WithdrawLiquidityModal from '@/components/WithdrawLiquidityModal';

// Mock token data - in real app this would come from API/database
const mockTokens = [
  {
    id: '1',
    name: 'MyToken',
    symbol: 'MTK',
    imageUrl: null,
    liquidity: 12.6,
    price: 0.0034,
    priceChange24h: 5.23,
    volume24h: 45600,
    marketCap: 1240000,
    chartData: [
      { time: '00:00', price: 0.0032 },
      { time: '04:00', price: 0.0031 },
      { time: '08:00', price: 0.0033 },
      { time: '12:00', price: 0.0035 },
      { time: '16:00', price: 0.0036 },
      { time: '20:00', price: 0.0034 },
      { time: '24:00', price: 0.0034 }
    ]
  }
];

const Portfolio = () => {
  const [tokens, setTokens] = useState(mockTokens);
  const [selectedToken, setSelectedToken] = useState<typeof mockTokens[0] | null>(null);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  // Simulate token price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTokens(prevTokens => 
        prevTokens.map(token => ({
          ...token,
          price: token.price + (Math.random() - 0.5) * 0.0001,
          priceChange24h: token.priceChange24h + (Math.random() - 0.5) * 0.5
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleWithdrawLiquidity = (token: typeof mockTokens[0]) => {
    setSelectedToken(token);
    setShowWithdrawModal(true);
  };

  // Show empty state if no tokens with liquidity
  if (tokens.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen py-8 flex items-center justify-center">
          <div className="max-w-md mx-auto px-4">
            <div className="glass rounded-2xl p-12 text-center">
              <div className="w-20 h-20 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-300">No token created</h3>
              <p className="text-gray-400">
                Create your first token to get started with liquidity management
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
            <p className="text-xl text-gray-300">Track your token holdings and performance</p>
          </div>

          <div className="grid gap-6">
            {tokens.map((token) => (
              <div key={token.id} className="glass rounded-2xl p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Token Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden">
                      {token.imageUrl ? (
                        <img 
                          src={token.imageUrl} 
                          alt={token.name} 
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xl font-bold">
                          {token.symbol[0]}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{token.name}</h3>
                      <p className="text-gray-400">${token.symbol}</p>
                      <p className="text-sm text-blue-400">{token.liquidity} SOL</p>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={token.chartData}>
                        <XAxis dataKey="time" hide />
                        <YAxis hide />
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          stroke="#3B82F6" 
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Stats & Actions */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Price</p>
                        <div className="flex items-center space-x-1">
                          <span className="font-semibold">${token.price.toFixed(6)}</span>
                          {token.priceChange24h > 0 ? (
                            <TrendingUp className="w-3 h-3 text-green-500" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-500" />
                          )}
                          <span className={token.priceChange24h > 0 ? 'text-green-500' : 'text-red-500'}>
                            {token.priceChange24h > 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400">Volume 24h</p>
                        <p className="font-semibold">${token.volume24h.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Market Cap</p>
                        <p className="font-semibold">${token.marketCap.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Liquidity</p>
                        <p className="font-semibold text-blue-400">{token.liquidity} SOL</p>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => handleWithdrawLiquidity(token)}
                      variant="outline"
                      className="w-full glass border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      Withdraw Liquidity
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <WithdrawLiquidityModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        token={selectedToken}
      />
    </Layout>
  );
};

export default Portfolio;
