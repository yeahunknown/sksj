
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, TrendingDown, Copy } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import WithdrawLiquidityModal from '@/components/WithdrawLiquidityModal';
import { toast } from '@/hooks/use-toast';
import { generateTokenAddress, calculateRealisticMetrics, generateVolatileChartData, generateCrashChartData } from '@/utils/tokenUtils';

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
  totalSupply: number;
  transactions: number;
  chartData: Array<{ time: string; price: number; timestamp: number }>;
  hasLiquidity: boolean;
  isDead: boolean;
  liquidityAdded?: number;
  isAnimating?: boolean;
  shift6Triggered?: boolean;
  shift6StartTime?: number;
}

// Session storage for non-persistent tokens
let sessionTokens: Token[] = [];

const Portfolio = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  // Load tokens from session memory only
  useEffect(() => {
    setTokens(sessionTokens);
  }, []);

  // Animate transaction counts and handle Shift+6 simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      
      setTokens(prevTokens => 
        prevTokens.map(token => {
          let updatedToken = { ...token };
          
          // Regular transaction animation for active tokens
          if (token.hasLiquidity && !token.isDead && token.isAnimating) {
            updatedToken.transactions = token.transactions + Math.floor(Math.random() * 3) + 1;
          }
          
          // Shift+6 simulation after 30 seconds
          if (token.hasLiquidity && !token.isDead && !token.shift6Triggered && token.liquidityAdded) {
            const timeSinceAdded = now - token.liquidityAdded;
            if (timeSinceAdded >= 30000) { // 30 seconds
              updatedToken = {
                ...updatedToken,
                shift6Triggered: true,
                shift6StartTime: now,
                liquidity: 59.67,
                price: 0.0000182,
                volume24h: 7760,
                marketCap: 18240,
                priceChange24h: 12.5,
                chartData: generateVolatileChartData(0.0000182, true)
              };
            }
          }
          
          return updatedToken;
        })
      );
      
      // Update session storage
      sessionTokens = sessionTokens.map(token => {
        const now = Date.now();
        let updatedToken = { ...token };
        
        if (token.hasLiquidity && !token.isDead && token.isAnimating) {
          updatedToken.transactions = token.transactions + Math.floor(Math.random() * 3) + 1;
        }
        
        if (token.hasLiquidity && !token.isDead && !token.shift6Triggered && token.liquidityAdded) {
          const timeSinceAdded = now - token.liquidityAdded;
          if (timeSinceAdded >= 30000) {
            updatedToken = {
              ...updatedToken,
              shift6Triggered: true,
              shift6StartTime: now,
              liquidity: 59.67,
              price: 0.0000182,
              volume24h: 7760,
              marketCap: 18240,
              priceChange24h: 12.5,
              chartData: generateVolatileChartData(0.0000182, true)
            };
          }
        }
        
        return updatedToken;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Chart animation interval for volatile movements
  useEffect(() => {
    const chartInterval = setInterval(() => {
      setTokens(prevTokens => 
        prevTokens.map(token => {
          if (token.hasLiquidity && !token.isDead && token.isAnimating) {
            return {
              ...token,
              chartData: generateVolatileChartData(token.price, true)
            };
          }
          return token;
        })
      );
      
      sessionTokens = sessionTokens.map(token => {
        if (token.hasLiquidity && !token.isDead && token.isAnimating) {
          return {
            ...token,
            chartData: generateVolatileChartData(token.price, true)
          };
        }
        return token;
      });
    }, 5000);

    return () => clearInterval(chartInterval);
  }, []);

  const handleWithdrawLiquidity = (token: Token) => {
    setSelectedToken(token);
    setShowWithdrawModal(true);
  };

  const handleWithdrawSuccess = (tokenId: string) => {
    const updatedTokens = tokens.map(token => {
      if (token.id === tokenId) {
        const originalPrice = token.price;
        return {
          ...token,
          isDead: true,
          liquidity: token.liquidity * 0.02, // 98% drop
          price: originalPrice * 0.02,
          priceChange24h: -98,
          volume24h: Math.floor(token.volume24h * 0.02),
          marketCap: Math.floor(token.marketCap * 0.02),
          hasLiquidity: false,
          isAnimating: false,
          chartData: generateCrashChartData(token.chartData, originalPrice * 0.02)
        };
      }
      return token;
    });
    
    setTokens(updatedTokens);
    sessionTokens = updatedTokens;
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied to clipboard",
    });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass rounded-lg p-3 border border-white/20">
          <p className="text-white font-semibold">
            {new Date(data.timestamp).toLocaleString()}
          </p>
          <p className="text-blue-400">
            Price: ${payload[0].value.toFixed(8)}
          </p>
        </div>
      );
    }
    return null;
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
              <div 
                key={token.id} 
                className={`glass rounded-2xl p-6 transition-all duration-500 ${
                  token.isDead ? 'opacity-60 grayscale' : ''
                }`}
              >
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
                        <span className="text-xs text-gray-500 font-mono">
                          {token.address.slice(0, 8)}...{token.address.slice(-8)}
                        </span>
                        <button
                          onClick={() => copyAddress(token.address)}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
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
                        {!token.isDead && (
                          <Tooltip 
                            content={<CustomTooltip />}
                          />
                        )}
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          stroke={token.isDead ? "#EF4444" : (token.hasLiquidity ? "#10B981" : "#6B7280")}
                          strokeWidth={2}
                          dot={false}
                          animationDuration={token.isDead ? 0 : 800}
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
                          {token.hasLiquidity && !token.isDead && token.priceChange24h !== 0 && (
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
                        <p className="font-semibold">
                          {token.marketCap > 1000 
                            ? `$${(token.marketCap / 1000).toFixed(2)}k`
                            : `$${token.marketCap.toLocaleString()}`
                          }
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Transactions</p>
                        <p className="font-semibold">
                          {token.transactions.toLocaleString()}
                          {token.isAnimating && !token.isDead && (
                            <span className="ml-1 text-green-400 animate-pulse">↗</span>
                          )}
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
                      <div className="w-full text-center text-red-400 text-sm py-2 font-semibold">
                        🪦 Token Liquidity Withdrawn - RIP
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

// Export function to add tokens from other components
export const addTokenToSession = (token: Omit<Token, 'chartData' | 'address'>) => {
  const newToken: Token = {
    ...token,
    address: generateTokenAddress(),
    totalSupply: token.totalSupply || 1000000,
    transactions: 0,
    isAnimating: false,
    chartData: [{ time: '00:00', price: 0, timestamp: Date.now() }]
  };
  
  sessionTokens.push(newToken);
};

// Export function to update token with liquidity
export const updateTokenLiquidity = (tokenName: string, liquidityAmount: number) => {
  sessionTokens = sessionTokens.map(token => {
    if (token.name === tokenName) {
      const metrics = calculateRealisticMetrics(liquidityAmount, token.totalSupply);
      return {
        ...token,
        liquidity: liquidityAmount,
        hasLiquidity: true,
        isAnimating: true,
        liquidityAdded: Date.now(),
        ...metrics,
        chartData: generateVolatileChartData(metrics.price, true)
      };
    }
    return token;
  });
};

export default Portfolio;
