
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface TokenSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenData: {
    name: string;
    symbol: string;
    address: string;
    imageUrl?: string;
  };
}

const TokenSuccessModal = ({ isOpen, onClose, tokenData }: TokenSuccessModalProps) => {
  const copyAddress = () => {
    navigator.clipboard.writeText(tokenData.address);
    toast({
      title: "Address copied to clipboard",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass border-white/20 max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <DialogTitle className="text-2xl">Token Created Successfully!</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 glass rounded-xl">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              {tokenData.imageUrl ? (
                <img src={tokenData.imageUrl} alt={tokenData.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg font-bold">
                  {tokenData.symbol[0]}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{tokenData.name}</h3>
              <p className="text-gray-400">${tokenData.symbol}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-400">Contract Address:</p>
            <div className="flex items-center space-x-2 p-2 glass rounded-lg">
              <span className="text-xs font-mono flex-1 truncate">{tokenData.address}</span>
              <Button
                onClick={copyAddress}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Button onClick={onClose} className="w-full">
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TokenSuccessModal;
