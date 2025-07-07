import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Lock, FileText, Upload } from 'lucide-react';
import TokenPreview from '@/components/TokenPreview';
import PaymentModal from '@/components/PaymentModal';
import SuccessModal from '@/components/SuccessModal';
import { addTokenToSession } from './Portfolio';

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

const CreateToken = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  
  const [tokenData, setTokenData] = useState<TokenData>({
    name: '',
    symbol: '',
    totalSupply: '',
    decimals: '6',
    description: '',
    image: null,
    imageUrl: '',
    freezeAuthority: false,
    revokeMint: false,
    revokeMetadata: false,
  });

  const updateTokenData = (field: keyof TokenData, value: any) => {
    setTokenData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setTokenData({
      name: '',
      symbol: '',
      totalSupply: '',
      decimals: '6',
      description: '',
      image: null,
      imageUrl: '',
      freezeAuthority: false,
      revokeMint: false,
      revokeMetadata: false,
    });
    setCurrentStep(1);
  };

  // Form validation for Step 1
  const isStep1Valid = () => {
    return (
      tokenData.name.length >= 2 &&
      tokenData.symbol.length >= 2 &&
      tokenData.totalSupply.length > 0 &&
      /^\d+$/.test(tokenData.totalSupply) // Only numbers allowed
    );
  };

  const handleImageUpload = (file: File) => {
    setImageUploading(true);
    updateTokenData('image', file);
    
    setTimeout(() => {
      const imageUrl = URL.createObjectURL(file);
      updateTokenData('imageUrl', imageUrl);
      setImageUploading(false);
    }, 1300);
  };

  const calculatePrice = () => {
    let price = 0.1;
    if (tokenData.freezeAuthority) price += 0.1;
    if (tokenData.revokeMint) price += 0.1;
    if (tokenData.revokeMetadata) price += 0.1;
    return price;
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setShowSuccessModal(true);
    
    // Generate a random Solana token address for the created token
    const generateTokenAddress = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < 44; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    const tokenAddress = generateTokenAddress();
    
    // Add token to session portfolio immediately
    addTokenToSession({
      id: Date.now().toString(),
      name: tokenData.name,
      symbol: tokenData.symbol,
      address: tokenAddress,
      imageUrl: tokenData.imageUrl,
    });
    
    const existingTokens = JSON.parse(localStorage.getItem('createdTokens') || '[]');
    const newToken = {
      ...tokenData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      liquidity: 0,
      address: tokenAddress
    };
    existingTokens.push(newToken);
    localStorage.setItem('createdTokens', JSON.stringify(existingTokens));
    localStorage.setItem('lastCreatedToken', JSON.stringify(newToken));
  };

  const steps = [
    'Basic Info',
    'Icon & Description',
    'Advanced Settings',
    'Review & Create'
  ];

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className={`flex items-center ${
                    index <= currentStep - 1 ? 'text-blue-500' : 'text-gray-500'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 ${
                      index <= currentStep - 1
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'border-gray-600 text-gray-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="ml-2 text-sm font-medium hidden sm:block">{step}</span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">
                Step {currentStep}: {steps[currentStep - 1]}
              </h2>

              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name">Token Name</Label>
                    <Input
                      id="name"
                      value={tokenData.name}
                      onChange={(e) => updateTokenData('name', e.target.value)}
                      placeholder="My Awesome Token"
                      className="mt-2 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                    />
                    {tokenData.name.length > 0 && tokenData.name.length < 2 && (
                      <p className="text-red-400 text-sm mt-1">Minimum 2 characters required</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="symbol">Symbol</Label>
                    <Input
                      id="symbol"
                      value={tokenData.symbol}
                      onChange={(e) => updateTokenData('symbol', e.target.value.toUpperCase())}
                      placeholder="MAT"
                      className="mt-2 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                      maxLength={8}
                    />
                    {tokenData.symbol.length > 0 && tokenData.symbol.length < 2 && (
                      <p className="text-red-400 text-sm mt-1">Minimum 2 characters required</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="supply">Total Supply</Label>
                    <Input
                      id="supply"
                      type="text"
                      value={tokenData.totalSupply}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || /^\d+$/.test(value)) {
                          updateTokenData('totalSupply', value);
                        }
                      }}
                      placeholder="1000000"
                      className="mt-2 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                    />
                    {tokenData.totalSupply.length > 0 && !/^\d+$/.test(tokenData.totalSupply) && (
                      <p className="text-red-400 text-sm mt-1">Numbers only</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="decimals">Decimals</Label>
                    <Select value={tokenData.decimals} onValueChange={(value) => updateTokenData('decimals', value)}>
                      <SelectTrigger className="mt-2 bg-gray-800/50 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600 text-white z-50">
                        {[...Array(10)].map((_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i} decimals
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 2: Icon & Description */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label>Token Icon</Label>
                    <div className="mt-2 glass border-white/20 border-2 border-dashed rounded-xl p-8 text-center relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file);
                        }}
                        className="hidden"
                        id="icon-upload"
                      />
                      <label htmlFor="icon-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-400">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG up to 2MB
                          </p>
                        </div>
                      </label>
                      
                      {imageUploading && (
                        <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                          <div className="w-full max-w-xs">
                            <div className="bg-gray-700 rounded-full h-2 mb-2">
                              <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ 
                                animation: 'uploadProgress 1.3s ease-out forwards' 
                              }} />
                            </div>
                            <p className="text-sm text-white text-center">Uploading...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={tokenData.description}
                      onChange={(e) => updateTokenData('description', e.target.value)}
                      placeholder="Describe your token project..."
                      className="mt-2 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 min-h-32 resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Advanced Settings */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 glass rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <Shield className="w-4 h-4 text-blue-500" />
                        </div>
                        <div>
                          <div className="font-medium">Freeze Authority</div>
                          <div className="text-sm text-gray-400">Optional security feature</div>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tokenData.freezeAuthority}
                          onChange={(e) => updateTokenData('freezeAuthority', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 glass rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <Lock className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                          <div className="font-medium">Revoke Mint Authority</div>
                          <div className="text-sm text-gray-400">Optional security feature</div>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tokenData.revokeMint}
                          onChange={(e) => updateTokenData('revokeMint', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 glass rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-purple-500" />
                        </div>
                        <div>
                          <div className="font-medium">Revoke Metadata Authority</div>
                          <div className="text-sm text-gray-400">Optional security feature</div>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tokenData.revokeMetadata}
                          onChange={(e) => updateTokenData('revokeMetadata', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                      </label>
                    </div>
                  </div>

                  <div className="glass rounded-xl p-4">
                    <div className="text-lg font-semibold mb-2">Price Breakdown</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Base Token Creation</span>
                        <span>0.1 SOL</span>
                      </div>
                      {tokenData.freezeAuthority && (
                        <div className="flex justify-between">
                          <span>Freeze Authority</span>
                          <span>+0.1 SOL</span>
                        </div>
                      )}
                      {tokenData.revokeMint && (
                        <div className="flex justify-between">
                          <span>Revoke Mint Authority</span>
                          <span>+0.1 SOL</span>
                        </div>
                      )}
                      {tokenData.revokeMetadata && (
                        <div className="flex justify-between">
                          <span>Revoke Metadata Authority</span>
                          <span>+0.1 SOL</span>
                        </div>
                      )}
                      <div className="border-t border-white/20 pt-2 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-blue-500">{calculatePrice().toFixed(1)} SOL</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="glass rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4">Review Your Token</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Name:</span>
                        <span>{tokenData.name || 'Not set'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Symbol:</span>
                        <span>{tokenData.symbol || 'Not set'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Supply:</span>
                        <span>{tokenData.totalSupply ? Number(tokenData.totalSupply).toLocaleString() : 'Not set'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Decimals:</span>
                        <span>{tokenData.decimals}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Security Features:</span>
                        <span className="text-right">
                          {[
                            tokenData.freezeAuthority && 'Freeze Authority',
                            tokenData.revokeMint && 'Revoke Mint',
                            tokenData.revokeMetadata && 'Revoke Metadata'
                          ].filter(Boolean).join(', ') || 'None selected'}
                        </span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-3 border-t border-white/20">
                        <span>Total Cost:</span>
                        <span className="text-blue-500">{calculatePrice().toFixed(1)} SOL</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="glass border-white/20"
                >
                  Previous
                </Button>
                
                {currentStep < 4 ? (
                  <Button
                    onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                    disabled={currentStep === 1 && !isStep1Valid()}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowPaymentModal(true)}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Create Token
                  </Button>
                )}
              </div>
            </div>

            {/* Preview Section */}
            <div className="lg:sticky lg:top-24 h-fit">
              <TokenPreview tokenData={tokenData} />
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        amount={calculatePrice()}
        type="token"
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          resetForm();
        }}
        tokenData={tokenData}
        onCreateAnother={() => {
          setShowSuccessModal(false);
          resetForm();
        }}
      />
    </Layout>
  );
};

export default CreateToken;
