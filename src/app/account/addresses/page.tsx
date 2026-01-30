// File: app/account/addresses/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../../../../components/theme/themeprovider';
import { Plus, MapPin, Edit2, Trash2, CheckCircle } from 'lucide-react';

export default function AddressesPage() {
  const { themeMode } = useTheme();
  const isDarkMode = themeMode === 'dark';
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'John Doe',
      address: '123 Victoria Island, Lagos',
      city: 'Lagos',
      state: 'Lagos',
      postalCode: '101241',
      phone: '+234 800 000 0000',
      isDefault: true,
      type: 'home',
    },
    {
      id: 2,
      name: 'John Doe',
      address: '456 Ikeja Mall, Lagos',
      city: 'Lagos',
      state: 'Lagos',
      postalCode: '100001',
      phone: '+234 800 111 1111',
      isDefault: false,
      type: 'work',
    },
    {
      id: 3,
      name: 'Jane Smith',
      address: '789 Lekki Phase 1, Lagos',
      city: 'Lagos',
      state: 'Lagos',
      postalCode: '106104',
      phone: '+234 800 222 2222',
      isDefault: false,
      type: 'other',
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSetDefault = (id: number) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const handleDelete = (id: number) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const AddressCard = ({ address }: { address: any }) => (
    <div className={`rounded-xl p-6 border transition-all duration-300 ${
      address.isDefault
        ? isDarkMode ? 'border-orange-500 bg-orange-500/5' : 'border-orange-500 bg-orange-50'
        : isDarkMode ? 'border-gray-800 hover:border-gray-700' : 'border-gray-200 hover:border-gray-300'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <MapPin className={`w-5 h-5 ${
              address.type === 'home' ? 'text-blue-500' :
              address.type === 'work' ? 'text-green-500' :
              'text-purple-500'
            }`} />
          </div>
          <div>
            <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {address.name}
            </h3>
            <span className={`text-sm capitalize px-2 py-1 rounded-full ${
              address.type === 'home' ? 'bg-blue-500/10 text-blue-500' :
              address.type === 'work' ? 'bg-green-500/10 text-green-500' :
              'bg-purple-500/10 text-purple-500'
            }`}>
              {address.type}
            </span>
          </div>
        </div>
        
        {address.isDefault && (
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-500">Default</span>
          </div>
        )}
      </div>

      <div className="space-y-2 mb-6">
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{address.address}</p>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          {address.city}, {address.state} {address.postalCode}
        </p>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{address.phone}</p>
      </div>

      <div className="flex items-center gap-3">
        {!address.isDefault && (
          <button
            onClick={() => handleSetDefault(address.id)}
            className={`flex-1 py-2 text-sm rounded-lg border transition-all duration-300 ${
              isDarkMode
                ? 'border-gray-800 hover:border-orange-500 text-gray-400 hover:text-orange-400'
                : 'border-gray-300 hover:border-orange-500 text-gray-600 hover:text-orange-600'
            }`}
          >
            Set as Default
          </button>
        )}
        <button
          onClick={() => setEditingId(address.id)}
          className={`p-2 rounded-lg border transition-all duration-300 ${
            isDarkMode
              ? 'border-gray-800 hover:border-blue-500 text-gray-400 hover:text-blue-400'
              : 'border-gray-300 hover:border-blue-500 text-gray-600 hover:text-blue-600'
          }`}
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleDelete(address.id)}
          className={`p-2 rounded-lg border transition-all duration-300 ${
            isDarkMode
              ? 'border-gray-800 hover:border-red-500 text-gray-400 hover:text-red-400'
              : 'border-gray-300 hover:border-red-500 text-gray-600 hover:text-red-600'
          }`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen py-8 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            My Addresses
          </h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Manage your shipping addresses for faster checkout
          </p>
        </div>

        {/* Add New Address Button */}
        <div className="mb-8">
          <button
            onClick={() => setIsAdding(true)}
            className={`w-full py-4 rounded-xl border-2 border-dashed transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode
                ? 'border-gray-800 hover:border-orange-500 text-gray-400 hover:text-orange-400'
                : 'border-gray-300 hover:border-orange-500 text-gray-600 hover:text-orange-600'
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <Plus className="w-6 h-6" />
              <span className="font-medium">Add New Address</span>
            </div>
          </button>
        </div>

        {/* Addresses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map(address => (
            <AddressCard key={address.id} address={address} />
          ))}
        </div>

        {/* No Addresses State */}
        {addresses.length === 0 && (
          <div className="text-center py-16">
            <div className="relative mx-auto w-24 h-24 mb-6">
              <div className={`absolute inset-0 rounded-full blur-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
              <div className={`relative w-24 h-24 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-black' : 'bg-white'} border ${isDarkMode ? 'border-gray-800' : 'border-gray-300'}`}>
                <MapPin className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              No addresses saved
            </h3>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Add your first address for faster checkout
            </p>
            <button
              onClick={() => setIsAdding(true)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500'
                  : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400'
              } text-white`}
            >
              <Plus className="w-5 h-5" />
              Add Address
            </button>
          </div>
        )}

        {/* Tips */}
        <div className={`mt-8 p-6 rounded-2xl ${isDarkMode ? 'bg-gray-900' : 'bg-blue-50'}`}>
          <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            💡 Tips for Better Delivery
          </h3>
          <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <li>• Set your most used address as default for faster checkout</li>
            <li>• Add work and home addresses for flexibility</li>
            <li>• Ensure your phone number is correct for delivery calls</li>
            <li>• Include landmarks for easier delivery location</li>
          </ul>
        </div>
      </div>

      {/* Add/Edit Address Modal */}
      {(isAdding || editingId) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md rounded-2xl p-6 ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} border`}>
            <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {editingId ? 'Edit Address' : 'Add New Address'}
            </h3>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
              
              <textarea
                placeholder="Address"
                rows={3}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
                <input
                  type="text"
                  placeholder="State"
                  className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Postal Code"
                  className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>
              
              <select className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                <option value="">Address Type</option>
                <option value="home">Home</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </select>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" />
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Set as default shipping address
                </span>
              </label>
            </div>
            
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                }}
                className={`flex-1 py-3 rounded-lg border transition-all duration-300 ${
                  isDarkMode
                    ? 'border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white'
                    : 'border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-900'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                }}
                className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500'
                    : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400'
                } text-white`}
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}