
import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import PaymentModal from '@/components/PaymentModal';
import { toast } from '@/hooks/use-toast';

const Liquidity = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tokenAddress: '',
    tokenName: '',
    tokenSymbol: '',
    addSupply: '',
    lpSize: '',
    boostVisibility: false
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lpSizeError, setLpSizeError] = useState('');

  // Load last created token data
  useEffect(() => {
    const lastToken = localStorage.getItem('lastCreatedToken');
    if (lastToken) {
      const tokenData = JSON.parse(lastToken);
      setFormData(prev => ({
        ...prev,
        tokenName: tokenData.name,
        tokenSymbol: tokenData.symbol,
        tokenAddress: '7xKRMGGKuSTrHCLsKGKn1JqCbDe8R9s8hTw8oDG6w4J7'
      }));
    }
  }, []);

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validate LP Size
    if (field === 'lpSize') {
      const numValue = parseFloat(value as string);
      if (isNaN(numValue)) {
        setLpSizeError('');
      } else if (numValue < 0.3) {
        setLpSizeError('Minimum LP size is 0.3 SOL');
      } else if (numValue > 100) {
        setLpSizeError('Maximum LP size is 100 SOL');
      } else {
        setLpSizeError('');
      }
    }
  };

  const totalCost = useMemo(() => {
    let cost = 0;
    if (formData.lpSize && !lpSizeError) {
      cost = parseFloat(formData.lpSize);
    }
    if (formData.boostVisibility) {
      cost += 0.15;
    }
    return cost;
  }, [formData.lpSize, formData.boostVisibility, lpSizeError]);

  const isFormValid = formData.tokenAddress && formData.tokenName && formData.tokenSymbol && 
                     formData.addSupply && formData.lpSize && !lpSizeError;

  const handleAddLiquidity = () => {
    // Check if token was created
    const lastToken = localStorage.getItem('lastCreatedToken');
    if (!lastToken) {
      toast({
        title: "Error",
        description: "Please create a token first!",
        variant: "destructive"
      });
      return;
    }

    const tokenData = JSON.parse(lastToken);
    if (formData.tokenName !== tokenData.name || formData.tokenSymbol !== tokenData.symbol) {
      toast({
        title: "Error", 
        description: "Token name and symbol must match your created token",
        variant: "destructive"
      });
      return;
    }

    if (isFormValid) {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setShowSuccessModal(true);
    
    // Update token with liquidity
    const existingTokens = JSON.parse(localStorage.getItem('createdTokens') || '[]');
    const updatedTokens = existingTokens.map((token: any) => {
      if (token.name === formData.tokenName) {
        return { ...token, liquidity: parseFloat(formData.lpSize) };
      }
      return token;
    });
    localStorage.setItem('createdTokens', JSON.stringify(updatedTokens));
  };

  const handleSuccessAction = (action: 'portfolio' | 'more') => {
    setShowSuccessModal(false);
    if (action === 'portfolio') {
      navigate('/portfolio');
    } else {
      // Reset form for more liquidity
      setFormData(prev => ({
        ...prev,
        addSupply: '',
        lpSize: '',
        boostVisibility: false
      }));
    }
  };

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Add Liquidity</h1>
            <p className="text-xl text-gray-300">Provide liquidity for your token on DEX</p>
          </div>

          <div className="glass rounded-2xl p-8">
            <div className="space-y-6">
              <div>
                <Label htmlFor="tokenAddress">Token Address</Label>
                <Input
                  id="tokenAddress"
                  value={formData.tokenAddress}
                  onChange={(e) => updateFormData('tokenAddress', e.target.value)}
                  placeholder="Enter token contract address"
                  className="mt-2 glass border-white/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tokenName">Token Name</Label>
                  <Input
                    id="tokenName"
                    value={formData.tokenName}
                    onChange={(e) => updateFormData('tokenName', e.target.value)}
                    placeholder="My Token"
                    className="mt-2 glass border-white/20"
                  />
                </div>
                <div>
                  <Label htmlFor="tokenSymbol">Token Symbol</Label>
                  <Input
                    id="tokenSymbol"
                    value={formData.tokenSymbol}
                    onChange={(e) => updateFormData('tokenSymbol', e.target.value.toUpperCase())}
                    placeholder="MTK"
                    className="mt-2 glass border-white/20"
                    maxLength={8}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="addSupply">Add Supply</Label>
                <Input
                  id="addSupply"
                  type="number"
                  value={formData.addSupply}
                  onChange={(e) => updateFormData('addSupply', e.target.value)}
                  placeholder="1000000"
                  className="mt-2 glass border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="lpSize">LP Size (SOL)</Label>
                <Input
                  id="lpSize"
                  type="number"
                  value={formData.lpSize}
                  onChange={(e) => updateFormData('lpSize', e.target.value)}
                  placeholder="0.3 - 100"
                  min="0.3"
                  max="100"
                  step="0.1"
                  className={`mt-2 glass border-white/20 ${lpSizeError ? 'border-red-500' : ''}`}
                />
                {lpSizeError && (
                  <p className="text-red-400 text-sm mt-1">{lpSizeError}</p>
                )}
                <p className="text-gray-400 text-xs mt-1">Minimum: 0.3 SOL | Maximum: 100 SOL</p>
              </div>

              <div className="glass rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="boostVisibility"
                    checked={formData.boostVisibility}
                    onCheckedChange={(checked) => updateFormData('boostVisibility', !!checked)}
                    className="border-white/20"
                  />
                  <div className="flex-1">
                    <Label htmlFor="boostVisibility" className="font-medium">
                      Boost Token Visibility
                    </Label>
                    <p className="text-sm text-gray-400">
                      Increase your token's visibility on DEX platforms
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">+0.15 SOL</div>
                  </div>
                </div>
              </div>

              {totalCost > 0 && (
                <div className="glass rounded-xl p-4">
                  <div className="text-lg font-semibold mb-2">Price Breakdown</div>
                  <div className="space-y-2 text-sm">
                    {formData.lpSize && !lpSizeError && (
                      <div className="flex justify-between">
                        <span>Liquidity Pool</span>
                        <span>{formData.lpSize} SOL</span>
                      </div>
                    )}
                    {formData.boostVisibility && (
                      <div className="flex justify-between">
                        <span>Boost Visibility</span>
                        <span>+0.15 SOL</span>
                      </div>
                    )}
                    <div className="border-t border-white/20 pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-blue-500">{totalCost.toFixed(2)} SOL</span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleAddLiquidity}
                disabled={!isFormValid}
                className="w-full bg-blue-500 hover:bg-blue-600 py-3 text-lg"
              >
                Add Liquidity
              </Button>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        amount={totalCost}
        type="liquidity"
      />

      {/* Liquidity Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-modal-in">
          <div className="bg-gray-900/95 border border-white/10 rounded-2xl p-8 max-w-lg w-full shadow-2xl animate-modal-scale backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white text-2xl">💧</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">Liquidity Successfully Added!</h3>
              <p className="text-gray-300 text-lg">
                Your liquidity has been added to <span className="text-blue-400 font-semibold">{formData.tokenName}</span>
              </p>
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={() => handleSuccessAction('portfolio')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
              >
                Liquidity Portfolio
              </Button>
              <Button
                onClick={() => handleSuccessAction('more')}
                variant="outline"
                className="flex-1 bg-gray-700/50 border-gray-600/50 hover:bg-gray-600/50 text-white font-medium py-3"
              >
                Add More Liquidity
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Liquidity;
