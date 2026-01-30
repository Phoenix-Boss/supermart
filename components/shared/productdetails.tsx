'use client';

import { useState } from 'react';

interface ProductDetailProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating: number;
    reviewCount: number;
    category: string;
    tags: string[];
    stock: number | string;
    images: string[];
    vendor?: {
      name: string;
      domain: string;
      rating: number;
      products: number;
    };
  };
  context: 'marketplace' | 'vendor-store';
  vendor?: {
    name: string;
    domain: string;
    logo_url?: string;
    theme_config?: any;
  };
}

export default function ProductDetail({ product, context, vendor }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const dummyImages = [
    '/placeholder-product-1.jpg',
    '/placeholder-product-2.jpg',
    '/placeholder-product-3.jpg',
    '/placeholder-product-4.jpg'
  ];

  const dummyVariants = [
    { id: 1, name: 'Size', options: ['Small', 'Medium', 'Large', 'X-Large'] },
    { id: 2, name: 'Color', options: ['Black', 'White', 'Blue', 'Red', 'Green'] },
    { id: 3, name: 'Material', options: ['Cotton', 'Polyester', 'Silk', 'Wool'] }
  ];

  const dummyReviews = [
    {
      id: 1,
      user: 'Sarah O.',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Absolutely love this product! The quality is amazing and it arrived faster than expected.',
      helpful: 24
    },
    {
      id: 2,
      user: 'Michael T.',
      rating: 4,
      date: '1 month ago',
      comment: 'Great product for the price. Would recommend to anyone looking for quality.',
      helpful: 18
    },
    {
      id: 3,
      user: 'Amina K.',
      rating: 5,
      date: '3 weeks ago',
      comment: 'Perfect! Exactly what I was looking for. The craftsmanship is excellent.',
      helpful: 15
    },
    {
      id: 4,
      user: 'David L.',
      rating: 4,
      date: '2 months ago',
      comment: 'Good value for money. Shipping was quick and packaging was secure.',
      helpful: 9
    }
  ];

  const dummyRelatedProducts = [
    { id: 1, name: 'Similar Product 1', price: 3200, image: '/placeholder-product.jpg' },
    { id: 2, name: 'Similar Product 2', price: 4500, image: '/placeholder-product.jpg' },
    { id: 3, name: 'Similar Product 3', price: 2800, image: '/placeholder-product.jpg' },
    { id: 4, name: 'Similar Product 4', price: 5200, image: '/placeholder-product.jpg' }
  ];

  const primaryColor = vendor?.theme_config?.primary_color || '#4F46E5';

  // Helper function to check stock level
  const getStockLevelColor = (stock: number | string): string => {
    if (typeof stock === 'string') {
      return 'text-gray-600'; // For string values like "Unlimited"
    }
    return stock < 10 ? 'text-red-600' : 'text-green-600';
  };

  // Helper function to get stock display text
  const getStockDisplayText = (stock: number | string): string => {
    if (typeof stock === 'string') {
      return stock; // Return the string as-is
    }
    return `${stock} ${stock === 1 ? 'item' : 'items'} left in stock`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600">Home</a>
            <span>/</span>
            <a href="/categories" className="hover:text-blue-600">{product.category}</a>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Images */}
          <div>
            {/* Main Image */}
            <div className="bg-gray-100 rounded-xl aspect-square mb-4 flex items-center justify-center relative">
              <div className="w-64 h-64 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg"></div>
              {product.discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{product.discount}%
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {dummyImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 ${
                    selectedImage === index ? 'border-blue-600' : 'border-transparent'
                  }`}
                >
                  <div className={`w-12 h-12 bg-gray-300 rounded ${selectedImage === index ? 'bg-blue-200' : ''}`}></div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div>
            {/* Vendor Info (Marketplace only) */}
            {context === 'marketplace' && product.vendor && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-bold">
                    {product.vendor.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{product.vendor.name}</h3>
                    <p className="text-sm text-blue-600">{product.vendor.domain}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Store Rating:</span>
                    <div className="flex items-center space-x-1">
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold">{product.vendor.rating}</span>
                      <span className="text-sm text-gray-500">({product.vendor.products} products)</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <a
                      href={`//${product.vendor.domain}`}
                      className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium inline-block"
                    >
                      Visit Store
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Product Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6" fill={i < Math.floor(product.rating) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ))}
              </div>
              <span className="font-semibold">{product.rating}</span>
              <span className="text-gray-500">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold text-gray-900">₦{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ₦{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-lg bg-green-100 text-green-800 px-3 py-1 rounded font-semibold">
                      Save ₦{(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  </>
                )}
              </div>
              {product.stock !== 'Unlimited' && (
                <p className={`text-sm mt-2 ${getStockLevelColor(product.stock)}`}>
                  {getStockDisplayText(product.stock)}
                </p>
              )}
            </div>

            {/* Variants */}
            <div className="mb-6 space-y-4">
              {dummyVariants.map((variant) => (
                <div key={variant.id}>
                  <h3 className="font-semibold text-gray-900 mb-2">{variant.name}:</h3>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSelectedOptions({...selectedOptions, [variant.name]: option})}
                        className={`px-4 py-2 rounded-lg border font-medium transition ${
                          selectedOptions[variant.name] === option
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold text-lg transition"
                  style={context === 'vendor-store' ? { backgroundColor: primaryColor, borderColor: primaryColor } : {}}
                >
                  Add to Cart
                </button>
              </div>
              <button className="mt-3 w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition">
                Buy Now
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs: Description, Reviews, Shipping */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['Description', 'Reviews', 'Shipping & Returns'].map((tab) => (
                <button
                  key={tab}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    tab === 'Description'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Description Content */}
          <div className="mt-6 prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h2>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>High-quality materials ensure durability and comfort</li>
              <li>Perfect for everyday use and special occasions</li>
              <li>Easy to maintain and clean</li>
              <li>Available in multiple sizes and colors</li>
              <li>100% satisfaction guarantee</li>
            </ul>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Specifications:</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Material:</dt>
                    <dd className="font-medium">Premium Quality</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Weight:</dt>
                    <dd className="font-medium">350g</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Dimensions:</dt>
                    <dd className="font-medium">25cm x 15cm x 5cm</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Care:</dt>
                    <dd className="font-medium">Hand wash recommended</dd>
                  </div>
                </dl>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Package Includes:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>1 x Main Product</li>
                  <li>1 x User Manual</li>
                  <li>1 x Warranty Card</li>
                  <li>Free Gift (Limited Time)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dummyReviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.user}</h4>
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4" fill={i < review.rating ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{review.comment}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-700">Helpful? ({review.helpful})</button>
                    <button className="text-gray-500 hover:text-gray-700">Report</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dummyRelatedProducts.map((item) => (
                <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">₦{item.price.toLocaleString()}</span>
                      <button className="text-gray-500 hover:text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Add to Cart (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <div className="text-lg font-bold">₦{product.price.toLocaleString()}</div>
            {product.originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                ₦{product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold flex items-center space-x-2"
            style={context === 'vendor-store' ? { backgroundColor: primaryColor, borderColor: primaryColor } : {}}
          >
            <span>Add to Cart</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}