
export interface Token {
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
