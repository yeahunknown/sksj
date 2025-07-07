
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
  // Price calculation based on liquidity - more realistic scaling
  const basePrice = (liquiditySOL / totalSupply) * (200 + Math.random() * 100); // USD conversion factor
  const price = Math.max(basePrice * (0.8 + Math.random() * 0.4), 0.000001);
  
  // Volume scales with liquidity but with realistic multipliers
  const volumeMultiplier = 0.15 + Math.random() * 0.35; // 15-50% of liquidity
  const volume24h = Math.floor(liquiditySOL * volumeMultiplier * 200);
  
  // Market cap = price * total supply
  const marketCap = Math.floor(price * totalSupply);
  
  // Price change simulation - more volatile for new tokens
  const priceChange24h = (Math.random() - 0.5) * 80; // -40% to +40%
  
  // Transaction count based on activity level
  const transactions = Math.floor(20 + Math.random() * 150);
  
  return {
    price,
    volume24h,
    marketCap,
    priceChange24h,
    transactions
  };
};

export const generateFlatChartData = () => {
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

export const generateVolatileChartData = (basePrice: number, isActive: boolean = true) => {
  const data = [];
  const now = Date.now();
  let currentPrice = basePrice;
  
  for (let i = 0; i < 24; i++) {
    if (isActive) {
      // Higher volatility with more realistic patterns
      const volatility = 0.2 + Math.random() * 0.4; // 20-60% changes
      const direction = Math.random() > 0.45 ? 1 : -1; // Slightly bullish bias
      const change = direction * volatility * Math.random();
      
      currentPrice = Math.max(currentPrice * (1 + change), basePrice * 0.1);
      
      // Add realistic spikes and dips
      if (Math.random() < 0.08) {
        currentPrice *= 1.3 + Math.random() * 0.7; // 30-100% spike
      } else if (Math.random() < 0.05) {
        currentPrice *= 0.4 + Math.random() * 0.3; // 40-70% dip
      }
      
      // Add some trend following
      if (i > 0 && Math.random() < 0.3) {
        const lastChange = data[i-1] ? (currentPrice - data[i-1].price) / data[i-1].price : 0;
        if (Math.abs(lastChange) > 0.1) {
          currentPrice *= 1 + (lastChange * 0.3); // Follow trend at 30% strength
        }
      }
    }
    
    data.push({
      time: `${i.toString().padStart(2, '0')}:00`,
      price: isActive ? Math.max(currentPrice, 0.000001) : 0,
      timestamp: now - (24 - i) * 3600000
    });
  }
  
  return data;
};

export const generateCrashChartData = (originalData: any[], finalPrice: number = 0) => {
  const crashData = [...originalData];
  const lastPrice = crashData[crashData.length - 1]?.price || 0;
  
  // Create dramatic crash sequence
  const crashPoints = 15;
  for (let i = 0; i < crashPoints; i++) {
    const progress = i / crashPoints;
    // Exponential decay for realistic crash
    const crashMultiplier = Math.pow(0.02, progress * 2);
    const crashPrice = lastPrice * crashMultiplier;
    
    // Add some volatility even during crash
    const volatility = Math.random() * 0.1 - 0.05; // ±5% noise
    const adjustedPrice = Math.max(crashPrice * (1 + volatility), finalPrice);
    
    crashData.push({
      time: `crash-${i}`,
      price: adjustedPrice,
      timestamp: Date.now() + i * 30000 // 30 second intervals
    });
  }
  
  // Add flat line after crash
  for (let i = 0; i < 10; i++) {
    crashData.push({
      time: `flat-${i}`,
      price: finalPrice,
      timestamp: Date.now() + (crashPoints + i) * 30000
    });
  }
  
  return crashData;
};
