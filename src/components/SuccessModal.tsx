
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import AddLiquidityModal from './AddLiquidityModal';

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
}

const SuccessModal = ({ isOpen, onClose, tokenData }: SuccessModalProps) => {
  const [copied, setCopied] = useState(false);
  const [showAddLiquidityModal, setShowAddLiquidityModal] = useState(false);
  
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
    setShowAddLiquidityModal(true);
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-modal-in"
        onClick={handleBackdropClick}
      >
        <div className="glass rounded-2xl p-8 max-w-lg w-full animate-modal-scale">
          {/* Confetti effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full opacity-30 animate-ping" />
            <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-green-500 rounded-full opacity-40 animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-purple-500 rounded-full opacity-30 animate-ping" style={{ animationDelay: '1s' }} />
          </div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-3xl font-bold mb-2 text-gradient">Token Created Successfully!</h3>
            <p className="text-gray-400">
              Your SPL token <span className="text-white font-semibold">{tokenData.name}</span> has been deployed to Solana mainnet.
            </p>
          </div>

          <div className="space-y-6">
            <div className="glass rounded-xl p-4">
              <div className="text-sm text-gray-400 mb-2">Token Address</div>
              <div className="flex items-center space-x-2">
                <code className="flex-1 bg-gray-800 px-3 py-2 rounded-lg text-sm font-mono break-all">
                  {tokenAddress}
                </code>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  className="glass border-white/20 shrink-0"
                >
                  {copied ? <Check className="w-4 h-4" /> : '📋'}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-500">{tokenData.symbol}</div>
                <div className="text-sm text-gray-400">Symbol</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-500">
                  {tokenData.totalSupply ? Number(tokenData.totalSupply).toLocaleString() : '0'}
                </div>
                <div className="text-sm text-gray-400">Total Supply</div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={handleAddLiquidity}
                className="flex-1 bg-blue-500 hover:bg-blue-600"
              >
                Add Liquidity
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 glass border-white/20"
              >
                Create Another Token
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AddLiquidityModal
        isOpen={showAddLiquidityModal}
        onClose={() => setShowAddLiquidityModal(false)}
        tokenData={tokenData}
      />
    </>
  );
};

export default SuccessModal;
