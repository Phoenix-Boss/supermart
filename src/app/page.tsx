'use client';

import { useState } from 'react';
import MarketplaceHome from '../../components/marketplace/marketplace';
import VendorStoreHome from '../../components/vendor-store/vendorstore';

const dummyVendor = {
  id: 'beads',
  name: 'Bead Dreams Studio',
  domain: 'beaddreamsstudio.com',
  logo_url: '',
  theme_config: { primary_color: '#8B5CF6' }
};

export default function Home() {
  const [isVendorMode, setIsVendorMode] = useState(false);

  return (
    <div>
      {/* Dev Toggle - remove in production or make conditional */}
      <div className="fixed top-4 right-4 z-50 bg-white p-3 rounded shadow-lg border">
        <button
          onClick={() => setIsVendorMode(!isVendorMode)}
          className={`px-4 py-2 rounded ${isVendorMode ? 'bg-purple-600 text-white' : 'bg-orange-600 text-white'}`}
        >
          {isVendorMode ? 'Vendor Mode' : 'Marketplace Mode'}
        </button>
      </div>

      {isVendorMode ? <VendorStoreHome vendor={dummyVendor} /> : <MarketplaceHome />}
    </div>
  );
}