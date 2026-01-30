// File: components/cart/CartBulkActions.tsx
'use client';

import { useState } from 'react';
import { useDomainCart } from './DomainCartProvider';
import { Check, Trash2, Heart, Package, Download } from 'lucide-react';
import { useTheme } from '../../components/theme/themeprovider';

interface CartBulkActionsProps {
  domainId: string;
}

export default function CartBulkActions({ domainId }: CartBulkActionsProps) {
  const { themeMode } = useTheme();
  const isDarkMode = themeMode === 'dark';
  const { items, removeItem, getCartByDomain } = useDomainCart();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isSelectAll, setIsSelectAll] = useState(false);

  const domainItems = getCartByDomain(domainId);
  
  // Toggle select all
  const toggleSelectAll = () => {
    if (isSelectAll) {
      setSelectedItems(new Set());
    } else {
      const allIds = new Set(domainItems.map(item => item.id));
      setSelectedItems(allIds);
    }
    setIsSelectAll(!isSelectAll);
  };

  // Toggle single item
  const toggleItem = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
    setIsSelectAll(newSelected.size === domainItems.length);
  };

  // Remove selected items
  const removeSelected = () => {
    selectedItems.forEach(id => removeItem(id));
    setSelectedItems(new Set());
    setIsSelectAll(false);
  };

  // Save for later
  const saveForLater = () => {
    // Dummy logic - would save to localStorage
    const savedItems = domainItems.filter(item => selectedItems.has(item.id));
    localStorage.setItem(`${domainId}_saved`, JSON.stringify(savedItems));
    alert(`${savedItems.length} items saved for later!`);
  };

  // Export selected
  const exportSelected = () => {
    const selectedData = domainItems.filter(item => selectedItems.has(item.id));
    const dataStr = JSON.stringify(selectedData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${domainId}_cart_export.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Calculate selected total
  const selectedTotal = domainItems
    .filter(item => selectedItems.has(item.id))
    .reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (domainItems.length === 0) return null;

  return (
    <div className={`rounded-2xl p-6 mb-6 border ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
      {/* Bulk Actions Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSelectAll}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              isSelectAll
                ? isDarkMode ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-blue-500 bg-blue-50 text-blue-600'
                : isDarkMode ? 'border-gray-800 hover:border-gray-700 text-gray-400' : 'border-gray-300 hover:border-gray-400 text-gray-600'
            }`}
          >
            {isSelectAll ? (
              <>
                <Check className="w-4 h-4" />
                All Selected
              </>
            ) : (
              <>
                <div className="w-4 h-4 border rounded" />
                Select All
              </>
            )}
          </button>
          
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {selectedItems.size} of {domainItems.length} selected
          </span>
        </div>

        {selectedItems.size > 0 && (
          <div className="flex items-center gap-2">
            <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              ₦{selectedTotal.toLocaleString()}
            </span>
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Total
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {selectedItems.size > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <button
            onClick={removeSelected}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? 'border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400'
                : 'border-red-500/30 bg-red-50 hover:bg-red-100 text-red-600'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            Remove Selected
          </button>

          <button
            onClick={saveForLater}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? 'border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400'
                : 'border-purple-500/30 bg-purple-50 hover:bg-purple-100 text-purple-600'
            }`}
          >
            <Heart className="w-4 h-4" />
            Save for Later
          </button>

          <button
            onClick={exportSelected}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? 'border-green-500/30 bg-green-500/10 hover:bg-green-500/20 text-green-400'
                : 'border-green-500/30 bg-green-50 hover:bg-green-100 text-green-600'
            }`}
          >
            <Download className="w-4 h-4" />
            Export List
          </button>

          <button
            onClick={() => alert('Comparing selected items...')}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? 'border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400'
                : 'border-yellow-500/30 bg-yellow-50 hover:bg-yellow-100 text-yellow-600'
            }`}
          >
            <Package className="w-4 h-4" />
            Compare Items
          </button>
        </div>
      )}

      {/* Quick Select Checkboxes on Items */}
      <div className="space-y-2">
        {domainItems.map(item => (
          <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900">
            <input
              type="checkbox"
              checked={selectedItems.has(item.id)}
              onChange={() => toggleItem(item.id)}
              className="w-5 h-5 rounded border-gray-300 dark:border-gray-700"
            />
            <div className="flex-1 flex items-center justify-between">
              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                {item.name}
              </span>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                {item.quantity} × ₦{item.price.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bulk Share Feature */}
      {selectedItems.size > 0 && (
        <div className={`mt-4 p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-blue-50'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Share Cart with Others
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Share your selected items via link
              </p>
            </div>
            <button
              onClick={() => {
                const shareLink = `${window.location.origin}/share/${btoa(JSON.stringify(Array.from(selectedItems)))}`;
                navigator.clipboard.writeText(shareLink);
                alert('Share link copied to clipboard!');
              }}
              className={`px-4 py-2 rounded-lg font-medium ${
                isDarkMode
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400'
              } text-white`}
            >
              Copy Share Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}