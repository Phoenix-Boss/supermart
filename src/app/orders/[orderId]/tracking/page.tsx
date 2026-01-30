// File: app/orders/[orderId]/tracking/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTheme } from '../../../../../components/theme/themeprovider';
import { ArrowLeft, Package, Truck, MapPin, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';

export default function OrderTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const { themeMode } = useTheme();
  const isDarkMode = themeMode === 'dark';
  const [isMapVisible, setIsMapVisible] = useState(false);

  // Mock tracking data
  const tracking = {
    orderId: params.orderId || 'ORD-789012',
    status: 'shipped',
    currentLocation: 'Lagos Distribution Center',
    nextLocation: 'Victoria Island Hub',
    courier: 'SuperMart Express',
    courierContact: '+234 800 123 4567',
    estimatedDelivery: 'Tomorrow, 2:00 PM - 5:00 PM',
    trackingSteps: [
      { id: 1, status: 'Order Placed', location: 'Order Confirmed', timestamp: 'Mar 15, 10:30 AM', completed: true },
      { id: 2, status: 'Processing', location: 'Warehouse Processing', timestamp: 'Mar 15, 2:15 PM', completed: true },
      { id: 3, status: 'Shipped', location: 'Lagos Distribution Center', timestamp: 'Mar 16, 9:00 AM', completed: true },
      { id: 4, status: 'In Transit', location: 'En route to delivery hub', timestamp: 'Today, 8:30 AM', completed: true },
      { id: 5, status: 'Out for Delivery', location: 'Victoria Island Hub', timestamp: 'Estimated: Tomorrow, 10:00 AM', completed: false },
      { id: 6, status: 'Delivered', location: 'Your Address', timestamp: 'Estimated: Tomorrow, 2:00 PM', completed: false },
    ],
  };

  return (
    <div className={`min-h-screen py-8 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className={`flex items-center gap-2 mb-6 ${isDarkMode ? 'text-gray-400 hover:text-orange-400' : 'text-gray-600 hover:text-orange-600'} transition-colors`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Order Details
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Track Your Order
              </h1>
              <div className="flex items-center gap-4">
                <p className={`font-mono font-bold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  #{tracking.orderId}
                </p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  tracking.status === 'delivered' ? 'bg-green-500/10 text-green-500' :
                  tracking.status === 'shipped' ? 'bg-blue-500/10 text-blue-500' :
                  'bg-yellow-500/10 text-yellow-500'
                }`}>
                  {tracking.status === 'shipped' ? 'In Transit' : tracking.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsMapVisible(!isMapVisible)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                isDarkMode
                  ? 'border-gray-800 hover:border-orange-500 text-gray-400 hover:text-orange-400'
                  : 'border-gray-300 hover:border-orange-500 text-gray-600 hover:text-orange-600'
              }`}
            >
              <MapPin className="w-4 h-4" />
              {isMapVisible ? 'Hide Map' : 'Show Map'}
            </button>
          </div>
        </div>

        {/* Delivery Estimate */}
        <div className={`rounded-2xl p-6 mb-6 border ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-orange-50'}`}>
              <Truck className={`w-6 h-6 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Estimated Delivery
              </h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                {tracking.estimatedDelivery}
              </p>
            </div>
            <div className="text-right">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Courier</p>
              <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {tracking.courier}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <div 
                className="h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500"
                style={{ width: '66%' }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Order Placed</span>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>In Transit</span>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Delivered</span>
            </div>
          </div>

          {/* Current Location */}
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Current Location</p>
                <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {tracking.currentLocation}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Next Stop</p>
                <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {tracking.nextLocation}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
          <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Tracking Timeline
          </h2>

          <div className="space-y-6">
            {tracking.trackingSteps.map((step, index) => (
              <div key={step.id} className="flex items-start gap-4">
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    step.completed
                      ? isDarkMode ? 'bg-green-500/20 border-green-500' : 'bg-green-500/10 border-green-500'
                      : isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Clock className={`w-5 h-5 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    )}
                  </div>
                  {index < tracking.trackingSteps.length - 1 && (
                    <div className={`absolute left-5 top-10 w-0.5 h-6 ${
                      isDarkMode ? 'bg-gray-800' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {step.status}
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {step.location}
                      </p>
                    </div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {step.timestamp}
                    </span>
                  </div>
                  {step.id === 4 && (
                    <div className={`mt-3 p-3 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Your package is currently in transit. The courier driver is on the way to the next hub.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Courier Information */}
        <div className={`rounded-2xl p-6 mt-6 border ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
          <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Courier Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Contact Number</p>
                    <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {tracking.courierContact}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Delivery Instructions
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Delivery Type</p>
                    <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Standard Delivery
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Notes */}
          <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-yellow-50'}`}>
            <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              📝 Delivery Notes
            </h4>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              • Please ensure someone is available to receive the package<br/>
              • Have your ID ready for verification<br/>
              • Contact the courier if you need to reschedule<br/>
              • Package will be held for 3 days before return
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`mt-8 p-6 rounded-2xl ${isDarkMode ? 'bg-gray-900' : 'bg-orange-50'}`}>
          <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Need Help With Your Delivery?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className={`px-4 py-3 rounded-lg text-center transition-all duration-300 ${
              isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700 text-white'
                : 'bg-white hover:bg-gray-100 text-gray-900'
            } border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              Reschedule Delivery
            </button>
            <button className={`px-4 py-3 rounded-lg text-center transition-all duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500'
                : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400'
            } text-white`}>
              Contact Courier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}