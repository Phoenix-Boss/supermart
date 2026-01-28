'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Theme {
  primary: string;
  background: string;
  foreground: string; // Renamed from 'text' to match CSS variables
  surface: string;
  border: string;
}

interface ThemeContextType {
  themeMode: 'light' | 'dark' | 'system' | 'custom';
  customTheme: Theme;
  setThemeMode: (mode: 'light' | 'dark' | 'system' | 'custom') => void;
  updateCustomTheme: (updates: Partial<Theme>) => void;
  resetToSystem: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Default themes using HEX values that match CSS variable defaults
const defaultLightTheme: Theme = {
  primary: '#ea580c',
  background: '#ffffff',
  foreground: '#1e293b',
  surface: '#f8fafc',
  border: '#e2e8f0',
};

const defaultDarkTheme: Theme = {
  primary: '#fb923c',
  background: '#0f172a',
  foreground: '#f1f5f9',
  surface: '#1e293b',
  border: '#334155',
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  // DEFAULT TO DARK MODE
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system' | 'custom'>('dark');
  const [customTheme, setCustomTheme] = useState<Theme>(defaultDarkTheme);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('dark');

  // Detect system theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to document
  useEffect(() => {
    let themeToApply: Theme;
    let isDarkMode = false;

    if (themeMode === 'system') {
      themeToApply = systemTheme === 'dark' ? defaultDarkTheme : defaultLightTheme;
      isDarkMode = systemTheme === 'dark';
    } else if (themeMode === 'custom') {
      themeToApply = customTheme;
      isDarkMode = isDarkColor(themeToApply.background);
    } else {
      themeToApply = themeMode === 'dark' ? defaultDarkTheme : defaultLightTheme;
      isDarkMode = themeMode === 'dark';
    }

    // SET CSS VARIABLES THAT MATCH globals.css
    document.documentElement.style.setProperty('--background', themeToApply.background);
    document.documentElement.style.setProperty('--foreground', themeToApply.foreground);
    document.documentElement.style.setProperty('--primary', themeToApply.primary);
    document.documentElement.style.setProperty('--surface', themeToApply.surface);
    document.documentElement.style.setProperty('--border', themeToApply.border);

    // Manage dark class for Tailwind variants
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode, customTheme, systemTheme]);

  // Persist preferences
  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
    localStorage.setItem('customTheme', JSON.stringify(customTheme));
  }, [themeMode, customTheme]);

  // Load saved preferences
  useEffect(() => {
    const savedMode = (localStorage.getItem('themeMode') as 'light' | 'dark' | 'system' | 'custom') || 'dark';
    const savedTheme = localStorage.getItem('customTheme');
    
    setThemeMode(savedMode);
    if (savedTheme) {
      setCustomTheme(JSON.parse(savedTheme));
    }
  }, []);

  const updateCustomTheme = (updates: Partial<Theme>) => {
    setCustomTheme(prev => ({ ...prev, ...updates }));
    setThemeMode('custom');
  };

  const resetToSystem = () => {
    setThemeMode('system');
    setCustomTheme(systemTheme === 'dark' ? defaultDarkTheme : defaultLightTheme);
  };

  // Determine if color is dark for auto dark mode detection
  const isDarkColor = (hex: string): boolean => {
    // Remove # if present
    hex = hex.replace('#', '');
    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  };

  return (
    <ThemeContext.Provider value={{
      themeMode,
      customTheme,
      setThemeMode,
      updateCustomTheme,
      resetToSystem
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}