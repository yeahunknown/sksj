
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LiquidityPosition {
  tokenName: string;
  tokenSymbol: string;
  liquiditySOL: number;
  liquidityUSD: number;
}

const Liquidity = () => {
  const [liquidityAmount, setLiquidityAmount] = useState('');
  const [positions, setPositions] = useState<LiquidityPosition[]>([]);
  const [solPrice] = useState(23.45); // Mock SOL price in USD

  // Dev feature: Shift + 6 to add mock liquidity
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === '6') {
        const mockPosition: LiquidityPosition = {
          tokenName: 'My Awesome Token',
          tokenSymbol: 'MAT',
          liquiditySOL: 512,
          liquidityUSD: 12000,
        };
        setPositions(prev => [...prev, mockPosition]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const addLiquidity = () => {
    if (!liquidityAmount || isNaN(Number(liquidityAmount))) return;

    const solAmount = Number(liquidityAmount);
    const usdAmount = solAmount * solPrice;

    const newPosition: LiquidityPosition = {
      tokenName: 'Sample Token',
      tokenSymbol: 'SMPL',
      liquiditySOL: solAmount,
      liquidityUSD: usdAmount,
    };

    setPositions(prev => [...prev, newPosition]);
    setLiquidityAmount('');
  };

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Liquidity Management</h1>
            <p className="text-xl text-gray-300">Add liquidity to your tokens and track your positions</p>
          </div>

          {/* Add Liquidity Section */}
          <div className="glass rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Add Liquidity</h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="liquidity">Liquidity Amount (SOL)</Label>
                <Input
                  id="liquidity"
                  type="number"
                  value={liquidityAmount}
                  onChange={(e) => setLiquidityAmount(e.target.value)}
                  placeholder="Enter SOL amount"
                  className="mt-2 glass border-white/20"
                />
                {liquidityAmount && !isNaN(Number(liquidityAmount)) && (
                  <p className="text-sm text-gray-400 mt-1">
                    ≈ ${(Number(liquidityAmount) * solPrice).toLocaleString()} USD
                  </p>
                )}
              </div>

              <Button
                onClick={addLiquidity}
                disabled={!liquidityAmount || isNaN(Number(liquidityAmount))}
                className="w-full bg-blue-500 hover:bg-blue-600 py-3"
              >
                Add Liquidity
              </Button>
            </div>
          </div>

          {/* Liquidity Portfolio */}
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Liquidity Portfolio</h2>
              <Button
                variant="outline"
                className="glass border-white/20"
                onClick={() => console.log('View portfolio clicked')}
              >
                View Liquidity Portfolio
              </Button>
            </div>

            {positions.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl">🔍</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">No tokens found</h3>
                <p className="text-gray-400 mb-4">
                  You haven't added liquidity to any tokens yet.
                </p>
                <p className="text-xs text-gray-500">
                  Pro tip: Press Shift + 6 to add sample liquidity
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 text-gray-400">Token</th>
                      <th className="text-right py-4 text-gray-400">Liquidity (SOL)</th>
                      <th className="text-right py-4 text-gray-400">Value (USD)</th>
                      <th className="text-right py-4 text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions.map((position, index) => (
                      <tr key={index} className="border-b border-white/5">
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold">
                              {position.tokenSymbol[0]}
                            </div>
                            <div>
                              <div className="font-medium">{position.tokenName}</div>
                              <div className="text-sm text-gray-400">${position.tokenSymbol}</div>
                            </div>
                          </div>
                        </td>
                        <td className="text-right py-4 font-medium">
                          {position.liquiditySOL.toLocaleString()} SOL
                        </td>
                        <td className="text-right py-4 font-medium text-green-500">
                          ${position.liquidityUSD.toLocaleString()}
                        </td>
                        <td className="text-right py-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="glass border-white/20 text-red-400 hover:bg-red-500/10"
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Portfolio Value</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-500">
                        ${positions.reduce((sum, pos) => sum + pos.liquidityUSD, 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-400">
                        {positions.reduce((sum, pos) => sum + pos.liquiditySOL, 0).toLocaleString()} SOL
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Liquidity;
