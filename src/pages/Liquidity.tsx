
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Droplets, TrendingUp, DollarSign } from 'lucide-react';
import PaymentModal from '@/components/PaymentModal';
import LiquiditySuccessModal from '@/components/LiquiditySuccessModal';
import { toast } from '@/hooks/use-toast';

const Liquidity = () => {
  const [amount, setAmount] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Get the last created token
  const lastToken = JSON.parse(localStorage.getItem('lastCreatedToken') || 'null');

  const validateAmount = (value: string) => {
    const num = parseFloat(value);
    return num >= 0.3 && num <= 100;
  };

  const handleAddLiquidity = () => {
    if (!lastToken) {
      toast({
        title: "Error",
        description: "Please create a token first!",
        variant: "destructive",
      });
      return;
    }

    if (!amount || !validateAmount(amount)) {
      toast({
        title: "Invalid Amount",
        description: "Amount must be between 0.3 and 100 SOL",
        variant: "destructive",
      });
      return;
    }

    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setShowSuccessModal(true);

    // Update token with liquidity
    if (lastToken) {
      const existingTokens = JSON.parse(localStorage.getItem('createdTokens') || '[]');
      const updatedTokens = existingTokens.map((token: any) => 
        token.id === lastToken.id 
          ? { ...token, liquidity: parseFloat(amount) }
          : token
      );
      localStorage.setItem('createdTokens', JSON.stringify(updatedTokens));
      localStorage.setItem('lastCreatedToken', JSON.stringify({
        ...lastToken,
        liquidity: parseFloat(amount)
      }));
    }
  };

  const handleAddMore = () => {
    setAmount('');
  };

  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Droplets className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Add Liquidity</h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Provide liquidity to your token and start earning fees from trades
            </p>
          </div>

          {lastToken ? (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Add Liquidity Form */}
              <div className="glass rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  {lastToken.imageUrl && (
                    <img 
                      src={lastToken.imageUrl} 
                      alt={lastToken.name}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-bold">{lastToken.name}</h3>
                    <p className="text-gray-400">{lastToken.symbol}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="amount">Choose LP Size (SOL)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount (0.3 - 100 SOL)"
                      className="mt-2 glass border-white/20 text-lg"
                      min="0.3"
                      max="100"
                      step="0.1"
                    />
                    <div className="flex justify-between text-sm text-gray-400 mt-2">
                      <span>Min: 0.3 SOL</span>
                      <span>Max: 100 SOL</span>
                    </div>
                    {amount && !validateAmount(amount) && (
                      <p className="text-red-400 text-sm mt-1">
                        Amount must be between 0.3 and 100 SOL
                      </p>
                    )}
                  </div>

                  <Button
                    onClick={handleAddLiquidity}
                    disabled={!amount || !validateAmount(amount)}
                    className="w-full bg-blue-500 hover:bg-blue-600 py-3 text-lg"
                  >
                    Add Liquidity
                  </Button>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-6">
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                    <h3 className="text-lg font-semibold">Earn Trading Fees</h3>
                  </div>
                  <p className="text-gray-400">
                    Earn a percentage of all trading fees when users swap your token
                  </p>
                </div>

                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <DollarSign className="w-6 h-6 text-blue-500" />
                    <h3 className="text-lg font-semibold">Price Stability</h3>
                  </div>
                  <p className="text-gray-400">
                    Higher liquidity reduces price volatility and improves trading experience
                  </p>
                </div>

                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Droplets className="w-6 h-6 text-purple-500" />
                    <h3 className="text-lg font-semibold">Withdraw Anytime</h3>
                  </div>
                  <p className="text-gray-400">
                    You can withdraw your liquidity at any time from the portfolio
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center glass rounded-2xl p-12">
              <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Droplets className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">No Token Found</h3>
              <p className="text-gray-400 mb-6">
                You need to create a token first before adding liquidity
              </p>
              <Button 
                onClick={() => window.location.href = '/create'}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Create Token
              </Button>
            </div>
          )}
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        amount={parseFloat(amount) || 0}
        type="liquidity"
      />

      <LiquiditySuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        tokenName={lastToken?.name || ''}
        amount={parseFloat(amount) || 0}
        onAddMore={handleAddMore}
      />
    </Layout>
  );
};

export default Liquidity;
