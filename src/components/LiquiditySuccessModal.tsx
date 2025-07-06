
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Droplets } from 'lucide-react';

interface LiquiditySuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenName: string;
  amount: number;
  onAddMore?: () => void;
}

const LiquiditySuccessModal = ({ isOpen, onClose, tokenName, amount, onAddMore }: LiquiditySuccessModalProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleViewPortfolio = () => {
    onClose();
    navigate('/portfolio');
  };

  const handleAddMore = () => {
    if (onAddMore) {
      onAddMore();
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-modal-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-lg w-full shadow-2xl animate-modal-scale">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Droplets className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-3">Liquidity Successfully Added!</h3>
          <p className="text-gray-300 text-lg">
            {amount} SOL liquidity has been added to <span className="text-blue-400 font-semibold">{tokenName}</span>
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800/60 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-2">{amount} SOL</div>
            <div className="text-sm text-gray-400">Liquidity Added</div>
          </div>

          <div className="flex space-x-4">
            <Button
              onClick={handleViewPortfolio}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all"
            >
              Liquidity Portfolio
            </Button>
            <Button
              onClick={handleAddMore}
              variant="outline"
              className="flex-1 bg-gray-700/50 border-gray-600/50 hover:bg-gray-600/50 text-white font-medium py-3"
            >
              Add More Liquidity
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquiditySuccessModal;
