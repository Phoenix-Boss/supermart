// components/AddToCartButton.tsx
'use client';

import { useState } from 'react';
import { useCart } from './CartProvider';

interface AddToCartButtonProps {
  product: {
    id: number;
    name: string;
    price: number;
    original?: number;
    discount?: number;
  };
  quantity?: number;
  variant?: 'icon' | 'button' | 'full';
  className?: string;
  showNotification?: boolean;
  onAdd?: () => void; // Add optional callback
}

export default function AddToCartButton({
  product,
  quantity = 1,
  variant = 'button',
  className = '',
  showNotification = true,
  onAdd, // Add this prop
}: AddToCartButtonProps) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    setAdding(true);
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      originalPrice: product.original,
      discount: product.discount,
    });

    // Call optional callback
    if (onAdd) {
      onAdd();
    }

    setTimeout(() => {
      setAdding(false);
      setAdded(true);
      
      if (showNotification) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-slideIn';
        notification.innerHTML = `
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>${product.name} added to cart!</span>
          </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.classList.add('animate-slideOut');
          setTimeout(() => document.body.removeChild(notification), 300);
        }, 2000);
      }
      
      setTimeout(() => setAdded(false), 3000);
    }, 500);
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleAddToCart}
        disabled={adding || added}
        className={`bg-orange-600 hover:bg-orange-700 p-2 rounded-full opacity-90 hover:opacity-100 transition ${className} ${
          adding ? 'animate-pulse' : ''
        } ${added ? 'bg-green-500 hover:bg-green-600' : ''}`}
        title="Add to cart"
      >
        {adding ? (
          <svg className="w-4 h-4 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        ) : added ? (
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={adding || added}
      className={`
        bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg
        transition-all duration-300 font-medium flex items-center justify-center
        ${className} ${adding ? 'animate-pulse' : ''}
        ${added ? 'bg-green-500 hover:bg-green-600' : ''}
      `}
    >
      {adding ? (
        <>
          <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Adding...
        </>
      ) : added ? (
        <>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Added!
        </>
      ) : (
        <>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add to Cart
        </>
      )}
    </button>
  );
}