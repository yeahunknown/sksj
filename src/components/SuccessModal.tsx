
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, Copy } from 'lucide-react';

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

const generateTokenAddress = () => {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz123456789';
  let result = '';
  for (let i = 0; i < 44; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const SuccessModal = ({ isOpen, onClose, tokenData, onCreateAnother }: SuccessModalProps) => {
  const [copied, setCopied] = useState(false);
  const [tokenAddress, setTokenAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTokenAddress(generateTokenAddress());
    }
  }, [isOpen]);

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
      <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-lg w-full shadow-2xl animate-modal-scale">
        <div className="text-center mb-8">
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
          <div className="bg-gray-800/60 border border-white/10 rounded-xl p-4">
            <div className="text-sm text-gray-400 mb-2">Token Address</div>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-gray-700/50 px-3 py-2 rounded-lg text-sm font-mono text-green-400 border border-gray-600/50 break-all">
                {tokenAddress}
              </code>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                className="bg-gray-700/50 border-gray-600/50 hover:bg-gray-600/50 shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/60 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{tokenData.symbol}</div>
              <div className="text-sm text-gray-400">Symbol</div>
            </div>
            <div className="bg-gray-800/60 border border-white/10 rounded-xl p-4 text-center">
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
