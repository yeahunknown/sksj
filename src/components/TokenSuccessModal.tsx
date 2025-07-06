
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface TokenSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenName: string;
  tokenSymbol: string;
}

const TokenSuccessModal = ({ isOpen, onClose, tokenName, tokenSymbol }: TokenSuccessModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass border-white/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-green-400">
            <CheckCircle className="w-6 h-6" />
            <span>Token Created Successfully!</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">{tokenName}</h3>
            <p className="text-gray-400">${tokenSymbol}</p>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-sm text-blue-300">
              Your token has been created and added to your portfolio. You can now add liquidity to make it tradeable.
            </p>
          </div>
          
          <Button onClick={onClose} className="w-full">
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TokenSuccessModal;
