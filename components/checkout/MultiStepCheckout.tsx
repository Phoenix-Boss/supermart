// File: components/checkout/MultiStepCheckout.tsx
'use client';

import { useTheme } from '../../components/theme/themeprovider';
import { CheckCircle, Package, CreditCard, MapPin, Truck } from 'lucide-react';

interface MultiStepCheckoutProps {
  currentStep: number;
  steps?: Array<{ id: number; label: string; icon: React.ReactNode }>;
}

export default function MultiStepCheckout({ currentStep = 1 }: MultiStepCheckoutProps) {
  const { themeMode } = useTheme();
  const isDarkMode = themeMode === 'dark';

  const steps = [
    { id: 1, label: 'Delivery', icon: <Package className="w-5 h-5" /> },
    { id: 2, label: 'Contact', icon: <MapPin className="w-5 h-5" /> },
    { id: 3, label: 'Payment', icon: <CreditCard className="w-5 h-5" /> },
    { id: 4, label: 'Confirm', icon: <CheckCircle className="w-5 h-5" /> },
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                currentStep >= step.id
                  ? isDarkMode
                    ? 'border-orange-500 bg-orange-500 text-white'
                    : 'border-orange-500 bg-orange-500 text-white'
                  : isDarkMode
                    ? 'border-gray-700 bg-gray-900 text-gray-500'
                    : 'border-gray-300 bg-white text-gray-400'
              }`}>
                {currentStep > step.id ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  step.icon
                )}
              </div>
              {/* Step Label */}
              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap text-sm font-medium ${
                currentStep >= step.id
                  ? isDarkMode ? 'text-orange-400' : 'text-orange-600'
                  : isDarkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {step.label}
              </div>
            </div>

            {/* Connecting Line (except for last step) */}
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${
                currentStep > step.id
                  ? isDarkMode ? 'bg-orange-500' : 'bg-orange-500'
                  : isDarkMode ? 'bg-gray-800' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}