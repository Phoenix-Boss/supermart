'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductModalProps {
  product: any;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showSpecifications, setShowSpecifications] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [offerExpired, setOfferExpired] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Exclusive discount configuration
  const EXCLUSIVE_DISCOUNT = 12;
  const exclusivePrice = Math.floor(product.price * (1 - EXCLUSIVE_DISCOUNT / 100));
  const savings = product.price - exclusivePrice;
  
  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setOfferExpired(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Product image variations
  const imageVariations = [
    { id: 1, label: 'Front View' },
    { id: 2, label: 'Side View' },
    { id: 3, label: 'Back View' },
    { id: 4, label: 'In Use' },
  ];
  
  // Specifications data
  const specifications = [
    { label: 'Brand', value: 'Premium Brand' },
    { label: 'Model', value: product.name.split(' ').slice(-1)[0] },
    { label: 'Warranty', value: '12 Months Official' },
    { label: 'Condition', value: '100% New & Sealed' },
    { label: 'Delivery Time', value: '2-5 Business Days' },
    { label: 'Customer Support', value: '24/7 Available' },
    { label: 'Payment Options', value: 'Card, Transfer, Pay Later' },
    { label: 'Return Policy', value: '7-Day Money Back' },
  ];
  
  // Features data
  const features = [
    'Premium quality materials and craftsmanship',
    'Latest technology integration with smart features',
    'Energy efficient design for cost savings',
    'Easy to install and user-friendly interface',
    'Comes with all necessary accessories',
    '1-year comprehensive manufacturer warranty',
    'Compatible with most existing systems',
    'Low maintenance requirements',
  ];

  const handleQuantity = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
    setAddedToCart(false);
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
      onClose();
    }, 1500);
  };

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-none w-full max-w-6xl max-h-[95vh] overflow-y-auto shadow-2xl border border-gray-800"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-300 hover:text-white z-50 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-300"
            aria-label="Close modal"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-2 relative">
              {/* Main Featured Image */}
              <div className="relative h-[45vh] lg:h-[60vh] bg-gradient-to-br from-gray-800 via-black to-gray-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="text-9xl font-black text-gray-700 opacity-30">
                      {product.name.charAt(0)}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        {product.name.charAt(0)}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Product Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-3 z-20">
                  {product.discount && !offerExpired && (
                    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 text-sm font-bold tracking-wider rounded-sm">
                      -{product.discount}% OFF
                    </div>
                  )}
                  {!offerExpired ? (
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-black px-4 py-2 text-sm font-bold tracking-wider rounded-sm">
                      EXCLUSIVE OFFER
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 text-sm font-bold tracking-wider rounded-sm">
                      @PRICE
                    </div>
                  )}
                </div>
              </div>

              {/* Image Thumbnails Grid */}
              <div className="grid grid-cols-4 gap-2 p-6 bg-black/50 backdrop-blur-sm">
                {imageVariations.map((variation, index) => (
                  <button
                    key={variation.id}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-sm transition-all duration-300 ${
                      selectedImage === index 
                        ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-black scale-105' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <span className="text-gray-400 text-sm font-medium">{variation.label}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* About This Product Section */}
              <div className="p-6 lg:p-8 border-t border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-4">About This Product</h2>
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    Experience the future of premium electronics with the {product.name}. 
                    This state-of-the-art device combines cutting-edge technology with 
                    sleek, minimalist design to deliver unparalleled performance.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Featuring advanced components and smart connectivity options, 
                    it's engineered to exceed expectations. Perfect for professionals 
                    and enthusiasts alike, offering reliability, style, and innovation 
                    in one complete package.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Product Details */}
            <div className="p-6 lg:p-8 bg-gradient-to-b from-gray-900 to-black border-l border-gray-800 overflow-y-auto">
              
              {/* Product Title */}
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
                {product.name}
              </h1>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center mb-5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-700'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.95-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-400 font-medium text-sm">
                    {product.rating.toFixed(1)} • {product.sold || 124} sold
                  </span>
                </div>
              )}

              {/* Price Section */}
              <div className="mb-6 p-4 bg-black/50 rounded-lg border border-gray-800">
                {offerExpired ? (
                  // After offer expires - Show only current price with @PRICE
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-3">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded text-sm font-bold">
                        @PRICE
                      </div>
                    </div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      ₦{product.price.toLocaleString()}
                    </div>
                    <div className="mt-2 text-gray-400 text-sm">
                      Regular price
                    </div>
                  </div>
                ) : (
                  // Active offer - Show all prices with countdown
                  <div className="space-y-2">
                    {product.original && (
                      <div className="text-gray-400">
                        <span className="text-sm">Original Price:</span>
                        <div className="text-lg line-through">₦{product.original.toLocaleString()}</div>
                      </div>
                    )}
                    
                    {/* Current Price */}
                    <div className="text-gray-400">
                      <span className="text-sm">Current Price:</span>
                      <div className="text-lg line-through">₦{product.price.toLocaleString()}</div>
                    </div>
                    
                    {/* Exclusive Price with Countdown */}
                    <div className="mt-4 pt-4 border-t border-gray-800/50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-2 py-1 rounded text-xs font-bold mr-2">
                            EXCLUSIVE
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-red-300 font-medium mb-1">
                            Offer ends in:
                          </div>
                          <div className="text-lg font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                            {formatTime(timeLeft)}
                          </div>
                        </div>
                      </div>
                      <div className="text-3xl font-black bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                        ₦{exclusivePrice.toLocaleString()}
                      </div>
                      <div className="mt-2 text-green-400 font-medium text-sm flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        Save ₦{savings.toLocaleString()} ({EXCLUSIVE_DISCOUNT}% extra)
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Features Dropdown */}
              <div className="mb-6">
                <button
                  onClick={() => setShowFeatures(!showFeatures)}
                  className="flex items-center justify-between w-full p-4 bg-black/40 rounded-lg border border-gray-800 hover:border-gray-600 transition-all duration-300 group"
                >
                  <div className="flex items-center">
                    <svg 
                      className={`w-5 h-5 text-orange-500 mr-3 transition-transform duration-300 ${showFeatures ? 'rotate-90' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="font-semibold text-white">Features</span>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {showFeatures ? 'Hide Details' : 'Show Details'}
                  </div>
                </button>
                
                <AnimatePresence>
                  {showFeatures && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 p-4 bg-black/30 rounded-lg border border-gray-800">
                        <ul className="space-y-3">
                          {features.map((feature, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-start text-gray-300"
                            >
                              <svg className="w-4 h-4 text-orange-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-sm">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Specifications Dropdown */}
              <div className="mb-6">
                <button
                  onClick={() => setShowSpecifications(!showSpecifications)}
                  className="flex items-center justify-between w-full p-4 bg-black/40 rounded-lg border border-gray-800 hover:border-gray-600 transition-all duration-300 group"
                >
                  <div className="flex items-center">
                    <svg 
                      className={`w-5 h-5 text-orange-500 mr-3 transition-transform duration-300 ${showSpecifications ? 'rotate-90' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="font-semibold text-white">Specifications</span>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {showSpecifications ? 'Hide Details' : 'Show Details'}
                  </div>
                </button>
                
                <AnimatePresence>
                  {showSpecifications && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 p-4 bg-black/30 rounded-lg border border-gray-800">
                        <div className="grid grid-cols-2 gap-3">
                          {specifications.map((spec, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="space-y-1"
                            >
                              <div className="text-gray-400 text-xs font-medium">{spec.label}</div>
                              <div className="text-white text-sm">{spec.value}</div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-medium">Quantity</span>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => handleQuantity(-1)}
                      className="w-8 h-8 rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-orange-500 transition-all duration-300 flex items-center justify-center"
                    >
                      <span className="text-lg">−</span>
                    </button>
                    <span className="text-xl font-bold text-white min-w-[30px] text-center">{quantity}</span>
                    <button 
                      onClick={() => handleQuantity(1)}
                      className="w-8 h-8 rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-orange-500 transition-all duration-300 flex items-center justify-center"
                    >
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>
                <div className="text-right text-gray-400 text-sm">
                  Total: <span className="text-xl font-bold text-white ml-2">
                    ₦{(offerExpired ? product.price * quantity : exclusivePrice * quantity).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className={`
                    w-full py-3 rounded-md text-base font-bold tracking-wide transition-all duration-300
                    ${addedToCart 
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' 
                      : 'bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-black hover:from-orange-500 hover:to-amber-400'
                    }
                    transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed
                  `}
                >
                  {addedToCart ? (
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      ADDED TO CART
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {offerExpired ? 'ADD TO CART' : 'ADD TO CART'}
                    </div>
                  )}
                </button>
                
                {!offerExpired ? (
                  <button 
                    className="w-full py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-md border border-gray-700 text-base font-bold tracking-wide hover:border-orange-500 hover:bg-gradient-to-r hover:from-gray-900 hover:to-black transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      BUY NOW @ ₦{exclusivePrice.toLocaleString()}
                    </div>
                  </button>
                ) : (
                  <button 
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-md border border-blue-500/50 text-base font-bold tracking-wide hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      BUY NOW @ ₦{product.price.toLocaleString()}
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}