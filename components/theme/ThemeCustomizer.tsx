'use client';

import { useState } from 'react';
import { useTheme } from './themeprovider';

// Define default theme configurations
const defaultLightTheme = {
  primary: '#FF6B35',    // Orange-500
  background: '#FFFFFF',
  text: '#1F2937',       // Gray-800
  surface: '#F9FAFB',    // Gray-50
  border: '#E5E7EB',     // Gray-200
};

const defaultDarkTheme = {
  primary: '#FF6B35',    // Orange-500
  background: '#111827', // Gray-900
  text: '#F9FAFB',       // Gray-50
  surface: '#1F2937',    // Gray-800
  border: '#374151',     // Gray-700
};

export default function ThemeCustomizer() {
  const { themeMode, customTheme, setThemeMode, updateCustomTheme, resetToSystem } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const presetThemes = [
    { name: 'Light', value: 'light', colors: defaultLightTheme },
    { name: 'Dark', value: 'dark', colors: defaultDarkTheme },
    { name: 'Ocean', value: 'custom', colors: {
      primary: '#0EA5E9',
      background: '#F0F9FF',
      text: '#0C4A6E',
      surface: '#E0F2FE',
      border: '#BAE6FD',
    }},
    { name: 'Forest', value: 'custom', colors: {
      primary: '#10B981',
      background: '#ECFDF5',
      text: '#064E3B',
      surface: '#D1FAE5',
      border: '#A7F3D0',
    }},
    { name: 'Sunset', value: 'custom', colors: {
      primary: '#F59E0B',
      background: '#FFFBEB',
      text: '#92400E',
      surface: '#FEF3C7',
      border: '#FDE68A',
    }},
    { name: 'Royal', value: 'custom', colors: {
      primary: '#8B5CF6',
      background: '#F5F3FF',
      text: '#5B21B6',
      surface: '#EDE9FE',
      border: '#DDD6FE',
    }},
  ];

  const handleColorChange = (key: string, value: string) => {
    updateCustomTheme({ [key]: value });
  };

  const applyPreset = (colors: Record<string, string>) => {
    // Only update custom theme colors that exist in the current customTheme
    const validUpdates = Object.keys(customTheme).reduce((acc, key) => {
      if (colors[key]) {
        acc[key] = colors[key];
      }
      return acc;
    }, {} as Record<string, string>);
    
    updateCustomTheme(validUpdates);
    setThemeMode('custom');
  };

  return (
    <>
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-20 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        aria-label="Customize theme"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </button>

      {/* Theme Customizer Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Theme Customizer</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close theme customizer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Preset Themes */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Preset Themes</h4>
            <div className="grid grid-cols-3 gap-2">
              {presetThemes.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    if (preset.value === 'custom') {
                      applyPreset(preset.colors);
                    } else {
                      setThemeMode(preset.value as 'light' | 'dark' | 'system');
                    }
                  }}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    (themeMode === preset.value && preset.value !== 'custom') || 
                    (themeMode === 'custom' && preset.value === 'custom' && 
                     Object.entries(preset.colors).every(([k, v]) => customTheme[k as keyof typeof customTheme] === v))
                      ? 'border-orange-500 ring-2 ring-orange-200 dark:ring-orange-800' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                  }`}
                  style={{
                    background: preset.value === 'light' 
                      ? 'linear-gradient(135deg, #ffffff, #f9fafb)'
                      : preset.value === 'dark'
                      ? 'linear-gradient(135deg, #111827, #1f2937)'
                      : `linear-gradient(135deg, ${preset.colors.primary}20, ${preset.colors.background})`,
                  }}
                  title={preset.name}
                >
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.colors.primary }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.colors.background }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.colors.text }} />
                  </div>
                  <span className="text-[10px] mt-0.5 block text-gray-700 dark:text-gray-300">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Mode Selector */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Theme Mode</h4>
            <div className="grid grid-cols-3 gap-2">
              {['light', 'dark', 'system'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setThemeMode(mode as 'light' | 'dark' | 'system')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    themeMode === mode 
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30' 
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    {mode === 'light' ? (
                      <svg className="w-5 h-5 text-yellow-500 mb-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </svg>
                    ) : mode === 'dark' ? (
                      <svg className="w-5 h-5 text-indigo-500 mb-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-blue-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                    <span className="text-xs capitalize text-gray-700 dark:text-gray-300">
                      {mode === 'system' ? 'Auto' : mode}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Customization */}
          {themeMode === 'custom' && (
            <>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full mb-4 p-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 flex items-center justify-center gap-2"
              >
                {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
                <svg className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showAdvanced && (
                <div className="space-y-4 mb-6">
                  {Object.entries(customTheme).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <span className="text-xs font-mono text-gray-500">{value}</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={value}
                          onChange={(e) => handleColorChange(key, e.target.value)}
                          className="w-10 h-10 cursor-pointer rounded border border-gray-300 dark:border-gray-600"
                          aria-label={`Pick ${key} color`}
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleColorChange(key, e.target.value)}
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={resetToSystem}
              className="flex-1 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            >
              Reset to System
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2 text-sm bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all font-medium"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}