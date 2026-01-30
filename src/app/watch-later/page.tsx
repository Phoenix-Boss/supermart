'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../../components/theme/themeprovider';
import { Heart, Trash2, ShoppingCart, ArrowLeft, Clock, Package } from 'lucide-react';

export default function WatchLaterPage() {
  const { themeMode } = useTheme();
  const isDarkMode = themeMode === 'dark';
  
  // Mock watch later items
  const [watchLaterItems, setWatchLaterItems] = useState<any[]>([
    { 
      id: 1, 
      name: 'Professional Studio Microphone',
      price: 125000,
      originalPrice: 150000,
      image: '🎙️',
      addedDate: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Wireless Bluetooth Headphones',
      price: 85000,
      image: '🎧',
      addedDate: '2024-01-18'
    },
    { 
      id: 3, 
      name: '4K Webcam with Microphone',
      price: 95000,
      originalPrice: 120000,
      image: '📹',
      addedDate: '2024-01-20'
    },
    { 
      id: 4, 
      name: 'Streaming Mixer Board',
      price: 225000,
      image: '🎛️',
      addedDate: '2024-01-22'
    },
    { 
      id: 5, 
      name: 'Condenser Microphone Bundle',
      price: 175000,
      originalPrice: 210000,
      image: '🎤',
      addedDate: '2024-01-25'
    },
  ]);

  // Function to move item to cart
  const moveToCart = (item: any) => {
    console.log('Adding to cart:', item);
    setWatchLaterItems(prev => prev.filter(i => i.id !== item.id));
  };

  // Function to remove item from watch later
  const removeFromWatchLater = (id: number) => {
    setWatchLaterItems(prev => prev.filter(item => item.id !== id));
  };

  // Calculate total saved amount
  const calculateTotalSaved = () => {
    return watchLaterItems.reduce((total, item) => {
      if (item.originalPrice) {
        return total + (item.originalPrice - item.price);
      }
      return total;
    }, 0);
  };

  if (watchLaterItems.length === 0) {
    return (
      <div className={`min-h-screen py-16 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center">
            {/* Empty Watch Later Icon */}
            <div className="relative mx-auto mb-8 w-32 h-32">
              <div className={`absolute inset-0 rounded-full blur-2xl ${isDarkMode ? 'bg-orange-500/20' : 'bg-orange-500/10'}`}></div>
              <div className={`relative w-32 h-32 rounded-full flex items-center justify-center shadow-2xl ${
                isDarkMode 
                  ? 'bg-black border-orange-500/30' 
                  : 'bg-white border-orange-400/30'
              } border`}>
                <Clock className="w-16 h-16 text-orange-500" />
              </div>
            </div>

            <h1 className={`text-3xl font-bold mb-4 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent'
            }`}>
              Your Watch List is Empty
            </h1>
            <p className={`mb-10 max-w-md mx-auto text-lg ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Save products you're interested in and come back to them later.
            </p>
            
            <Link
              href="/"
              className={`inline-flex items-center gap-3 font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:scale-105 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white hover:shadow-orange-500/30'
                  : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white hover:shadow-orange-500/20'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <nav className={`flex items-center space-x-2 text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <Link href="/" className={`hover:${isDarkMode ? 'text-orange-400' : 'text-orange-600'} transition-colors`}>
              Home
            </Link>
            <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Watch Later</span>
          </nav>

          {/* Cart Icon Link */}
          <Link
            href="/cart"
            className="relative flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors group"
            title="View Cart"
          >
            <div className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Watch Later Items */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className={`text-3xl font-bold mb-1 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Watch Later
                </h1>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {watchLaterItems.length} item{watchLaterItems.length !== 1 ? 's' : ''} saved for later
                </p>
              </div>
              
              {/* Total Saved */}
              {calculateTotalSaved() > 0 && (
                <div className={`px-4 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-black border border-green-500/30' 
                    : 'bg-white border border-green-500/30'
                }`}>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                    Total saved: ₦{calculateTotalSaved().toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Watch Later Items Grid - 2 per row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {watchLaterItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`relative rounded-xl p-4 transition-all duration-300 group h-full ${
                    isDarkMode 
                      ? 'bg-black hover:bg-gray-900 border-gray-800 hover:border-orange-500/50' 
                      : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-orange-500/50'
                  } border`}
                  style={{
                    animation: `slideIn 0.4s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="relative flex flex-col h-full">
                    {/* Product Image and Details Row */}
                    <div className="flex items-start gap-3 mb-4">
                      {/* Product Image */}
                      <Link 
                        href={`/product/${item.id}`}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 ${
                          isDarkMode
                            ? 'bg-gray-900 border-gray-800 group-hover:border-orange-500'
                            : 'bg-gray-100 border-gray-300 group-hover:border-orange-500'
                        } border`}
                      >
                        <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {item.image}
                        </span>
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 pr-2">
                            {/* Product Name */}
                            <Link 
                              href={`/product/${item.id}`}
                              className={`text-sm font-semibold hover:text-orange-400 transition-colors line-clamp-2 block mb-1 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {item.name}
                            </Link>
                            
                            {/* Added Date */}
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-orange-500" />
                              <span className="text-xs text-orange-500">
                                Added {item.addedDate}
                              </span>
                            </div>
                          </div>
                          
                          {/* Price */}
                          <div className="text-right">
                            <div className="text-base font-bold text-green-500">
                              ₦{item.price.toLocaleString()}
                            </div>
                            {item.originalPrice && (
                              <div className={`text-xs line-through ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                ₦{item.originalPrice.toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions - Bottom Section */}
                    <div className="mt-auto flex items-center justify-between">
                      {/* Move to Cart Button */}
                      <button 
                        onClick={() => moveToCart(item)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                          isDarkMode
                            ? 'bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500 text-white'
                            : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 text-white'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromWatchLater(item.id)}
                        className={`w-7 h-7 flex items-center justify-center rounded-md transition-all duration-300 ${
                          isDarkMode 
                            ? 'text-gray-400 hover:text-red-400 hover:bg-red-500/10' 
                            : 'text-gray-500 hover:text-red-500 hover:bg-red-500/10'
                        }`}
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Back to Shopping Link */}
            <Link
              href="/"
              className={`mt-6 inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
                isDarkMode
                  ? 'text-orange-400 hover:text-white hover:bg-orange-500/20 border-orange-500/50 border'
                  : 'text-orange-500 hover:text-orange-600 hover:bg-orange-500/10 border-orange-500/30 border'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Right Column - Summary Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className={`w-full h-auto min-h-[400px] ${isDarkMode ? 'bg-black' : 'bg-white'} rounded-2xl p-6 border ${isDarkMode ? 'border-orange-500/30' : 'border-orange-400/30'} shadow-2xl transition-all duration-300 overflow-hidden`}>
                
                {/* Header */}
                <div className="relative mb-6">
                  <h2 className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Watch List Summary
                  </h2>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {watchLaterItems.length} saved item{watchLaterItems.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Summary Details */}
                <div className="space-y-4 mb-6">
                  {/* Total Items */}
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center gap-3">
                      <Package className={`w-5 h-5 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`} />
                      <span className={`${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>Total Items</span>
                    </div>
                    <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {watchLaterItems.length}
                    </span>
                  </div>

                  {/* Total Value */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <svg className={`w-5 h-5 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className={`${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>Total Value</span>
                    </div>
                    <span className="text-lg font-semibold text-green-500">
                      ₦{watchLaterItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                    </span>
                  </div>

                  {/* Total Saved */}
                  {calculateTotalSaved() > 0 && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <svg className={`w-5 h-5 text-green-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-green-500">Total Saved</span>
                      </div>
                      <span className="text-lg font-semibold text-green-500">
                        ₦{calculateTotalSaved().toLocaleString()}
                      </span>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="relative h-px my-4 overflow-hidden">
                    <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
                  </div>

                  {/* On Sale Items Count */}
                  <div className={`rounded-lg p-3 ${
                    isDarkMode 
                      ? 'bg-black border border-orange-500/30' 
                      : 'bg-white border border-orange-400/30'
                  }`}>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                      {watchLaterItems.filter(item => item.originalPrice).length} of {watchLaterItems.length} items are on sale
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {/* Move All to Cart Button */}
                  <button
                    onClick={() => watchLaterItems.forEach(moveToCart)}
                    className={`relative w-full text-center py-3 bg-gradient-to-r ${
                      isDarkMode 
                        ? 'from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500' 
                        : 'from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400'
                    } text-white font-semibold rounded-lg transition-all duration-300 shadow-lg ${
                      isDarkMode ? 'hover:shadow-orange-500/30' : 'hover:shadow-orange-500/20'
                    } hover:scale-105 overflow-hidden`}
                  >
                    Add All to Cart
                  </button>

                  {/* Clear All Button */}
                  <button
                    onClick={() => setWatchLaterItems([])}
                    className={`relative w-full text-center py-3 font-semibold rounded-lg transition-all duration-300 border overflow-hidden ${
                      isDarkMode
                        ? 'border-red-500/30 text-red-400 hover:text-white hover:bg-red-500/20'
                        : 'border-red-400/30 text-red-500 hover:text-white hover:bg-red-500/20'
                    }`}
                  >
                    Clear Watch List
                  </button>
                </div>
              </div>

              {/* Tips Section */}
              <div className={`mt-4 rounded-xl p-4 border ${
                isDarkMode
                  ? 'bg-black border-orange-500/30'
                  : 'bg-white border-orange-400/30'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-orange-100'}`}>
                    <Heart className={`w-5 h-5 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`} />
                  </div>
                  <div>
                    <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                      Watch List Tips
                    </p>
                    <ul className={`text-xs space-y-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li>• Items are saved for 90 days</li>
                      <li>• Get notified when prices drop</li>
                      <li>• Add items to cart anytime</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations and styles */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}