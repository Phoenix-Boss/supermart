// File: components/cart/DeliveryInstructions.tsx
'use client';

import { useState } from 'react';
import { useTheme } from '../../theme/themeprovider';
import { MapPin, Clock, Shield, Package, Key, Phone, Bell, Home, Building, Lock, AlertCircle, CheckCircle } from 'lucide-react';

interface DeliveryInstructionsProps {
  onInstructionsChange?: (instructions: DeliveryInstructions) => void;
}

interface DeliveryInstructions {
  deliveryNotes: string;
  deliveryTime: 'anytime' | 'morning' | 'afternoon' | 'evening';
  safePlace: boolean;
  safePlaceDescription: string;
  requireSignature: boolean;
  leaveWithNeighbor: boolean;
  neighborDetails: string;
  deliveryType: 'home' | 'office' | 'pickup_point';
  deliveryDate?: string;
  contactPreference: 'call' | 'text' | 'whatsapp' | 'email';
  specialRequirements: string[];
}

export default function DeliveryInstructions({ onInstructionsChange }: DeliveryInstructionsProps) {
  const { themeMode } = useTheme();
  const isDarkMode = themeMode === 'dark';
  
  const [instructions, setInstructions] = useState<DeliveryInstructions>({
    deliveryNotes: '',
    deliveryTime: 'anytime',
    safePlace: false,
    safePlaceDescription: '',
    requireSignature: false,
    leaveWithNeighbor: false,
    neighborDetails: '',
    deliveryType: 'home',
    deliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    contactPreference: 'call',
    specialRequirements: [],
  });

  const handleChange = (key: keyof DeliveryInstructions, value: any) => {
    const newInstructions = { ...instructions, [key]: value };
    setInstructions(newInstructions);
    onInstructionsChange?.(newInstructions);
  };

  const handleRequirementToggle = (requirement: string) => {
    const newRequirements = instructions.specialRequirements.includes(requirement)
      ? instructions.specialRequirements.filter(r => r !== requirement)
      : [...instructions.specialRequirements, requirement];
    
    handleChange('specialRequirements', newRequirements);
  };

  const deliveryTimes = [
    { id: 'anytime', label: 'Anytime', description: '8 AM - 8 PM', icon: <Clock className="w-4 h-4" /> },
    { id: 'morning', label: 'Morning', description: '8 AM - 12 PM', icon: <Clock className="w-4 h-4" /> },
    { id: 'afternoon', label: 'Afternoon', description: '12 PM - 4 PM', icon: <Clock className="w-4 h-4" /> },
    { id: 'evening', label: 'Evening', description: '4 PM - 8 PM', icon: <Clock className="w-4 h-4" /> },
  ];

  const deliveryTypes = [
    { id: 'home', label: 'Home Delivery', icon: <Home className="w-5 h-5" />, description: 'Deliver to my home address' },
    { id: 'office', label: 'Office Delivery', icon: <Building className="w-5 h-5" />, description: 'Deliver to my office' },
  ];

  const contactPreferences = [
    { id: 'call', label: 'Phone Call', icon: <Phone className="w-4 h-4" /> },
    { id: 'text', label: 'SMS Text', icon: <Bell className="w-4 h-4" /> },
    { id: 'whatsapp', label: 'WhatsApp', icon: <Shield className="w-4 h-4" /> },
    { id: 'email', label: 'Email', icon: <Package className="w-4 h-4" /> },
  ];

  const specialRequirementsOptions = [
    { id: 'no_knock', label: 'No Knock/Doorbell', description: 'Please don\'t knock or ring bell' },
    { id: 'call_before', label: 'Call Before Delivery', description: 'Call 10 minutes before arrival' },
    { id: 'pet_warning', label: 'Pet Warning', description: 'Beware of pets on premises' },
    { id: 'gate_code', label: 'Gate/Entry Code', description: 'Need entry code for building' },
    { id: 'fragile', label: 'Fragile Items', description: 'Handle with extra care' },
    { id: 'perishable', label: 'Perishable Items', description: 'Require refrigeration' },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className={`rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
            <MapPin className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <div>
            <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Delivery Instructions
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Customize your delivery preferences
            </p>
          </div>
        </div>
      </div>

      {/* Delivery Type */}
      <div className="p-4 border-b border-gray-700">
        <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Delivery Type
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {deliveryTypes.map((type) => (
            <label
              key={type.id}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                instructions.deliveryType === type.id
                  ? isDarkMode ? 'border-blue-500 bg-blue-500/10' : 'border-blue-500 bg-blue-50'
                  : isDarkMode ? 'border-gray-800 hover:border-gray-700' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="deliveryType"
                value={type.id}
                checked={instructions.deliveryType === type.id}
                onChange={(e) => handleChange('deliveryType', e.target.value)}
                className="sr-only"
              />
              
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  {type.icon}
                </div>
                <div>
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {type.label}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {type.description}
                  </p>
                </div>
              </div>
              
              {instructions.deliveryType === type.id && (
                <div className="absolute top-3 right-3">
                  <CheckCircle className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Delivery Date & Time */}
      <div className="p-4 border-b border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Delivery Date */}
          <div>
            <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Delivery Date
            </h4>
            <div className={`p-3 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {instructions.deliveryDate ? formatDate(instructions.deliveryDate) : 'Select date'}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Earliest available delivery
                  </p>
                </div>
                <input
                  type="date"
                  value={instructions.deliveryDate}
                  onChange={(e) => handleChange('deliveryDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  max={new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]}
                  className={`px-3 py-1.5 rounded border text-sm ${
                    isDarkMode
                      ? 'bg-gray-900 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Delivery Time */}
          <div>
            <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Preferred Time
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {deliveryTimes.map((time) => (
                <label
                  key={time.id}
                  className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    instructions.deliveryTime === time.id
                      ? isDarkMode ? 'border-green-500 bg-green-500/10' : 'border-green-500 bg-green-50'
                      : isDarkMode ? 'border-gray-800 hover:border-gray-700' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryTime"
                    value={time.id}
                    checked={instructions.deliveryTime === time.id}
                    onChange={(e) => handleChange('deliveryTime', e.target.value)}
                    className="sr-only"
                  />
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-1 mb-1">
                      {time.icon}
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {time.label}
                      </span>
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {time.description}
                    </span>
                  </div>
                  
                  {instructions.deliveryTime === time.id && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Notes */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Delivery Notes
          </h4>
        </div>
        
        <textarea
          value={instructions.deliveryNotes}
          onChange={(e) => handleChange('deliveryNotes', e.target.value)}
          placeholder="Enter specific delivery instructions, landmarks, building color, floor number, etc."
          rows={3}
          className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
          }`}
          maxLength={500}
        />
        <div className="flex justify-between mt-2">
          <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            {instructions.deliveryNotes.length}/500 characters
          </p>
          <button
            onClick={() => handleChange('deliveryNotes', '')}
            className={`text-xs px-2 py-1 rounded transition-colors ${
              isDarkMode
                ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Safe Place Options */}
      <div className="p-4 border-b border-gray-700">
        <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Safe Place Options
        </h4>
        
        <div className="space-y-3">
          {/* Safe Place Toggle */}
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded flex items-center justify-center ${
                instructions.safePlace
                  ? isDarkMode ? 'bg-yellow-500' : 'bg-yellow-500'
                  : isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
              }`}>
                {instructions.safePlace && (
                  <Shield className="w-4 h-4 text-white" />
                )}
              </div>
              <div>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Leave in Safe Place
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  If I'm not available
                </p>
              </div>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={instructions.safePlace}
                onChange={(e) => handleChange('safePlace', e.target.checked)}
                className="sr-only"
              />
              <div className={`w-12 h-6 rounded-full transition-colors ${
                instructions.safePlace
                  ? isDarkMode ? 'bg-yellow-500' : 'bg-yellow-500'
                  : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                  instructions.safePlace ? 'translate-x-7' : 'translate-x-1'
                }`}></div>
              </div>
            </div>
          </label>

          {/* Safe Place Description */}
          {instructions.safePlace && (
            <div>
              <textarea
                value={instructions.safePlaceDescription}
                onChange={(e) => handleChange('safePlaceDescription', e.target.value)}
                placeholder="Describe safe place location (e.g., behind plant, with security, under mat)"
                rows={2}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
                maxLength={200}
              />
            </div>
          )}

          {/* Leave with Neighbor */}
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded flex items-center justify-center ${
                instructions.leaveWithNeighbor
                  ? isDarkMode ? 'bg-green-500' : 'bg-green-500'
                  : isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
              }`}>
                {instructions.leaveWithNeighbor && (
                  <Home className="w-4 h-4 text-white" />
                )}
              </div>
              <div>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Leave with Neighbor
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  If I'm not available
                </p>
              </div>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={instructions.leaveWithNeighbor}
                onChange={(e) => handleChange('leaveWithNeighbor', e.target.checked)}
                className="sr-only"
              />
              <div className={`w-12 h-6 rounded-full transition-colors ${
                instructions.leaveWithNeighbor
                  ? isDarkMode ? 'bg-green-500' : 'bg-green-500'
                  : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                  instructions.leaveWithNeighbor ? 'translate-x-7' : 'translate-x-1'
                }`}></div>
              </div>
            </div>
          </label>

          {/* Neighbor Details */}
          {instructions.leaveWithNeighbor && (
            <div>
              <textarea
                value={instructions.neighborDetails}
                onChange={(e) => handleChange('neighborDetails', e.target.value)}
                placeholder="Neighbor's name, apartment number, or phone number"
                rows={2}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
                maxLength={200}
              />
            </div>
          )}

          {/* Require Signature */}
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded flex items-center justify-center ${
                instructions.requireSignature
                  ? isDarkMode ? 'bg-red-500' : 'bg-red-500'
                  : isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
              }`}>
                {instructions.requireSignature && (
                  <Lock className="w-4 h-4 text-white" />
                )}
              </div>
              <div>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Require Signature
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Do not leave without signature
                </p>
              </div>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={instructions.requireSignature}
                onChange={(e) => handleChange('requireSignature', e.target.checked)}
                className="sr-only"
              />
              <div className={`w-12 h-6 rounded-full transition-colors ${
                instructions.requireSignature
                  ? isDarkMode ? 'bg-red-500' : 'bg-red-500'
                  : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                  instructions.requireSignature ? 'translate-x-7' : 'translate-x-1'
                }`}></div>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Special Requirements */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className={`w-5 h-5 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
          <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Special Requirements
          </h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {specialRequirementsOptions.map((req) => (
            <label
              key={req.id}
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                instructions.specialRequirements.includes(req.id)
                  ? isDarkMode ? 'border-orange-500 bg-orange-500/10' : 'border-orange-500 bg-orange-50'
                  : isDarkMode ? 'border-gray-800 hover:border-gray-700' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded flex items-center justify-center mt-0.5 ${
                  instructions.specialRequirements.includes(req.id)
                    ? isDarkMode ? 'bg-orange-500' : 'bg-orange-500'
                    : isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                }`}>
                  {instructions.specialRequirements.includes(req.id) && (
                    <CheckCircle className="w-3 h-3 text-white" />
                  )}
                </div>
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {req.label}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {req.description}
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={instructions.specialRequirements.includes(req.id)}
                onChange={() => handleRequirementToggle(req.id)}
                className="sr-only"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Contact Preference */}
      <div className="p-4">
        <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Contact Preference
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {contactPreferences.map((pref) => (
            <label
              key={pref.id}
              className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                instructions.contactPreference === pref.id
                  ? isDarkMode ? 'border-purple-500 bg-purple-500/10' : 'border-purple-500 bg-purple-50'
                  : isDarkMode ? 'border-gray-800 hover:border-gray-700' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="contactPreference"
                value={pref.id}
                checked={instructions.contactPreference === pref.id}
                onChange={(e) => handleChange('contactPreference', e.target.value)}
                className="sr-only"
              />
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-1">
                  {pref.icon}
                </div>
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {pref.label}
                </span>
              </div>
              
              {instructions.contactPreference === pref.id && (
                <div className="absolute top-2 right-2">
                  <CheckCircle className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                </div>
              )}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}