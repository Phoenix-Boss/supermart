// File: components/cart/GiftCardInput.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../../components/theme/themeprovider';
import { Tag, Gift, CheckCircle, XCircle, Percent, DollarSign, Sparkles, Clock, AlertCircle } from 'lucide-react';

interface GiftCardInputProps {
  onApplyGiftCard?: (code: string, amount: number) => void;
  onApplyPromo?: (code: string, discount: number) => void;
  appliedCodes?: Array<{ type: 'gift_card' | 'promo'; code: string; value: number }>;
}

interface GiftCard {
  code: string;
  balance: number;
  expiresAt?: string;
}

interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minPurchase?: number;
  expiresAt?: string;
  description?: string;
}

export default function GiftCardInput({ 
  onApplyGiftCard, 
  onApplyPromo, 
  appliedCodes = [] 
}: GiftCardInputProps) {
  const { themeMode } = useTheme();
  const isDarkMode = themeMode === 'dark';
  
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState<'gift_card' | 'promo'>('promo');
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [savedGiftCards, setSavedGiftCards] = useState<GiftCard[]>([
    { code: 'GIFT-2024-SPECIAL', balance: 5000 },
    { code: 'SUPERMART-ANNIV', balance: 10000, expiresAt: '2024-12-31' },
  ]);
  const [savedPromos, setSavedPromos] = useState<PromoCode[]>([
    { code: 'WELCOME10', discountType: 'percentage', value: 10, minPurchase: 5000, description: '10% off first order' },
    { code: 'FREESHIP', discountType: 'fixed', value: 1500, minPurchase: 10000, description: 'Free shipping' },
    { code: 'SUMMER25', discountType: 'percentage', value: 25, minPurchase: 25000, expiresAt: '2024-08-31', description: 'Summer sale 25% off' },
  ]);

  const handleApply = async () => {
    if (!inputValue.trim()) {
      setError('Please enter a code');
      return;
    }

    setIsApplying(true);
    setError(null);
    setSuccess(null);

    // Simulate API call
    setTimeout(() => {
      const code = inputValue.trim().toUpperCase();
      
      if (activeTab === 'gift_card') {
        // Check if gift card exists
        const giftCard = savedGiftCards.find(gc => gc.code === code);
        if (giftCard) {
          if (appliedCodes.some(c => c.code === code)) {
            setError('This gift card is already applied');
          } else if (giftCard.balance <= 0) {
            setError('Gift card has no balance');
          } else {
            setSuccess(`Gift card applied! Balance: ₦${giftCard.balance.toLocaleString()}`);
            onApplyGiftCard?.(code, giftCard.balance);
            setInputValue('');
          }
        } else {
          setError('Invalid gift card code');
        }
      } else {
        // Check promo code
        const promo = savedPromos.find(p => p.code === code);
        if (promo) {
          if (appliedCodes.some(c => c.code === code)) {
            setError('This promo code is already applied');
          } else if (promo.expiresAt && new Date(promo.expiresAt) < new Date()) {
            setError('Promo code has expired');
          } else {
            const discountText = promo.discountType === 'percentage' 
              ? `${promo.value}% off` 
              : `₦${promo.value.toLocaleString()} off`;
            
            setSuccess(`Promo code applied! ${discountText}`);
            onApplyPromo?.(code, promo.value);
            setInputValue('');
          }
        } else {
          setError('Invalid promo code');
        }
      }
      
      setIsApplying(false);
    }, 1000);
  };

  const handleRemoveCode = (code: string) => {
    setAppliedCodes?.(prev => prev.filter(c => c.code !== code));
  };

  const handleUseSaved = (code: string, type: 'gift_card' | 'promo') => {
    setInputValue(code);
    setActiveTab(type);
  };

  const getAppliedTotal = () => {
    return appliedCodes.reduce((total, code) => {
      if (code.type === 'gift_card') {
        return total + code.value;
      }
      return total;
    }, 0);
  };

  const getDiscountTotal = () => {
    return appliedCodes.reduce((total, code) => {
      if (code.type === 'promo') {
        return total + code.value;
      }
      return total;
    }, 0);
  };

  const formatExpiry = (dateString?: string) => {
    if (!dateString) return 'No expiry';
    return new Date(dateString).toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={`rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-purple-50'}`}>
            <Tag className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          </div>
          <div>
            <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Gift Cards & Promo Codes
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Apply discounts and gift card balances
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-700">
        <div className="flex">
          <button
            onClick={() => setActiveTab('promo')}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === 'promo'
                ? isDarkMode 
                  ? 'text-purple-400 border-b-2 border-purple-500' 
                  : 'text-purple-600 border-b-2 border-purple-500'
                : isDarkMode 
                  ? 'text-gray-400 hover:text-gray-300' 
                  : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Percent className="w-4 h-4" />
              Promo Codes
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('gift_card')}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === 'gift_card'
                ? isDarkMode 
                  ? 'text-green-400 border-b-2 border-green-500' 
                  : 'text-green-600 border-b-2 border-green-500'
                : isDarkMode 
                  ? 'text-gray-400 hover:text-gray-300' 
                  : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Gift className="w-4 h-4" />
              Gift Cards
            </div>
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toUpperCase())}
              placeholder={activeTab === 'promo' ? 'Enter promo code' : 'Enter gift card code'}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-purple-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-purple-500'
              } ${activeTab === 'gift_card' ? 'focus:ring-green-500' : 'focus:ring-purple-500'}`}
              onKeyDown={(e) => e.key === 'Enter' && handleApply()}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {activeTab === 'promo' ? (
                <Percent className={`w-5 h-5 ${isDarkMode ? 'text-purple-500' : 'text-purple-600'}`} />
              ) : (
                <Gift className={`w-5 h-5 ${isDarkMode ? 'text-green-500' : 'text-green-600'}`} />
              )}
            </div>
          </div>
          
          <button
            onClick={handleApply}
            disabled={isApplying || !inputValue.trim()}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              isApplying || !inputValue.trim()
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:scale-105'
            } ${
              activeTab === 'promo'
                ? isDarkMode
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
                : isDarkMode
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isApplying ? 'Applying...' : 'Apply'}
          </button>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className={`p-3 rounded-lg flex items-center gap-2 mb-3 ${
            isDarkMode ? 'bg-red-500/10 border border-red-500/30' : 'bg-red-50 border border-red-200'
          }`}>
            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className={`text-sm ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
              {error}
            </p>
          </div>
        )}

        {success && (
          <div className={`p-3 rounded-lg flex items-center gap-2 mb-3 ${
            isDarkMode ? 'bg-green-500/10 border border-green-500/30' : 'bg-green-50 border border-green-200'
          }`}>
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <p className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
              {success}
            </p>
          </div>
        )}

        {/* Saved Codes */}
        <div>
          <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Your {activeTab === 'promo' ? 'Saved Promos' : 'Saved Gift Cards'}
          </h4>
          
          <div className="space-y-2">
            {(activeTab === 'promo' ? savedPromos : savedGiftCards).map((item) => (
              <button
                key={item.code}
                onClick={() => handleUseSaved(item.code, activeTab)}
                className={`w-full p-3 rounded-lg border text-left transition-all duration-300 hover:scale-[1.02] ${
                  isDarkMode
                    ? 'border-gray-800 hover:border-gray-700 bg-gray-800/50 hover:bg-gray-800'
                    : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded ${
                      activeTab === 'promo'
                        ? isDarkMode ? 'bg-purple-900/50' : 'bg-purple-100'
                        : isDarkMode ? 'bg-green-900/50' : 'bg-green-100'
                    }`}>
                      {activeTab === 'promo' ? (
                        <Percent className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                      ) : (
                        <Gift className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                      )}
                    </div>
                    <div>
                      <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.code}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {activeTab === 'promo' 
                          ? (item as PromoCode).description
                          : `Balance: ₦${(item as GiftCard).balance.toLocaleString()}`
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {item.expiresAt && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-500" />
                        <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          {formatExpiry(item.expiresAt)}
                        </span>
                      </div>
                    )}
                    {activeTab === 'promo' && (item as PromoCode).minPurchase && (
                      <div className={`px-2 py-1 rounded text-xs ${
                        isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'
                      }`}>
                        Min: ₦{(item as PromoCode).minPurchase!.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Applied Codes */}
      {appliedCodes.length > 0 && (
        <div className="p-4 border-b border-gray-700">
          <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Applied to Order
          </h4>
          
          <div className="space-y-3">
            {appliedCodes.map((applied) => (
              <div 
                key={applied.code}
                className={`p-3 rounded-lg border ${
                  applied.type === 'promo'
                    ? isDarkMode ? 'border-purple-500/30 bg-purple-500/5' : 'border-purple-300 bg-purple-50'
                    : isDarkMode ? 'border-green-500/30 bg-green-500/5' : 'border-green-300 bg-green-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${
                      applied.type === 'promo'
                        ? isDarkMode ? 'bg-purple-900/50' : 'bg-purple-100'
                        : isDarkMode ? 'bg-green-900/50' : 'bg-green-100'
                    }`}>
                      {applied.type === 'promo' ? (
                        <Percent className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                      ) : (
                        <Gift className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                      )}
                    </div>
                    <div>
                      <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {applied.code}
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {applied.type === 'promo' 
                          ? `₦${applied.value.toLocaleString()} discount`
                          : `₦${applied.value.toLocaleString()} balance applied`
                        }
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleRemoveCode(applied.code)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode
                        ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
                        : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                    }`}
                    aria-label={`Remove ${applied.code}`}
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Applied Value Summary
        </h4>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Percent className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Promo Discounts
              </span>
            </div>
            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              -₦{getDiscountTotal().toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gift className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Gift Card Balance
              </span>
            </div>
            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              ₦{getAppliedTotal().toLocaleString()}
            </span>
          </div>
          
          <div className="pt-2 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Total Applied
              </span>
              <span className={`text-lg font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                ₦{(getAppliedTotal() - getDiscountTotal()).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}