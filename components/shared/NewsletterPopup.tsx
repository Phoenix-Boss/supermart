'use client';

import { useEffect, useState } from 'react';

export default function NewsletterPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('newsletter-seen')) {
      const timer = setTimeout(() => {
        setShow(true);
        localStorage.setItem('newsletter-seen', 'true');
      }, 8000); // show after 8 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-center mb-4 text-orange-600">
          Welcome to Supermart!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Subscribe to our newsletter and be the first to know about amazing deals
        </p>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-bold"
          >
            Subscribe
          </button>
          <p className="text-xs text-center text-gray-500">
            I agree to the Privacy Policy and can unsubscribe anytime.
          </p>
        </form>
      </div>
    </div>
  );
}