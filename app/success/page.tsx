'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

export default function SuccessPage() {
  useEffect(() => {
    // Confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="group">
            <img
              src="/logo.svg"
              alt="KeywordGenerators - AI-Powered Keyword Research"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
            🎉 Welcome to Pro!
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Your subscription is now active. You have unlimited access to all Pro features!
          </p>

          {/* Features List */}
          <div className="bg-indigo-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-bold text-lg mb-4 text-indigo-900">What you get with Pro:</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">Unlimited keyword searches</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">50 keywords per search</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">Export to CSV</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">Full Business Fit breakdown</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">Priority support</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/generate" className="flex-1">
              <button className="w-full bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg">
                Start Generating Keywords 🚀
              </button>
            </Link>
            <Link href="/" className="flex-1">
              <button className="w-full bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition border-2 border-gray-200">
                Back to Home
              </button>
            </Link>
          </div>
        </div>

        {/* Support */}
        <p className="text-center text-gray-500 mt-8 text-sm">
          Need help? Contact us via the chat widget or email support@keywordgenerators.com
        </p>
      </div>
    </div>
  );
}