'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="group">
            <img
              src="/logo.svg"
              alt="KeywordGenerators - AI-Powered Keyword Research"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>
          <div className="flex gap-4 items-center">
            <Link href="/generate">
              <button className="text-gray-600 hover:text-gray-900">
                Dashboard
              </button>
            </Link>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Pricing */}
      <main className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Simple Pricing</h2>
          <p className="text-xl text-gray-600">
            Choose the plan that fits your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <p className="text-4xl font-bold mb-6">
              $0<span className="text-lg text-gray-500">/month</span>
            </p>
            <p className="text-sm text-gray-500 mb-6">Perfect to try it out</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <span>1 personalized strategy</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <span>30 keywords</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <span>Business Fit Scores</span>
              </li>
              <li className="flex items-center text-gray-400">
                <span className="mr-3 text-xl">✗</span>
                <span>No export</span>
              </li>
            </ul>
            <Link href="/onboarding">
              <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                Get Started Free
              </button>
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-indigo-600 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-6 py-1 rounded-full text-sm font-semibold">
              ⭐ Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <p className="text-4xl font-bold mb-6">
              $19<span className="text-lg text-gray-500">/month</span>
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <span className="font-semibold">Unlimited strategies</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <span className="font-semibold">50 keywords per search</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <span>Export to CSV</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <span>Full Business Fit breakdown</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <span>Priority support</span>
              </li>
            </ul>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                  Start Free Trial
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400"
              >
                {loading ? 'Loading...' : 'Upgrade to Pro'}
              </button>
            </SignedIn>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="font-bold mb-2">Can I cancel anytime?</h4>
              <p className="text-gray-600">
                Yes! You can cancel your subscription at any time. No questions asked.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="font-bold mb-2">What happens if I'm not satisfied?</h4>
              <p className="text-gray-600">
                If something isn't working as expected, just contact us and we'll do our best to fix it quickly. We care about long-term users, not one-time payments.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="font-bold mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-600">
                We accept all major credit cards via Stripe's secure payment system.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-20 py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 KeywordGenerators.com • All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
