
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Droplets } from 'lucide-react';
import PaymentModal from './PaymentModal';
import { toast } from '@/hooks/use-toast';

interface TokenData {
  name: string;
  symbol: string;
  totalSupply: string;
  decimals: string;
  description: string;
  image: File | null;
  imageUrl?: string;
  freezeAuthority: boolean;
  revokeMint: boolean;
  revokeMetadata: boolean;
}

interface AddLiquidityModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenData: TokenData;
}

const AddLiquidityModal = ({ isOpen, onClose, tokenData }: AddLiquidityModalProps) => {
  const [amount, setAmount] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddLiquidity = () => {
    if (amount && parseFloat(amount) > 0) {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    onClose();
    toast({
      title: "Liquidity Added",
      description: `Liquidity successfully added to ${tokenData.name}`,
    });
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-modal-in"
        onClick={handleBackdropClick}
      >
        <div className="glass rounded-2xl p-8 max-w-md w-full animate-modal-scale">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Droplets className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Add Liquidity</h3>
            <p className="text-gray-400">
              Add liquidity to <span className="text-white font-semibold">{tokenData.name}</span>
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="amount">Amount in SOL</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.5"
                className="mt-2 glass border-white/20 text-lg"
                min="0"
                step="0.1"
              />
            </div>

            <Button
              onClick={handleAddLiquidity}
              disabled={!amount || parseFloat(amount) <= 0}
              className="w-full bg-blue-500 hover:bg-blue-600 py-3 text-lg"
            >
              Add Liquidity
            </Button>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        amount={parseFloat(amount) || 0}
        type="liquidity"
      />
    </>
  );
};

export default AddLiquidityModal;
