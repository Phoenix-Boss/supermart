'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MarketplaceHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl md:text-2xl">S</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Supermart</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 hidden md:block">Marketplace</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6 ml-10">
            <Link href="/categories" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 font-medium">Categories</Link>
            <Link href="/deals" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 font-medium">Flash Sales</Link>
            <Link href="/stores" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 font-medium">Stores</Link>
          </nav>

          {/* Search Bar - Longer, with Filter */}
          <div className="hidden md:flex flex-1 max-w-3xl mx-8">
            <div className="relative w-full flex items-center bg-gray-100 dark:bg-gray-800 rounded-full focus-within:ring-2 focus-within:ring-orange-500 border border-gray-200 dark:border-gray-700">
              {/* Filter button */}
              <button className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-orange-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M3 12h18M3 20h18" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 16h10" />
                </svg>
                <span className="text-sm font-medium">Filter</span>
              </button>

              {/* Divider */}
              <div className="h-8 w-px bg-gray-300 dark:bg-gray-600"></div>

              {/* Search input */}
              <input
                type="text"
                placeholder="Search products, brands and categories..."
                className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              />

              {/* Search button */}
              <button className="px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-r-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300 hover:text-orange-600 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                // Sun icon (light mode)
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                // Moon icon (dark mode)
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button className="text-gray-700 dark:text-gray-300 hover:text-orange-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            <button className="relative">
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full px-1.5">3</span>
            </button>

            <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t bg-white dark:bg-gray-900">
            <div className="flex flex-col space-y-3 px-4">
              <Link href="/categories" className="text-gray-700 dark:text-gray-300 font-medium">Categories</Link>
              <Link href="/deals" className="text-gray-700 dark:text-gray-300 font-medium">Flash Sales</Link>
              <Link href="/stores" className="text-gray-700 dark:text-gray-300 font-medium">Stores</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}