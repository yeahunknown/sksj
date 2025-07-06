
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, TrendingDown, Copy } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
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
  totalSupply: number;
  transactions: number;
  chartData: Array<{ time: string; price: number; timestamp: number }>;
  hasLiquidity: boolean;
  isDead: boolean;
  liquidityAdded?: number;
  isAnimating?: boolean;
  viewStartTime?: number;
}

// Session storage for non-persistent tokens
let sessionTokens: Token[] = [];

const Portfolio = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  // Load tokens from session memory only (no localStorage)
  useEffect(() => {
    // Set view start time for Shift+6 simulation
    const tokensWithViewTime = sessionTokens.map(token => ({
      ...token,
      viewStartTime: token.viewStartTime || Date.now()
    }));
    sessionTokens = tokensWithViewTime;
    setTokens(tokensWithViewTime);
  }, []);

  // Animate transaction counts and handle Shift+6 simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      
      setTokens(prevTokens => 
        prevTokens.map(token => {
          let updatedToken = { ...token };
          
          // Animate transactions for active tokens
          if (token.hasLiquidity && !token.isDead && token.isAnimating) {
            updatedToken.transactions = token.transactions + Math.floor(Math.random() * 5) + 1;
          }
          
          // Check for Shift+6 simulation (30 seconds after viewing)
          if (token.viewStartTime && (now - token.viewStartTime) >= 30000 && token.hasLiquidity && !token.isDead) {
            updatedToken = {
              ...updatedToken,
              liquidity: 59.67,
              marketCap: 18240,
              volume24h: 7760,
              price: 0.0000182,
              priceChange24h: 12.5,
              chartData: generateVolatileChartData(0.0000182, true),
              isAnimating: true
            };
          }
          
          return updatedToken;
        })
      );
      
      // Update session storage
      sessionTokens = sessionTokens.map(token => {
        const now = Date.now();
        let updatedToken = { ...token };
        
        if (token.hasLiquidity && !token.isDead && token.isAnimating) {
          updatedToken.transactions = token.transactions + Math.floor(Math.random() * 5) + 1;
        }
        
        if (token.viewStartTime && (now - token.viewStartTime) >= 30000 && token.hasLiquidity && !token.isDead) {
          updatedToken = {
            ...updatedToken,
            liquidity: 59.67,
            marketCap: 18240,
            volume24h: 7760,
            price: 0.0000182,
            priceChange24h: 12.5,
            chartData: generateVolatileChartData(0.0000182, true),
            isAnimating: true
          };
        }
        
        return updatedToken;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const generateZeroChartData = () => {
    const data = [];
    const now = Date.now();
    for (let i = 0; i < 24; i++) {
      data.push({
        time: `${i.toString().padStart(2, '0')}:00`,
        price: 0,
        timestamp: now - (24 - i) * 3600000
      });
    }
    return data;
  };

  const generateVolatileChartData = (basePrice: number, isHighVolatility = false) => {
    const data = [];
    const now = Date.now();
    let currentPrice = basePrice;
    
    for (let i = 0; i < 24; i++) {
      // Create more volatile price movements
      const volatility = isHighVolatility ? 0.6 : 0.4; // Higher volatility
      const change = (Math.random() - 0.5) * volatility;
      
      // Add sharper ups and downs
      if (Math.random() < 0.15) { // 15% chance of dramatic movement
        const dramaticChange = (Math.random() - 0.5) * 0.8;
        currentPrice = Math.max(currentPrice * (1 + dramaticChange), basePrice * 0.1);
      } else {
        currentPrice = Math.max(currentPrice * (1 + change), basePrice * 0.1);
      }
      
      data.push({
        time: `${i.toString().padStart(2, '0')}:00`,
        price: currentPrice,
        timestamp: now - (24 - i) * 3600000
      });
    }
    return data;
  };

  const generateCrashChartData = (token: Token) => {
    const data = [...token.chartData];
    const lastPrice = data[data.length - 1]?.price || 0;
    
    // Add dramatic crash data points
    const now = Date.now();
    const crashPoints = [0.8, 0.4, 0.1, 0.03, 0.02]; // 98% drop
    
    for (let i = 0; i < crashPoints.length; i++) {
      data.push({
        time: `${(23 + i).toString()}:${(i * 12).toString().padStart(2, '0')}`,
        price: lastPrice * crashPoints[i],
        timestamp: now + i * 60000
      });
    }
    
    return data;
  };

  const calculateRealisticValues = (liquidity: number, totalSupply: number) => {
    // Price = Liquidity / Total Supply (simplified DEX formula)
    const price = liquidity / totalSupply;
    
    // Volume is 15-40% of liquidity
    const volumeMultiplier = 0.15 + Math.random() * 0.25;
    const volume24h = Math.floor(liquidity * volumeMultiplier);
    
    // Market Cap = Price * Total Supply
    const marketCap = Math.floor(price * totalSupply);
    
    // Price change is random between -20% to +30%
    const priceChange24h = Math.random() * 50 - 20;
    
    // Starting transactions
    const transactions = Math.floor(Math.random() * 80) + 20;
    
    return { price, volume24h, marketCap, priceChange24h, transactions };
  };

  const handleWithdrawLiquidity = (token: Token) => {
    setSelectedToken(token);
    setShowWithdrawModal(true);
  };

  const handleWithdrawSuccess = (tokenId: string) => {
    const updatedTokens = tokens.map(token => {
      if (token.id === tokenId) {
        const crashedToken = {
          ...token,
          isDead: true,
          liquidity: token.liquidity * 0.02, // 98% drop
          price: token.price * 0.02,
          priceChange24h: -98,
          volume24h: token.volume24h * 0.02,
          marketCap: token.marketCap * 0.02,
          hasLiquidity: false,
          isAnimating: false,
          chartData: generateCrashChartData(token)
        };
        return crashedToken;
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
                          animationDuration={token.isDead ? 0 : 1000}
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
export const addTokenToSession = (token: Omit<Token, 'chartData' | 'viewStartTime'>) => {
  // Generate address with 43 characters + .omni suffix
  const generateTokenAddress = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let address = '';
    for (let i = 0; i < 43; i++) {
      address += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return address + '.omni';
  };

  const newToken: Token = {
    ...token,
    address: generateTokenAddress(),
    totalSupply: token.totalSupply || 1000000,
    transactions: 0,
    isAnimating: false,
    viewStartTime: Date.now(),
    chartData: generateZeroChartData()
  };
  
  sessionTokens.push(newToken);
};

// Export function to update token with liquidity
export const updateTokenLiquidity = (tokenName: string, liquidityAmount: number) => {
  sessionTokens = sessionTokens.map(token => {
    if (token.name === tokenName) {
      const realisticValues = calculateRealisticValues(liquidityAmount, token.totalSupply);
      return {
        ...token,
        liquidity: liquidityAmount,
        hasLiquidity: true,
        isAnimating: true,
        liquidityAdded: Date.now(),
        ...realisticValues,
        chartData: generateVolatileChartData(realisticValues.price)
      };
    }
    return token;
  });
};

function generateZeroChartData() {
  const data = [];
  const now = Date.now();
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${i.toString().padStart(2, '0')}:00`,
      price: 0,
      timestamp: now - (24 - i) * 3600000
    });
  }
  return data;
}

function generateVolatileChartData(basePrice: number, isHighVolatility = false) {
  const data = [];
  const now = Date.now();
  let currentPrice = basePrice;
  
  for (let i = 0; i < 24; i++) {
    const volatility = isHighVolatility ? 0.6 : 0.4;
    const change = (Math.random() - 0.5) * volatility;
    
    if (Math.random() < 0.15) {
      const dramaticChange = (Math.random() - 0.5) * 0.8;
      currentPrice = Math.max(currentPrice * (1 + dramaticChange), basePrice * 0.1);
    } else {
      currentPrice = Math.max(currentPrice * (1 + change), basePrice * 0.1);
    }
    
    data.push({
      time: `${i.toString().padStart(2, '0')}:00`,
      price: currentPrice,
      timestamp: now - (24 - i) * 3600000
    });
  }
  return data;
}

function calculateRealisticValues(liquidity: number, totalSupply: number) {
  const price = liquidity / totalSupply;
  const volumeMultiplier = 0.15 + Math.random() * 0.25;
  const volume24h = Math.floor(liquidity * volumeMultiplier);
  const marketCap = Math.floor(price * totalSupply);
  const priceChange24h = Math.random() * 50 - 20;
  const transactions = Math.floor(Math.random() * 80) + 20;
  
  return { price, volume24h, marketCap, priceChange24h, transactions };
}

export default Portfolio;
