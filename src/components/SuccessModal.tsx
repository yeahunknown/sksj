
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';

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

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenData: TokenData;
  onCreateAnother?: () => void;
}

const SuccessModal = ({ isOpen, onClose, tokenData, onCreateAnother }: SuccessModalProps) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  
  // Generate a mock token address
  const tokenAddress = '7xKRMGGKuSTrHCLsKGKn1JqCbDe8R9s8hTw8oDG6w4J7';

  if (!isOpen) return null;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(tokenAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddLiquidity = () => {
    onClose();
    navigate('/liquidity');
  };

  const handleCreateAnother = () => {
    if (onCreateAnother) {
      onCreateAnother();
    } else {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-modal-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900/95 border border-white/10 rounded-2xl p-8 max-w-lg w-full shadow-2xl animate-modal-scale backdrop-blur-sm">
        {/* Celebration particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full opacity-60 animate-ping" />
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-green-500 rounded-full opacity-70 animate-ping" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-purple-500 rounded-full opacity-50 animate-ping" style={{ animationDelay: '1s' }} />
          <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-yellow-500 rounded-full opacity-60 animate-ping" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="text-center mb-8 relative">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Check className="w-10 h-10 text-white" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            <h3 className="text-3xl font-bold text-white">Token Created Successfully!</h3>
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </div>
          <p className="text-gray-300 text-lg">
            Your SPL token <span className="text-blue-400 font-semibold">{tokenData.name}</span> has been deployed to Solana mainnet.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800/60 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-sm text-gray-400 mb-2">Token Address</div>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-gray-700/50 px-3 py-2 rounded-lg text-sm font-mono break-all text-green-400 border border-gray-600/50">
                {tokenAddress}
              </code>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                className="bg-gray-700/50 border-gray-600/50 hover:bg-gray-600/50 shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : '📋'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/60 border border-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
              <div className="text-2xl font-bold text-blue-400">{tokenData.symbol}</div>
              <div className="text-sm text-gray-400">Symbol</div>
            </div>
            <div className="bg-gray-800/60 border border-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
              <div className="text-2xl font-bold text-green-400">
                {tokenData.totalSupply ? Number(tokenData.totalSupply).toLocaleString() : '0'}
              </div>
              <div className="text-sm text-gray-400">Total Supply</div>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              onClick={handleAddLiquidity}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all"
            >
              Add Liquidity
            </Button>
            <Button
              onClick={handleCreateAnother}
              variant="outline"
              className="flex-1 bg-gray-700/50 border-gray-600/50 hover:bg-gray-600/50 text-white font-medium py-3"
            >
              Create Another Token
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
