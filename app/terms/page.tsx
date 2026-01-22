import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | KeywordGenerators',
  description: 'Terms of Service for KeywordGenerators.com - AI-powered keyword research tool.',
};

export default function TermsPage() {
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
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last updated: January 2026</p>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using KeywordGenerators.com ("Service"), you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Description of Service</h2>
              <p>
                KeywordGenerators provides an AI-powered keyword research tool that generates personalized keyword 
                strategies based on your platform, goals, and competition preferences. Our Service includes both 
                free and paid subscription tiers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. User Accounts</h2>
              <p>
                To access certain features, you may need to create an account. You are responsible for maintaining 
                the confidentiality of your account credentials and for all activities under your account. You agree 
                to provide accurate and complete information when creating your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Subscription & Payments</h2>
              <p>
                Pro subscriptions are billed monthly at $19/month. By subscribing, you authorize us to charge your 
                payment method on a recurring basis. You can cancel your subscription at any time through your account 
                settings. Cancellation takes effect at the end of the current billing period.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Attempt to reverse engineer or exploit the Service</li>
                <li>Use automated systems to access the Service without permission</li>
                <li>Share your account credentials with third parties</li>
                <li>Resell or redistribute keyword data without authorization</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Intellectual Property</h2>
              <p>
                The Service, including its original content, features, and functionality, is owned by KeywordGenerators 
                and is protected by international copyright, trademark, and other intellectual property laws. Keywords 
                generated for your use are yours to use for your business purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">7. Disclaimer of Warranties</h2>
              <p>
                The Service is provided "as is" without warranties of any kind, either express or implied. We do not 
                guarantee that keywords generated will result in specific rankings or business outcomes. Keyword 
                performance depends on many factors outside our control.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">8. Limitation of Liability</h2>
              <p>
                In no event shall KeywordGenerators be liable for any indirect, incidental, special, consequential, 
                or punitive damages arising out of or relating to your use of the Service. Our total liability shall 
                not exceed the amount you paid us in the past 12 months.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of significant changes 
                via email or through the Service. Continued use of the Service after changes constitutes acceptance 
                of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at{' '}
                <a href="mailto:support@keywordgenerators.com" className="text-indigo-600 hover:underline">
                  support@keywordgenerators.com
                </a>
              </p>
            </section>
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