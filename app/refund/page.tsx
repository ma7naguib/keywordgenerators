import Link from 'next/link';

export const metadata = {
  title: 'Refund Policy | KeywordGenerators',
  description: 'Refund Policy for KeywordGenerators.com - Our commitment to customer satisfaction.',
};

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 flex justify-between items-center">
          <Link href="/" className="group">
            <img
              src="/logo.svg"
              alt="KeywordGenerators"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>
          <Link href="/">
            <button className="text-gray-600 hover:text-gray-900 font-semibold transition text-sm">
              ← Back to Home
            </button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 md:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Refund Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: January 2026</p>

          {/* Highlight Box */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="text-3xl">💯</div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">14-Day Money-Back Guarantee</h3>
                <p className="text-gray-700">
                  We're confident you'll love KeywordGenerators. If you're not satisfied within the first 14 days 
                  of your Pro subscription, we'll give you a full refund — no questions asked.
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Eligibility for Refund</h2>
              <p>You are eligible for a full refund if:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>You request a refund within 14 days of your first Pro subscription payment</li>
                <li>You haven't previously received a refund for KeywordGenerators</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. How to Request a Refund</h2>
              <p>To request a refund:</p>
              <ol className="list-decimal pl-6 mt-2 space-y-2">
                <li>
                  Email us at{' '}
                  <a href="mailto:support@keywordgenerators.com" className="text-indigo-600 hover:underline">
                    support@keywordgenerators.com
                  </a>
                </li>
                <li>Include the email address associated with your account</li>
                <li>Briefly mention why you're requesting a refund (optional, but helps us improve)</li>
              </ol>
              <p className="mt-4">
                We'll process your refund within 5-10 business days. The refund will be credited to your 
                original payment method.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. After 14 Days</h2>
              <p>
                After the 14-day period, we do not offer refunds. However, you can cancel your subscription 
                at any time to prevent future charges. Your Pro access will continue until the end of your 
                current billing period.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. How to Cancel Your Subscription</h2>
              <p>You can cancel your subscription at any time:</p>
              <ol className="list-decimal pl-6 mt-2 space-y-2">
                <li>Sign in to your KeywordGenerators account</li>
                <li>Go to Pricing page or click "Manage Subscription"</li>
                <li>Click "Cancel Subscription" in the billing portal</li>
              </ol>
              <p className="mt-4">
                Once cancelled, you'll retain Pro access until the end of your billing cycle. After that, 
                your account will revert to the Free plan.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Exceptions</h2>
              <p>Refunds will not be granted in cases of:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Violation of our Terms of Service</li>
                <li>Abuse of the refund policy (e.g., multiple refund requests)</li>
                <li>Chargebacks filed without first contacting us</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Technical Issues</h2>
              <p>
                If you're experiencing technical issues with the service, please contact us first. We're 
                committed to resolving any problems and ensuring you get value from KeywordGenerators. 
                In cases of persistent technical issues that we cannot resolve, we may offer refunds or 
                credits at our discretion, even outside the 14-day window.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">7. Contact Us</h2>
              <p>
                Have questions about refunds or need assistance? Contact us at{' '}
                <a href="mailto:support@keywordgenerators.com" className="text-indigo-600 hover:underline">
                  support@keywordgenerators.com
                </a>
              </p>
              <p className="mt-4">
                We typically respond within 24 hours on business days.
              </p>
            </section>
          </div>

          {/* CTA Box */}
          <div className="bg-gray-50 rounded-xl p-6 mt-10 text-center">
            <h3 className="font-bold text-gray-900 text-lg mb-2">Ready to try KeywordGenerators?</h3>
            <p className="text-gray-600 mb-4">Start with a free trial. No credit card required.</p>
            <Link href="/onboarding">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg">
                🚀 Start Free Trial
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <img src="/logo.svg" alt="KeywordGenerators" className="h-10 mb-4 brightness-0 invert" />
              <p className="text-sm">AI-powered keyword research for smarter SEO strategies.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/generate" className="hover:text-white transition">Generate Keywords</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                <li><Link href="/refund" className="hover:text-white transition">Refund Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:support@keywordgenerators.com" className="hover:text-white transition">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© 2026 KeywordGenerators.com. All rights reserved.</p>
            <p className="mt-2">Made with ❤️ for SEO enthusiasts</p>
          </div>
        </div>
      </footer>
    </div>
  );
}