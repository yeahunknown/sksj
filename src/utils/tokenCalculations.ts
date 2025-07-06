
import { Token } from '@/types/token';

export const generateZeroChartData = () => {
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

export const generateActiveChartData = (basePrice: number) => {
  const data = [];
  const now = Date.now();
  let currentPrice = basePrice;
  
  for (let i = 0; i < 24; i++) {
    // Create volatile price movements
    const volatility = 0.3; // 30% max change per hour
    const change = (Math.random() - 0.5) * volatility;
    currentPrice = Math.max(currentPrice * (1 + change), basePrice * 0.1);
    
    data.push({
      time: `${i.toString().padStart(2, '0')}:00`,
      price: currentPrice,
      timestamp: now - (24 - i) * 3600000
    });
  }
  return data;
};

export const generateCrashChartData = (token: Token) => {
  const data = [...token.chartData];
  const lastPrice = data[data.length - 1]?.price || 0;
  
  // Add crash data points
  const now = Date.now();
  for (let i = 0; i < 5; i++) {
    const crashMultiplier = Math.pow(0.1, i + 1);
    data.push({
      time: `${(23 + i).toString()}:${(i * 12).toString().padStart(2, '0')}`,
      price: lastPrice * crashMultiplier,
      timestamp: now + i * 60000
    });
  }
  
  return data;
};

export const calculateRealisticValues = (liquidity: number, totalSupply: number) => {
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
