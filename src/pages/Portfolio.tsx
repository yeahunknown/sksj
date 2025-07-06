
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import WithdrawLiquidityModal from '@/components/WithdrawLiquidityModal';

interface Token {
  id: string;
  name: string;
  symbol: string;
  imageUrl?: string;
  liquidity: number;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  chartData: Array<{ time: string; price: number }>;
}

const Portfolio = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  // Load tokens from localStorage
  useEffect(() => {
    const createdTokens = JSON.parse(localStorage.getItem('createdTokens') || '[]');
    const tokensWithLiquidity = createdTokens.filter((token: any) => token.liquidity > 0);
    
    if (tokensWithLiquidity.length === 0) {
      setTokens([]);
      return;
    }
    
    const formattedTokens = tokensWithLiquidity.map((token: any) => {
      const basePrice = 0.000012 + (token.liquidity * 0.000001);
      const volume = token.liquidity * 1200;
      const marketCap = volume * 2.3;
      
      return {
        id: token.id,
        name: token.name,
        symbol: token.symbol,
        imageUrl: token.imageUrl,
        liquidity: token.liquidity,
        price: basePrice,
        priceChange24h: (Math.random() - 0.5) * 10,
        volume24h: volume,
        marketCap: marketCap,
        chartData: generateChartData(basePrice)
      };
    });
    
    setTokens(formattedTokens);
  }, []);

  // Generate realistic chart data with more variance
  const generateChartData = (basePrice: number) => {
    const data = [];
    let currentPrice = basePrice * 0.8;
    
    for (let i = 0; i < 24; i++) {
      // Add more realistic price variance
      const change = (Math.random() - 0.5) * basePrice * 0.05;
      currentPrice = Math.max(currentPrice + change, basePrice * 0.5);
      
      data.push({
        time: `${i.toString().padStart(2, '0')}:00`,
        price: currentPrice
      });
    }
    
    // Gradually trend upward towards end
    const targetPrice = basePrice * 1.3;
    const finalPoints = 6;
    for (let i = 0; i < finalPoints; i++) {
      const progress = (i + 1) / finalPoints;
      const price = currentPrice + (targetPrice - currentPrice) * progress;
      data[data.length - finalPoints + i].price = price;
    }
    
    return data;
  };

  // Simulate real-time token updates
  useEffect(() => {
    if (tokens.length === 0) return;
    
    const interval = setInterval(() => {
      setTokens(prevTokens => 
        prevTokens.map(token => {
          const priceChange = (Math.random() - 0.5) * token.price * 0.01;
          const percentChange = (Math.random() - 0.5) * 0.5;
          const volumeChange = (Math.random() - 0.5) * 200;
          
          const newPrice = Math.max(token.price + priceChange, token.price * 0.9);
          
          return {
            ...token,
            price: newPrice,
            priceChange24h: Math.max(-15, Math.min(15, token.priceChange24h + percentChange)),
            volume24h: Math.max(0, token.volume24h + volumeChange),
            chartData: [
              ...token.chartData.slice(1),
              {
                time: new Date().toLocaleTimeString().slice(0, 5),
                price: newPrice
              }
            ]
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [tokens.length]);

  const handleWithdrawLiquidity = (token: Token) => {
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
              <h3 className="text-2xl font-semibold mb-2 text-gray-300">No tokens created</h3>
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
                          stroke={token.priceChange24h >= 0 ? "#10B981" : "#EF4444"}
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
                          <span className="font-semibold">${token.price.toFixed(8)}</span>
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
