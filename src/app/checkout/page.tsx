// File: app/checkout/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../../components/CartProvider';
import { useTheme } from '../../../components/theme/themeprovider';
import MultiStepCheckout from '../../../components/checkout/MultiStepCheckout';
import { ArrowLeft, Truck, Package, Percent, CreditCard, MapPin, Phone, Mail, Lock as LockIcon } from 'lucide-react';

export default function CheckoutPage() {
  const { themeMode } = useTheme();
  const isDarkMode = themeMode === 'dark';
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    whatsappNumber: '',
    state: '',
    city: '',
    area: '',
    deliveryMethod: 'waybill',
    pickupLocation: '',
    paymentMethod: 'pay_on_delivery',
  });
  const [isLoading, setIsLoading] = useState(true);

  // Check cart and redirect if empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    } else {
      setIsLoading(false);
    }
  }, [items.length, router]);

  // Pickup locations with their charges
  const pickupLocations = [
    { 
      id: 'lagos-main', 
      name: 'Lagos Main Hub', 
      address: '123 Victoria Island, Lagos',
      charge: 500,
      description: 'Main logistics center'
    },
    { 
      id: 'ikeja', 
      name: 'Ikeja Collection Point', 
      address: '456 Ikeja Mall, Lagos',
      charge: 300,
      description: 'Shopping mall collection point'
    },
    { 
      id: 'lekki', 
      name: 'Lekki Express Hub', 
      address: '789 Lekki Phase 1, Lagos',
      charge: 400,
      description: 'Express pickup location'
    },
    { 
      id: 'surulere', 
      name: 'Surulere Logistics Center', 
      address: '321 Surulere, Lagos',
      charge: 200,
      description: 'Budget pickup option'
    },
  ];

  // Nigerian states and cities
  const nigerianStates = [
    'Lagos', 'Abuja FCT', 'Rivers', 'Kano', 'Oyo', 'Edo', 'Delta', 'Kaduna',
    'Ogun', 'Enugu', 'Plateau', 'Akwa Ibom', 'Cross River', 'Anambra', 'Imo'
  ];

  const citiesByState = {
    'Lagos': ['Ikeja', 'Victoria Island', 'Lekki', 'Surulere', 'Apapa', 'Yaba'],
    'Abuja FCT': ['Garki', 'Wuse', 'Maitama', 'Asokoro', 'Gwarimpa'],
    'Rivers': ['Port Harcourt', 'Borokiri', 'Rumuomasi', 'Trans-Amadi'],
    'Kano': ['Nassarawa', 'Fagge', 'Dala', 'Gwale', 'Tarauni'],
  };

  // Calculate shipping based on selected method
  const baseShippingFee = 1500;
  const isFreeShipping = totalPrice > 100000;
  
  // Get pickup charge
  const selectedPickup = pickupLocations.find(loc => loc.id === formData.pickupLocation);
  const pickupCharge = selectedPickup?.charge || 0;
  
  // Calculate final shipping
  let shippingFee = baseShippingFee;
  let shippingMethod = '';
  
  if (formData.deliveryMethod === 'waybill') {
    shippingMethod = 'Waybill & Logistics';
    shippingFee = isFreeShipping ? 0 : baseShippingFee;
  } else if (formData.deliveryMethod === 'pickup') {
    shippingMethod = 'Pickup Station';
    shippingFee = pickupCharge;
  }
  
  const shipping = shippingFee;
  const tax = Math.round(totalPrice * 0.01);
  const total = totalPrice + shipping + tax;

  // Update cities when state changes
  useEffect(() => {
    if (formData.state && !citiesByState[formData.state as keyof typeof citiesByState]) {
      setFormData(prev => ({ ...prev, city: '', area: '' }));
    }
  }, [formData.state]);

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Create order and proceed to success
      const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      localStorage.setItem('lastOrder', JSON.stringify({
        id: orderId,
        items,
        total,
        shippingMethod,
        shippingFee,
        date: new Date().toISOString(),
        ...formData
      }));
      
      // Clear cart and redirect to success
      clearCart();
      router.push(`/checkout/success?orderId=${orderId}`);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push('/cart');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validatePhoneNumbers = () => {
    if (formData.phoneNumber && formData.whatsappNumber) {
      return formData.phoneNumber !== formData.whatsappNumber;
    }
    return true;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
            <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Delivery Method
            </h3>
            
            <div className="space-y-6">
              {/* Delivery Methods - Horizontal Cards Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Waybill & Logistics (Active) */}
                <div
                  onClick={() => handleInputChange('deliveryMethod', 'waybill')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 h-full ${
                    formData.deliveryMethod === 'waybill'
                      ? isDarkMode ? 'border-yellow-500 bg-yellow-500/10' : 'border-yellow-500 bg-yellow-50'
                      : isDarkMode ? 'border-gray-800 hover:border-yellow-500/50' : 'border-gray-300 hover:border-yellow-500/50'
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                        <Truck className={`w-5 h-5 ${formData.deliveryMethod === 'waybill' ? 'text-yellow-500' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-500/10 text-green-600'
                      }`}>
                        Active
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className={`font-semibold mb-2 ${formData.deliveryMethod === 'waybill' ? isDarkMode ? 'text-yellow-400' : 'text-yellow-600' : isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Waybill & Logistics
                      </h4>
                      <p className={`text-xs mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Professional logistics partners deliver to your location
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm ${isFreeShipping ? 'text-green-500' : isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {isFreeShipping ? 'FREE' : `₦${baseShippingFee.toLocaleString()}`}
                          </span>
                          <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            2-5 days
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</span>
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="waybill"
                          checked={formData.deliveryMethod === 'waybill'}
                          onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Home Delivery (Locked) */}
                <div className={`p-4 rounded-xl border-2 ${isDarkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-300 bg-gray-100'} opacity-70 cursor-not-allowed h-full`}>
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                        <div className="relative">
                          <Truck className="w-5 h-5 text-gray-500" />
                          <LockIcon className="absolute -top-1 -right-1 w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-200 text-gray-400'}`}>
                        Coming Soon
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        Home Delivery
                      </h4>
                      <p className={`text-xs mb-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        Direct delivery to your doorstep
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            ₦2,500
                          </span>
                          <span className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                            1-2 days
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Status</span>
                        <div className={`p-1 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                          <LockIcon className="w-3 h-3 text-gray-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pickup Station (Available with extra charges) */}
                <div
                  onClick={() => handleInputChange('deliveryMethod', 'pickup')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 h-full ${
                    formData.deliveryMethod === 'pickup'
                      ? isDarkMode ? 'border-yellow-500 bg-yellow-500/10' : 'border-yellow-500 bg-yellow-50'
                      : isDarkMode ? 'border-gray-800 hover:border-yellow-500/50' : 'border-gray-300 hover:border-yellow-500/50'
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                        <MapPin className={`w-5 h-5 ${formData.deliveryMethod === 'pickup' ? 'text-yellow-500' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/10 text-blue-600'
                      }`}>
                        Available
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className={`font-semibold mb-2 ${formData.deliveryMethod === 'pickup' ? isDarkMode ? 'text-yellow-400' : 'text-yellow-600' : isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Pickup Station
                      </h4>
                      <p className={`text-xs mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Pick up from our designated locations
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Extra charges
                          </span>
                          <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            Same day
                          </span>
                        </div>
                        <div className={`text-xs ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                          Select location for exact fee
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</span>
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="pickup"
                          checked={formData.deliveryMethod === 'pickup'}
                          onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Details (based on selected method) */}
              {formData.deliveryMethod === 'waybill' && (
                <div className="mt-6">
                  <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Waybill & Logistics Details
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        State *
                      </label>
                      <select
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                        required
                      >
                        <option value="">Select State</option>
                        {nigerianStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>

                    {formData.state && citiesByState[formData.state as keyof typeof citiesByState] && (
                      <>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            City *
                          </label>
                          <select
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                            required
                          >
                            <option value="">Select City</option>
                            {citiesByState[formData.state as keyof typeof citiesByState].map(city => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Area/Street *
                          </label>
                          <input
                            type="text"
                            value={formData.area}
                            onChange={(e) => handleInputChange('area', e.target.value)}
                            placeholder="Enter your area or street name"
                            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                            required
                          />
                          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            Our logistics partner will contact you for exact address details
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Pickup Locations (shown only when pickup selected) */}
              {formData.deliveryMethod === 'pickup' && (
                <div className="mt-6">
                  <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Select Pickup Station
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pickupLocations.map(location => (
                      <label
                        key={location.id}
                        className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                          formData.pickupLocation === location.id
                            ? isDarkMode ? 'border-yellow-500 bg-yellow-500/10' : 'border-yellow-500 bg-yellow-50'
                            : isDarkMode ? 'border-gray-800 hover:border-gray-700' : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="pickupLocation"
                          value={location.id}
                          checked={formData.pickupLocation === location.id}
                          onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {location.name}
                              </p>
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {location.address}
                              </p>
                            </div>
                            <span className={`text-sm font-semibold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                              ₦{location.charge.toLocaleString()}
                            </span>
                          </div>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            {location.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                  
                  <div className={`mt-4 p-3 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-blue-50'}`}>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      📍 Pickup stations have additional handling charges. Waybill & Logistics is recommended for most locations.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
            <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Contact Information
            </h3>

            <div className="space-y-4">
              {/* Email */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    required
                  />
                </div>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  An account will be automatically created with this email
                </p>
              </div>

              {/* Phone Numbers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Phone Number (Calls) *
                  </label>
                  <div className="relative">
                    <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      placeholder="+234 800 000 0000"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      required
                    />
                  </div>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    For delivery calls and SMS
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    WhatsApp Number *
                  </label>
                  <div className="relative">
                    <svg className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM17.36 16.24C17.16 16.68 16.34 17.08 15.91 17.16C15.5 17.24 15.23 17.2 14.83 16.85C13.93 16.1 13.4 15.74 12.53 14.99C11.87 14.43 11.4 13.77 11.24 13.05C11.13 12.61 11.32 12.2 11.53 11.84C11.69 11.57 11.91 11.16 11.96 10.84C12.02 10.52 11.96 10.22 11.8 9.94C11.65 9.66 10.89 8.39 10.64 7.98C10.4 7.57 10.15 7.61 9.95 7.61C9.75 7.61 9.5 7.57 9.26 7.57C9.02 7.57 8.65 7.66 8.35 7.99C8.05 8.32 7.25 9.1 7.25 10.43C7.25 11.76 8.15 13.05 8.3 13.25C8.45 13.45 10.05 15.76 12.5 16.73C14.95 17.7 15.39 17.49 15.96 17.4C16.53 17.31 17.71 16.72 17.94 16.08C18.17 15.44 18.17 14.89 18.08 14.78C18 14.67 17.56 14.51 17.36 16.24Z" />
                    </svg>
                    <input
                      type="tel"
                      value={formData.whatsappNumber}
                      onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                      placeholder="+234 800 111 1111"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      required
                    />
                  </div>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    For WhatsApp updates and support
                  </p>
                </div>
              </div>

              {/* Phone Number Validation */}
              {!validatePhoneNumbers() && formData.phoneNumber && formData.whatsappNumber && (
                <div className={`p-3 rounded-lg border ${isDarkMode ? 'border-red-500/30 bg-red-500/10' : 'border-red-500/30 bg-red-50'}`}>
                  <p className={`text-sm ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                    Phone number and WhatsApp number cannot be the same
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
            <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Payment Method
            </h3>

            <div className="space-y-4">
              {/* Card Payment */}
              <label className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                formData.paymentMethod === 'card'
                  ? isDarkMode ? 'border-yellow-500 bg-yellow-500/5' : 'border-yellow-500 bg-yellow-50'
                  : isDarkMode ? 'border-gray-800 hover:border-gray-700' : 'border-gray-300 hover:border-gray-400'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className={`w-6 h-6 ${formData.paymentMethod === 'card' ? 'text-yellow-500' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <div>
                      <p className={`font-semibold ${formData.paymentMethod === 'card' ? isDarkMode ? 'text-yellow-400' : 'text-yellow-600' : isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Credit/Debit Card
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Pay securely with your card
                      </p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    className="w-5 h-5"
                  />
                </div>
              </label>

              {/* Bank Transfer */}
              <label className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                formData.paymentMethod === 'transfer'
                  ? isDarkMode ? 'border-yellow-500 bg-yellow-500/5' : 'border-yellow-500 bg-yellow-50'
                  : isDarkMode ? 'border-gray-800 hover:border-gray-700' : 'border-gray-300 hover:border-gray-400'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg className={`w-6 h-6 ${formData.paymentMethod === 'transfer' ? 'text-yellow-500' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className={`font-semibold ${formData.paymentMethod === 'transfer' ? isDarkMode ? 'text-yellow-400' : 'text-yellow-600' : isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Bank Transfer
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Transfer directly to our account
                      </p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="transfer"
                    checked={formData.paymentMethod === 'transfer'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    className="w-5 h-5"
                  />
                </div>
              </label>

              {/* Pay on Delivery */}
              <label className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                formData.paymentMethod === 'pay_on_delivery'
                  ? isDarkMode ? 'border-yellow-500 bg-yellow-500/5' : 'border-yellow-500 bg-yellow-50'
                  : isDarkMode ? 'border-gray-800 hover:border-gray-700' : 'border-gray-300 hover:border-gray-400'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Truck className={`w-6 h-6 ${formData.paymentMethod === 'pay_on_delivery' ? 'text-yellow-500' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <div>
                      <p className={`font-semibold ${formData.paymentMethod === 'pay_on_delivery' ? isDarkMode ? 'text-yellow-400' : 'text-yellow-600' : isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Pay on Delivery
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Pay cash when you receive your order
                      </p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="pay_on_delivery"
                    checked={formData.paymentMethod === 'pay_on_delivery'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    className="w-5 h-5"
                  />
                </div>
              </label>
            </div>

            {/* Payment Method Details */}
            {formData.paymentMethod === 'card' && (
              <div className="mt-6 p-4 rounded-lg border border-gray-700">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.paymentMethod === 'transfer' && (
              <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <p className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Bank Transfer Details
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Bank Name:</span>
                    <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>SuperMart Bank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Account Number:</span>
                    <span className={`font-mono ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>0123456789</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Account Name:</span>
                    <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>SuperMart Stores Ltd</span>
                  </div>
                </div>
                <p className={`text-sm mt-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Please use your order number as payment reference
                </p>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
            <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Review & Confirm
            </h3>

            {/* Delivery Method Summary */}
            <div className="mb-6">
              <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Delivery Method
              </h4>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                {formData.deliveryMethod === 'waybill' ? (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-yellow-500" />
                        <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Waybill & Logistics
                        </span>
                      </div>
                      <span className={`text-sm ${isFreeShipping ? 'text-green-500' : isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {isFreeShipping ? 'FREE' : `₦${baseShippingFee.toLocaleString()}`}
                      </span>
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {formData.state}, {formData.city}, {formData.area}
                    </p>
                    <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      Logistics partner will contact you for exact address
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-yellow-500" />
                        <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Pickup Station
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-yellow-600">
                        ₦{pickupCharge.toLocaleString()}
                      </span>
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {selectedPickup?.name}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {selectedPickup?.address}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="mb-6">
              <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Contact Information
              </h4>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <p className={isDarkMode ? 'text-white' : 'text-gray-900'}><strong>Email:</strong> {formData.email}</p>
                <p className={isDarkMode ? 'text-white' : 'text-gray-900'}><strong>Phone:</strong> {formData.phoneNumber}</p>
                <p className={isDarkMode ? 'text-white' : 'text-gray-900'}><strong>WhatsApp:</strong> {formData.whatsappNumber}</p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="mb-6">
              <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Payment Method
              </h4>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  {formData.paymentMethod === 'card' ? 'Credit/Debit Card' :
                   formData.paymentMethod === 'transfer' ? 'Bank Transfer' : 'Pay on Delivery'}
                </p>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="mt-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required className="mt-1" />
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  I agree that an account will be automatically created with my email. I accept the terms and conditions and privacy policy. I understand that my order is subject to availability and confirmation.
                </span>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Validate current step
  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (formData.deliveryMethod === 'waybill') {
          return formData.state && formData.city && formData.area;
        } else if (formData.deliveryMethod === 'pickup') {
          return formData.pickupLocation;
        }
        return false;
      case 2:
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        const phoneValid = formData.phoneNumber.length >= 10;
        const whatsappValid = formData.whatsappNumber.length >= 10;
        const numbersDifferent = validatePhoneNumbers();
        return emailValid && phoneValid && whatsappValid && numbersDifferent;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const canProceed = validateStep();

  // Show loading state
  if (isLoading) {
    return (
      <div className={`min-h-screen py-8 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="animate-pulse">
              <div className="mx-auto w-32 h-32 rounded-full bg-gray-700 mb-6"></div>
              <div className="h-8 bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-48 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handlePrevStep}
            className={`flex items-center gap-2 mb-6 ${isDarkMode ? 'text-gray-400 hover:text-yellow-400' : 'text-gray-600 hover:text-yellow-600'} transition-colors`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to {currentStep === 1 ? 'Cart' : 'Previous Step'}
          </button>
          
          <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Checkout
          </h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Complete your purchase in a few simple steps
          </p>
        </div>

        {/* Progress Steps */}
        <MultiStepCheckout currentStep={currentStep} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Steps */}
          <div className="lg:col-span-2">
            {renderStepContent()}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Order Summary Card */}
              <div className={`w-full min-h-[400px] rounded-2xl p-5 shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
                isDarkMode
                  ? 'bg-black border-yellow-500/60'
                  : 'bg-white border-yellow-400/60'
              }`}>
                {/* Gold Border Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${
                  isDarkMode 
                    ? 'from-yellow-500/20 via-orange-500/10 to-yellow-500/20' 
                    : 'from-yellow-400/20 via-orange-400/10 to-yellow-400/20'
                } pointer-events-none`}></div>
                
                {/* Header */}
                <div className="relative mb-4">
                  <h2 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Order Summary
                  </h2>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {totalItems} item{totalItems !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Summary Details */}
                <div className="relative h-[calc(100%-180px)] overflow-y-auto pr-2 scrollbar-hide">
                  <div className="space-y-3 mb-4">
                    {/* Subtotal */}
                    <div className="flex justify-between items-center pt-1">
                      <div className="flex items-center gap-2">
                        <Package className={`w-4 h-4 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
                        <span className={`text-sm ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Subtotal</span>
                      </div>
                      <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        ₦{totalPrice.toLocaleString()}
                      </span>
                    </div>

                    {/* Shipping */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {formData.deliveryMethod === 'waybill' ? (
                          <Truck className={`w-4 h-4 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
                        ) : (
                          <MapPin className={`w-4 h-4 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
                        )}
                        <span className={`text-sm ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                          {formData.deliveryMethod === 'waybill' ? 'Waybill Shipping' : 'Pickup Charge'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {formData.deliveryMethod === 'waybill' && isFreeShipping ? (
                          <>
                            <span className="text-green-500 line-through text-xs">₦{baseShippingFee.toLocaleString()}</span>
                            <span className="text-green-500 font-semibold text-sm">FREE</span>
                          </>
                        ) : (
                          <span className={`text-sm ${formData.deliveryMethod === 'pickup' ? 'text-yellow-500' : 'text-green-500'}`}>
                            ₦{shippingFee.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Tax */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <svg className={`w-4 h-4 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                        </svg>
                        <span className={`text-sm ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Tax (1%)</span>
                      </div>
                      <span className="text-green-500 text-sm">₦{tax.toLocaleString()}</span>
                    </div>

                    {/* Animated Shimmer Divider */}
                    <div className="relative h-px my-4 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${
                        isDarkMode ? 'via-yellow-500' : 'via-yellow-400'
                      } to-transparent animate-shimmer`}></div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center pt-1">
                      <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Total
                      </span>
                      <div className="text-right">
                        <div className={`text-2xl font-bold bg-gradient-to-r ${
                          isDarkMode ? 'from-yellow-400 to-orange-400' : 'from-yellow-600 to-orange-600'
                        } bg-clip-text text-transparent`}>
                          ₦{total.toLocaleString()}
                        </div>
                        <div className="text-xs text-green-500">Including VAT</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fixed Bottom Section */}
                <div className="absolute bottom-5 left-5 right-5">
                  {/* Promo Code */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="w-4 h-4 text-green-500" />
                      <span className="text-green-500 font-medium text-sm">Promo Code</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        className={`flex-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                          isDarkMode 
                            ? 'focus:ring-yellow-500 bg-gray-900 border-gray-800 text-white placeholder-green-500/50'
                            : 'focus:ring-yellow-400 bg-gray-50 border-gray-300 text-gray-900 placeholder-green-500/50'
                        }`}
                      />
                      <button className={`px-3 py-2 font-medium rounded-lg transition-all duration-300 text-sm ${
                        isDarkMode
                          ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white hover:from-yellow-500 hover:to-orange-500'
                          : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-400 hover:to-orange-400'
                      }`}>
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={handleNextStep}
                    disabled={!canProceed}
                    className={`relative w-full py-2.5 text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center group text-sm ${
                      !canProceed ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                    } ${
                      isDarkMode
                        ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]'
                        : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-[0_0_20px_rgba(255,165,0,0.3)]'
                    }`}
                  >
                    <span className="relative z-10">
                      {currentStep < 4 ? 'Continue' : 'Place Order'}
                    </span>
                    <div className={`absolute inset-0 bg-gradient-to-r ${
                      isDarkMode ? 'from-yellow-500 to-orange-500' : 'from-yellow-400 to-orange-400'
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg`}></div>
                    <svg className="w-4 h-4 ml-2 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations and styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        /* Hide scrollbar */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}