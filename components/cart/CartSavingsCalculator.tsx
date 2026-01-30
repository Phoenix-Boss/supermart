// File: components/cart/CartStockValidator.tsx (continued)
'use client';

import { useState, useEffect } from 'react';
import { useDomainCart } from './DomainCartProvider';
import { useTheme } from '../../components/theme/themeprovider';
import { AlertTriangle, CheckCircle, XCircle, RefreshCw, Package, Clock, TrendingDown, Bell, Truck, MapPin } from 'lucide-react';

interface CartStockValidatorProps {
  domainId: string;
}

interface StockAlert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  message: string;
  icon: React.ReactNode;
  action?: () => void;
}

export default function CartStockValidator({ domainId }: CartStockValidatorProps) {
  const { themeMode } = useTheme();
  const isDarkMode = themeMode === 'dark';
  const { items, getCartByDomain, updateQuantity, removeItem } = useDomainCart();
  const [alerts, setAlerts] = useState<StockAlert[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState<string>('Just now');

  // Simulate stock validation
  useEffect(() => {
    const validateStock = () => {
      setIsChecking(true);
      const domainItems = getCartByDomain(domainId);
      const newAlerts: StockAlert[] = [];

      // Simulate API delay
      setTimeout(() => {
        // Out of stock alerts
        domainItems.forEach(item => {
          if (Math.random() > 0.7) {
            newAlerts.push({
              id: `${item.id}-out-of-stock`,
              type: 'error',
              message: `${item.name} is now out of stock`,
              icon: <XCircle className="w-4 h-4" />,
              action: () => updateQuantity(item.id, 0),
            });
          }
        });

        // Price change alerts
        domainItems.forEach(item => {
          if (Math.random() > 0.8) {
            const newPrice = Math.round(item.price * 0.9); // 10% price drop
            newAlerts.push({
              id: `${item.id}-price-change`,
              type: 'info',
              message: `Price dropped! ${item.name} is now ₦${newPrice.toLocaleString()} (was ₦${item.price.toLocaleString()})`,
              icon: <TrendingDown className="w-4 h-4" />,
              action: () => alert(`Price updated to ₦${newPrice.toLocaleString()}`),
            });
          }
        });

        // Low stock alerts
        domainItems.forEach(item => {
          if (Math.random() > 0.9) {
            newAlerts.push({
              id: `${item.id}-low-stock`,
              type: 'warning',
              message: `Hurry! Only 3 left of ${item.name}`,
              icon: <AlertTriangle className="w-4 h-4" />,
            });
          }
        });

        // Shipping restriction alerts
        if (Math.random() > 0.95) {
          newAlerts.push({
            id: 'shipping-restriction',
            type: 'warning',
            message: 'Some items cannot be shipped to your selected location',
            icon: <Package className="w-4 h-4" />,
            action: () => window.location.href = '/checkout?step=1',
          });
        }

        // Back in stock alerts
        if (Math.random() > 0.6 && domainItems.length > 0) {
          const randomItem = domainItems[Math.floor(Math.random() * domainItems.length)];
          newAlerts.push({
            id: `${randomItem.id}-back-in-stock`,
            type: 'success',
            message: `${randomItem.name} is back in stock!`,
            icon: <CheckCircle className="w-4 h-4" />,
            action: () => updateQuantity(randomItem.id, 1),
          });
        }

        setAlerts(newAlerts);
        setIsChecking(false);
        setLastChecked(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }, 1500);
    };

    validateStock();
    const interval = setInterval(validateStock, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [domainId, getCartByDomain, updateQuantity]);

  const clearAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const clearAllAlerts = () => {
    setAlerts([]);
  };

  const alertColors = {
    warning: isDarkMode ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' : 'bg-yellow-50 border-yellow-200 text-yellow-700',
    error: isDarkMode ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-red-50 border-red-200 text-red-700',
    info: isDarkMode ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-700',
    success: isDarkMode ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-green-50 border-green-200 text-green-700',
  };

  const alertIcons = {
    warning: <AlertTriangle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    info: <Bell className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5" />,
  };

  if (alerts.length === 0) {
    return (
      <div className={`rounded-xl p-4 border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div>
              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                All items are available
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Last checked: {lastChecked}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsChecking(true)}
            disabled={isChecking}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isChecking ? 'opacity-50 cursor-not-allowed' : ''} ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {isChecking ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              'Check Again'
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
          </div>
          <div>
            <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Cart Alerts ({alerts.length})
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Last checked: {lastChecked}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsChecking(true)}
            disabled={isChecking}
            className={`p-2 rounded-lg transition-colors ${isChecking ? 'opacity-50 cursor-not-allowed' : ''} ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={clearAllAlerts}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Dismiss All
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="max-h-64 overflow-y-auto">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-start gap-3 p-4 border-b last:border-b-0 ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} ${alertColors[alert.type]}`}
          >
            <div className="mt-0.5">
              {alertIcons[alert.type]}
            </div>
            <div className="flex-1">
              <p className="text-sm">{alert.message}</p>
              {alert.action && (
                <button
                  onClick={alert.action}
                  className={`mt-2 text-sm font-medium px-3 py-1 rounded transition-colors ${
                    alert.type === 'error' 
                      ? 'bg-red-500/20 hover:bg-red-500/30 text-red-600 dark:text-red-400'
                      : alert.type === 'warning'
                      ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-600 dark:text-yellow-400'
                      : alert.type === 'info'
                      ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-600 dark:text-blue-400'
                      : 'bg-green-500/20 hover:bg-green-500/30 text-green-600 dark:text-green-400'
                  }`}
                >
                  {alert.type === 'error' ? 'Remove Item' :
                   alert.type === 'info' ? 'Update Price' :
                   alert.type === 'success' ? 'Add to Cart' : 'Fix Issue'}
                </button>
              )}
            </div>
            <button
              onClick={() => clearAlert(alert.id)}
              className={`p-1 rounded transition-colors ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <XCircle className="w-4 h-4 opacity-50" />
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            {alerts.filter(a => a.type === 'error').length} require action
          </span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                In stock
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Low stock
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Out of stock
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}