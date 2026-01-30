'use client';

import { useState } from 'react';
import ProductModal from './product';
import CategoryCard from './categorygrid';
import AddToCartButton from '../../components/AddToCartButton';
import { useCart } from '../../components/CartProvider';
import { useTheme } from '../../components/theme/themeprovider';
import ScrollingBanner from './ScrollingBanner'; // Extract this if needed
import HorizontalCategories from './HorizontalCategories'; // Extract this if needed

// ────────────────────────────────────────────────
// Product Card with Modal Trigger
// ────────────────────────────────────────────────
function ProductCard({ product, onCardClick }: { product: any; onCardClick: (product: any) => void }) {
  const { themeMode } = useTheme();

  return (
    <div 
      onClick={() => onCardClick(product)}
      className={`
        group relative overflow-hidden rounded-lg aspect-square cursor-pointer 
        transition-all duration-300 hover:scale-[1.03] outline-none
        ${themeMode === 'dark' 
          ? 'bg-gray-900/40 backdrop-blur-sm hover:shadow-orange-500/5 border border-gray-800 hover:border-orange-500/50' 
          : 'bg-white/80 backdrop-blur-sm hover:shadow-gray-300 border border-gray-200 hover:border-orange-500'
        }
      `}
    >
      {/* Image placeholder */}
      <div className={`absolute inset-0 flex items-center justify-center ${
        themeMode === 'dark' ? 'bg-gray-800/40' : 'bg-gray-100/60'
      }`}>
        <div className={`text-3xl font-bold ${
          themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {product.name.charAt(0)}
        </div>
      </div>

      {/* Discount badge */}
      {product.discount && (
        <span className="absolute top-2 left-2 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-20 shadow-lg">
          -{product.discount}%
        </span>
      )}

      {/* Bottom overlay info */}
      <div className={`absolute bottom-0 left-0 right-0 p-3 ${
        themeMode === 'dark' 
          ? 'bg-gradient-to-t from-black/90 to-transparent' 
          : 'bg-gradient-to-t from-gray-900/80 to-transparent'
      } z-10`}>
        <h3 className="text-sm font-medium text-white line-clamp-2 mb-1 drop-shadow-md">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className={`text-base font-bold drop-shadow-md ${
              themeMode === 'dark' ? 'text-orange-400' : 'text-orange-500'
            }`}>
              ₦{product.price.toLocaleString()}
            </span>
            {product.original && (
              <span className="text-xs text-gray-300 line-through drop-shadow-md">
                ₦{product.original.toLocaleString()}
              </span>
            )}
          </div>
          <AddToCartButton 
            product={product}
            variant="icon"
          />
        </div>
      </div>

      {/* Hover overlay */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 ${
        themeMode === 'dark' ? 'bg-white/5' : 'bg-black/5'
      }`} />
    </div>
  );
}

