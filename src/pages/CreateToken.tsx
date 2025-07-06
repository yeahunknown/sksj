import { useState, useRef } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { FileInput } from '@/components/ui/file-input';
import TokenPreview from '@/components/TokenPreview';
import PaymentModal from '@/components/PaymentModal';
import TokenSuccessModal from '@/components/TokenSuccessModal';
import { addTokenToSession } from '@/pages/Portfolio';
import { toast } from '@/hooks/use-toast';

const CreateToken = () => {
  const [tokenData, setTokenData] = useState({
    name: '',
    symbol: '',
    totalSupply: '',
    decimals: '9',
    description: '',
    image: null as File | null,
    imageUrl: '',
    freezeAuthority: false,
    revokeMint: false,
    revokeMetadata: false,
  });
  const [showPreview, setShowPreview] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [imageError, setImageError] = useState('');
  const imageInputRef = useRef<HTMLInputElement>(null);

  const updateTokenData = (field: string, value: string | boolean | File | null) => {
    setTokenData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setImageError('Image size must be less than 5MB');
        return;
      }
      setImageError('');
      updateTokenData('image', file);

      const reader = new FileReader();
      reader.onloadend = () => {
        updateTokenData('imageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    updateTokenData('image', null);
    updateTokenData('imageUrl', '');
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const generateTokenAddress = () => {
    const prefix = '0x';
    const randomChars = Math.random().toString(16).substring(2, 10);
    return prefix + randomChars;
  };

  const isFormValid = tokenData.name && tokenData.symbol && tokenData.totalSupply && tokenData.decimals;

  const handleCreateToken = () => {
    if (isFormValid) {
      setShowPreview(true);
    } else {
      toast({
        title: "Please fill in all required fields.",
        variant: "destructive"
      });
    }
  };

  const handleConfirmCreation = () => {
    setShowPreview(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setShowSuccessModal(true);

    const tokenAddress = generateTokenAddress();
    
    // Add token to session portfolio immediately with all required properties
    addTokenToSession({
      id: Date.now().toString(),
      name: tokenData.name,
      symbol: tokenData.symbol,
      address: tokenAddress,
      imageUrl: tokenData.imageUrl,
      liquidity: 0,
      price: 0,
      priceChange24h: 0,
      volume24h: 0,
      marketCap: 0,
      totalSupply: parseInt(tokenData.totalSupply) || 1000000,
      transactions: 0,
      hasLiquidity: false,
      isDead: false,
      isAnimating: false,
    });
    
    const existingTokens = JSON.parse(localStorage.getItem('createdTokens') || '[]');
    const newToken = {
      ...tokenData,
      address: tokenAddress,
      createdAt: new Date().toISOString()
    };
    
    const updatedTokens = [...existingTokens, newToken];
    localStorage.setItem('createdTokens', JSON.stringify(updatedTokens));
    localStorage.setItem('lastCreatedToken', JSON.stringify(newToken));
  };

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Create Your Token</h1>
            <p className="text-xl text-gray-300">
              Launch your own cryptocurrency token in minutes
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass rounded-2xl p-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="tokenName">Token Name</Label>
                  <Input
                    id="tokenName"
                    type="text"
                    placeholder="MyToken"
                    value={tokenData.name}
                    onChange={(e) => updateTokenData('name', e.target.value)}
                    className="mt-2 glass border-white/20"
                  />
                </div>

                <div>
                  <Label htmlFor="tokenSymbol">Token Symbol</Label>
                  <Input
                    id="tokenSymbol"
                    type="text"
                    placeholder="MTK"
                    value={tokenData.symbol}
                    onChange={(e) => updateTokenData('symbol', e.target.value.toUpperCase())}
                    className="mt-2 glass border-white/20"
                    maxLength={8}
                  />
                </div>

                <div>
                  <Label htmlFor="totalSupply">Total Supply</Label>
                  <Input
                    id="totalSupply"
                    type="number"
                    placeholder="1000000"
                    value={tokenData.totalSupply}
                    onChange={(e) => updateTokenData('totalSupply', e.target.value)}
                    className="mt-2 glass border-white/20"
                  />
                </div>

                <div>
                  <Label htmlFor="decimals">Decimals</Label>
                  <Input
                    id="decimals"
                    type="number"
                    placeholder="9"
                    value={tokenData.decimals}
                    onChange={(e) => updateTokenData('decimals', e.target.value)}
                    className="mt-2 glass border-white/20"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="A brief description of your token"
                    value={tokenData.description}
                    onChange={(e) => updateTokenData('description', e.target.value)}
                    className="mt-2 glass border-white/20"
                  />
                </div>

                <div>
                  <Label>Token Image</Label>
                  <FileInput
                    ref={imageInputRef}
                    onChange={handleImageChange}
                    onRemove={handleRemoveImage}
                    imageUrl={tokenData.imageUrl}
                    error={imageError}
                  />
                  {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Security Features</Label>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="freezeAuthority"
                      checked={tokenData.freezeAuthority}
                      onCheckedChange={(checked) => updateTokenData('freezeAuthority', !!checked)}
                      className="border-white/20"
                    />
                    <Label htmlFor="freezeAuthority">Freeze Authority</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="revokeMint"
                      checked={tokenData.revokeMint}
                      onCheckedChange={(checked) => updateTokenData('revokeMint', !!checked)}
                      className="border-white/20"
                    />
                    <Label htmlFor="revokeMint">Revoke Mint</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="revokeMetadata"
                      checked={tokenData.revokeMetadata}
                      onCheckedChange={(checked) => updateTokenData('revokeMetadata', !!checked)}
                      className="border-white/20"
                    />
                    <Label htmlFor="revokeMetadata">Revoke Metadata</Label>
                  </div>
                </div>

                <Button
                  onClick={handleCreateToken}
                  disabled={!isFormValid}
                  className="w-full bg-blue-500 hover:bg-blue-600 py-3 text-lg"
                >
                  Create Token
                </Button>
              </div>
            </div>

            {showPreview && (
              <TokenPreview tokenData={tokenData} />
            )}
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        amount={0.75}
        type="token"
      />

      <TokenSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        tokenData={tokenData}
      />
    </Layout>
  );
};

export default CreateToken;
