

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../../components/theme/themeprovider";
import { CartProvider } from "../../components/CartProvider";
import MarketplaceHeader from "../../components/marketplace/marketplaceheader";
import FloatingActions from "../../components/FloatingActions"; // Add this import

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Supermart - Multi-Vendor Marketplace",
  description: "Shop from multiple independent stores in one marketplace platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen bg-gradient-to-br from-gray-950 to-black text-white`}>
        <CartProvider>
          <ThemeProvider>
            {/* Header */}
            <MarketplaceHeader />
            
            {/* Main Content */}
            <main className="min-h-screen">
              {children}
            </main>

            {/* Floating Actions (Cart + Back to Top) */}
            <FloatingActions />

            {/* Footer */}
            <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-sm">
              <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center text-gray-400 text-sm">
                  <p>© 2024 Supermart Marketplace. All rights reserved.</p>
                  <p className="mt-2">Experience the future of shopping</p>
                </div>
              </div>
            </footer>
          </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  );
}

