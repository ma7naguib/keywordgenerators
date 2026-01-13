'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function SuccessPage() {
  useEffect(() => {
    // Celebrate! 🎉
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold mb-4">Welcome to Pro!</h1>
        <p className="text-gray-600 mb-8">
          Your payment was successful. You now have unlimited access to all Pro features!
        </p>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <p className="text-green-800 font-semibold mb-2">What's included:</p>
          <ul className="text-sm text-green-700 space-y-1">
            <li>✓ Unlimited searches</li>
            <li>✓ 50+ keywords per search</li>
            <li>✓ Priority support</li>
            <li>✓ Advanced features</li>
          </ul>
        </div>

        <Link href="/generate">
          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Start Generating Keywords
          </button>
        </Link>

        <p className="text-sm text-gray-500 mt-4">
          You can manage your subscription in your account settings.
        </p>
      </div>
    </div>
  );
}