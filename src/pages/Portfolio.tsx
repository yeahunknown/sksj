
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, TrendingDown, Copy } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import WithdrawLiquidityModal from '@/components/WithdrawLiquidityModal';
import { toast } from '@/hooks/use-toast';

interface Token {
  id: string;
  name: string;
  symbol: string;
  address: string;
  imageUrl?: string;
  liquidity: number;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  chartData: Array<{ time: string; price: number }>;
  hasLiquidity: boolean;
  isDead: boolean;
  liquidityAdded?: number;
}

const Portfolio = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  // Load and process tokens
  useEffect(() => {
    const createdTokens = JSON.parse(localStorage.getItem('createdTokens') || '[]');
    
    if (createdTokens.length === 0) {
      setTokens([]);
      return;
    }
    
    const formattedTokens = createdTokens.map((token: any) => {
      // Calculate realistic values based on liquidity
      const baseLiquidity = token.liquidity || 0;
      const basePrice = baseLiquidity > 0 ? 0.000001 + (baseLiquidity * 0.000008) : 0;
      const volume = baseLiquidity > 0 ? baseLiquidity * 150 : 0; // More realistic ratio
      const marketCap = baseLiquidity > 0 ? baseLiquidity * 150 : 0; // More realistic ratio
      
      return {
        id: token.id,
        name: token.name,
        symbol: token.symbol,
        address: token.address,
        imageUrl: token.imageUrl,
        liquidity: baseLiquidity,
        price: basePrice,
        priceChange24h: baseLiquidity > 0 ? (Math.random() - 0.5) * 5 : 0,
        volume24h: volume,
        marketCap: marketCap,
        chartData: generateRealisticChartData(basePrice, baseLiquidity),
        hasLiquidity: token.hasLiquidity || false,
        isDead: token.isDead || false,
        liquidityAdded: token.liquidityAdded
      };
    });
    
    setTokens(formattedTokens);
  }, []);

  // Generate realistic chart data
  const generateRealisticChartData = (basePrice: number, liquidity: number) => {
    const data = [];
    let currentPrice = basePrice || 0.000001;
    
    if (liquidity === 0) {
      // Flat line for no liquidity
      for (let i = 0; i < 24; i++) {
        data.push({
          time: `${i.toString().padStart(2, '0')}:00`,
          price: 0
        });
      }
      return data;
    }
    
    // Generate volatile, realistic price movement
    for (let i = 0; i < 24; i++) {
      // Add volatility - more realistic than linear
      const volatility = Math.random() - 0.5;
      const change = currentPrice * volatility * 0.1;
      
      // Occasionally add bigger moves
      if (Math.random() < 0.1) {
        const bigMove = (Math.random() - 0.5) * currentPrice * 0.3;
        currentPrice = Math.max(currentPrice + bigMove, currentPrice * 0.5);
      } else {
        currentPrice = Math.max(currentPrice + change, currentPrice * 0.8);
      }
      
      // If liquidity is high (>76), slow down movement
      if (liquidity > 76) {
        const dampening = Math.min(liquidity / 100, 0.95);
        currentPrice = currentPrice * (1 - dampening) + basePrice * dampening;
      }
      
      data.push({
        time: `${i.toString().padStart(2, '0')}:00`,
        price: currentPrice
      });
    }
    
    return data;
  };

  // Simulate real-time updates for tokens with liquidity
  useEffect(() => {
    if (tokens.length === 0) return;
    
    const interval = setInterval(() => {
      setTokens(prevTokens => 
        prevTokens.map(token => {
          if (!token.hasLiquidity || token.isDead || token.liquidity === 0) {
            return token;
          }
          
          // Realistic price changes based on liquidity
          const maxChange = token.liquidity > 76 ? 0.005 : 0.02;
          const priceChange = (Math.random() - 0.5) * token.price * maxChange;
          const percentChange = (Math.random() - 0.5) * 0.3;
          const volumeChange = (Math.random() - 0.5) * token.liquidity * 10;
          
          const newPrice = Math.max(token.price + priceChange, token.price * 0.95);
          const newVolume = Math.max(0, token.volume24h + volumeChange);
          const newMarketCap = newVolume; // Keep them proportional
          
          return {
            ...token,
            price: newPrice,
            priceChange24h: Math.max(-8, Math.min(8, token.priceChange24h + percentChange)),
            volume24h: newVolume,
            marketCap: newMarketCap,
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
    }, 3000);

    return () => clearInterval(interval);
  }, [tokens.length]);

  const handleWithdrawLiquidity = (token: Token) => {
    setSelectedToken(token);
    setShowWithdrawModal(true);
  };

  const handleWithdrawSuccess = (tokenId: string) => {
    // Update token to "dead" state
    const updatedTokens = JSON.parse(localStorage.getItem('createdTokens') || '[]').map((token: any) => {
      if (token.id === tokenId) {
        return {
          ...token,
          isDead: true,
          liquidity: token.liquidity * 0.02, // 98% drop
          hasLiquidity: false
        };
      }
      return token;
    });
    
    localStorage.setItem('createdTokens', JSON.stringify(updatedTokens));
    
    // Update state with dead token
    setTokens(prevTokens => 
      prevTokens.map(token => {
        if (token.id === tokenId) {
          const deadPrice = token.price * 0.02;
          return {
            ...token,
            isDead: true,
            liquidity: token.liquidity * 0.02,
            price: deadPrice,
            priceChange24h: -98,
            volume24h: 0,
            marketCap: 0,
            hasLiquidity: false,
            chartData: token.chartData.map(point => ({
              ...point,
              price: deadPrice
            }))
          };
        }
        return token;
      })
    );
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied to clipboard",
    });
  };

  // Show empty state if no tokens
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
              <div key={token.id} className={`glass rounded-2xl p-6 ${token.isDead ? 'opacity-60' : ''}`}>
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
                      <div className="flex items-center space-x-2 mt-1">
                        {token.address ? (
                          <>
                            <span className="text-xs text-gray-500 font-mono">
                              {token.address.slice(0, 8)}...{token.address.slice(-8)}
                            </span>
                            <button
                              onClick={() => copyAddress(token.address)}
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </>
                        ) : (
                          <span className="text-xs text-gray-500">No address</span>
                        )}
                      </div>
                      <p className={`text-sm mt-1 ${token.liquidity > 0 ? 'text-blue-400' : 'text-gray-500'}`}>
                        {token.liquidity > 0 ? `${token.liquidity.toFixed(2)} SOL` : 'No liquidity'}
                      </p>
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
                          stroke={token.isDead ? "#EF4444" : (token.priceChange24h >= 0 ? "#10B981" : "#EF4444")}
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
                          <span className="font-semibold">
                            ${token.price > 0 ? token.price.toFixed(8) : '0.00000000'}
                          </span>
                          {token.hasLiquidity && !token.isDead && (
                            <>
                              {token.priceChange24h > 0 ? (
                                <TrendingUp className="w-3 h-3 text-green-500" />
                              ) : (
                                <TrendingDown className="w-3 h-3 text-red-500" />
                              )}
                              <span className={token.priceChange24h > 0 ? 'text-green-500' : 'text-red-500'}>
                                {token.priceChange24h > 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                              </span>
                            </>
                          )}
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
                        <p className={`font-semibold ${token.liquidity > 0 ? 'text-blue-400' : 'text-gray-500'}`}>
                          {token.liquidity > 0 ? `${token.liquidity.toFixed(2)} SOL` : '0 SOL'}
                        </p>
                      </div>
                    </div>
                    
                    {token.hasLiquidity && !token.isDead && (
                      <Button
                        onClick={() => handleWithdrawLiquidity(token)}
                        variant="outline"
                        className="w-full glass border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        Withdraw Liquidity
                      </Button>
                    )}
                    
                    {token.isDead && (
                      <div className="w-full text-center text-red-400 text-sm py-2">
                        Token Liquidity Withdrawn
                      </div>
                    )}
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
        onWithdrawSuccess={handleWithdrawSuccess}
      />
    </Layout>
  );
};

export default Portfolio;
