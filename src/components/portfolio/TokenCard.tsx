
import { Button } from '@/components/ui/button';
import { Copy, TrendingUp, TrendingDown } from 'lucide-react';
import { Token } from '@/types/token';
import { toast } from '@/hooks/use-toast';
import PriceChart from './PriceChart';

interface TokenCardProps {
  token: Token;
  onWithdrawLiquidity: (token: Token) => void;
}

const TokenCard = ({ token, onWithdrawLiquidity }: TokenCardProps) => {
  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied to clipboard",
    });
  };

  return (
    <div 
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
        <PriceChart token={token} />

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
              onClick={() => onWithdrawLiquidity(token)}
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
  );
};

export default TokenCard;
