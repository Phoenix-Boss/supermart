'use client';

import { useTheme } from './themeprovider';

export function ThemeToggle() {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 dark:from-orange-500 dark:to-yellow-500 transition-all duration-300 outline-none"
      aria-label={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="sr-only">Switch theme</span>
      <div
        className={`absolute top-1 w-6 h-6 rounded-full bg-white transform transition-transform duration-300 ${
          themeMode === 'dark' ? 'translate-x-7' : 'translate-x-1'
        }`}
      >
        <div className="flex items-center justify-center h-full">
          {themeMode === 'dark' ? (
            <span className="text-yellow-500 text-sm">🌙</span>
          ) : (
            <span className="text-orange-500 text-sm">☀️</span>
          )}
        </div>
      </div>
    </button>
  );
}