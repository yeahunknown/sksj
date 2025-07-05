
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
}

const PaymentModal = ({ isOpen, onClose, onSuccess, amount }: PaymentModalProps) => {
  const [signature, setSignature] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (signature === '1337') {
      onSuccess();
    } else {
      alert('Invalid transaction signature. Please try again.');
    }
    
    setIsProcessing(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="glass rounded-2xl p-8 max-w-md w-full animate-slide-up">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">Complete Payment</h3>
          <p className="text-gray-400">
            Total amount: <span className="text-blue-500 font-bold">{amount.toFixed(1)} SOL</span>
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="signature">Transaction Signature</Label>
            <Input
              id="signature"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="Paste your transaction signature here"
              className="mt-2 glass border-white/20"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter "1337" to simulate successful payment
            </p>
          </div>

          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 glass border-white/20"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={!signature || isProcessing}
              className="flex-1 bg-blue-500 hover:bg-blue-600"
            >
              {isProcessing ? 'Processing...' : 'Proceed to Payment'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
