
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
  type: 'token' | 'liquidity';
}

const PaymentModal = ({ isOpen, onClose, onSuccess, amount, type }: PaymentModalProps) => {
  const [signature, setSignature] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [currency] = useState('SOL');
  const [network] = useState('Solana');

  const recipientAddress = '2jcMCafRLfJgDQEfjJ9SctbYZtNwXSmqdzr8jwyZYVyA';

  useEffect(() => {
    if (!isOpen) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(recipientAddress);
    } catch (err) {
      console.error('Failed to copy to clipboard');
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
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

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-modal-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 border border-green-600/30 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-modal-scale">
        {/* PGPAY Header */}
        <div className="text-center mb-6 border-b border-green-600/20 pb-4">
          <div className="text-3xl font-bold text-green-500 mb-1">PGPAY</div>
          <div className="text-sm text-gray-400">Secure Payment Gateway</div>
        </div>

        {/* Timer */}
        <div className="text-center mb-6">
          <div className="text-lg font-bold text-red-400 mb-1">
            {formatTime(timeLeft)}
          </div>
          <div className="text-xs text-gray-500">Time remaining</div>
        </div>

        {/* Payment Details */}
        <div className="space-y-4 mb-6">
          <div className="bg-gray-800 rounded-xl p-4 border border-green-600/20">
            <div className="text-sm text-gray-400 mb-1">Payment Amount</div>
            <div className="text-2xl font-bold text-green-500">
              {amount.toFixed(3)} {currency}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-400">Currency</Label>
              <Select value={currency} disabled>
                <SelectTrigger className="mt-1 bg-gray-800 border-gray-700 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SOL">SOL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-400">Network</Label>
              <Select value={network} disabled>
                <SelectTrigger className="mt-1 bg-gray-800 border-gray-700 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Solana">Solana</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-gray-400">Send To Address</Label>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex-1 bg-gray-800 px-3 py-2 rounded-xl text-sm font-mono break-all text-green-400 border border-gray-700">
                {recipientAddress}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="bg-gray-800 border-gray-700 hover:bg-gray-700 shrink-0 rounded-xl"
              >
                Copy
              </Button>
            </div>
          </div>
        </div>

        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 mb-4 rounded-xl text-lg font-semibold"
          onClick={() => window.open(`https://phantom.app/`, '_blank')}
        >
          Proceed to the payment
        </Button>

        {/* Transaction Verification */}
        <div className="border-t border-green-600/20 pt-4">
          <div className="space-y-4">
            <div>
              <Label className="text-gray-400">Transaction Signature</Label>
              <Input
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Paste your transaction signature here"
                className="mt-1 bg-gray-800 border-gray-700 text-green-400 rounded-xl"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter "1337" to simulate successful payment
              </p>
            </div>

            <Button
              onClick={handlePayment}
              disabled={!signature || isProcessing}
              className="w-full bg-green-600 hover:bg-green-700 rounded-xl"
            >
              {isProcessing ? 'Verifying...' : 'Check Transaction'}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 pt-4 border-t border-green-600/20">
          <div className="text-xs text-gray-500">
            🔒 Secured by Solana Smart Contracts
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
