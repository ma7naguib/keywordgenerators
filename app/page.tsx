import Link from 'next/link';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer">
              KeywordGenerators
            </h1>
          </Link>
          
          <div className="flex gap-4 items-center">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-gray-600 hover:text-gray-900 font-semibold transition">
                  Sign In
                </button>
              </SignInButton>
              <Link href="/onboarding">
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl">
                  Get Started
                </button>
              </Link>
            </SignedOut>
            
            <SignedIn>
              <Link href="/generate">
                <button className="text-gray-600 hover:text-gray-900 font-semibold transition">
                  Dashboard
                </button>
              </Link>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            AI-Powered Keyword Strategy
          </div>

          <h2 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Find Keywords That{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Fit YOUR Business
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get personalized keyword strategies tailored to your platform, goals, and competition level.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link href="/onboarding">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-xl text-lg font-bold hover:from-indigo-700 hover:to-purple-700 transition shadow-2xl hover:shadow-indigo-500/50 hover:scale-105 transform">
                🚀 Start Free Trial
              </button>
            </Link>
            <Link href="#how-it-works">
              <button className="bg-white text-gray-700 px-10 py-5 rounded-xl text-lg font-semibold hover:bg-gray-50 transition border-2 border-gray-200 hover:border-indigo-300">
                See How It Works
              </button>
            </Link>
          </div>
          
          <p className="text-sm text-gray-500">
            ✨ No credit card required • 🎁 1 free personalized strategy • ⚡ Results in 5 seconds
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg">
              🎯
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Personalized Strategy</h3>
            <p className="text-gray-600 leading-relaxed">
              Keywords tailored to YOUR platform, goals, and competition level. Not generic lists.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg">
              💎
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Business Fit Score</h3>
            <p className="text-gray-600 leading-relaxed">
              Each keyword rated 0-100 for YOUR specific business model. Know what works.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg">
              ⚡
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">One-Click Copy</h3>
            <p className="text-gray-600 leading-relaxed">
              Click any keyword to copy instantly. Export to CSV. Start ranking today.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div id="how-it-works" className="mt-32">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-4 text-gray-900">How It Works</h3>
            <p className="text-xl text-gray-600">Get personalized keywords in 3 simple steps</p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition border border-gray-100 h-full">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-3xl font-bold text-white">1</span>
                  </div>
                  <h4 className="font-bold text-2xl mb-3 text-gray-900">Answer 3 Questions</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Tell us your platform, goals, and strategy. Takes just 30 seconds.
                  </p>
                </div>
                {/* Connector Line */}
                <div className="hidden md:block absolute top-8 -right-4 w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              </div>
              
              {/* Step 2 */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition border border-gray-100 h-full">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-3xl font-bold text-white">2</span>
                  </div>
                  <h4 className="font-bold text-2xl mb-3 text-gray-900">AI Creates YOUR Strategy</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Get 30+ keywords personalized specifically for your business in seconds.
                  </p>
                </div>
                {/* Connector Line */}
                <div className="hidden md:block absolute top-8 -right-4 w-8 h-1 bg-gradient-to-r from-pink-500 to-red-500"></div>
              </div>
              
              {/* Step 3 */}
              <div>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition border border-gray-100 h-full">
                  <div className="bg-gradient-to-br from-pink-500 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-3xl font-bold text-white">3</span>
                  </div>
                  <h4 className="font-bold text-2xl mb-3 text-gray-900">Copy & Rank</h4>
                  <p className="text-gray-600 leading-relaxed">
                    One-click copy any keyword. Export to CSV. Start creating content today.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-32 bg-gradient-to-br from-white to-indigo-50 rounded-3xl shadow-2xl p-12 border border-indigo-100">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-4 text-gray-900">Simple Pricing</h3>
            <p className="text-xl text-gray-600">Start free. Upgrade when you're ready.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-indigo-300 transition hover:shadow-xl">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold mb-2 text-gray-900">Free</h4>
                <p className="text-5xl font-bold text-gray-900">$0</p>
                <p className="text-gray-500 mt-2">Perfect to try it out</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-2xl">✓</span>
                  <span className="text-gray-700">1 personalized strategy</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-2xl">✓</span>
                  <span className="text-gray-700">30 keywords</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-2xl">✓</span>
                  <span className="text-gray-700">Business Fit Scores</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="mr-3 text-2xl">✗</span>
                  <span>No export</span>
                </li>
              </ul>
              <Link href="/onboarding">
                <button className="w-full bg-gray-100 text-gray-800 py-4 rounded-xl font-bold hover:bg-gray-200 transition text-lg">
                  Get Started Free
                </button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 relative shadow-2xl transform hover:scale-105 transition">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                ⭐ Most Popular
              </div>
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold mb-2 text-white">Pro</h4>
                <p className="text-5xl font-bold text-white">$19</p>
                <p className="text-indigo-100 mt-2">per month</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <span className="text-yellow-300 mr-3 text-2xl">✓</span>
                  <span className="text-white font-semibold">Unlimited strategies</span>
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-300 mr-3 text-2xl">✓</span>
                  <span className="text-white font-semibold">50 keywords per search</span>
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-300 mr-3 text-2xl">✓</span>
                  <span className="text-white">Export to CSV</span>
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-300 mr-3 text-2xl">✓</span>
                  <span className="text-white">Full Business Fit breakdown</span>
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-300 mr-3 text-2xl">✓</span>
                  <span className="text-white">Priority support</span>
                </li>
              </ul>
              <Link href="/onboarding">
                <button className="w-full bg-white text-indigo-600 py-4 rounded-xl font-bold hover:bg-gray-50 transition text-lg shadow-lg">
                  Start Free Trial
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-32 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 KeywordGenerators.com • All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
