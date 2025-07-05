
import { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import PaymentModal from '@/components/PaymentModal';

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

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const totalCost = useMemo(() => {
    let cost = 0;
    if (formData.lpSize) {
      cost = parseFloat(formData.lpSize);
    }
    if (formData.boostVisibility) {
      cost += 0.15;
    }
    return cost;
  }, [formData.lpSize, formData.boostVisibility]);

  const isFormValid = formData.tokenAddress && formData.tokenName && formData.tokenSymbol && formData.addSupply && formData.lpSize;

  const handleAddLiquidity = () => {
    if (isFormValid) {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    // Reset form
    setFormData({
      tokenAddress: '',
      tokenName: '',
      tokenSymbol: '',
      addSupply: '',
      lpSize: '',
      boostVisibility: false
    });
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
                <Label htmlFor="lpSize">Choose LP Size</Label>
                <Select value={formData.lpSize} onValueChange={(value) => updateFormData('lpSize', value)}>
                  <SelectTrigger className="mt-2 glass border-white/20">
                    <SelectValue placeholder="Select LP size" />
                  </SelectTrigger>
                  <SelectContent className="glass border-white/20 bg-gray-900">
                    <SelectItem value="0.2">0.2 SOL</SelectItem>
                    <SelectItem value="0.3">0.3 SOL</SelectItem>
                    <SelectItem value="0.4">0.4 SOL</SelectItem>
                  </SelectContent>
                </Select>
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
                    {formData.lpSize && (
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
    </Layout>
  );
};

export default Liquidity;
