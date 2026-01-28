'use client';

import { useEffect, useState } from 'react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 border-t border-orange-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          This website uses cookies to enhance your experience. Read our{' '}
          <a href="/privacy" className="underline hover:text-orange-400">Privacy & Cookie notice</a>.
        </p>
        <button
          onClick={accept}
          className="bg-orange-600 hover:bg-orange-700 px-6 py-2 rounded font-medium whitespace-nowrap"
        >
          Accept cookies
        </button>
      </div>
    </div>
  );
}