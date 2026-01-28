'use client';

import VendorHeader from './vendorheader';

interface VendorStoreHomeProps {
  vendor: {
    id: string;
    name: string;
    domain: string;
    logo_url?: string;
    theme_config?: any;
  };
}

export default function VendorStoreHome({ vendor }: VendorStoreHomeProps) {
  // Dummy product data
  const dummyProducts = [
    {
      id: 1,
      name: 'Handmade Crystal Necklace',
      description: 'Beautiful handcrafted crystal necklace with silver chain',
      price: 4500,
      originalPrice: 6000,
      discount: 25,
      image: '/placeholder-product.jpg',
      rating: 4.8,
      reviewCount: 128,
      category: 'Jewelry',
      tags: ['Handmade', 'Crystal', 'Necklace'],
      stock: 15,
      featured: true
    },
    {
      id: 2,
      name: 'Beaded Bracelet Set',
      description: 'Set of 3 beaded bracelets in different colors',
      price: 2500,
      originalPrice: 3000,
      discount: 17,
      image: '/placeholder-product.jpg',
      rating: 4.5,
      reviewCount: 89,
      category: 'Jewelry',
      tags: ['Set', 'Bracelets', 'Colorful'],
      stock: 42,
      featured: true
    },
    {
      id: 3,
      name: 'Premium Beading Kit',
      description: 'Complete kit for jewelry making with 500+ beads',
      price: 8500,
      originalPrice: 10000,
      discount: 15,
      image: '/placeholder-product.jpg',
      rating: 4.9,
      reviewCount: 56,
      category: 'Kits',
      tags: ['Kit', 'Beginner', 'Complete'],
      stock: 8,
      featured: false
    },
    {
      id: 4,
      name: 'Gold Plated Earrings',
      description: 'Elegant gold plated earrings with gemstones',
      price: 3200,
      originalPrice: 4000,
      discount: 20,
      image: '/placeholder-product.jpg',
      rating: 4.7,
      reviewCount: 203,
      category: 'Jewelry',
      tags: ['Gold', 'Earrings', 'Elegant'],
      stock: 27,
      featured: true
    },
    {
      id: 5,
      name: 'Custom Name Necklace',
      description: 'Personalized necklace with any name',
      price: 5500,
      originalPrice: 6500,
      discount: 15,
      image: '/placeholder-product.jpg',
      rating: 4.6,
      reviewCount: 167,
      category: 'Custom',
      tags: ['Personalized', 'Custom', 'Name'],
      stock: 'Unlimited',
      featured: true
    }
  ];

  // Dummy categories
  const dummyCategories = [
    { id: 1, name: 'Necklaces', count: 45 },
    { id: 2, name: 'Bracelets', count: 32 },
    { id: 3, name: 'Earrings', count: 28 },
    { id: 4, name: 'Rings', count: 19 },
    { id: 5, name: 'Kits', count: 12 },
    { id: 6, name: 'Supplies', count: 87 }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Vendor Header */}
      <VendorHeader vendor={vendor} />
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden" style={{ backgroundColor: vendor.theme_config?.primary_color || '#8B5CF6' }}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to {vendor.name}
            </h1>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Handcrafted jewelry and beads made with love and precision
            </p>
            <div className="space-x-4">
              <button className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Shop Now
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <button className="text-purple-600 hover:text-purple-700 font-medium">
              View All →
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dummyProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
                  </div>
                  {product.discount > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -{product.discount}%
                    </div>
                  )}
                  <button className="absolute top-3 right-3 bg-white/80 hover:bg-white p-2 rounded-full">
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                  
                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-xl font-bold text-gray-900">₦{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <>
                        <span className="text-sm text-gray-400 line-through">₦{product.originalPrice.toLocaleString()}</span>
                        <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                          Save ₦{(product.originalPrice - product.price).toLocaleString()}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4" fill={i < Math.floor(product.rating) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviewCount})</span>
                  </div>

                  {/* Stock & Action */}
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${product.stock === 'Unlimited' ? 'text-green-600' : product.stock < 10 ? 'text-red-600' : 'text-gray-600'}`}>
                      {product.stock === 'Unlimited' ? 'In Stock' : `${product.stock} left`}
                    </span>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {dummyCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg p-4 text-center hover:shadow-md transition cursor-pointer">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} items</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">About {vendor.name}</h2>
              <p className="text-gray-600 mb-6 text-lg">
                We are passionate artisans dedicated to creating beautiful, handcrafted jewelry. 
                Each piece is made with attention to detail and love, ensuring you receive a unique 
                product that tells a story.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">5+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">5,000+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">100%</div>
                  <div className="text-gray-600">Handmade</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">4.8★</div>
                  <div className="text-gray-600">Average Rating</div>
                </div>
              </div>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                Learn Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                {vendor.logo_url ? (
                  <img src={vendor.logo_url} alt="Logo" className="h-10 w-10" />
                ) : (
                  <div className="h-10 w-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">B</span>
                  </div>
                )}
                <span className="text-xl font-bold">{vendor.name}</span>
              </div>
              <p className="text-gray-400">
                Handcrafted jewelry and beads since 2018.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Shop</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">All Products</a></li>
                <li><a href="#" className="hover:text-white transition">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white transition">Best Sellers</a></li>
                <li><a href="#" className="hover:text-white transition">Sale</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-white transition">FAQs</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Connect</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">F</svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">IG</svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">T</svg>
                </a>
              </div>
              <p className="text-gray-400 text-sm">
                Subscribe to our newsletter for updates
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} {vendor.name}. All rights reserved.</p>
            <p className="text-sm mt-2">Powered by Supermart Platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
}