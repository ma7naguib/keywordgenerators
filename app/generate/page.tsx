'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

interface KeywordResult {
  text: string;
  businessFitScore: number;
  type: string;
  competition: string;
  volumeEstimate: number;
  volumeLabel: string;
  moneyLabel: string;
  reasoning: string;
}

interface GroupedKeywords {
  buying: KeywordResult[];
  question: KeywordResult[];
  comparison: KeywordResult[];
  informational: KeywordResult[];
}

function GeneratePageContent() {
  const searchParams = useSearchParams();
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState<KeywordResult[]>([]);
  const [grouped, setGrouped] = useState<GroupedKeywords | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [copiedText, setCopiedText] = useState<string>('');

  const platform = searchParams.get('platform');
  const goal = searchParams.get('goal');
  const strategy = searchParams.get('strategy');

  useEffect(() => {
    if (!platform || !goal || !strategy) {
      setNeedsOnboarding(true);
    }
  }, [platform, goal, strategy]);

  const generateKeywords = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    if (!platform || !goal || !strategy) {
      setError('Please complete the onboarding first');
      return;
    }

    // Check localStorage for anonymous users
    if (typeof window !== 'undefined') {
      const hasUsedFreeTrial = localStorage.getItem('freeTrialUsed');

      if (hasUsedFreeTrial === 'true') {
        setError('Free trial used! Sign up to continue or upgrade to Pro for unlimited searches.');
        return;
      }
    }

    setLoading(true);
    setError('');
    setKeywords([]);
    setGrouped(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, platform, goal, strategy }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate keywords');
      }

      setKeywords(data.keywords);
      setGrouped(data.grouped);
      setUserProfile(data.userProfile);
      setRemaining(data.remaining);
      setIsPro(data.isPro);

      // Mark free trial as used for anonymous users
      if (typeof window !== 'undefined' && !data.isPro) {
        localStorage.setItem('freeTrialUsed', 'true');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    const csv = keywords.map(k => k.text).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `keywords-${topic.replace(/\s+/g, '-')}.csv`;
    a.click();
  };

  const copyKeyword = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const copyCategory = (categoryKeywords: KeywordResult[], categoryName: string) => {
    const text = categoryKeywords.map(k => k.text).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedText(categoryName);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const copyAllKeywords = () => {
    const text = keywords.map(k => k.text).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedText('all');
    setTimeout(() => setCopiedText(''), 2000);
  };

  const formatVolume = (vol: number): string => {
    if (vol >= 1000) return `~${(vol / 1000).toFixed(1)}K`;
    return `~${vol}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
            <Link href="/">
              <button className="text-gray-600 hover:text-gray-900">Home</button>
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

      <main className="max-w-6xl mx-auto px-4 py-12">
        {needsOnboarding && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold mb-2">🎯 Get Personalized Keywords</h3>
            <p className="text-gray-700 mb-4">
              Answer 3 quick questions to get keywords tailored to YOUR business model.
            </p>
            <Link href="/onboarding">
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700">
                Start Personalization (30 seconds)
              </button>
            </Link>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {userProfile && (
            <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
              <p className="text-sm text-indigo-800">
                <strong>Your Strategy:</strong> {userProfile.platform} • {userProfile.goal} • {userProfile.strategy}
                {userProfile.level && ` • ${userProfile.level} level`}
                <Link href="/onboarding" className="ml-2 text-indigo-600 hover:underline text-sm">
                  Change
                </Link>
              </p>
            </div>
          )}

          <h2 className="text-3xl font-bold mb-2">Generate Keywords</h2>
          <p className="text-gray-600 mb-8">
            Enter your topic and get personalized keyword strategies
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Enter Your Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && generateKeywords()}
                placeholder="e.g., organic dog food, fitness planner, SEO tips..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none text-lg"
                disabled={loading}
              />
            </div>

            <button
              onClick={generateKeywords}
              disabled={loading || !topic.trim()}
              className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              {loading ? (
                <span className="flex flex-col items-center justify-center gap-1">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="text-sm">🔍 Analyzing... 🎯 Finding opportunities... ✨ Personalizing...</span>
                </span>
              ) : (
                '🚀 Generate Personalized Keywords'
              )}
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                ⚠️ {error}
                {(error.includes('Free trial used') || error.includes('Daily limit')) && (
                  <div className="mt-3 flex gap-2">
                    <SignedOut>
                      <SignInButton mode="modal">
                        <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold">
                          Sign Up (Free)
                        </button>
                      </SignInButton>
                    </SignedOut>
                    <Link href="/pricing" className="flex-1">
                      <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 font-semibold">
                        Upgrade to Pro
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {keywords.length > 0 && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">
                  Generated {keywords.length} Keywords 🎉
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={copyAllKeywords}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition"
                  >
                    {copiedText === 'all' ? '✓ Copied!' : '📋 Copy All'}
                  </button>
                  <button
                    onClick={downloadCSV}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    📥 Download CSV
                  </button>
                </div>
              </div>

              {grouped && (
                <div className="space-y-6">
                  {/* Main Keywords */}
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-300 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="text-2xl font-bold mb-1 flex items-center gap-2">
                          🎯 Main Keywords ({grouped.buying.length + grouped.comparison.length + grouped.informational.length})
                        </h4>
                        <p className="text-sm text-gray-600">Commercial, buying intent & informational keywords</p>
                      </div>
                      <button
                        onClick={() => copyCategory([...grouped.buying, ...grouped.comparison, ...grouped.informational], 'main')}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 text-sm transition"
                      >
                        {copiedText === 'main' ? '✓ Copied!' : '📋 Copy All'}
                      </button>
                    </div>

                    <div className="space-y-2">
                      {[...grouped.buying, ...grouped.comparison, ...grouped.informational].map((kw, idx) => (
                        <div
                          key={idx}
                          onClick={() => copyKeyword(kw.text)}
                          className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer group"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-bold text-base group-hover:text-indigo-600 transition">
                                  {kw.text}
                                </span>
                                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded">
                                  💎 {kw.businessFitScore}
                                </span>
                                <span className={`w-3 h-3 rounded-full ${kw.competition === 'low' ? 'bg-green-500' :
                                  kw.competition === 'medium' ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`} title={`${kw.competition} competition`} />
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                <span className="font-medium">{formatVolume(kw.volumeEstimate)} searches/mo</span>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${kw.competition === 'low' ? 'bg-green-100 text-green-700' :
                                  kw.competition === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                                  }`}>
                                  {kw.competition} competition
                                </span>
                                <span className="text-xs">{kw.moneyLabel}</span>
                              </div>
                              <p className="text-sm text-gray-700">💡 {kw.reasoning}</p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyKeyword(kw.text);
                              }}
                              className="opacity-0 group-hover:opacity-100 transition text-indigo-600 hover:text-indigo-800 text-sm font-semibold"
                            >
                              {copiedText === kw.text ? '✓ Copied!' : 'Copy'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Questions */}
                  {grouped.question.length > 0 && (
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h4 className="text-2xl font-bold mb-1 flex items-center gap-2">
                            ❓ Question Keywords ({grouped.question.length})
                          </h4>
                          <p className="text-sm text-gray-600">Perfect for content marketing & SEO</p>
                        </div>
                        <button
                          onClick={() => copyCategory(grouped.question, 'questions')}
                          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 text-sm transition"
                        >
                          {copiedText === 'questions' ? '✓ Copied!' : '📋 Copy All'}
                        </button>
                      </div>

                      <div className="space-y-2">
                        {grouped.question.map((kw, idx) => (
                          <div
                            key={idx}
                            onClick={() => copyKeyword(kw.text)}
                            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer group"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-bold text-base group-hover:text-indigo-600 transition">
                                    {kw.text}
                                  </span>
                                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded">
                                    💎 {kw.businessFitScore}
                                  </span>
                                  <span className={`w-3 h-3 rounded-full ${kw.competition === 'low' ? 'bg-green-500' :
                                    kw.competition === 'medium' ? 'bg-yellow-500' :
                                      'bg-red-500'
                                    }`} title={`${kw.competition} competition`} />
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                  <span className="font-medium">{formatVolume(kw.volumeEstimate)} searches/mo</span>
                                  <span className={`px-2 py-1 rounded text-xs font-semibold ${kw.competition === 'low' ? 'bg-green-100 text-green-700' :
                                    kw.competition === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                      'bg-red-100 text-red-700'
                                    }`}>
                                    {kw.competition} competition
                                  </span>
                                  <span className="text-xs">{kw.moneyLabel}</span>
                                </div>
                                <p className="text-sm text-gray-700">💡 {kw.reasoning}</p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyKeyword(kw.text);
                                }}
                                className="opacity-0 group-hover:opacity-100 transition text-indigo-600 hover:text-indigo-800 text-sm font-semibold"
                              >
                                {copiedText === kw.text ? '✓ Copied!' : 'Copy'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Upgrade Prompts */}
              <SignedIn>
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    💡 {isPro ? (
                      <strong>Pro Plan: Unlimited personalized keyword runs!</strong>
                    ) : (
                      <>
                        <strong>Free tier:</strong> You've used your free personalized strategy run.
                        <Link href="/pricing">
                          <span className="text-indigo-600 hover:underline ml-1 cursor-pointer font-semibold">
                            Upgrade to Pro
                          </span>
                        </Link> for unlimited runs + 50 keywords per search!
                      </>
                    )}
                  </p>
                </div>
              </SignedIn>

              <SignedOut>
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    💡 <strong>Sign up for free</strong> to get your personalized keyword strategy!
                    <SignInButton mode="modal">
                      <span className="text-indigo-600 hover:underline ml-1 cursor-pointer font-semibold">
                        Sign Up Now (Free)
                      </span>
                    </SignInButton>
                  </p>
                </div>
              </SignedOut>
            </div>
          )}

          {!loading && keywords.length === 0 && !error && (
            <div className="mt-12 text-center text-gray-400">
              <div className="text-6xl mb-4">🔍</div>
              <p>Enter a topic above to generate personalized keywords</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-semibold">Loading...</p>
        </div>
      </div>
    }>
      <GeneratePageContent />
    </Suspense>
  );
}