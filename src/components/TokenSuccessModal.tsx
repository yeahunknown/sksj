
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface TokenSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenName: string;
  tokenSymbol: string;
}

const TokenSuccessModal: React.FC<TokenSuccessModalProps> = ({
  isOpen,
  onClose,
  tokenName,
  tokenSymbol,
}) => {
  const navigate = useNavigate();

  const handleCopyAddress = () => {
    const mockAddress = `0x${Math.random().toString(16).substring(2, 10)}`;
    navigator.clipboard.writeText(mockAddress);
    toast({
      title: "Address copied to clipboard",
      description: "Token address has been copied successfully."
    });
  };

  const handleViewPortfolio = () => {
    onClose();
    navigate('/portfolio');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass border-white/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <CheckCircle className="w-6 h-6 text-green-500" />
            Token Created Successfully!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">
              {tokenName} ({tokenSymbol})
            </h3>
            <p className="text-gray-300">
              Your token has been created and is now live on the blockchain.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleCopyAddress}
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy Token Address
            </Button>
            
            <Button
              onClick={handleViewPortfolio}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              View in Portfolio
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              You can now add liquidity to your token in the Portfolio section.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TokenSuccessModal;
