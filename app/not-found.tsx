import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="text-center">
        {/* Logo */}
        <Link href="/" className="inline-block mb-8">
          <img
            src="/logo.svg"
            alt="KeywordGenerators"
            className="h-12 sm:h-16 mx-auto"
          />
        </Link>

        {/* 404 */}
        <div className="relative">
          <h1 className="text-[120px] sm:text-[180px] font-extrabold text-gray-200 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl sm:text-8xl">🔍</div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4 mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Oops! Looks like this keyword doesn't exist. Let's get you back to finding the perfect keywords for your business.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl">
              🏠 Back to Home
            </button>
          </Link>
          <Link href="/generate">
            <button className="bg-white text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition border-2 border-gray-200 hover:border-indigo-300">
              🚀 Generate Keywords
            </button>
          </Link>
        </div>

        {/* Fun suggestions */}
        <div className="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-2xl max-w-md mx-auto border border-gray-100">
          <p className="text-sm text-gray-500 mb-3">Maybe you were looking for:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Keyword Research', 'SEO Strategy', 'Business Growth', 'Content Ideas'].map((tag) => (
              <Link 
                key={tag} 
                href="/onboarding"
                className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm hover:bg-indigo-100 transition"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}