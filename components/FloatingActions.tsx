'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '../components/CartProvider';
import { useTheme } from '../components/theme/themeprovider';

interface FloatingActionsProps {
  product?: any;
  currentPrice?: any;
  exclusivePrice?: number;
  offerExpired?: boolean;
  quantity?: number;
  onQuantityChange?: (quantity: number) => void;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
  timeLeft?: number;
  formatTime?: (seconds: number) => string;
  EXCLUSIVE_DISCOUNT?: number;
  savings?: number;
}

export default function FloatingActions({
  product,
  currentPrice,
  exclusivePrice,
  offerExpired,
  quantity = 1,
  onQuantityChange,
  onAddToCart,
  onBuyNow,
  timeLeft,
  formatTime,
  EXCLUSIVE_DISCOUNT,
  savings
}: FloatingActionsProps) {
  const router = useRouter();
  const cartButtonRef = useRef<HTMLDivElement>(null);
  const [cartPosition, setCartPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startCoords, setStartCoords] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const DRAG_THRESHOLD = 5;
  
  const { totalItems, addItem } = useCart();
  const { themeMode } = useTheme();

  // Set initial position to bottom right (above back-to-top button)
  useEffect(() => {
    const saved = localStorage.getItem('supermart_cart_position');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure cart stays on right side
        setCartPosition({
          x: Math.max(window.innerWidth - 80, parsed.x),
          y: Math.max(window.innerHeight - 160, parsed.y) // 160px above bottom
        });
      } catch (e) {
        // Default position: 24px from right, 160px from bottom
        setCartPosition({ 
          x: window.innerWidth - 80, 
          y: window.innerHeight - 160 
        });
      }
    } else {
      // Default position: 24px from right, 160px from bottom
      setCartPosition({ 
        x: window.innerWidth - 80, 
        y: window.innerHeight - 160 
      });
    }
    
    const handleResize = () => {
      setCartPosition(prev => ({
        x: Math.max(window.innerWidth - 100, Math.min(prev.x, window.innerWidth - 20)),
        y: Math.max(20, Math.min(prev.y, window.innerHeight - 140))
      }));
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Persist position on change
  useEffect(() => {
    localStorage.setItem('supermart_cart_position', JSON.stringify(cartPosition));
  }, [cartPosition]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setStartCoords({ x: e.clientX, y: e.clientY });
    setInitialPosition({ x: cartPosition.x, y: cartPosition.y });
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) {
      const dx = Math.abs(e.clientX - startCoords.x);
      const dy = Math.abs(e.clientY - startCoords.y);
      if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
        setIsDragging(true);
        if (cartButtonRef.current) {
          cartButtonRef.current.style.cursor = 'grabbing';
        }
      }
    }
    
    if (isDragging) {
      const newX = initialPosition.x + (e.clientX - startCoords.x);
      const newY = initialPosition.y + (e.clientY - startCoords.y);
      
      // Constrain to viewport with right-side bias
      const maxX = window.innerWidth - 20;
      const minX = window.innerWidth - 100; // Keep near right side
      const maxY = window.innerHeight - 140; // Keep above back-to-top button
      const minY = 20;
      
      setCartPosition({
        x: Math.max(minX, Math.min(newX, maxX)),
        y: Math.max(minY, Math.min(newY, maxY))
      });
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    
    if (cartButtonRef.current) {
      cartButtonRef.current.style.cursor = 'grab';
    }
    
    if (!isDragging) {
      router.push('/cart');
    }
    
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    setStartCoords({ x: touch.clientX, y: touch.clientY });
    setInitialPosition({ x: cartPosition.x, y: cartPosition.y });
    setIsDragging(false);
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      
      if (!isDragging) {
        const dx = Math.abs(touch.clientX - startCoords.x);
        const dy = Math.abs(touch.clientY - startCoords.y);
        if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
          setIsDragging(true);
        }
      }
      
      if (isDragging) {
        const newX = initialPosition.x + (touch.clientX - startCoords.x);
        const newY = initialPosition.y + (touch.clientY - startCoords.y);
        const maxX = window.innerWidth - 20;
        const minX = window.innerWidth - 100;
        const maxY = window.innerHeight - 140;
        const minY = 20;
        
        setCartPosition({
          x: Math.max(minX, Math.min(newX, maxX)),
          y: Math.max(minY, Math.min(newY, maxY))
        });
      }
    };
    
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      
      if (!isDragging) {
        router.push('/cart');
      }
      
      setIsDragging(false);
    };
    
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  // Add product to cart from FloatingActions if needed
  const handleQuickAddToCart = () => {
    if (product && addItem && onAddToCart) {
      // Use the provided onAddToCart function
      onAddToCart();
    }
  };

  return (
    <>
      <style>{`
        .floating-actions-container {
          position: fixed;
          z-index: 50;
          user-select: none;
          touch-action: none;
        }
      `}</style>

      {/* DRAGGABLE FLOATING CART BUTTON - Positioned above back-to-top */}
      <div
        ref={cartButtonRef}
        className="floating-actions-container"
        style={{
          right: `${window.innerWidth - cartPosition.x}px`,
          bottom: `${window.innerHeight - cartPosition.y}px`,
          cursor: 'grab',
          transform: 'translateX(50%)',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <motion.button
          className={`px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 outline-none ${
            themeMode === 'dark'
              ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white'
              : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleQuickAddToCart}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="font-medium">Cart ({totalItems})</span>
        </motion.button>
      </div>

      {/* Back to Top Button - Fixed at bottom right */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 outline-none ${
          themeMode === 'dark'
            ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white'
            : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </>
  );
}