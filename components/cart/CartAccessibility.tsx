// File: components/cart/CartAccessibility.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../components/theme/themeprovider';
import { Keyboard, Eye, Volume2, ZoomIn, Contrast, AlertCircle, CheckCircle } from 'lucide-react';

interface CartAccessibilityProps {
  onAccessibilityChange?: (options: AccessibilityOptions) => void;
}

interface AccessibilityOptions {
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
  screenReaderAnnounce: boolean;
  reducedMotion: boolean;
  keyboardNavigation: boolean;
}

export default function CartAccessibility({ onAccessibilityChange }: CartAccessibilityProps) {
  const { themeMode } = useTheme();
  const isDarkMode = themeMode === 'dark';
  
  const [options, setOptions] = useState<AccessibilityOptions>({
    highContrast: false,
    fontSize: 'normal',
    screenReaderAnnounce: true,
    reducedMotion: false,
    keyboardNavigation: true,
  });

  const [announcements, setAnnouncements] = useState<string[]>([]);
  const announcementRef = useRef<HTMLDivElement>(null);

  const handleOptionChange = (key: keyof AccessibilityOptions, value: any) => {
    const newOptions = { ...options, [key]: value };
    setOptions(newOptions);
    onAccessibilityChange?.(newOptions);
    
    // Add announcement for screen readers
    if (key === 'highContrast' && value) {
      addAnnouncement('High contrast mode enabled');
    } else if (key === 'fontSize' && value !== 'normal') {
      addAnnouncement(`Font size set to ${value}`);
    } else if (key === 'reducedMotion' && value) {
      addAnnouncement('Reduced motion enabled');
    }
  };

  const addAnnouncement = (message: string) => {
    if (options.screenReaderAnnounce) {
      setAnnouncements(prev => [...prev, message]);
      
      // Clear announcement after 5 seconds
      setTimeout(() => {
        setAnnouncements(prev => prev.slice(1));
      }, 5000);
    }
  };

  // Apply high contrast styles
  useEffect(() => {
    if (options.highContrast) {
      document.documentElement.style.setProperty('--contrast-multiplier', '1.5');
    } else {
      document.documentElement.style.removeProperty('--contrast-multiplier');
    }
  }, [options.highContrast]);

  // Apply font size
  useEffect(() => {
    const sizes = {
      normal: '16px',
      large: '18px',
      xlarge: '20px',
    };
    document.documentElement.style.fontSize = sizes[options.fontSize];
  }, [options.fontSize]);

  // Apply reduced motion
  useEffect(() => {
    if (options.reducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.1s');
    } else {
      document.documentElement.style.removeProperty('--animation-duration');
    }
  }, [options.reducedMotion]);

  // Keyboard navigation focus management
  useEffect(() => {
    if (options.keyboardNavigation) {
      const handleKeyDown = (e: KeyboardEvent) => {
        // Tab key navigation enhancement
        if (e.key === 'Tab') {
          const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (focusableElements.length > 0) {
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
            
            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
        
        // Escape key to close modals
        if (e.key === 'Escape') {
          const modals = document.querySelectorAll('[role="dialog"], .modal');
          if (modals.length > 0) {
            const lastModal = modals[modals.length - 1] as HTMLElement;
            const closeButton = lastModal.querySelector('[aria-label="Close"]') as HTMLElement;
            if (closeButton) closeButton.click();
          }
        }
        
        // Enter key on quantity controls
        if (e.key === 'Enter' && e.target instanceof HTMLElement) {
          if (e.target.closest('.quantity-control')) {
            const input = e.target.closest('.quantity-control')?.querySelector('input');
            if (input) input.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [options.keyboardNavigation]);

  // Focus trap for modal
  const setupFocusTrap = (modal: HTMLElement) => {
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      firstElement.focus();
      
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };
      
      modal.addEventListener('keydown', handleTabKey);
      return () => modal.removeEventListener('keydown', handleTabKey);
    }
  };

  // Screen reader announcements
  useEffect(() => {
    if (announcementRef.current && announcements.length > 0) {
      const liveRegion = announcementRef.current;
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
    }
  }, [announcements]);

  const fontSizeOptions = [
    { id: 'normal', label: 'Normal', description: 'Default text size' },
    { id: 'large', label: 'Large', description: '18px text size' },
    { id: 'xlarge', label: 'Extra Large', description: '20px text size' },
  ];

  return (
    <>
      {/* Screen Reader Announcements */}
      <div
        ref={announcementRef}
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcements.map((announcement, index) => (
          <span key={index}>{announcement}</span>
        ))}
      </div>

      <div className={`rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
              <Eye className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div>
              <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Accessibility Options
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Customize your shopping experience
              </p>
            </div>
          </div>
        </div>

        {/* High Contrast Toggle */}
        <div className="p-4 border-b border-gray-700">
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded flex items-center justify-center ${
                options.highContrast
                  ? isDarkMode ? 'bg-orange-500' : 'bg-orange-500'
                  : isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
              }`}>
                {options.highContrast && (
                  <CheckCircle className="w-4 h-4 text-white" />
                )}
              </div>
              <div>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  High Contrast Mode
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Increase contrast for better visibility
                </p>
              </div>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={options.highContrast}
                onChange={(e) => handleOptionChange('highContrast', e.target.checked)}
                className="sr-only"
                aria-label="Toggle high contrast mode"
              />
              <div className={`w-12 h-6 rounded-full transition-colors ${
                options.highContrast
                  ? isDarkMode ? 'bg-orange-500' : 'bg-orange-500'
                  : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                  options.highContrast ? 'translate-x-7' : 'translate-x-1'
                }`}></div>
              </div>
            </div>
          </label>
        </div>

        {/* Font Size Options */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <ZoomIn className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
            <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Text Size
            </h4>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {fontSizeOptions.map((size) => (
              <button
                key={size.id}
                onClick={() => handleOptionChange('fontSize', size.id)}
                className={`p-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  options.fontSize === size.id
                    ? isDarkMode ? 'border-green-500 bg-green-500/10' : 'border-green-500 bg-green-50'
                    : isDarkMode ? 'border-gray-800 hover:border-gray-700' : 'border-gray-300 hover:border-gray-400'
                }`}
                aria-pressed={options.fontSize === size.id}
                aria-label={`Set text size to ${size.label}`}
              >
                <div className="flex flex-col items-center">
                  <span className={`text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {size.label}
                  </span>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {size.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Additional Accessibility Options */}
        <div className="p-4">
          <div className="space-y-3">
            {/* Screen Reader Announcements */}
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded flex items-center justify-center ${
                  options.screenReaderAnnounce
                    ? isDarkMode ? 'bg-purple-500' : 'bg-purple-500'
                    : isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                }`}>
                  {options.screenReaderAnnounce && (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </div>
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Screen Reader Announcements
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Announce cart updates
                  </p>
                </div>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={options.screenReaderAnnounce}
                  onChange={(e) => handleOptionChange('screenReaderAnnounce', e.target.checked)}
                  className="sr-only"
                  aria-label="Toggle screen reader announcements"
                />
                <div className={`w-12 h-6 rounded-full transition-colors ${
                  options.screenReaderAnnounce
                    ? isDarkMode ? 'bg-purple-500' : 'bg-purple-500'
                    : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                }`}>
                  <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                    options.screenReaderAnnounce ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </div>
              </div>
            </label>

            {/* Reduced Motion */}
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded flex items-center justify-center ${
                  options.reducedMotion
                    ? isDarkMode ? 'bg-red-500' : 'bg-red-500'
                    : isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                }`}>
                  {options.reducedMotion && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Reduced Motion
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Reduce animations and transitions
                  </p>
                </div>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={options.reducedMotion}
                  onChange={(e) => handleOptionChange('reducedMotion', e.target.checked)}
                  className="sr-only"
                  aria-label="Toggle reduced motion"
                />
                <div className={`w-12 h-6 rounded-full transition-colors ${
                  options.reducedMotion
                    ? isDarkMode ? 'bg-red-500' : 'bg-red-500'
                    : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                }`}>
                  <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                    options.reducedMotion ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </div>
              </div>
            </label>

            {/* Keyboard Navigation */}
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded flex items-center justify-center ${
                  options.keyboardNavigation
                    ? isDarkMode ? 'bg-indigo-500' : 'bg-indigo-500'
                    : isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                }`}>
                  {options.keyboardNavigation && (
                    <Keyboard className="w-4 h-4 text-white" />
                  )}
                </div>
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Enhanced Keyboard Navigation
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Improved tab navigation and shortcuts
                  </p>
                </div>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={options.keyboardNavigation}
                  onChange={(e) => handleOptionChange('keyboardNavigation', e.target.checked)}
                  className="sr-only"
                  aria-label="Toggle enhanced keyboard navigation"
                />
                <div className={`w-12 h-6 rounded-full transition-colors ${
                  options.keyboardNavigation
                    ? isDarkMode ? 'bg-indigo-500' : 'bg-indigo-500'
                    : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                }`}>
                  <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                    options.keyboardNavigation ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className={`p-4 border-t border-gray-700 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Keyboard className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            <h4 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Keyboard Shortcuts
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className={`text-xs p-2 rounded ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tab</span>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}> Navigate elements</span>
            </div>
            <div className={`text-xs p-2 rounded ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Esc</span>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}> Close modals</span>
            </div>
            <div className={`text-xs p-2 rounded ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Enter</span>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}> Activate buttons</span>
            </div>
            <div className={`text-xs p-2 rounded ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Space</span>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}> Toggle checkboxes</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}