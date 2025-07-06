
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
}

// Session storage for non-persistent tokens
let sessionTokens: Token[] = [];

const Portfolio = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  // Load tokens from session memory only (no localStorage)
  useEffect(() => {
    setTokens(sessionTokens);
  }, []);

  // Animate transaction counts and charts for active tokens
  useEffect(() => {
    const interval = setInterval(() => {
      setTokens(prevTokens => 
        prevTokens.map(token => {
          if (token.hasLiquidity && !token.isDead && token.isAnimating) {
            // Update transaction count
            const newTransactions = token.transactions + Math.floor(Math.random() * 5) + 1;
            
            // Update chart with new volatile data
            const newChartData = [...token.chartData];
            const lastPrice = newChartData[newChartData.length - 1]?.price || token.price;
            
            // Create volatile price movement (up to 20% change)
            const volatilityFactor = 0.2;
            const change = (Math.random() - 0.5) * volatilityFactor;
            const newPrice = Math.max(lastPrice * (1 + change), token.price * 0.1);
            
            // Add new data point and remove old one to maintain 24 points
            newChartData.shift();
            newChartData.push({
              time: new Date().toLocaleTimeString('en-US', { hour12: false }),
              price: newPrice,
              timestamp: Date.now()
            });
            
            return {
              ...token,
              transactions: newTransactions,
              price: newPrice,
              chartData: newChartData,
              priceChange24h: ((newPrice - token.price) / token.price) * 100
            };
          }
          return token;
        })
      );
      
      // Update session storage
      sessionTokens = sessionTokens.map(token => {
        if (token.hasLiquidity && !token.isDead && token.isAnimating) {
          const newTransactions = token.transactions + Math.floor(Math.random() * 5) + 1;
          const newChartData = [...token.chartData];
          const lastPrice = newChartData[newChartData.length - 1]?.price || token.price;
          
          const volatilityFactor = 0.2;
          const change = (Math.random() - 0.5) * volatilityFactor;
          const newPrice = Math.max(lastPrice * (1 + change), token.price * 0.1);
          
          newChartData.shift();
          newChartData.push({
            time: new Date().toLocaleTimeString('en-US', { hour12: false }),
            price: newPrice,
            timestamp: Date.now()
          });
          
          return {
            ...token,
            transactions: newTransactions,
            price: newPrice,
            chartData: newChartData,
            priceChange24h: ((newPrice - token.price) / token.price) * 100
          };
        }
        return token;
      });
    }, 2000); // Update every 2 seconds for more dynamic feel

    return () => clearInterval(interval);
  }, []);

  // Handle Shift + 6 key combination for demo values
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key === '^') {
        if (tokens.length > 0) {
          const updatedTokens = tokens.map(token => ({
            ...token,
            liquidity: 59.67,
            marketCap: 18240,
            volume24h: 7760,
            price: 0.0000182,
            priceChange24h: 12.5,
            hasLiquidity: true,
            isAnimating: true,
            chartData: generateActiveChartData(0.0000182)
          }));
          setTokens(updatedTokens);
          sessionTokens = updatedTokens;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [tokens]);

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

  const generateActiveChartData = (basePrice: number) => {
    const data = [];
    const now = Date.now();
    let currentPrice = basePrice;
    
    for (let i = 0; i < 24; i++) {
      // Create realistic volatile price movements
      const volatility = 0.15; // 15% max change per hour
      const change = (Math.random() - 0.5) * volatility;
      
      // Ensure price doesn't go below 10% of base price
      currentPrice = Math.max(currentPrice * (1 + change), basePrice * 0.1);
      
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
    for (let i = 0; i < 5; i++) {
      const crashMultiplier = Math.pow(0.05, i + 1); // More dramatic crash
      data.push({
        time: `${(23 + i).toString()}:${(i * 12).toString().padStart(2, '0')}`,
        price: lastPrice * crashMultiplier,
        timestamp: now + i * 60000
      });
    }
    
    return data;
  };

  const calculateRealisticValues = (liquidity: number, totalSupply: number) => {
    // More realistic price calculation based on liquidity pool mechanics
    // Price = (SOL in pool / Token in pool) - simplified AMM formula
    const tokenInPool = totalSupply * 0.5; // Assume 50% of supply in pool
    const price = liquidity / tokenInPool;
    
    // Volume should be proportional to liquidity (10-25% of liquidity per 24h)
    const volumeMultiplier = 0.1 + Math.random() * 0.15;
    const volume24h = Math.floor(liquidity * volumeMultiplier * 100) / 100;
    
    // Market Cap = Price * Total Supply
    const marketCap = Math.floor(price * totalSupply * 100) / 100;
    
    // Price change starts neutral and will be updated by volatility
    const priceChange24h = 0;
    
    // Starting transactions based on liquidity size
    const transactions = Math.floor(liquidity * 10) + Math.floor(Math.random() * 50) + 20;
    
    return { price, volume24h, marketCap, priceChange24h, transactions };
  };

  const handleWithdrawLiquidity = (token: Token) => {
    setSelectedToken(token);
    setShowWithdrawModal(true);
  };

  const handleWithdrawSuccess = (tokenId: string) => {
    const updatedTokens = tokens.map(token => {
      if (token.id === tokenId) {
        return {
          ...token,
          isDead: true,
          liquidity: 0,
          price: 0,
          priceChange24h: -100,
          volume24h: 0,
          marketCap: 0,
          hasLiquidity: false,
          isAnimating: false,
          chartData: generateCrashChartData(token)
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
                        Token Liquidity Withdrawn - RIP
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
export const addTokenToSession = (token: Omit<Token, 'chartData'>) => {
  const newToken: Token = {
    ...token,
    totalSupply: token.totalSupply || 1000000,
    transactions: 0,
    isAnimating: false,
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
        chartData: generateActiveChartData(realisticValues.price)
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

function generateActiveChartData(basePrice: number) {
  const data = [];
  const now = Date.now();
  let currentPrice = basePrice;
  
  for (let i = 0; i < 24; i++) {
    // Create realistic volatile price movements
    const volatility = 0.15; // 15% max change per hour
    const change = (Math.random() - 0.5) * volatility;
    currentPrice = Math.max(currentPrice * (1 + change), basePrice * 0.1);
    
    data.push({
      time: `${i.toString().padStart(2, '0')}:00`,
      price: currentPrice,
      timestamp: now - (24 - i) * 3600000
    });
  }
  return data;
}

function calculateRealisticValues(liquidity: number, totalSupply: number) {
  // More realistic price calculation based on liquidity pool mechanics
  const tokenInPool = totalSupply * 0.5; // Assume 50% of supply in pool
  const price = liquidity / tokenInPool;
  
  // Volume should be proportional to liquidity (10-25% of liquidity per 24h)
  const volumeMultiplier = 0.1 + Math.random() * 0.15;
  const volume24h = Math.floor(liquidity * volumeMultiplier * 100) / 100;
  
  // Market Cap = Price * Total Supply
  const marketCap = Math.floor(price * totalSupply * 100) / 100;
  
  // Price change starts neutral and will be updated by volatility
  const priceChange24h = 0;
  
  // Starting transactions based on liquidity size
  const transactions = Math.floor(liquidity * 10) + Math.floor(Math.random() * 50) + 20;
  
  return { price, volume24h, marketCap, priceChange24h, transactions };
}

export default Portfolio;
