
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface LiquiditySuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenName: string;
  onAddMore: () => void;
}

const LiquiditySuccessModal = ({ isOpen, onClose, tokenName, onAddMore }: LiquiditySuccessModalProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePortfolio = () => {
    onClose();
    navigate('/portfolio');
  };

  const handleAddMore = () => {
    onClose();
    onAddMore();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-modal-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-lg w-full shadow-2xl animate-modal-scale">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-3">Liquidity Successfully Added!</h3>
          <p className="text-gray-300 text-lg">
            Your liquidity has been added to <span className="text-blue-400 font-semibold">{tokenName}</span>
          </p>
        </div>

        <div className="flex space-x-4">
          <Button
            onClick={handlePortfolio}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
          >
            Liquidity Portfolio
          </Button>
          <Button
            onClick={handleAddMore}
            variant="outline"
            className="flex-1 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white font-medium py-3"
          >
            Add More Liquidity
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiquiditySuccessModal;
