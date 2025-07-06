
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, ArrowLeft, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import TokenPreview from '@/components/TokenPreview';
import PaymentModal from '@/components/PaymentModal';
import { addTokenToSession } from './Portfolio';
import { toast } from '@/hooks/use-toast';

interface TokenData {
  name: string;
  symbol: string;
  totalSupply: string;
  decimals: string;
  description: string;
  image: File | null;
  imageUrl: string;
  freezeAuthority: boolean;
  revokeMint: boolean;
  revokeMetadata: boolean;
}

const CreateToken = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [tokenData, setTokenData] = useState<TokenData>({
    name: '',
    symbol: '',
    totalSupply: '1000000',
    decimals: '9',
    description: '',
    image: null,
    imageUrl: '',
    freezeAuthority: true,
    revokeMint: true,
    revokeMetadata: true,
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTokenData(prev => ({ 
        ...prev, 
        image: file,
        imageUrl: URL.createObjectURL(file)
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateToken = () => {
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    // Add token to session storage for portfolio
    addTokenToSession({
      id: Date.now().toString(),
      name: tokenData.name,
      symbol: tokenData.symbol,
      address: `${tokenData.symbol.toLowerCase()}${Date.now()}`,
      imageUrl: tokenData.imageUrl,
      liquidity: 0,
      price: 0,
      priceChange24h: 0,
      volume24h: 0,
      marketCap: 0,
      totalSupply: parseInt(tokenData.totalSupply),
      transactions: 0,
      hasLiquidity: false,
      isDead: false
    });

    setShowPayment(false);
    
    toast({
      title: "Token Created Successfully!",
      description: `${tokenData.name} (${tokenData.symbol}) has been created on Solana.`,
    });

    // Reset form
    setTokenData({
      name: '',
      symbol: '',
      totalSupply: '1000000',
      decimals: '9',
      description: '',
      image: null,
      imageUrl: '',
      freezeAuthority: true,
      revokeMint: true,
      revokeMetadata: true,
    });
    setCurrentStep(1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Token Name</Label>
                <Input
                  id="name"
                  value={tokenData.name}
                  onChange={(e) => setTokenData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., My Awesome Token"
                />
              </div>
              <div>
                <Label htmlFor="symbol">Token Symbol</Label>
                <Input
                  id="symbol"
                  value={tokenData.symbol}
                  onChange={(e) => setTokenData(prev => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
                  placeholder="e.g., MAT"
                  maxLength={10}
                />
              </div>
              <div>
                <Label htmlFor="totalSupply">Total Supply</Label>
                <Input
                  id="totalSupply"
                  type="number"
                  value={tokenData.totalSupply}
                  onChange={(e) => setTokenData(prev => ({ ...prev, totalSupply: e.target.value }))}
                  placeholder="1000000"
                />
              </div>
              <div>
                <Label htmlFor="decimals">Decimals</Label>
                <Input
                  id="decimals"
                  type="number"
                  value={tokenData.decimals}
                  onChange={(e) => setTokenData(prev => ({ ...prev, decimals: e.target.value }))}
                  min="0"
                  max="18"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Icon & Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="image">Token Icon</Label>
                <div className="mt-2">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('image')?.click()}
                    className="w-full h-32 border-dashed"
                  >
                    {tokenData.imageUrl ? (
                      <img src={tokenData.imageUrl} alt="Token icon" className="w-16 h-16 rounded-full" />
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="w-8 h-8 mb-2" />
                        <span>Upload Token Icon</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={tokenData.description}
                  onChange={(e) => setTokenData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your token..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Freeze Authority</Label>
                  <p className="text-sm text-muted-foreground">
                    Ability to freeze token accounts
                  </p>
                </div>
                <Switch
                  checked={tokenData.freezeAuthority}
                  onCheckedChange={(checked) => setTokenData(prev => ({ ...prev, freezeAuthority: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Revoke Mint Authority</Label>
                  <p className="text-sm text-muted-foreground">
                    Remove ability to mint additional tokens
                  </p>
                </div>
                <Switch
                  checked={tokenData.revokeMint}
                  onCheckedChange={(checked) => setTokenData(prev => ({ ...prev, revokeMint: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Revoke Update Authority</Label>
                  <p className="text-sm text-muted-foreground">
                    Remove ability to update metadata
                  </p>
                </div>
                <Switch
                  checked={tokenData.revokeMetadata}
                  onCheckedChange={(checked) => setTokenData(prev => ({ ...prev, revokeMetadata: checked }))}
                />
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return <TokenPreview tokenData={tokenData} />;

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Create Token</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-lg">Ready to create your token?</p>
                <p className="text-sm text-muted-foreground">
                  Creation fee: 0.1 SOL + network fees
                </p>
                <Button onClick={handleCreateToken} className="w-full" size="lg">
                  Create Token
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return 'Basic Info';
      case 2: return 'Icon & Description';
      case 3: return 'Advanced Settings';
      case 4: return 'Review';
      case 5: return 'Payment';
      default: return '';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Create Token</h1>
            <p className="text-xl text-gray-300">Launch your own SPL token on Solana</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= currentStep
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-600 text-gray-300'
                    }`}
                  >
                    {step}
                  </div>
                  <div className="ml-2 text-sm">
                    <div className={step <= currentStep ? 'text-blue-400' : 'text-gray-400'}>
                      {getStepTitle(step)}
                    </div>
                  </div>
                  {step < 5 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        step < currentStep ? 'bg-blue-500' : 'bg-gray-600'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentStep === 5}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onSuccess={handlePaymentSuccess}
        amount={0.1}
        type="token"
      />
    </Layout>
  );
};

export default CreateToken;
