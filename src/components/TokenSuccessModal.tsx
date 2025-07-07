
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface TokenSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenName: string;
  tokenSymbol: string;
}

const TokenSuccessModal = ({ isOpen, onClose, tokenName, tokenSymbol }: TokenSuccessModalProps) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-700">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Token Created Successfully!</h3>
            <p className="text-gray-400">
              Your token <span className="text-white font-semibold">{tokenName} ({tokenSymbol})</span> has been created and added to your portfolio.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={onClose}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg h-12"
            >
              View in Portfolio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenSuccessModal;
