
import { Button } from '@/components/ui/button';
import { CheckCircle, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface TokenSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenName: string;
  tokenSymbol: string;
}

const TokenSuccessModal = ({ isOpen, onClose, tokenName, tokenSymbol }: TokenSuccessModalProps) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const tokenAddress = JSON.parse(localStorage.getItem('lastCreatedToken') || '{}').address || '';

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(tokenAddress);
      setCopied(true);
      toast({
        title: "Address copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleViewPortfolio = () => {
    onClose();
    navigate('/portfolio');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-modal-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-modal-scale border border-gray-700">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Token Created Successfully!</h3>
            <p className="text-gray-400">
              {tokenName} ({tokenSymbol}) has been deployed to the blockchain
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Token Address:</span>
              <Button
                onClick={handleCopyAddress}
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:text-blue-300 p-1"
              >
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <div className="bg-gray-900 rounded p-2 font-mono text-xs text-white break-all">
              {tokenAddress}
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleViewPortfolio}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              View in Portfolio
            </Button>
            
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Create Another Token
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-4 text-gray-500 text-sm">
            <span>Share your token</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenSuccessModal;
