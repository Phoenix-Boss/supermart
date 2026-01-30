// File: app/orders/[orderId]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '../../../../components/theme/themeprovider';
import { ArrowLeft, Package, Truck, CreditCard, MapPin, Phone, Mail, Printer, Download } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { themeMode } = useTheme();
  const isDarkMode = themeMode === 'dark';
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load order data
  useEffect(() => {
    const loadOrder = () => {
      try {
        const orderId = params.orderId as string;
        
        // Try to get from localStorage
        const lastOrder = localStorage.getItem('lastOrder');
        const savedOrders = localStorage.getItem('supermart_orders');
        
        let foundOrder = null;
        
        // Check last order first
        if (lastOrder) {
          const parsedLastOrder = JSON.parse(lastOrder);
          if (parsedLastOrder.id === orderId) {
            foundOrder = parsedLastOrder;
          }
        }
        
        // Check saved orders
        if (!foundOrder && savedOrders) {
          const parsedSavedOrders = JSON.parse(savedOrders);
          if (Array.isArray(parsedSavedOrders)) {
            foundOrder = parsedSavedOrders.find(o => o.id === orderId);
          }
        }
        
        // If no order found, create demo data
        if (!foundOrder) {
          foundOrder = {
            id: orderId,
            date: '2024-03-15T10:30:00Z',
            status: 'processing',
            statusText: 'Processing',
            items: [
              { id: 1, name: 'FIFINE K669 Microphone', price: 85000, quantity: 1, image: '🎤' },
              { id: 2, name: 'Professional XLR Cable', price: 12000, quantity: 2, image: '🔌' },
              { id: 3, name: 'Pop Filter Shield', price: 8900, quantity: 1, image: '🛡️' },
            ],
            subtotal: 116800,
            shipping: 0,
            tax: 1168,
            total: 117968,
            shippingMethod: 'Waybill & Logistics',
            shippingFee: 0,
            email: 'customer@example.com',
            phoneNumber: '+234 800 000 0000',
            whatsappNumber: '+234 800 111 1111',
            state: 'Lagos',
            city: 'Victoria Island',
            area: 'Adeola Odeku Street',
            deliveryMethod: 'waybill',
            paymentMethod: 'pay_on_delivery',
            estimatedDelivery: '2024-03-20T00:00:00Z',
          };
        }
        
        // Ensure order has required fields
        foundOrder = {
          ...foundOrder,
          subtotal: foundOrder.subtotal || foundOrder.total - (foundOrder.shippingFee || 0) - (foundOrder.tax || 0),
          tax: foundOrder.tax || Math.round((foundOrder.total || 0) * 0.01),
          items: foundOrder.items || [],
          itemsCount: foundOrder.items?.length || 0,
        };
        
        setOrder(foundOrder);
      } catch (error) {
        console.error('Failed to load order:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [params.orderId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500/10 text-green-500';
      case 'shipped': return 'bg-blue-500/10 text-blue-500';
      case 'processing': return 'bg-yellow-500/10 text-yellow-500';
      case 'pending': return 'bg-yellow-500/10 text-yellow-500';
      case 'cancelled': return 'bg-red-500/10 text-red-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className={`min-h-screen py-8 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-32 mb-6"></div>
            <div className="h-10 bg-gray-700 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-64 bg-gray-700 rounded-xl mb-6"></div>
                <div className="h-48 bg-gray-700 rounded-xl"></div>
              </div>
              <div className="lg:col-span-1">
                <div className="h-96 bg-gray-700 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className={`min-h-screen py-16 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="relative mx-auto w-24 h-24 mb-6">
            <div className={`absolute inset-0 rounded-full blur-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
            <div className={`relative w-24 h-24 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-black' : 'bg-white'
            } border ${isDarkMode ? 'border-gray-800' : 'border-gray-300'}`}>
              <Package className="w-12 h-12 text-gray-400" />
            </div>
          </div>
          <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Order Not Found
          </h3>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            The order you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/orders"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500'
                : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400'
            } text-white`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className={`flex items-center gap-2 mb-6 ${isDarkMode ? 'text-gray-400 hover:text-yellow-400' : 'text-gray-600 hover:text-yellow-600'} transition-colors`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Orders
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Order #{order.id}
              </h1>
              <div className="flex items-center gap-4">
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Placed on {formatDate(order.date)} at {formatTime(order.date)}
                </p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.statusText}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                  isDarkMode
                    ? 'border-gray-800 hover:border-yellow-500 text-gray-400 hover:text-yellow-400'
                    : 'border-gray-300 hover:border-yellow-500 text-gray-600 hover:text-yellow-600'
                }`}
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                isDarkMode
                  ? 'border-gray-800 hover:border-yellow-500 text-gray-400 hover:text-yellow-400'
                  : 'border-gray-300 hover:border-yellow-500 text-gray-600 hover:text-yellow-600'
              }`}>
                <Download className="w-4 h-4" />
                Download
              </button>
              <Link
                href={`/orders/${order.id}/tracking`}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500'
                    : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400'
                } text-white`}
              >
                <Truck className="w-4 h-4" />
                Track Order
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Items & Summary */}
          <div className="lg:col-span-2">
            {/* Order Items */}
            <div className={`rounded-2xl p-6 mb-6 border ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Order Items ({order.itemsCount})
              </h2>
              
              <div className="space-y-4">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-xl border ${
                          isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-300'
                        }`}>
                          {item.image || item.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {item.name}
                          </h4>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          ₦{item.price.toLocaleString()} each
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      No item details available
                    </p>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className={`mt-8 pt-6 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Order Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
                    <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>₦{order.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Shipping</span>
                    <span className={order.shippingFee === 0 ? 'text-green-500' : isDarkMode ? 'text-white' : 'text-gray-900'}>
                      {order.shippingFee === 0 ? 'FREE' : `₦${order.shippingFee.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Tax (1%)</span>
                    <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>₦{order.tax.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3 border-gray-700">
                    <div className="flex justify-between">
                      <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Total</span>
                      <span className={`text-xl font-bold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                        ₦{order.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Order Timeline
              </h2>
              
              <div className="space-y-6">
                {[
                  { 
                    date: order.date, 
                    status: 'Order Placed', 
                    description: 'Your order has been received and confirmed',
                    completed: true 
                  },
                  { 
                    date: new Date(new Date(order.date).getTime() + 2 * 60 * 60 * 1000).toISOString(),
                    status: 'Processing', 
                    description: 'We are preparing your items for dispatch',
                    completed: order.status !== 'pending' 
                  },
                  { 
                    date: order.estimatedDelivery ? new Date(new Date(order.estimatedDelivery).getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() : '',
                    status: 'Shipped', 
                    description: 'Your order is on the way to you',
                    completed: order.status === 'shipped' || order.status === 'delivered' 
                  },
                  { 
                    date: order.estimatedDelivery || '',
                    status: 'Delivered', 
                    description: 'Order delivered successfully',
                    completed: order.status === 'delivered' 
                  },
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        step.completed
                          ? isDarkMode ? 'bg-green-500/20 border-green-500' : 'bg-green-500/10 border-green-500'
                          : isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'
                      }`}>
                        {step.completed ? (
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`} />
                        )}
                      </div>
                      {index < 3 && (
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
                            {step.date ? `${formatDate(step.date)} • ${formatTime(step.date)}` : 'Estimated soon'}
                          </p>
                        </div>
                        {step.completed && (
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-500/10 text-green-600'
                          }`}>
                            Completed
                          </span>
                        )}
                      </div>
                      <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Information */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Delivery Information */}
              <div className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center gap-3 mb-4">
                  {order.deliveryMethod === 'waybill' ? (
                    <Truck className={`w-5 h-5 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  ) : (
                    <MapPin className={`w-5 h-5 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  )}
                  <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Delivery Information
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Method</p>
                    <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {order.deliveryMethod === 'waybill' ? 'Waybill & Logistics' : 'Pickup Station'}
                    </p>
                  </div>
                  {order.deliveryMethod === 'waybill' ? (
                    <>
                      <div>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Location</p>
                        <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                          {order.state}, {order.city}
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {order.area}
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Estimated Delivery</p>
                        <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                          {order.estimatedDelivery ? formatDate(order.estimatedDelivery) : '2-5 business days'}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pickup Location</p>
                      <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                        {order.pickupLocationName || 'Selected pickup station'}
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Ready for pickup: Same day
                      </p>
                    </div>
                  )}
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Shipping Cost</p>
                    <p className={`font-semibold ${order.shippingFee === 0 ? 'text-green-500' : isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {order.shippingFee === 0 ? 'FREE' : `₦${order.shippingFee.toLocaleString()}`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Contact Information
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email</p>
                      <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>{order.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Phone</p>
                      <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>{order.phoneNumber}</p>
                    </div>
                  </div>
                  {order.whatsappNumber && (
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM17.36 16.24C17.16 16.68 16.34 17.08 15.91 17.16C15.5 17.24 15.23 17.2 14.83 16.85C13.93 16.1 13.4 15.74 12.53 14.99C11.87 14.43 11.4 13.77 11.24 13.05C11.13 12.61 11.32 12.2 11.53 11.84C11.69 11.57 11.91 11.16 11.96 10.84C12.02 10.52 11.96 10.22 11.8 9.94C11.65 9.66 10.89 8.39 10.64 7.98C10.4 7.57 10.15 7.61 9.95 7.61C9.75 7.61 9.5 7.57 9.26 7.57C9.02 7.57 8.65 7.66 8.35 7.99C8.05 8.32 7.25 9.1 7.25 10.43C7.25 11.76 8.15 13.05 8.3 13.25C8.45 13.45 10.05 15.76 12.5 16.73C14.95 17.7 15.39 17.49 15.96 17.4C16.53 17.31 17.71 16.72 17.94 16.08C18.17 15.44 18.17 14.89 18.08 14.78C18 14.67 17.56 14.51 17.36 16.24Z" />
                      </svg>
                      <div>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>WhatsApp</p>
                        <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>{order.whatsappNumber}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Information */}
              <div className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className={`w-5 h-5 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Payment Information
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Method</p>
                    <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {order.paymentMethod === 'card' ? 'Credit/Debit Card' :
                       order.paymentMethod === 'transfer' ? 'Bank Transfer' : 'Pay on Delivery'}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</p>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-500/10 text-green-600'
                    }`}>
                      Paid
                    </span>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Amount</p>
                    <p className={`font-semibold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                      ₦{order.total.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Need Help? */}
              <div className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
                <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Need Help?
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/contact"
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-gray-900 hover:bg-gray-800 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    Contact Support
                  </Link>
                  <button className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-gray-900 hover:bg-gray-800 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}>
                    Request Return
                  </button>
                  <button className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-gray-900 hover:bg-gray-800 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}>
                    Report an Issue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}