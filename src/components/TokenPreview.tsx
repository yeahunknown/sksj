
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
}

const TokenPreview = ({ tokenData }: TokenPreviewProps) => {
  return (
    <div className="glass rounded-2xl p-8">
      <h3 className="text-xl font-bold mb-6">Token Preview</h3>
      
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 border border-border/50">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold overflow-hidden">
            {tokenData.imageUrl ? (
              <img 
                src={tokenData.imageUrl} 
                alt={tokenData.name || 'Token'} 
                className="w-full h-full object-cover rounded-full pointer-events-auto"
                style={{ pointerEvents: 'auto' }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                {tokenData.symbol ? tokenData.symbol[0] : '?'}
              </div>
            )}
          </div>
          <div>
            <div className="text-xl font-bold text-card-foreground">
              {tokenData.name || 'Token Name'}
            </div>
            <div className="text-muted-foreground">
              ${tokenData.symbol || 'SYMBOL'}
            </div>
          </div>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Supply:</span>
            <span className="text-card-foreground">{tokenData.totalSupply ? Number(tokenData.totalSupply).toLocaleString() : '---'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Decimals:</span>
            <span className="text-card-foreground">{tokenData.decimals}</span>
          </div>
          {tokenData.description && (
            <div className="pt-2 border-t border-border/50">
              <div className="text-muted-foreground mb-1">Description:</div>
              <div className="text-sm text-card-foreground">{tokenData.description}</div>
            </div>
          )}
        </div>
        
        {(tokenData.freezeAuthority || tokenData.revokeMint || tokenData.revokeMetadata) && (
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="text-sm text-muted-foreground mb-2">Security Features:</div>
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
    </div>
  );
};

export default TokenPreview;
