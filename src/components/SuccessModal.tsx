import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import CopyButton from '@/components/CopyButton';

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
  const navigate = useNavigate();
  
  // Generate a 44-character token address ending with ".omni"
  const generateTokenAddress = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    // Generate 39 random characters, then append ".omni" for total of 44
    for (let i = 0; i < 39; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result + '.omni';
  };

  const [tokenAddress] = useState(generateTokenAddress());

  if (!isOpen) return null;


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
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-lg w-full shadow-2xl animate-modal-scale transition-all duration-300">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-3">Token Created Successfully!</h3>
          <p className="text-gray-300 text-lg">
            Your SPL token <span className="text-blue-400 font-semibold">{tokenData.name}</span> has been deployed to Solana mainnet.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="text-sm text-gray-400 mb-2">Token Address</div>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-gray-700 px-3 py-2 rounded-lg text-sm font-mono text-green-400 border border-gray-600 min-w-0 overflow-hidden">
                <div className="truncate">{tokenAddress}</div>
              </code>
              <CopyButton
                text={tokenAddress}
                variant="outline"
                size="sm"
                className="bg-gray-700 border-gray-600 hover:bg-gray-600 shrink-0 p-2"
                toastMessage="Token address copied!"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{tokenData.symbol}</div>
              <div className="text-sm text-gray-400">Symbol</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">
                {tokenData.totalSupply ? Number(tokenData.totalSupply).toLocaleString() : '0'}
              </div>
              <div className="text-sm text-gray-400">Total Supply</div>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              onClick={handleAddLiquidity}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
            >
              Add Liquidity
            </Button>
            <Button
              onClick={handleCreateAnother}
              variant="outline"
              className="flex-1 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white font-medium py-3"
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
