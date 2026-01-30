'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../theme/themeprovider';
import { useCart } from '../CartProvider';
import { Package } from 'lucide-react';

export default function MarketplaceHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasOrders, setHasOrders] = useState(false);
  const { themeMode, toggleTheme } = useTheme();
  const { totalItems } = useCart();

  // Check if user has orders
  useEffect(() => {
    const checkOrders = () => {
      try {
        const lastOrder = localStorage.getItem('lastOrder');
        const savedOrders = localStorage.getItem('supermart_orders');
        
        if (lastOrder || savedOrders) {
          setHasOrders(true);
        } else {
          setHasOrders(false);
        }
      } catch (error) {
        console.error('Error checking orders:', error);
        setHasOrders(false);
      }
    };

    checkOrders();
    
    // Listen for storage changes
    const handleStorageChange = () => checkOrders();
    window.addEventListener('storage', handleStorageChange);
    
    // Check periodically
    const interval = setInterval(checkOrders, 3000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md ${
      themeMode === 'dark' 
        ? 'bg-black/80' 
        : 'bg-white/95'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - REMOVED BORDER LOGIC */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-xl"
          >
            <div className={`relative w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center overflow-hidden group-hover:scale-105 group-active:scale-105 transition-transform duration-300 ${
              themeMode === 'dark'
                ? 'bg-gradient-to-br from-orange-600 to-yellow-600'
                : 'bg-gradient-to-br from-orange-500 to-yellow-500'
            }`}>
              {/* Gradient glow effect - only in dark mode */}
              {themeMode === 'dark' && (
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 blur-xl"></div>
              )}
              <span className="relative text-white font-bold text-xl md:text-2xl">S</span>
            </div>
            <div className="relative">
              {/* Gradient text effect - only in dark mode */}
              {themeMode === 'dark' && (
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-lg blur opacity-20 group-hover:opacity-30 group-active:opacity-30 transition-opacity"></div>
              )}
              <h1 className={`relative text-xl md:text-2xl font-bold ${
                themeMode === 'dark'
                  ? 'bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent'
              }`}>
                Supermart
              </h1>
              <p className={`relative text-xs hidden md:block ${
                themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Marketplace
              </p>
            </div>
          </Link>

          {/* Desktop Nav - REMOVED BORDER LOGIC FOR CATEGORIES, FLASH SALES, STORES */}
          <nav className="hidden lg:flex items-center space-x-8 ml-10">
            <Link 
              href="/categories" 
              className={`relative font-medium group/nav transition-colors duration-300 outline-none ${
                themeMode === 'dark'
                  ? 'text-gray-300 hover:text-white active:text-white'
                  : 'text-gray-700 hover:text-orange-600 active:text-orange-600'
              }`}
            >
              Categories
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover/nav:w-full group-active/nav:w-full transition-all duration-300 ${
                themeMode === 'dark'
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500'
                  : 'bg-gradient-to-r from-orange-500 to-yellow-500'
              }`}></span>
            </Link>
            <Link 
              href="/deals" 
              className={`relative font-medium group/nav transition-colors duration-300 outline-none ${
                themeMode === 'dark'
                  ? 'text-gray-300 hover:text-white active:text-white'
                  : 'text-gray-700 hover:text-orange-600 active:text-orange-600'
              }`}
            >
              Flash Sales
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover/nav:w-full group-active/nav:w-full transition-all duration-300 ${
                themeMode === 'dark'
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500'
                  : 'bg-gradient-to-r from-orange-500 to-yellow-500'
              }`}></span>
            </Link>
            <Link 
              href="/stores" 
              className={`relative font-medium group/nav transition-colors duration-300 outline-none ${
                themeMode === 'dark'
                  ? 'text-gray-300 hover:text-white active:text-white'
                  : 'text-gray-700 hover:text-orange-600 active:text-orange-600'
              }`}
            >
              Stores
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover/nav:w-full group-active/nav:w-full transition-all duration-300 ${
                themeMode === 'dark'
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500'
                  : 'bg-gradient-to-r from-orange-500 to-yellow-500'
              }`}></span>
            </Link>
          </nav>

          {/* Search Bar - REMOVED ALL BORDERS */}
          <div className="hidden md:flex flex-1 max-w-3xl mx-8">
            <div className={`relative w-full flex items-center backdrop-blur-sm rounded-xl transition-colors duration-300 ${
              themeMode === 'dark'
                ? 'bg-gray-900/50'
                : 'bg-gray-100/80'
            }`}>
              {/* Filter button - REMOVED BORDER LOGIC */}
              <button className={`flex items-center px-4 py-3 transition-colors duration-300 outline-none ${
                themeMode === 'dark'
                  ? 'text-gray-400 hover:text-orange-400 active:text-orange-400'
                  : 'text-gray-600 hover:text-orange-600 active:text-orange-600'
              }`}>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M3 12h18M3 20h18" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 16h10" />
                </svg>
                <span className="text-sm font-medium">Filter</span>
              </button>

              {/* Divider */}
              <div className={`h-8 w-px ${
                themeMode === 'dark' ? 'bg-gray-800' : 'bg-gray-300'
              }`}></div>

              {/* Search input */}
              <input
                type="text"
                placeholder="Search products, brands and categories..."
                className={`flex-1 px-4 py-3 bg-transparent outline-none placeholder-gray-500 ${
                  themeMode === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              />

              {/* Search button with gradient - REMOVED BORDER LOGIC */}
              <button className={`px-5 py-3 text-white rounded-r-xl transition-all duration-300 hover:shadow-lg active:shadow-lg outline-none ${
                themeMode === 'dark'
                  ? 'bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500 active:from-orange-500 active:to-yellow-500 hover:shadow-orange-500/20 active:shadow-orange-500/20'
                  : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 active:from-orange-400 active:to-yellow-400 hover:shadow-orange-500/20 active:shadow-orange-500/20'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Theme Toggle - BORDER REMOVED */}
            <button
              onClick={toggleTheme}
              className={`relative w-10 h-10 rounded-full backdrop-blur-sm transition-all duration-300 group outline-none ${
                themeMode === 'dark'
                  ? 'bg-gray-900/50 text-gray-300 hover:text-orange-400 active:text-orange-400'
                  : 'bg-gray-100/80 text-gray-600 hover:text-orange-600 active:text-orange-600'
              }`}
              aria-label="Toggle theme"
            >
              <div className="flex items-center justify-center w-full h-full">
                {themeMode === 'dark' ? (
                  // Sun icon (switch to light mode)
                  <svg className="w-5 h-5 group-hover:scale-110 group-active:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  // Moon icon (switch to dark mode)
                  <svg className="w-5 h-5 group-hover:scale-110 group-active:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </div>
            </button>

            {/* User Profile - BORDER REMOVED */}
            <button className={`relative w-10 h-10 rounded-full backdrop-blur-sm transition-all duration-300 group outline-none ${
              themeMode === 'dark'
                ? 'bg-gray-900/50 text-gray-300 hover:text-orange-400 active:text-orange-400'
                : 'bg-gray-100/80 text-gray-600 hover:text-orange-600 active:text-orange-600'
            }`}>
              <svg className="w-5 h-5 mx-auto group-hover:scale-110 group-active:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Orders Icon - Only appears when there are orders */}
            {hasOrders && (
              <Link 
                href="/orders" 
                className="relative inline-block outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full group/orders"
              >
                <div className={`w-10 h-10 rounded-full backdrop-blur-sm transition-all duration-300 flex items-center justify-center ${
                  themeMode === 'dark'
                    ? 'bg-gray-900/50 text-orange-400 hover:text-yellow-400 active:text-yellow-400'
                    : 'bg-gray-100/80 text-orange-600 hover:text-yellow-600 active:text-yellow-600'
                }`}>
                  <Package className="w-5 h-5 group-hover/orders:scale-110 group-active/orders:scale-110 transition-transform" />
                  
                  {/* Active order indicator */}
                  <div className="absolute -top-1 -right-1">
                    <div className={`relative w-3 h-3 rounded-full animate-ping ${
                      themeMode === 'dark' 
                        ? 'bg-orange-500/70' 
                        : 'bg-orange-500/50'
                    }`}></div>
                    <div className={`absolute top-0 right-0 w-3 h-3 rounded-full ${
                      themeMode === 'dark'
                        ? 'bg-gradient-to-r from-orange-500 to-yellow-500'
                        : 'bg-gradient-to-r from-orange-500 to-yellow-500'
                    }`}></div>
                  </div>
                </div>
                
                {/* Tooltip */}
                <div className={`absolute -top-10 right-0 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap opacity-0 group-hover/orders:opacity-100 transition-opacity duration-300 pointer-events-none ${
                  themeMode === 'dark'
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-900 text-white'
                }`}>
                  My Orders
                  <div className={`absolute -bottom-1 right-3 w-2 h-2 rotate-45 ${
                    themeMode === 'dark' ? 'bg-gray-800' : 'bg-gray-900'
                  }`}></div>
                </div>
              </Link>
            )}

            {/* Cart - BORDER REMOVED */}
            <Link 
              href="/cart" 
              className="relative inline-block outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full group/cart"
            >
              <div className={`w-10 h-10 rounded-full backdrop-blur-sm transition-all duration-300 flex items-center justify-center ${
                themeMode === 'dark'
                  ? 'bg-gray-900/50 text-gray-300 hover:text-orange-400 active:text-orange-400'
                  : 'bg-gray-100/80 text-gray-600 hover:text-orange-600 active:text-orange-600'
              }`}>
                <svg className="w-5 h-5 group-hover/cart:scale-110 group-active/cart:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className={`absolute -top-1 -right-1 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg ${
                    themeMode === 'dark'
                      ? 'bg-gradient-to-r from-orange-600 to-yellow-600'
                      : 'bg-gradient-to-r from-orange-500 to-yellow-500'
                  }`}>
                    {totalItems}
                  </span>
                )}
              </div>
              
              {/* Cart Tooltip */}
              <div className={`absolute -top-10 right-0 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap opacity-0 group-hover/cart:opacity-100 transition-opacity duration-300 pointer-events-none ${
                themeMode === 'dark'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-900 text-white'
              }`}>
                Cart ({totalItems} items)
                <div className={`absolute -bottom-1 right-3 w-2 h-2 rotate-45 ${
                  themeMode === 'dark' ? 'bg-gray-800' : 'bg-gray-900'
                }`}></div>
              </div>
            </Link>

            {/* Mobile Menu Toggle - BORDER REMOVED */}
            <button 
              className={`lg:hidden w-10 h-10 rounded-full backdrop-blur-sm transition-all duration-300 flex items-center justify-center outline-none ${
                themeMode === 'dark'
                  ? 'bg-gray-900/50 text-gray-300 hover:text-orange-400 active:text-orange-400'
                  : 'bg-gray-100/80 text-gray-600 hover:text-orange-600 active:text-orange-600'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - REMOVED BORDERS FOR MOBILE LINKS AND SEARCH */}
        {isMenuOpen && (
          <div className={`lg:hidden py-4 backdrop-blur-lg ${
            themeMode === 'dark' ? 'bg-black/90' : 'bg-white/95'
          }`}>
            <div className="flex flex-col space-y-4 px-4">
              <Link 
                href="/categories" 
                className={`py-3 px-4 rounded-lg font-medium transition-all duration-300 outline-none ${
                  themeMode === 'dark'
                    ? 'bg-gray-900/50 hover:bg-gray-800/50 active:bg-gray-800/50 text-gray-300 hover:text-white active:text-white'
                    : 'bg-gray-100/80 hover:bg-gray-200/80 active:bg-gray-200/80 text-gray-700 hover:text-orange-600 active:text-orange-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                href="/deals" 
                className={`py-3 px-4 rounded-lg font-medium transition-all duration-300 outline-none ${
                  themeMode === 'dark'
                    ? 'bg-gray-900/50 hover:bg-gray-800/50 active:bg-gray-800/50 text-gray-300 hover:text-white active:text-white'
                    : 'bg-gray-100/80 hover:bg-gray-200/80 active:bg-gray-200/80 text-gray-700 hover:text-orange-600 active:text-orange-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Flash Sales
              </Link>
              <Link 
                href="/stores" 
                className={`py-3 px-4 rounded-lg font-medium transition-all duration-300 outline-none ${
                  themeMode === 'dark'
                    ? 'bg-gray-900/50 hover:bg-gray-800/50 active:bg-gray-800/50 text-gray-300 hover:text-white active:text-white'
                    : 'bg-gray-100/80 hover:bg-gray-200/80 active:bg-gray-200/80 text-gray-700 hover:text-orange-600 active:text-orange-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Stores
              </Link>
              
              {/* Add Orders link to mobile menu if user has orders */}
              {hasOrders && (
                <Link 
                  href="/orders" 
                  className={`py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center gap-3 outline-none ${
                    themeMode === 'dark'
                      ? 'bg-gradient-to-r from-orange-900/20 to-yellow-900/20 hover:from-orange-800/20 hover:to-yellow-800/20 active:from-orange-800/20 active:to-yellow-800/20 text-orange-400 hover:text-yellow-400 active:text-yellow-400'
                      : 'bg-gradient-to-r from-orange-100 to-yellow-100 hover:from-orange-200 hover:to-yellow-200 active:from-orange-200 active:to-yellow-200 text-orange-600 hover:text-yellow-600 active:text-yellow-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Package className="w-5 h-5" />
                  My Orders
                  <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                    themeMode === 'dark'
                      ? 'bg-orange-500/20 text-orange-300'
                      : 'bg-orange-500/10 text-orange-600'
                  }`}>
                    Active
                  </span>
                </Link>
              )}
              
              {/* Mobile Search - REMOVED BORDERS */}
              <div className={`mt-4 pt-4 ${
                themeMode === 'dark' ? 'border-gray-800' : 'border-gray-300'
              }`}>
                <div className={`relative flex items-center rounded-lg transition-colors duration-300 ${
                  themeMode === 'dark'
                    ? 'bg-gray-900/50'
                    : 'bg-gray-100/80'
                }`}>
                  <input
                    type="text"
                    placeholder="Search..."
                    className={`flex-1 px-4 py-3 bg-transparent outline-none placeholder-gray-500 ${
                      themeMode === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  />
                  <button className={`px-4 py-3 text-white rounded-r-lg transition-all duration-300 outline-none ${
                    themeMode === 'dark'
                      ? 'bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500 active:from-orange-500 active:to-yellow-500'
                      : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 active:from-orange-400 active:to-yellow-400'
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}