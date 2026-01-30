'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface CustomTheme {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  surface: string;
  border: string;
  cardBg: string;
  cardText: string;
  accent: string;
  gradientStart: string;
  gradientEnd: string;
}

interface ThemeContextType {
  themeMode: 'light' | 'dark';
  customTheme: CustomTheme;
  setThemeMode: (mode: 'light' | 'dark') => void;
  toggleTheme: () => void;
  updateCustomTheme: (theme: Partial<CustomTheme>) => void;
  resetToDefault: (mode: 'light' | 'dark') => void;
}

const defaultLightTheme: CustomTheme = {
  primary: '#EA580C', // orange-600
  secondary: '#D97706', // amber-600
  background: '#FFFFFF',
  foreground: '#171717',
  surface: '#F9FAFB',
  border: '#E5E7EB',
  cardBg: '#FFFFFF',
  cardText: '#1F2937',
  accent: '#F97316', // orange-500
  gradientStart: '#FFFFFF',
  gradientEnd: '#F9FAFB',
};

const defaultDarkTheme: CustomTheme = {
  primary: '#F97316', // orange-500
  secondary: '#F59E0B', // yellow-500
  background: '#0A0A0A',
  foreground: '#EDEDED',
  surface: '#111827',
  border: '#374151',
  cardBg: '#111827',
  cardText: '#F9FAFB',
  accent: '#FBBF24', // amber-400
  gradientStart: '#0F172A', // slate-900
  gradientEnd: '#000000',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark'); // Default to dark
  const [customTheme, setCustomTheme] = useState<CustomTheme>(defaultDarkTheme);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    setMounted(true);
    const savedThemeMode = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
    const savedCustomTheme = localStorage.getItem('customTheme');
    
    if (savedThemeMode) {
      setThemeMode(savedThemeMode);
      if (savedCustomTheme) {
        try {
          const parsed = JSON.parse(savedCustomTheme);
          setCustomTheme(parsed);
        } catch {
          setCustomTheme(savedThemeMode === 'light' ? defaultLightTheme : defaultDarkTheme);
        }
      } else {
        setCustomTheme(savedThemeMode === 'light' ? defaultLightTheme : defaultDarkTheme);
      }
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const mode = prefersDark ? 'dark' : 'light';
      setThemeMode(mode);
      setCustomTheme(mode === 'light' ? defaultLightTheme : defaultDarkTheme);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    const theme = customTheme;
    const root = document.documentElement;

    // Apply CSS variables
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-background', theme.background);
    root.style.setProperty('--color-foreground', theme.foreground);
    root.style.setProperty('--color-surface', theme.surface);
    root.style.setProperty('--color-border', theme.border);
    root.style.setProperty('--color-card-bg', theme.cardBg);
    root.style.setProperty('--color-card-text', theme.cardText);
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-gradient-start', theme.gradientStart);
    root.style.setProperty('--color-gradient-end', theme.gradientEnd);

    // Add/remove class for Tailwind dark mode
    if (themeMode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    // Save to localStorage
    localStorage.setItem('themeMode', themeMode);
    localStorage.setItem('customTheme', JSON.stringify(customTheme));
  }, [themeMode, customTheme, mounted]);

  const toggleTheme = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
    setCustomTheme(newMode === 'light' ? defaultLightTheme : defaultDarkTheme);
  };

  const updateCustomTheme = (updates: Partial<CustomTheme>) => {
    const newTheme = { ...customTheme, ...updates };
    setCustomTheme(newTheme);
    // When custom theme is applied, keep the current mode but update colors
    localStorage.setItem('customTheme', JSON.stringify(newTheme));
  };

  const resetToDefault = (mode: 'light' | 'dark') => {
    setThemeMode(mode);
    setCustomTheme(mode === 'light' ? defaultLightTheme : defaultDarkTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black">
        <div className="flex items-center justify-center h-screen">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{
      themeMode,
      customTheme,
      setThemeMode,
      toggleTheme,
      updateCustomTheme,
      resetToDefault,
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