import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | KeywordGenerators',
  description: 'Privacy Policy for KeywordGenerators.com - How we collect, use, and protect your data.',
};

export default function PrivacyPage() {
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
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: January 2026</p>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
              <p>
                KeywordGenerators.com ("we", "our", or "us") respects your privacy and is committed to protecting 
                your personal data. This Privacy Policy explains how we collect, use, and safeguard your information 
                when you use our AI-powered keyword research service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>
              <p>We collect the following types of information:</p>
              
              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Account Information</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Email address</li>
                <li>Name (if provided)</li>
                <li>Profile picture (if using social login)</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Usage Data</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Keywords and topics you search for</li>
                <li>Platform and goal preferences</li>
                <li>Feature usage patterns</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Payment Information</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Payment details are processed securely by Stripe</li>
                <li>We do not store your full credit card number</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Technical Data</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Provide and improve our keyword generation service</li>
                <li>Process your subscription payments</li>
                <li>Send important service updates and notifications</li>
                <li>Respond to your support inquiries</li>
                <li>Analyze usage patterns to improve our AI algorithms</li>
                <li>Prevent fraud and abuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Data Sharing</h2>
              <p>We share your data only with:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Clerk</strong> - For authentication and user management</li>
                <li><strong>Stripe</strong> - For payment processing</li>
                <li><strong>Vercel</strong> - For hosting and analytics</li>
                <li><strong>Groq</strong> - For AI-powered keyword generation (anonymized queries)</li>
              </ul>
              <p className="mt-4">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Cookies</h2>
              <p>
                We use essential cookies to maintain your session and preferences. We also use analytics cookies 
                to understand how visitors interact with our website. You can control cookie settings through 
                your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your data, including:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>SSL/TLS encryption for all data transfers</li>
                <li>Secure authentication through Clerk</li>
                <li>Regular security audits</li>
                <li>Limited employee access to personal data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">7. Data Retention</h2>
              <p>
                We retain your account data for as long as your account is active. If you delete your account, 
                we will remove your personal data within 30 days, except where we are required to retain it 
                for legal or business purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">8. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
                <li>Opt out of marketing communications</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at{' '}
                <a href="mailto:support@keywordgenerators.com" className="text-indigo-600 hover:underline">
                  support@keywordgenerators.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">9. Children's Privacy</h2>
              <p>
                Our Service is not intended for children under 13 years of age. We do not knowingly collect 
                personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by 
                posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">11. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at{' '}
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