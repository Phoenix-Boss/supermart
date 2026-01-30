'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '../../../components/CartProvider';
import { useTheme } from '../../../components/theme/themeprovider';
import { Heart, Trash2, Package, Truck, Receipt, Tag, Percent } from 'lucide-react';

export default function CartPage() {
  const { themeMode } = useTheme();
  const isDarkMode = themeMode === 'dark';
  
  // Try to use cart context, but handle if it fails
  let cart;
  try {
    cart = useCart();
  } catch (error) {
    console.error('Cart context error:', error);
    cart = {
      items: [],
      removeItem: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      totalItems: 0,
      totalPrice: 0,
    };
  }

  const { items, removeItem, updateQuantity, totalItems, totalPrice } = cart;
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [watchLaterItems, setWatchLaterItems] = useState<any[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Calculate shipping and tax
  const shippingFee = 1500;
  const tax = 0;
  const isFreeShipping = totalPrice > 100000;
  const shipping = isFreeShipping ? 0 : shippingFee;
  const total = totalPrice + shipping + tax;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  // Calculate paginated items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  // Move item to watch later
  const moveToWatchLater = (item: any) => {
    setWatchLaterItems(prev => [...prev, item]);
    removeItem(item.id);
  };

  // Mock "You May Also Like" products
  const relatedProducts = [
    { 
      id: 1, 
      name: 'FIFINE K669', 
      discount: 25, 
      price: 85000,
      originalPrice: 113000,
      image: '🎤'
    },
    { 
      id: 2, 
      name: 'FDUCE SL40 XLR/USB', 
      price: 180000,
      image: '🎧'
    },
    { 
      id: 3, 
      name: 'MV7 Podcast Microphone', 
      price: 178000,
      image: '🎙️'
    },
    { 
      id: 4, 
      name: 'BM800 + K1 Live Sound', 
      originalPrice: 130000, 
      price: 94400,
      image: '🔊'
    },
    { 
      id: 5, 
      name: 'BM800 Condenser Micro', 
      originalPrice: 130000, 
      price: 94400,
      image: '🎛️'
    },
    { 
      id: 6, 
      name: 'Fifine K688 USB/XLR Dyn', 
      originalPrice: 201500, 
      price: 126400,
      image: '🎚️'
    },
    { 
      id: 7, 
      name: 'Shure Sm7b Vocal Dyna', 
      price: 118500,
      image: '📞'
    },
  ];

  // Manual scroll functionality for related products
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 300;
    }
  };

  if (items.length === 0) {
    return (
      <div className={`min-h-screen py-16 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center">
            {/* Empty Cart Icon */}
            <div className="relative mx-auto mb-8 w-32 h-32">
              <div className={`absolute inset-0 rounded-full blur-2xl ${isDarkMode ? 'bg-orange-500/20' : 'bg-orange-500/10'}`}></div>
              <div className={`relative w-32 h-32 rounded-full flex items-center justify-center shadow-2xl ${
                isDarkMode 
                  ? 'bg-gray-900 border-orange-500/30' 
                  : 'bg-white border-orange-400/30'
              } border`}>
                <span className="text-5xl">🛒</span>
              </div>
            </div>

            <h1 className={`text-3xl font-bold mb-4 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent'
            }`}>
              Your Cart is Empty
            </h1>
            <p className={`mb-10 max-w-md mx-auto text-lg ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Discover amazing products and start building your perfect collection.
            </p>
            
            <Link
              href="/"
              className={`inline-flex items-center gap-3 font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:scale-105 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white hover:shadow-orange-500/30'
                  : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white hover:shadow-orange-500/20'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header with Watch Later Icon */}
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
            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Shopping Cart</span>
          </nav>

          {/* Watch Later Icon */}
          <Link
            href="/watch-later"
            className="relative flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors group"
            title="Watch Later"
          >
            <div className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              {watchLaterItems.length > 0 && (
                <span className={`absolute -top-2 -right-2 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${
                  isDarkMode ? 'bg-orange-600 text-white' : 'bg-orange-500 text-white'
                }`}>
                  {watchLaterItems.length}
                </span>
              )}
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items - 2 per row */}
          <div className="lg:col-span-2">
            {/* Cart Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className={`text-3xl font-bold mb-1 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Shopping Cart
                </h1>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
                </p>
              </div>
              {/* Page Indicator */}
              {totalPages > 1 && (
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Page {currentPage} of {totalPages}
                </div>
              )}
            </div>

            {/* Cart Items Grid - 2 per row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {paginatedItems.map((item, index) => (
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
                  onMouseEnter={() => setIsHovered(item.id.toString())}  // Fixed: convert to string
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <div className="relative flex flex-col h-full">
                    {/* Product Image and Details Row */}
                    <div className="flex items-start gap-3 mb-4">
                      {/* Product Image */}
                      <Link 
                        href={`/product/${item.id}`}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 ${
                          isDarkMode
                            ? 'bg-gradient-to-br from-gray-900 to-black border-gray-800 group-hover:border-orange-500'
                            : 'bg-gradient-to-br from-gray-100 to-gray-50 border-gray-300 group-hover:border-orange-500'
                        } border`}
                      >
                        <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {item.name.charAt(0)}
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
                            
                            {/* Price per unit - GREEN */}
                            <div className="flex items-center gap-1">
                              <Tag className="w-3 h-3 text-green-500" />
                              <span className="text-xs text-green-500">₦{item.price.toLocaleString()} per unit</span>
                            </div>
                          </div>
                          
                          {/* Total Price */}
                          <div className="text-right">
                            <div className={`text-base font-bold ${
                              isHovered === item.id.toString()  // Fixed: compare with string
                                ? isDarkMode 
                                  ? 'text-white bg-gray-900/50 px-2 py-1 rounded' 
                                  : 'text-gray-900 bg-gray-100 px-2 py-1 rounded'
                                : isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              ₦{(item.price * item.quantity).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls and Actions - Bottom Section */}
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {/* Quantity Controls */}
                        <div className={`flex items-center rounded-md overflow-hidden border ${
                          isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-300'
                        }`}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className={`w-7 h-7 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${
                              isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
                            }`}
                            disabled={item.quantity <= 1}
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          
                          <span className={`w-8 text-center font-semibold text-xs ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className={`w-7 h-7 transition-colors flex items-center justify-center ${
                              isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
                            }`}
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        
                        {/* Save for Later Button */}
                        <button 
                          onClick={() => moveToWatchLater(item)}
                          className={`w-7 h-7 flex items-center justify-center rounded-md transition-all duration-300 ${
                            isDarkMode 
                              ? 'text-gray-400 hover:text-orange-400 hover:bg-orange-500/10' 
                              : 'text-gray-500 hover:text-orange-500 hover:bg-orange-500/10'
                          }`}
                          title="Save for Later"
                        >
                          <Heart className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
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

            {/* Pagination Controls - Only show if more than 10 items */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4 mb-6">
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentPage === 1
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:scale-110'
                  } ${
                    isDarkMode
                      ? 'bg-gray-900 text-white border border-gray-800'
                      : 'bg-white text-gray-900 border border-gray-300'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        currentPage === page
                          ? isDarkMode
                            ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white'
                            : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                          : isDarkMode
                            ? 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      } border ${
                        isDarkMode ? 'border-gray-800' : 'border-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentPage === totalPages
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:scale-110'
                  } ${
                    isDarkMode
                      ? 'bg-gray-900 text-white border border-gray-800'
                      : 'bg-white text-gray-900 border border-gray-300'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            {/* Continue Shopping Link */}
            <Link
              href="/"
              className={`mt-2 inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                isDarkMode
                  ? 'text-orange-400 hover:text-white hover:bg-orange-500/20 border-orange-500/50'
                  : 'text-orange-500 hover:text-orange-600 hover:bg-orange-500/10 border-orange-500/30'
              } border`}
              title="Continue Shopping"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>

          {/* Right Column - Order Summary - SOLID BLACK IN DARK MODE */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Order Summary Card - SOLID BLACK IN DARK MODE */}
              <div className={`w-full min-h-[400px] rounded-2xl p-5 shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
                isDarkMode
                  ? 'bg-black border-yellow-500/60'
                  : 'bg-white border-yellow-400/60'
              }`}>
                {/* Gold Border Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${
                  isDarkMode 
                    ? 'from-yellow-500/20 via-orange-500/10 to-yellow-500/20' 
                    : 'from-yellow-400/20 via-orange-400/10 to-yellow-400/20'
                } pointer-events-none`}></div>
                
                {/* Header */}
                <div className="relative mb-4">
                  <h2 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Order Summary
                  </h2>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {totalItems} item{totalItems !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Summary Details */}
                <div className="relative h-[calc(100%-180px)] overflow-y-auto pr-2 scrollbar-hide">
                  <div className="space-y-3 mb-4">
                    {/* Subtotal */}
                    <div className="flex justify-between items-center pt-1">
                      <div className="flex items-center gap-2">
                        <Package className={`w-4 h-4 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
                        <span className={`text-sm ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Subtotal</span>
                      </div>
                      <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        ₦{totalPrice.toLocaleString()}
                      </span>
                    </div>

                    {/* Shipping */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Truck className={`w-4 h-4 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
                        <span className={`text-sm ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Shipping</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {isFreeShipping ? (
                          <>
                            <span className="text-green-500 line-through text-xs">₦{shippingFee.toLocaleString()}</span>
                            <span className="text-green-500 font-semibold text-sm">FREE</span>
                          </>
                        ) : (
                          <span className="text-green-500 text-sm">₦{shippingFee.toLocaleString()}</span>
                        )}
                      </div>
                    </div>

                    {/* Tax */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Receipt className={`w-4 h-4 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
                        <span className={`text-sm ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Tax</span>
                      </div>
                      <span className="text-green-500 text-sm">₦{tax.toLocaleString()}</span>
                    </div>

                    {/* Animated Shimmer Divider */}
                    <div className="relative h-px my-4 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${
                        isDarkMode ? 'via-yellow-500' : 'via-yellow-400'
                      } to-transparent animate-shimmer`}></div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center pt-1">
                      <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Total
                      </span>
                      <div className="text-right">
                        <div className={`text-2xl font-bold bg-gradient-to-r ${
                          isDarkMode ? 'from-yellow-400 to-orange-400' : 'from-yellow-600 to-orange-600'
                        } bg-clip-text text-transparent`}>
                          ₦{total.toLocaleString()}
                        </div>
                        <div className="text-xs text-green-500">Including VAT</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fixed Bottom Section */}
                <div className="absolute bottom-5 left-5 right-5">
                  {/* Promo Code */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="w-4 h-4 text-green-500" />
                      <span className="text-green-500 font-medium text-sm">Promo Code</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        className={`flex-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                          isDarkMode 
                            ? 'focus:ring-yellow-500 bg-gray-900 border-gray-800 text-white placeholder-green-500/50'
                            : 'focus:ring-yellow-400 bg-gray-50 border-gray-300 text-gray-900 placeholder-green-500/50'
                        }`}
                      />
                      <button className={`px-3 py-2 font-medium rounded-lg transition-all duration-300 text-sm ${
                        isDarkMode
                          ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white hover:from-yellow-500 hover:to-orange-500'
                          : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-400 hover:to-orange-400'
                      }`}>
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link
                    href="/checkout"
                    className={`relative w-full py-2.5 text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center group text-sm ${
                      isDarkMode
                        ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]'
                        : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-[0_0_20px_rgba(255,165,0,0.3)]'
                    } hover:scale-105`}
                  >
                    <span className="relative z-10">Proceed to Checkout</span>
                    <div className={`absolute inset-0 bg-gradient-to-r ${
                      isDarkMode ? 'from-yellow-500 to-orange-500' : 'from-yellow-400 to-orange-400'
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg`}></div>
                    <svg className="w-4 h-4 ml-2 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* "You May Also Like" Section */}
      <div className="mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className={`text-xl font-bold mb-1 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                You May Also Like
              </h3>
              <p className={isDarkMode ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'}>
                Handpicked recommendations
              </p>
            </div>
          </div>

          {/* Horizontal Scrolling Container with Arrow Controls */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={scrollLeft}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 shadow-2xl ${
                isDarkMode
                  ? 'bg-black hover:bg-gray-900 text-white border-gray-800 hover:border-yellow-500'
                  : 'bg-white hover:bg-gray-100 text-gray-900 border-gray-300 hover:border-yellow-500'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 shadow-2xl ${
                isDarkMode
                  ? 'bg-black hover:bg-gray-900 text-white border-gray-800 hover:border-yellow-500'
                  : 'bg-white hover:bg-gray-100 text-gray-900 border-gray-300 hover:border-yellow-500'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="flex gap-4 pb-4 min-w-max">
                {relatedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 w-56 group"
                  >
                    <div className={`relative rounded-xl p-4 border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                      isDarkMode
                        ? 'bg-black border-gray-800 hover:border-yellow-500/50 hover:shadow-yellow-500/10'
                        : 'bg-white border-gray-300 hover:border-yellow-500/50 hover:shadow-yellow-500/5'
                    }`}>
                      {/* Discount Badge */}
                      {product.discount && (
                        <div className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full z-10 ${
                          isDarkMode
                            ? 'bg-gradient-to-r from-red-600 to-red-500 text-white'
                            : 'bg-gradient-to-r from-red-500 to-red-400 text-white'
                        }`}>
                          -{product.discount}%
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        {/* Product Icon */}
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl border transition-colors duration-300 ${
                          isDarkMode
                            ? 'bg-gradient-to-br from-gray-900 to-black border-gray-800 group-hover:border-yellow-500/50'
                            : 'bg-gradient-to-br from-gray-100 to-gray-50 border-gray-300 group-hover:border-yellow-500/50'
                        }`}>
                          {product.image}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm font-semibold group-hover:text-yellow-400 transition-colors line-clamp-1 mb-2 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {product.name}
                          </h4>
                          
                          {/* Price Display */}
                          <div className="flex items-baseline gap-1">
                            <div className={`text-base font-bold px-1.5 py-0.5 rounded ${
                              isDarkMode ? 'bg-white text-black' : 'bg-gray-900 text-white'
                            }`}>
                              ₦{product.price.toLocaleString()}
                            </div>
                            {product.originalPrice && (
                              <div className={isDarkMode ? 'text-gray-400 text-xs line-through' : 'text-gray-500 text-xs line-through'}>
                                ₦{product.originalPrice.toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <button className={`mt-3 w-full py-2 text-sm rounded-lg transition-all duration-300 font-medium flex items-center justify-center gap-2 transform translate-y-2 group-hover:translate-y-0 ${
                        isDarkMode
                          ? 'bg-gray-900 hover:bg-yellow-600 text-white'
                          : 'bg-gray-100 hover:bg-yellow-500 text-gray-900 hover:text-white'
                      }`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
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

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        /* Hide scrollbar */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}