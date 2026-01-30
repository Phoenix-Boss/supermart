// File: app/checkout/success/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTheme } from '../../../../components/theme/themeprovider';
import { CheckCircle, Package, Truck, Home, ShoppingBag, Share2, Download, Mail, Phone } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const { themeMode } = useTheme();
  const isDarkMode = themeMode === 'dark';
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    // Load order details from localStorage
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      setOrderDetails(JSON.parse(lastOrder));
    }
  }, []);

  if (!orderDetails) {
    return (
      <div className={`min-h-screen py-16 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="mx-auto w-32 h-32 rounded-full bg-gray-700 mb-6"></div>
            <div className="h-8 bg-gray-700 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-48 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-16 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="relative mx-auto w-32 h-32 mb-6">
            <div className={`absolute inset-0 rounded-full blur-2xl ${isDarkMode ? 'bg-green-500/20' : 'bg-green-500/10'}`}></div>
            <div className={`relative w-32 h-32 rounded-full flex items-center justify-center shadow-2xl ${
              isDarkMode 
                ? 'bg-gray-900 border-green-500/30' 
                : 'bg-white border-green-400/30'
            } border`}>
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
          </div>

          <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Order Confirmed!
          </h1>
          <p className={`text-lg mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Thank you for your purchase
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Order #{orderId || orderDetails.id} • {new Date(orderDetails.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Account Creation Notice */}
        <div className={`rounded-2xl p-6 mb-6 ${isDarkMode ? 'bg-gray-900' : 'bg-blue-50'}`}>
          <div className="flex items-start gap-4">
            <Mail className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <div>
              <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Account Created Automatically
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                We've automatically created an account for you using <strong>{orderDetails.email}</strong>. Check your email for login details.
              </p>
            </div>
          </div>
        </div>

        {/* Order Details Card */}
        <div className={`rounded-2xl p-6 mb-8 border ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <div>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Email</p>
                    <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {orderDetails.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <div>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Phone</p>
                    <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {orderDetails.phoneNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM17.36 16.24C17.16 16.68 16.34 17.08 15.91 17.16C15.5 17.24 15.23 17.2 14.83 16.85C13.93 16.1 13.4 15.74 12.53 14.99C11.87 14.43 11.4 13.77 11.24 13.05C11.13 12.61 11.32 12.2 11.53 11.84C11.69 11.57 11.91 11.16 11.96 10.84C12.02 10.52 11.96 10.22 11.8 9.94C11.65 9.66 10.89 8.39 10.64 7.98C10.4 7.57 10.15 7.61 9.95 7.61C9.75 7.61 9.5 7.57 9.26 7.57C9.02 7.57 8.65 7.66 8.35 7.99C8.05 8.32 7.25 9.1 7.25 10.43C7.25 11.76 8.15 13.05 8.3 13.25C8.45 13.45 10.05 15.76 12.5 16.73C14.95 17.7 15.39 17.49 15.96 17.4C16.53 17.31 17.71 16.72 17.94 16.08C18.17 15.44 18.17 14.89 18.08 14.78C18 14.67 17.56 14.51 17.36 16.24Z" />
                  </svg>
                  <div>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>WhatsApp</p>
                    <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {orderDetails.whatsappNumber}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Order Total</span>
                  <span className={`text-2xl font-bold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                    ₦{orderDetails.total.toLocaleString()}
                  </span>
                </div>
                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Including shipping and taxes
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {orderDetails.deliveryMethod === 'delivery' ? 'Delivery Information' : 'Pickup Information'}
              </h3>
              
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                {orderDetails.deliveryMethod === 'delivery' ? (
                  <>
                    <p className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Home Delivery
                    </p>
                    <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                      {orderDetails.address}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {orderDetails.city}, {orderDetails.state}
                    </p>
                    <p className={`text-sm mt-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Estimated delivery: 2-5 business days
                    </p>
                  </>
                ) : (
                  <>
                    <p className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Pickup Station
                    </p>
                    <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                      {orderDetails.pickupLocation}
                    </p>
                    <p className={`text-sm mt-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Ready for pickup in 1-2 hours
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Please bring your order confirmation and ID
                    </p>
                  </>
                )}
              </div>

              <div className="mt-6">
                <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Payment Method
                </h4>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                  <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                    {orderDetails.paymentMethod === 'card' ? 'Credit/Debit Card' :
                     orderDetails.paymentMethod === 'transfer' ? 'Bank Transfer' : 'Pay on Delivery'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Link
            href="/"
            className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? 'bg-gray-900 hover:bg-gray-800 text-white'
                : 'bg-white hover:bg-gray-100 text-gray-900'
            } border ${isDarkMode ? 'border-gray-800' : 'border-gray-300'}`}
          >
            <Home className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">Home</span>
          </Link>

          <Link
            href="/orders"
            className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? 'bg-gray-900 hover:bg-gray-800 text-white'
                : 'bg-white hover:bg-gray-100 text-gray-900'
            } border ${isDarkMode ? 'border-gray-800' : 'border-gray-300'}`}
          >
            <Package className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">Track Order</span>
          </Link>

          <Link
            href="/"
            className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? 'bg-gray-900 hover:bg-gray-800 text-white'
                : 'bg-white hover:bg-gray-100 text-gray-900'
            } border ${isDarkMode ? 'border-gray-800' : 'border-gray-300'}`}
          >
            <ShoppingBag className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">Continue Shopping</span>
          </Link>

          <button className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
            isDarkMode
              ? 'bg-gray-900 hover:bg-gray-800 text-white'
              : 'bg-white hover:bg-gray-100 text-gray-900'
          } border ${isDarkMode ? 'border-gray-800' : 'border-gray-300'}`}>
            <Share2 className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>

        {/* Download Receipt */}
        <div className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Order Documents
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Download your order confirmation and invoice
              </p>
            </div>
            <div className="flex gap-2">
              <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                isDarkMode
                  ? 'border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white'
                  : 'border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-900'
              }`}>
                <Download className="w-4 h-4" />
                Receipt
              </button>
              <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500'
                  : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400'
              } text-white`}>
                <Download className="w-4 h-4" />
                Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className={`mt-8 p-6 rounded-2xl ${isDarkMode ? 'bg-gray-900/50' : 'bg-orange-50'}`}>
          <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            What happens next?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-orange-100'}`}>
                <span className="text-sm font-bold">1</span>
              </div>
              <div>
                <p className={`font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {orderDetails.deliveryMethod === 'delivery' ? 'Order Processing' : 'Preparing for Pickup'}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {orderDetails.deliveryMethod === 'delivery' 
                    ? 'We\'re preparing your items for delivery' 
                    : 'Your order is being prepared for pickup'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-orange-100'}`}>
                <span className="text-sm font-bold">2</span>
              </div>
              <div>
                <p className={`font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {orderDetails.deliveryMethod === 'delivery' ? 'Shipment' : 'Ready for Pickup'}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {orderDetails.deliveryMethod === 'delivery' 
                    ? 'Your order will be shipped to you' 
                    : 'We\'ll notify you when ready'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-orange-100'}`}>
                <span className="text-sm font-bold">3</span>
              </div>
              <div>
                <p className={`font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {orderDetails.deliveryMethod === 'delivery' ? 'Delivery' : 'Collection'}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {orderDetails.deliveryMethod === 'delivery' 
                    ? 'Estimated in 2-5 business days' 
                    : 'Collect within 48 hours'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}