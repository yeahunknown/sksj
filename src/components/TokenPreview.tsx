
import { Button } from '@/components/ui/button';

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

interface TokenPreviewProps {
  tokenData: TokenData;
  onConfirm?: () => void;
}

const TokenPreview = ({ tokenData, onConfirm }: TokenPreviewProps) => {
  return (
    <div className="glass rounded-2xl p-8">
      <h3 className="text-xl font-bold mb-6">Token Preview</h3>
      
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-white/10">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold overflow-hidden">
            {tokenData.imageUrl ? (
              <img 
                src={tokenData.imageUrl} 
                alt={tokenData.name || 'Token'} 
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                {tokenData.symbol ? tokenData.symbol[0] : '?'}
              </div>
            )}
          </div>
          <div>
            <div className="text-xl font-bold">
              {tokenData.name || 'Token Name'}
            </div>
            <div className="text-gray-400">
              ${tokenData.symbol || 'SYMBOL'}
            </div>
          </div>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Total Supply:</span>
            <span>{tokenData.totalSupply ? Number(tokenData.totalSupply).toLocaleString() : '---'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Decimals:</span>
            <span>{tokenData.decimals}</span>
          </div>
          {tokenData.description && (
            <div className="pt-2 border-t border-white/10">
              <div className="text-gray-400 mb-1">Description:</div>
              <div className="text-sm">{tokenData.description}</div>
            </div>
          )}
        </div>
        
        {(tokenData.freezeAuthority || tokenData.revokeMint || tokenData.revokeMetadata) && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="text-sm text-gray-400 mb-2">Security Features:</div>
            <div className="flex flex-wrap gap-2">
              {tokenData.freezeAuthority && (
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-md text-xs">
                  Freeze Authority
                </span>
              )}
              {tokenData.revokeMint && (
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-md text-xs">
                  Revoke Mint
                </span>
              )}
              {tokenData.revokeMetadata && (
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-md text-xs">
                  Revoke Metadata
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {onConfirm && (
        <Button
          onClick={onConfirm}
          className="w-full mt-6 bg-green-500 hover:bg-green-600"
        >
          Confirm & Pay
        </Button>
      )}
    </div>
  );
};

export default TokenPreview;
