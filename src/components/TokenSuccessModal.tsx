
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface TokenSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenName: string;
  tokenSymbol: string;
}

const TokenSuccessModal = ({ isOpen, onClose, tokenName, tokenSymbol }: TokenSuccessModalProps) => {
  if (!isOpen) return null;

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
      <div className="glass rounded-2xl p-8 max-w-md w-full animate-modal-scale">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Token Created Successfully!</h3>
          <p className="text-gray-400 mb-6">
            Your token <span className="text-white font-semibold">{tokenName}</span> ({tokenSymbol}) has been created.
          </p>
          <Button onClick={onClose} className="w-full">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TokenSuccessModal;
