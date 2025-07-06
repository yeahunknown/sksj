import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import WithdrawLiquidityModal from '@/components/WithdrawLiquidityModal';
import TokenCard from '@/components/portfolio/TokenCard';
import EmptyPortfolio from '@/components/portfolio/EmptyPortfolio';
import { Token } from '@/types/token';
import { getSessionTokens, setSessionTokens } from '@/utils/sessionStorage';
import { generateCrashChartData, generateActiveChartData } from '@/utils/tokenCalculations';

const Portfolio = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  // Load tokens from session memory only (no localStorage)
  useEffect(() => {
    setTokens(getSessionTokens());
  }, []);

  // Animate transaction counts for active tokens
  useEffect(() => {
    const interval = setInterval(() => {
      setTokens(prevTokens => {
        const updatedTokens = prevTokens.map(token => {
          if (token.hasLiquidity && !token.isDead && token.isAnimating) {
            return {
              ...token,
              transactions: token.transactions + Math.floor(Math.random() * 5) + 1
            };
          }
          return token;
        });
        
        // Update session storage
        setSessionTokens(updatedTokens);
        return updatedTokens;
      });
    }, 3000);

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
          setSessionTokens(updatedTokens);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [tokens]);

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
    setSessionTokens(updatedTokens);
  };

  // Show empty state if no tokens
  if (tokens.length === 0) {
    return (
      <Layout>
        <EmptyPortfolio />
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
              <TokenCard
                key={token.id}
                token={token}
                onWithdrawLiquidity={handleWithdrawLiquidity}
              />
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

// Re-export the session functions for backward compatibility
export { addTokenToSession, updateTokenLiquidity } from '@/utils/sessionStorage';

export default Portfolio;
