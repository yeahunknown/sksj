
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Token {
  id: string;
  name: string;
  symbol: string;
  liquidity: number;
}

interface WithdrawLiquidityModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: Token | null;
  onWithdrawSuccess?: (tokenId: string) => void;
}

const WithdrawLiquidityModal = ({ isOpen, onClose, token, onWithdrawSuccess }: WithdrawLiquidityModalProps) => {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !token) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleWithdraw = async () => {
    if (!address.trim()) {
      toast({
        title: "PGPAY: Invalid address entered",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    onClose();
    setAddress('');
    
    // Trigger token death behavior
    if (onWithdrawSuccess) {
      onWithdrawSuccess(token.id);
    }
    
    toast({
      title: `${token.name} Liquidity Successfully Withdrawed`,
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-modal-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-modal-scale border border-gray-700">
        {/* PGPAY Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-gray-900 font-bold text-sm">PG</span>
            </div>
            <span className="text-white font-bold text-xl">PGPAY</span>
          </div>
          <Button variant="outline" size="sm" className="text-white border-gray-600 bg-transparent hover:bg-gray-800">
            Sign up
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Withdraw Liquidity</h3>
            <p className="text-gray-400 text-sm">
              Withdraw {token.liquidity.toFixed(2)} SOL from {token.name}
            </p>
          </div>

          <div>
            <div className="text-gray-400 text-sm mb-2">Paste Solana Address</div>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your Solana wallet address"
              className="bg-gray-800 border-gray-700 text-white rounded-lg h-12"
              disabled={isLoading}
            />
          </div>

          <Button
            onClick={handleWithdraw}
            disabled={!address.trim() || isLoading}
            className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg h-12"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Continue'
            )}
          </Button>

          {/* Footer */}
          <div className="text-center text-gray-500 text-xs">
            Encrypted & Secure Payment
            <br />
            By paying you agree to our terms of service
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawLiquidityModal;