// ────────────────────────────────────────────────
// Main Marketplace Component
// ────────────────────────────────────────────────
export default function MarketplaceHome() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Get cart data from context
  const { totalItems } = useCart();
  const { themeMode } = useTheme();

  // Flash Sales
  const flashProducts = [
    { id: 1, name: 'TCL 32" Digital Smart TV', price: 139000, original: 175000, discount: 21, rating: 4.7, sold: 234 },
    { id: 2, name: 'Royal 43" Google TV', price: 227999, original: 350000, discount: 35, rating: 4.9, sold: 187 },
    { id: 3, name: 'Hikers 55" Frame TV', price: 328980, original: 400000, discount: 18, rating: 4.5, sold: 156 },
    { id: 4, name: 'TCL 55" UHD 4K', price: 439999, original: 550000, discount: 20, rating: 4.8, sold: 198 },
    { id: 5, name: 'TCL 65" QLED', price: 715000, original: 800000, discount: 11, rating: 4.6, sold: 123 },
  ];

  // Featured Products
  const featuredProducts = [
    { id: 1, name: 'HP Laptop 15s', price: 285000, rating: 4.5, sold: 89 },
    { id: 2, name: 'Nike Air Max', price: 35000, rating: 4.8, sold: 245 },
    { id: 3, name: 'Kitchen Mixer', price: 15000, rating: 4.3, sold: 187 },
    { id: 4, name: 'Smart Watch', price: 45000, rating: 4.7, sold: 156 },
    { id: 5, name: 'Perfume Set', price: 12000, rating: 4.6, sold: 234 },
    { id: 6, name: 'Office Chair', price: 25000, rating: 4.4, sold: 145 },
    { id: 7, name: 'Samsung Galaxy S23', price: 420000, rating: 4.9, sold: 67 },
    { id: 8, name: 'Adidas Running Shoes', price: 28000, rating: 4.6, sold: 189 },
    { id: 9, name: 'Blender 800W', price: 18000, rating: 4.5, sold: 167 },
    { id: 10, name: 'Wireless Earbuds', price: 9500, rating: 4.4, sold: 278 },
    { id: 11, name: 'Face Cream Set', price: 8500, rating: 4.7, sold: 312 },
    { id: 12, name: 'Ergonomic Desk', price: 45000, rating: 4.3, sold: 98 },
  ];

  // Categories Data
  const categories = [
    { id: 1, name: 'Phones & Tablets', icon: '📱', color: 'text-blue-500', items: 1250 },
    { id: 2, name: 'Electronics', icon: '🔌', color: 'text-purple-500', items: 890 },
    { id: 3, name: 'Fashion', icon: '👕', color: 'text-pink-500', items: 1450 },
    { id: 4, name: 'Home & Office', icon: '🏠', color: 'text-green-500', items: 780 },
    { id: 5, name: 'Health & Beauty', icon: '💄', color: 'text-red-500', items: 920 },
    { id: 6, name: 'Supermarket', icon: '🛒', color: 'text-yellow-500', items: 1100 },
    { id: 7, name: 'Baby Products', icon: '👶', color: 'text-indigo-500', items: 450 },
    { id: 8, name: 'Computing', icon: '💻', color: 'text-orange-500', items: 680 },
  ];

  // Best Sellers
  const bestSellers = [
    { id: 1, name: 'Anker Power Bank 20,000mAh', price: 18500, sold: 1245, rating: 4.8 },
    { id: 2, name: 'Oraimo Bluetooth Earbuds', price: 12500, sold: 987, rating: 4.6 },
    { id: 3, name: 'Tecno Spark 20', price: 145000, sold: 856, rating: 4.7 },
    { id: 4, name: 'Ladies Handbag Set', price: 9800, sold: 732, rating: 4.5 },
  ];

  // Beauty Deals
  const beautyDeals = [
    { id: 1, name: 'NIVEA Deep Lotion', price: 4040, original: 6000, discount: 33, rating: 4.4, sold: 456 },
    { id: 2, name: 'NIVEA Men Roll-On', price: 2200, original: 3000, discount: 27, rating: 4.3, sold: 389 },
    { id: 3, name: 'CeraVe Cleanser', price: 12000, original: 15000, discount: 20, rating: 4.7, sold: 267 },
  ];

  // Computing Deals
  const computingDeals = [
    { id: 1, name: 'Dell Latitude 5400', price: 450010, original: 800000, discount: 44, rating: 4.8, sold: 78 },
    { id: 2, name: 'MacBook Pro A1', price: 193235, original: 350000, discount: 45, rating: 4.9, sold: 45 },
    { id: 3, name: 'HP ProBook 11', price: 115715, original: 150000, discount: 23, rating: 4.6, sold: 89 },
  ];

  // Last Viewed
  const lastViewed = {
    id: 1,
    name: 'Fifine T669 Condenser Microphone',
    price: 82500,
    discount: 55,
    original: 150000,
    rating: 4.7,
    sold: 234
  };

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProduct(null);
    }, 300);
  };

  return (
    <div className={`min-h-screen relative ${
      themeMode === 'dark' 
        ? 'bg-black text-white' 
        : 'bg-white text-gray-900'
    }`}>
      {/* Scrolling Banner - You can extract this to its own component */}
      <div className={`py-2 overflow-hidden shadow-sm ${
        themeMode === 'dark' 
          ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white' 
          : 'bg-gradient-to-r from-orange-400 to-red-500 text-white'
      }`}>
        <div className="relative">
          <div className="flex animate-scroll whitespace-nowrap">
            {[
              "🔥 Awoof of the Month: Pay Small Small + Free Delivery on Selected Items!",
              "🎉 Flash Sale LIVE: Up to 70% OFF on Electronics & Phones!",
              "🚚 Free Delivery Nationwide for orders above ₦20,000",
              "📱 0% Interest Installment on Phones & Laptops",
              "🎁 Win ₦50,000 Shopping Voucher – Enter Daily Giveaway!",
            ].map((deal, idx) => (
              <div key={idx} className="inline-flex items-center mx-8">
                <span className="text-sm font-medium">{deal}</span>
                <div className="mx-8 text-white/50">•</div>
              </div>
            ))}
          </div>
          <style jsx>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-scroll {
              animation: scroll 50s linear infinite;
              display: inline-flex;
            }
            .animate-scroll:hover { animation-play-state: paused; }
          `}</style>
        </div>
      </div>

      {/* Horizontal Categories - You can extract this to its own component */}
      <div className={`py-3 sticky top-16 md:top-20 z-40 ${
        themeMode === 'dark' 
          ? 'bg-black/80 backdrop-blur-sm border-b border-gray-800' 
          : 'bg-white backdrop-blur-sm border-b border-gray-200 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {[
              'Phones & Tablets',
              'Electronics',
              'Fashion',
              'Home & Office',
              'Health & Beauty',
              'Supermarket',
              'Baby Products',
              'Computing',
            ].map((cat) => (
              <button
                key={cat}
                className={`
                  px-4 py-2 text-xs md:text-sm font-medium rounded-full
                  transition-all duration-300 outline-none
                  ${themeMode === 'dark' 
                    ? 'border border-gray-800 text-gray-300 bg-gray-900/50 hover:border-orange-500/50 hover:text-orange-400 hover:bg-gray-800/50 active:border-orange-500/50 active:text-orange-400' 
                    : 'border border-gray-300 text-gray-700 bg-gray-50/80 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50/80 active:border-orange-500 active:text-orange-600'
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4">
        {/* Flash Sales Section */}
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className={`text-2xl font-bold ${
                  themeMode === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  ⚡ Flash Sales
                </h2>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <span className={`text-xs font-bold ${
                    themeMode === 'dark' ? 'text-red-400' : 'text-red-600'
                  }`}>
                    LIVE NOW
                  </span>
                </div>
              </div>
              <a href="#" className={`text-sm font-medium flex items-center gap-1 ${
                themeMode === 'dark' 
                  ? 'text-orange-400 hover:text-orange-300' 
                  : 'text-orange-600 hover:text-orange-700'
              }`}>
                See All <span className="text-lg">→</span>
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {flashProducts.map((p) => (
                <ProductCard key={p.id} product={p} onCardClick={openModal} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <CategoryCard 
                  key={category.id} 
                  icon={category.icon} 
                  name={category.name} 
                  color={category.color}
                  items={category.items}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Beauty Deals Section */}
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-2xl font-bold ${
                themeMode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                💄 Beauty Deals
              </h2>
              <a href="#" className={`text-sm font-medium flex items-center gap-1 ${
                themeMode === 'dark' 
                  ? 'text-orange-400 hover:text-orange-300' 
                  : 'text-orange-600 hover:text-orange-700'
              }`}>
                See All <span className="text-lg">→</span>
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {beautyDeals.map((p) => (
                <ProductCard key={p.id} product={p} onCardClick={openModal} />
              ))}
            </div>
          </div>
        </section>

        {/* Computing Deals Section */}
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-2xl font-bold ${
                themeMode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                💻 Top Computing Deals
              </h2>
              <a href="#" className={`text-sm font-medium flex items-center gap-1 ${
                themeMode === 'dark' 
                  ? 'text-orange-400 hover:text-orange-300' 
                  : 'text-orange-600 hover:text-orange-700'
              }`}>
                See All <span className="text-lg">→</span>
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {computingDeals.map((p) => (
                <ProductCard key={p.id} product={p} onCardClick={openModal} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-2xl font-bold ${
                themeMode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                ⭐ Featured Products
              </h2>
              <a href="#" className={`text-sm font-medium flex items-center gap-1 ${
                themeMode === 'dark' 
                  ? 'text-orange-400 hover:text-orange-300' 
                  : 'text-orange-600 hover:text-orange-700'
              }`}>
                See All <span className="text-lg">→</span>
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {featuredProducts.slice(0, 5).map((p) => (
                <ProductCard key={p.id} product={p} onCardClick={openModal} />
              ))}
            </div>
          </div>
        </section>

        {/* Last Viewed Section */}
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-2xl font-bold ${
                themeMode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                👁️ Last Viewed
              </h2>
              <a href="#" className={`text-sm font-medium flex items-center gap-1 ${
                themeMode === 'dark' 
                  ? 'text-orange-400 hover:text-orange-300' 
                  : 'text-orange-600 hover:text-orange-700'
              }`}>
                See All <span className="text-lg">→</span>
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <ProductCard product={lastViewed} onCardClick={openModal} />
            </div>
          </div>
        </section>

        {/* Best Sellers Section */}
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-2xl font-bold ${
                themeMode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                🏆 Best Sellers
              </h2>
              <a href="#" className={`text-sm font-medium flex items-center gap-1 ${
                themeMode === 'dark' 
                  ? 'text-orange-400 hover:text-orange-300' 
                  : 'text-orange-600 hover:text-orange-700'
              }`}>
                See All <span className="text-lg">→</span>
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {bestSellers.map((p) => (
                <ProductCard key={p.id} product={p} onCardClick={openModal} />
              ))}
            </div>
          </div>
        </section>

        {/* Product Detail Modal */}
        {isModalOpen && selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={closeModal} 
          />
        )}
      </div>

      {/* Floating actions (cart + back to top) are now in layout.tsx */}
    </div>
  );
}