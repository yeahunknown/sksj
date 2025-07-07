
// Generate random base58 string for token addresses
const base58Chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

export const generateTokenAddress = (): string => {
  let result = '';
  for (let i = 0; i < 43; i++) {
    result += base58Chars.charAt(Math.floor(Math.random() * base58Chars.length));
  }
  return `${result}.omni`;
};

export const calculateRealisticMetrics = (liquiditySOL: number, totalSupply: number = 1000000) => {
  // Price calculation based on liquidity
  const basePrice = liquiditySOL / totalSupply;
  const price = Math.max(basePrice * (0.8 + Math.random() * 0.4), 0.000001);
  
  // Volume is typically 10-50% of liquidity in active trading
  const volumeMultiplier = 0.1 + Math.random() * 0.4;
  const volume24h = Math.floor(liquiditySOL * volumeMultiplier * 200); // Convert to USD estimate
  
  // Market cap = price * total supply
  const marketCap = Math.floor(price * totalSupply * 200); // Convert to USD estimate
  
  // Price change simulation
  const priceChange24h = (Math.random() - 0.5) * 60; // -30% to +30%
  
  // Transaction count based on activity
  const transactions = Math.floor(50 + Math.random() * 200);
  
  return {
    price,
    volume24h,
    marketCap,
    priceChange24h,
    transactions
  };
};

export const generateVolatileChartData = (basePrice: number, isActive: boolean = true) => {
  const data = [];
  const now = Date.now();
  let currentPrice = basePrice;
  
  for (let i = 0; i < 24; i++) {
    if (isActive) {
      // High volatility - bigger swings
      const volatility = 0.15 + Math.random() * 0.35; // 15-50% changes
      const direction = Math.random() > 0.5 ? 1 : -1;
      const change = direction * volatility * Math.random();
      
      currentPrice = Math.max(currentPrice * (1 + change), basePrice * 0.1);
      
      // Add some spikes and dips for realism
      if (Math.random() < 0.1) {
        currentPrice *= 1.5 + Math.random(); // Spike
      } else if (Math.random() < 0.05) {
        currentPrice *= 0.3 + Math.random() * 0.4; // Dip
      }
    }
    
    data.push({
      time: `${i.toString().padStart(2, '0')}:00`,
      price: isActive ? currentPrice : 0,
      timestamp: now - (24 - i) * 3600000
    });
  }
  
  return data;
};

export const generateCrashChartData = (originalData: any[], finalPrice: number = 0) => {
  const crashData = [...originalData];
  const lastPrice = crashData[crashData.length - 1]?.price || 0;
  
  // Add crash sequence
  const crashPoints = 10;
  for (let i = 0; i < crashPoints; i++) {
    const progress = i / crashPoints;
    const crashPrice = lastPrice * Math.pow(0.02, progress); // Dramatic drop to 2% of original
    
    crashData.push({
      time: `crash-${i}`,
      price: Math.max(crashPrice, finalPrice),
      timestamp: Date.now() + i * 60000
    });
  }
  
  return crashData;
};
