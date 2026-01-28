'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Supermart
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Nigeria's fastest growing multi-vendor marketplace.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">For Shoppers</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Browse Products</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Discover Stores</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Order Tracking</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">For Vendors</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Become a Vendor</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Seller Dashboard</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Pricing Plans</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Vendor Resources</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Make Money With Us</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Sell on Supermart</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Affiliate Program</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Delivery Partners</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-orange-400">📍</span> Lagos & Abuja
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-400">📞</span> +234 800 123 4567
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-400">✉️</span> support@supermart.com
              </li>
              <li className="pt-2">
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-orange-400 transition-colors">FB</a>
                  <a href="#" className="hover:text-orange-400 transition-colors">TW</a>
                  <a href="#" className="hover:text-orange-400 transition-colors">IG</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-500 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Supermart Marketplace. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Cookies</a>
            </div>
          </div>
          <p className="mt-4">Prices include VAT. Delivery fees may apply.</p>
        </div>
      </div>
    </footer>
  );
}