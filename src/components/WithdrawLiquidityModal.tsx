
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
}

const WithdrawLiquidityModal = ({ isOpen, onClose, token }: WithdrawLiquidityModalProps) => {
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
    
    toast({
      title: "Withdrawal Successful",
      description: `${token.name} Liquidity Successfully Withdrawed`,
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-modal-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 border border-green-600/30 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-modal-scale">
        {/* PGPAY Header */}
        <div className="text-center mb-6 border-b border-green-600/20 pb-4">
          <div className="text-2xl font-bold text-green-500 mb-1">PGPAY</div>
          <div className="text-sm text-gray-400">Secure Payment Gateway</div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-center mb-2">Withdraw Liquidity</h3>
          <p className="text-gray-400 text-center text-sm">
            Withdraw {token.liquidity} SOL from {token.name}
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="text-gray-400">Paste Solana Address</Label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your Solana wallet address"
              className="mt-2 bg-gray-800 border-gray-700 text-green-400 rounded-xl"
              disabled={isLoading}
            />
          </div>

          <Button
            onClick={handleWithdraw}
            disabled={!address.trim() || isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
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
        </div>

        {/* Footer */}
        <div className="text-center mt-6 pt-4 border-t border-green-600/20">
          <div className="text-xs text-gray-500">
            🔒 Secured by Solana Smart Contracts
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawLiquidityModal;
