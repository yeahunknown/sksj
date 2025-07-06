
import { Token } from '@/types/token';
import { generateZeroChartData, calculateRealisticValues, generateActiveChartData } from './tokenCalculations';

// Session storage for non-persistent tokens
let sessionTokens: Token[] = [];

export const getSessionTokens = (): Token[] => {
  return sessionTokens;
};

export const setSessionTokens = (tokens: Token[]): void => {
  sessionTokens = tokens;
};

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
