// components/CartProvider.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  originalPrice?: number;
  discount?: number;
  image?: string; // Optional: add image for cart display
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  getItemCount: (id: number) => number; // Helper to get count for specific item
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Client-only wrapper to prevent hydration errors
function ClientOnlyCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const savedCart = localStorage.getItem('supermart_cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        // Validate cart data
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      localStorage.removeItem('supermart_cart'); // Clear corrupted data
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('supermart_cart', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [items, mounted]);

  const addItem = (item: CartItem) => {
    setItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = (id: number) => {
    const item = items.find(i => i.id === id);
    return item ? item.quantity : 0;
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Don't render context until mounted (client-side)
  if (!mounted) {
    return null; // or a loading skeleton
  }

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      getItemCount,
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Main export that provides the client-only wrapper
export function CartProvider({ children }: { children: React.ReactNode }) {
  return <ClientOnlyCartProvider>{children}</ClientOnlyCartProvider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Helper function to add item with proper defaults
export function prepareCartItem(
  product: any, 
  quantity: number = 1
): CartItem {
  return {
    id: product.id,
    name: product.name,
    price: product.price || 0,
    quantity: quantity,
    originalPrice: product.original || product.price,
    discount: product.discount,
    image: product.image
  };
}