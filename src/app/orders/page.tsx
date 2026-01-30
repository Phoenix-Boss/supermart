// File: app/orders/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../../components/theme/themeprovider';
import { Package, Truck, CheckCircle, XCircle, Clock, Search, Filter } from 'lucide-react';

export default function OrdersPage() {
  const { themeMode } = useTheme();
  const isDarkMode = themeMode === 'dark';
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('30');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load orders from localStorage on mount
  useEffect(() => {
    const loadOrders = () => {
      try {
        // Try to get orders from localStorage
        const lastOrder = localStorage.getItem('lastOrder');
        const savedOrders = localStorage.getItem('supermart_orders');
        
        let allOrders: any[] = [];
        
        // Add last order if exists
        if (lastOrder) {
          const parsedLastOrder = JSON.parse(lastOrder);
          allOrders.push({
            ...parsedLastOrder,
            id: parsedLastOrder.id || 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            status: 'processing',
            statusText: 'Processing',
            date: parsedLastOrder.date || new Date().toISOString(),
            itemsCount: parsedLastOrder.items?.length || 0,
          });
        }
        
        // Add saved orders if exist
        if (savedOrders) {
          const parsedSavedOrders = JSON.parse(savedOrders);
          if (Array.isArray(parsedSavedOrders)) {
            allOrders = [...allOrders, ...parsedSavedOrders];
          }
        }
        
        // If no orders in localStorage, create demo data
        if (allOrders.length === 0) {
          allOrders = [
            {
              id: 'ORD-789012',
              date: '2024-03-15T10:30:00Z',
              status: 'delivered',
              statusText: 'Delivered',
              items: [],
              itemsCount: 3,
              total: 245900,
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
            },
            {
              id: 'ORD-789011',
              date: '2024-03-14T14:15:00Z',
              status: 'shipped',
              statusText: 'Shipped',
              items: [],
              itemsCount: 2,
              total: 178000,
              shippingMethod: 'Pickup Station',
              shippingFee: 300,
              email: 'customer@example.com',
              phoneNumber: '+234 800 222 2222',
              whatsappNumber: '+234 800 333 3333',
              pickupLocation: 'ikeja',
              deliveryMethod: 'pickup',
              paymentMethod: 'card',
            },
          ];
        }
        
        // Sort by date (newest first)
        allOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setOrders(allOrders);
      } catch (error) {
        console.error('Failed to load orders:', error);
        // Fallback to empty array
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const statusIcons = {
    delivered: <CheckCircle className="w-4 h-4 text-green-500" />,
    shipped: <Truck className="w-4 h-4 text-blue-500" />,
    processing: <Clock className="w-4 h-4 text-yellow-500" />,
    pending: <Clock className="w-4 h-4 text-yellow-500" />,
    cancelled: <XCircle className="w-4 h-4 text-red-500" />,
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
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

  // Filter orders based on search and filters
  const filteredOrders = orders.filter(order => {
    // Search filter
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.statusText.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    // Time filter (simplified)
    const matchesTime = true; // For demo, always true
    
    return matchesSearch && matchesStatus && matchesTime;
  });

  const stats = {
    total: orders.length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    processing: orders.filter(o => o.status === 'processing' || o.status === 'pending').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  if (loading) {
    return (
      <div className={`min-h-screen py-8 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-48 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-700 rounded-xl"></div>
              ))}
            </div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-700 rounded-xl mb-4"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            My Orders
          </h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Track, return, or buy things again
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: stats.total, icon: <Package className="w-5 h-5" />, color: 'blue' },
            { label: 'Delivered', value: stats.delivered, icon: <CheckCircle className="w-5 h-5" />, color: 'green' },
            { label: 'Processing', value: stats.processing, icon: <Clock className="w-5 h-5" />, color: 'yellow' },
            { label: 'Cancelled', value: stats.cancelled, icon: <XCircle className="w-5 h-5" />, color: 'red' },
          ].map((stat, index) => (
            <div
              key={index}
              className={`rounded-xl p-4 border transition-all duration-300 hover:scale-[1.02] ${
                isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
                }`}>
                  {stat.icon}
                </div>
                <span className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.value}
                </span>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className={`rounded-xl p-4 mb-6 ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} border`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search orders by ID or status..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`pl-10 pr-8 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="all">All Status</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                  isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="30">Last 30 days</option>
                <option value="7">Last 7 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
                <option value="all">All time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className={`rounded-xl p-6 border transition-all duration-300 hover:scale-[1.01] ${
                isDarkMode
                  ? 'bg-black border-gray-800 hover:border-yellow-500/50'
                  : 'bg-white border-gray-200 hover:border-yellow-500/50'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Order Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {order.id}
                    </h3>
                    <div className="flex items-center gap-2">
                      {statusIcons[order.status as keyof typeof statusIcons]}
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                        {order.statusText}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <div>
                      <p className="font-medium">Order Date</p>
                      <div className="flex items-center gap-1">
                        <p>{formatDate(order.date)}</p>
                        <span className="text-xs opacity-75">• {formatTime(order.date)}</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Items</p>
                      <p>{order.itemsCount} product{order.itemsCount !== 1 ? 's' : ''}</p>
                    </div>
                    <div>
                      <p className="font-medium">Total</p>
                      <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        ₦{order.total.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Delivery</p>
                      <p className="capitalize">
                        {order.deliveryMethod === 'waybill' ? 'Waybill & Logistics' : 'Pickup Station'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link
                    href={`/orders/${order.id}`}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-center ${
                      isDarkMode
                        ? 'bg-gray-900 hover:bg-gray-800 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    View Details
                  </Link>
                  {order.status === 'delivered' && (
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-center ${
                      isDarkMode
                        ? 'bg-gray-900 hover:bg-gray-800 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}>
                      Buy Again
                    </button>
                  )}
                  {(order.status === 'shipped' || order.status === 'processing') && (
                    <Link
                      href={`/orders/${order.id}/tracking`}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-center ${
                        isDarkMode
                          ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500'
                          : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400'
                      } text-white`}
                    >
                      Track Order
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <div className="relative mx-auto w-24 h-24 mb-6">
              <div className={`absolute inset-0 rounded-full blur-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
              <div className={`relative w-24 h-24 rounded-full flex items-center justify-center ${
                isDarkMode ? 'bg-black' : 'bg-white'
              } border ${isDarkMode ? 'border-gray-800' : 'border-gray-300'}`}>
                <Package className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {searchTerm || statusFilter !== 'all' ? 'No orders found' : 'No orders yet'}
            </h3>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Start shopping to see your orders here'}
            </p>
            <Link
              href="/"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500'
                  : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400'
              } text-white`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Start Shopping
            </Link>
          </div>
        )}

        {/* Help Section */}
        {filteredOrders.length > 0 && (
          <div className={`mt-8 p-6 rounded-2xl ${isDarkMode ? 'bg-gray-900' : 'bg-yellow-50'}`}>
            <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Need Help With Your Orders?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-yellow-100'}`}>
                  <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className={`font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Contact Support</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Call +234 800 123 4567
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-yellow-100'}`}>
                  <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <p className={`font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Live Chat</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Available 24/7
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-yellow-100'}`}>
                  <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className={`font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Email Support</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    support@supermart.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}