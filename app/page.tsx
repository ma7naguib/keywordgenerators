import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/">
            <h1 className="text-3xl font-bold text-indigo-600 cursor-pointer">
              KeywordGenerators
            </h1>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
            Find Perfect Keywords with AI
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Generate hundreds of keyword ideas in seconds. 
            Perfect for bloggers, YouTubers, and content creators.
          </p>
          
          {/* CTA Button */}
          <Link href="/generate">
            <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition">
              Start Free Trial
            </button>
          </Link>
          
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • 5 free searches daily
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-3">Instant Ideas</h3>
            <p className="text-gray-600">
              Generate 50+ keyword variations from any topic in seconds
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-3">AI-Powered</h3>
            <p className="text-gray-600">
              Advanced AI analyzes trends and suggests best keywords
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-3">Export Ready</h3>
            <p className="text-gray-600">
              Download your keywords as CSV for easy use
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">1</span>
              </div>
              <h4 className="font-bold mb-2">Enter Your Topic</h4>
              <p className="text-gray-600">Type any keyword or niche you want to explore</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">2</span>
              </div>
              <h4 className="font-bold mb-2">AI Generates Ideas</h4>
              <p className="text-gray-600">Our AI creates dozens of relevant keyword variations</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">3</span>
              </div>
              <h4 className="font-bold mb-2">Download & Use</h4>
              <p className="text-gray-600">Export your keywords and start creating content</p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-12 max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            Simple Pricing
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="border-2 border-gray-200 rounded-xl p-8 hover:border-indigo-300 transition">
              <h4 className="text-2xl font-bold mb-2">Free</h4>
              <p className="text-4xl font-bold mb-6">$0</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2 text-xl">✓</span>
                  5 searches per day
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2 text-xl">✓</span>
                  10 keywords per search
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="mr-2 text-xl">✗</span>
                  No export
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="mr-2 text-xl">✗</span>
                  No difficulty analysis
                </li>
              </ul>
              <Link href="/generate">
                <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                  Get Started Free
                </button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-indigo-600 rounded-xl p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h4 className="text-2xl font-bold mb-2">Pro</h4>
              <p className="text-4xl font-bold mb-6">
                $12<span className="text-lg text-gray-500">/month</span>
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2 text-xl">✓</span>
                  Unlimited searches
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2 text-xl">✓</span>
                  50 keywords per search
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2 text-xl">✓</span>
                  Export to CSV/Excel
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2 text-xl">✓</span>
                  Difficulty analysis
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2 text-xl">✓</span>
                  Priority support
                </li>
              </ul>
              <Link href="/generate">
                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                  Start Free Trial
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-20 py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>© 2026 KeywordGenerators.com - Built with AI</p>
        </div>
      </footer>
    </div>
  );
}