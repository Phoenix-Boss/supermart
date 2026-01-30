// File: components/cart/CartGiftOptions.tsx
'use client';

import { useState } from 'react';
import { useTheme } from '../../components/theme/themeprovider';
import { Gift, MessageSquare, Tag, Ribbon, Sparkles, Box, Heart, Star, Check } from 'lucide-react';

interface CartGiftOptionsProps {
  onOptionsChange?: (options: GiftOptions) => void;
}

interface GiftOptions {
  giftWrapping: boolean;
  giftMessage: string;
  giftReceipt: boolean;
  specialInstructions: string;
  giftWrapStyle: 'standard' | 'premium' | 'luxury';
  includeCard: boolean;
}

export default function CartGiftOptions({ onOptionsChange }: CartGiftOptionsProps) {
  const { themeMode } = useTheme();
  const isDarkMode = themeMode === 'dark';
  
  const [options, setOptions] = useState<GiftOptions>({
    giftWrapping: false,
    giftMessage: '',
    giftReceipt: true,
    specialInstructions: '',
    giftWrapStyle: 'standard',
    includeCard: false,
  });

  const handleOptionChange = (key: keyof GiftOptions, value: any) => {
    const newOptions = { ...options, [key]: value };
    setOptions(newOptions);
    onOptionsChange?.(newOptions);
  };

  const giftWrapStyles = [
    {
      id: 'standard',
      name: 'Standard Wrap',
      price: 500,
      description: 'Elegant wrapping paper with ribbon',
      icon: <Gift className="w-5 h-5" />,
      color: 'from-blue-400 to-blue-600',
    },
    {
      id: 'premium',
      name: 'Premium Wrap',
      price: 1000,
      description: 'Premium paper with custom ribbon and tag',
      icon: <Ribbon className="w-5 h-5" />,
      color: 'from-purple-400 to-purple-600',
    },
    {
      id: 'luxury',
      name: 'Luxury Wrap',
      price: 2000,
      description: 'Luxury box with satin ribbon and gold foil',
      icon: <Sparkles className="w-5 h-5" />,
      color: 'from-yellow-400 to-orange-600',
    },
  ];

  const totalGiftCost = options.giftWrapping
    ? giftWrapStyles.find(style => style.id === options.giftWrapStyle)?.price || 0
    : 0;

  return (
    <div className={`rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-pink-50'}`}>
            <Gift className={`w-5 h-5 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`} />
          </div>
          <div>
            <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Gift Options
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Add special touches to your order
            </p>
          </div>
        </div>
      </div>

      {/* Gift Wrapping Toggle */}
      <div className="p-4 border-b border-gray-700">
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded flex items-center justify-center ${
              options.giftWrapping
                ? isDarkMode ? 'bg-pink-500' : 'bg-pink-500'
                : isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
            }`}>
              {options.giftWrapping && (
                <Check className="w-4 h-4 text-white" />
              )}
            </div>
            <div>
              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Add Gift Wrapping
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Make this order extra special
              </p>
            </div>
          </div>
          <div className="relative">
            <input
              type="checkbox"
              checked={options.giftWrapping}
              onChange={(e) => handleOptionChange('giftWrapping', e.target.checked)}
              className="sr-only"
            />
            <div className={`w-12 h-6 rounded-full transition-colors ${
              options.giftWrapping
                ? isDarkMode ? 'bg-pink-500' : 'bg-pink-500'
                : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
            }`}>
              <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                options.giftWrapping ? 'translate-x-7' : 'translate-x-1'
              }`}></div>
            </div>
          </div>
        </label>
      </div>

      {/* Gift Wrap Styles */}
      {options.giftWrapping && (
        <>
          <div className="p-4 border-b border-gray-700">
            <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Choose Wrapping Style
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {giftWrapStyles.map((style) => (
                <label
                  key={style.id}
                  className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    options.giftWrapStyle === style.id
                      ? isDarkMode ? 'border-pink-500 bg-pink-500/10' : 'border-pink-500 bg-pink-50'
                      : isDarkMode ? 'border-gray-800 hover:border-gray-700' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="giftWrapStyle"
                    value={style.id}
                    checked={options.giftWrapStyle === style.id}
                    onChange={(e) => handleOptionChange('giftWrapStyle', e.target.value)}
                    className="sr-only"
                  />
                  
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        {style.icon}
                      </div>
                      <div>
                        <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {style.name}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          ₦{style.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    {options.giftWrapStyle === style.id && (
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        isDarkMode ? 'bg-pink-500' : 'bg-pink-500'
                      }`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <p className={`text-xs mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {style.description}
                  </p>
                  
                  <div className={`h-1 rounded-full bg-gradient-to-r ${style.color}`}></div>
                </label>
              ))}
            </div>
          </div>

          {/* Gift Message */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Gift Message
              </h4>
            </div>
            
            <textarea
              value={options.giftMessage}
              onChange={(e) => handleOptionChange('giftMessage', e.target.value)}
              placeholder="Write a personalized message for the recipient..."
              rows={3}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
              maxLength={200}
            />
            <div className="flex justify-between mt-2">
              <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                {options.giftMessage.length}/200 characters
              </p>
              <button
                onClick={() => handleOptionChange('giftMessage', '')}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  isDarkMode
                    ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
              >
                Clear
              </button>
            </div>
          </div>

          {/* Additional Options */}
          <div className="p-4 border-b border-gray-700">
            <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Additional Options
            </h4>
            
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded flex items-center justify-center ${
                    options.includeCard
                      ? isDarkMode ? 'bg-green-500' : 'bg-green-500'
                      : isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                  }`}>
                    {options.includeCard && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Include Gift Card
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Add a blank gift card
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={options.includeCard}
                    onChange={(e) => handleOptionChange('includeCard', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-12 h-6 rounded-full transition-colors ${
                    options.includeCard
                      ? isDarkMode ? 'bg-green-500' : 'bg-green-500'
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}>
                    <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                      options.includeCard ? 'translate-x-7' : 'translate-x-1'
                    }`}></div>
                  </div>
                </div>
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded flex items-center justify-center ${
                    options.giftReceipt
                      ? isDarkMode ? 'bg-blue-500' : 'bg-blue-500'
                      : isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                  }`}>
                    {options.giftReceipt && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Include Gift Receipt
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Hide prices from recipient
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={options.giftReceipt}
                    onChange={(e) => handleOptionChange('giftReceipt', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-12 h-6 rounded-full transition-colors ${
                    options.giftReceipt
                      ? isDarkMode ? 'bg-blue-500' : 'bg-blue-500'
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}>
                    <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                      options.giftReceipt ? 'translate-x-7' : 'translate-x-1'
                    }`}></div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Tag className={`w-5 h-5 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Special Instructions
              </h4>
            </div>
            
            <textarea
              value={options.specialInstructions}
              onChange={(e) => handleOptionChange('specialInstructions', e.target.value)}
              placeholder="Any special requests or instructions for the gift..."
              rows={2}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
              maxLength={150}
            />
            <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Optional: Delivery notes, color preferences, etc.
            </p>
          </div>
        </>
      )}

      {/* Summary */}
      {options.giftWrapping && (
        <div className={`p-4 border-t border-gray-700 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Total Gift Options
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {giftWrapStyles.find(s => s.id === options.giftWrapStyle)?.name}
                {options.includeCard && ' + Gift Card'}
              </p>
            </div>
            <p className={`text-lg font-bold ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>
              ₦{totalGiftCost.toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}