'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Platform = 'google-seo' | 'amazon-products' | 'youtube-content' | 'etsy-digital' | 'social-media' | 'app-store' | 'not-sure';
type Goal = 'sell-products' | 'sell-digital' | 'affiliate' | 'ads-revenue' | 'services' | 'exploring';
type Strategy = 'easy-wins' | 'moderate' | 'hard-mode' | 'auto';

const platformOptions = [
  { value: 'google-seo', icon: '🔍', label: 'Google / SEO', desc: 'Blogs & Websites' },
  { value: 'amazon-products', icon: '📦', label: 'Amazon Products', desc: 'E-commerce & FBA' },
  { value: 'youtube-content', icon: '🎥', label: 'YouTube', desc: 'Video Content' },
  { value: 'etsy-digital', icon: '🎨', label: 'Etsy', desc: 'Digital Products' },
  { value: 'social-media', icon: '📱', label: 'TikTok / Instagram', desc: 'Social Media' },
  { value: 'app-store', icon: '📲', label: 'App Store', desc: 'Mobile Apps' },
  { value: 'not-sure', icon: '🤷', label: "I'm not sure yet", desc: 'Show me options' },
];

const goalOptions = [
  { value: 'sell-products', icon: '🛒', label: 'Selling products', desc: 'Physical goods' },
  { value: 'sell-digital', icon: '💾', label: 'Selling digital products', desc: 'eBooks, courses, templates' },
  { value: 'affiliate', icon: '💰', label: 'Affiliate marketing', desc: 'Earn commissions' },
  { value: 'ads-revenue', icon: '📈', label: 'Ads revenue', desc: 'Blog or YouTube ads' },
  { value: 'services', icon: '🧑‍💼', label: 'Selling services', desc: 'Consulting, freelancing' },
  { value: 'exploring', icon: '🔎', label: 'Just exploring', desc: "I'm researching options" },
];

const strategyOptions = [
  { value: 'easy-wins', icon: '🟢', label: 'Easy wins', desc: 'Low competition, easier to rank' },
  { value: 'moderate', icon: '🟡', label: 'Balanced approach', desc: 'Mix of opportunity and volume' },
  { value: 'hard-mode', icon: '🔴', label: 'High volume', desc: 'More competitive, high traffic' },
  { value: 'auto', icon: '✨', label: 'Let AI decide', desc: 'Optimize for best results' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [strategy, setStrategy] = useState<Strategy | null>(null);

  const handlePlatformSelect = (value: Platform) => {
    setPlatform(value);
    setTimeout(() => setStep(2), 300);
  };

  const handleGoalSelect = (value: Goal) => {
    setGoal(value);
    setTimeout(() => setStep(3), 300);
  };

  const handleStrategySelect = (value: Strategy) => {
    setStrategy(value);
    setTimeout(() => {
      const params = new URLSearchParams({
        platform: platform!,
        goal: goal!,
        strategy: value,
      });
      router.push(`/generate?${params.toString()}`);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
          <Link href="/">
            <h1 className="text-2xl sm:text-3xl font-bold text-indigo-600 cursor-pointer">
              KeywordGenerators
            </h1>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Progress Bar */}
          <div className="mb-6 sm:mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-600">
                Step {step} of 3
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((step / 3) * 100)}% complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Question 1: Platform */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  Where do you want to get traffic?
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Choose your primary platform to optimize keywords accordingly
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {platformOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handlePlatformSelect(option.value as Platform)}
                    className={`p-4 sm:p-6 rounded-xl border-2 text-left transition ${
                      platform === option.value
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <span className="text-2xl sm:text-3xl">{option.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-base sm:text-lg mb-1">{option.label}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{option.desc}</p>
                      </div>
                      {platform === option.value && (
                        <span className="text-indigo-600 text-lg sm:text-xl">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 2: Goal */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  How will you make money?
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  This helps us find keywords with the right intent
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {goalOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleGoalSelect(option.value as Goal)}
                    className={`p-4 sm:p-6 rounded-xl border-2 text-left transition ${
                      goal === option.value
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <span className="text-2xl sm:text-3xl">{option.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-base sm:text-lg mb-1">{option.label}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{option.desc}</p>
                      </div>
                      {goal === option.value && (
                        <span className="text-indigo-600 text-lg sm:text-xl">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 3: Strategy */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  What's your keyword strategy?
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Choose based on your competition tolerance
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {strategyOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleStrategySelect(option.value as Strategy)}
                    className={`p-4 sm:p-6 rounded-xl border-2 text-left transition ${
                      strategy === option.value
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <span className="text-2xl sm:text-3xl">{option.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-base sm:text-lg mb-1">{option.label}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{option.desc}</p>
                      </div>
                      {strategy === option.value && (
                        <span className="text-indigo-600 text-lg sm:text-xl">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 sm:px-6 py-2 sm:py-3 text-gray-600 hover:text-gray-900 font-semibold text-sm sm:text-base"
              >
                ← Back
              </button>
            ) : (
              <Link href="/" className="px-4 sm:px-6 py-2 sm:py-3 text-gray-600 hover:text-gray-900 font-semibold text-sm sm:text-base">
                ← Home
              </Link>
            )}

            <span className="text-xs sm:text-sm text-gray-500">
              Select an option to continue
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}