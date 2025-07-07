import { useState, useMemo, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import PaymentModal from '@/components/PaymentModal';
import LiquiditySuccessModal from '@/components/LiquiditySuccessModal';
import { updateTokenLiquidity } from '@/pages/Portfolio';
import { toast } from '@/hooks/use-toast';

const Liquidity = () => {
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
  const [addressError, setAddressError] = useState('');

  // Load last created token data only if token exists
  useEffect(() => {
    const lastToken = localStorage.getItem('lastCreatedToken');
    if (lastToken) {
      const tokenData = JSON.parse(lastToken);
      setFormData(prev => ({
        ...prev,
        tokenName: tokenData.name,
        tokenSymbol: tokenData.symbol,
        tokenAddress: tokenData.address || ''
      }));
    }
  }, []);

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validate token address
    if (field === 'tokenAddress') {
      const address = value as string;
      if (address && (address.length !== 44 || !address.endsWith('omni'))) {
        setAddressError('Token address must be exactly 44 characters and end with "omni"');
      } else {
        setAddressError('');
      }
    }
    
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

  const resetLiquidityForm = () => {
    setFormData(prev => ({
      ...prev,
      addSupply: '',
      lpSize: '',
      boostVisibility: false
    }));
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
                     formData.addSupply && formData.lpSize && !lpSizeError && !addressError;

  const handleAddLiquidity = () => {
    // Check if token was created
    const lastToken = localStorage.getItem('lastCreatedToken');
    if (!lastToken) {
      toast({
        title: "Please create a token first!",
        variant: "destructive"
      });
      return;
    }

    const tokenData = JSON.parse(lastToken);
    if (formData.tokenName !== tokenData.name || formData.tokenSymbol !== tokenData.symbol) {
      toast({
        title: "Token name and symbol must match your created token",
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
    
    // Update session token with liquidity
    updateTokenLiquidity(formData.tokenName, parseFloat(formData.lpSize));
  };

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Add Liquidity</h1>
            <p className="text-xl text-muted-foreground">Provide liquidity for your token on DEX</p>
          </div>

          <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8">
            <div className="space-y-6">
              <div>
                <Label htmlFor="tokenAddress">Token Address</Label>
                <Input
                  id="tokenAddress"
                  value={formData.tokenAddress}
                  onChange={(e) => updateFormData('tokenAddress', e.target.value)}
                  placeholder="Enter 44-character token address ending with 'omni'"
                  className={`mt-2 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary ${addressError ? 'border-red-500' : ''}`}
                />
                {addressError && (
                  <p className="text-red-400 text-sm mt-1">{addressError}</p>
                )}
                <p className="text-muted-foreground text-xs mt-1">Must be exactly 44 characters and end with "omni"</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tokenName">Token Name</Label>
                  <Input
                    id="tokenName"
                    value={formData.tokenName}
                    onChange={(e) => updateFormData('tokenName', e.target.value)}
                    placeholder="My Token"
                    className="mt-2 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary"
                  />
                </div>
                <div>
                  <Label htmlFor="tokenSymbol">Token Symbol</Label>
                  <Input
                    id="tokenSymbol"
                    value={formData.tokenSymbol}
                    onChange={(e) => updateFormData('tokenSymbol', e.target.value.toUpperCase())}
                    placeholder="MTK"
                    className="mt-2 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary"
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
                  className="mt-2 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary"
                />
              </div>

              <div>
                <Label htmlFor="lpSize">Choose LP Size (SOL)</Label>
                <Input
                  id="lpSize"
                  type="number"
                  value={formData.lpSize}
                  onChange={(e) => updateFormData('lpSize', e.target.value)}
                  placeholder="0.3 - 100"
                  min="0.3"
                  max="100"
                  step="0.1"
                  className={`mt-2 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary ${lpSizeError ? 'border-red-500' : ''}`}
                />
                {lpSizeError && (
                  <p className="text-red-400 text-sm mt-1">{lpSizeError}</p>
                )}
                <p className="text-muted-foreground text-xs mt-1">Minimum: 0.3 SOL | Maximum: 100 SOL</p>
              </div>

              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="boostVisibility"
                    checked={formData.boostVisibility}
                    onCheckedChange={(checked) => updateFormData('boostVisibility', !!checked)}
                    className="border-border"
                  />
                  <div className="flex-1">
                    <Label htmlFor="boostVisibility" className="font-medium">
                      Boost Token Visibility
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Increase your token's visibility on DEX platforms
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">+0.15 SOL</div>
                  </div>
                </div>
              </div>

              {totalCost > 0 && (
                <div className="bg-card border border-border rounded-xl p-4">
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
                    <div className="border-t border-border pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-blue-500">{totalCost.toFixed(2)} SOL</span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleAddLiquidity}
                disabled={!isFormValid}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg"
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

      <LiquiditySuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        tokenName={formData.tokenName}
        onAddMore={() => {
          resetLiquidityForm();
        }}
      />
    </Layout>
  );
};

export default Liquidity;
