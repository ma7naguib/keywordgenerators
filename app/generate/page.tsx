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
  keyword: string;
  length: 'short' | 'medium' | 'long';
  searchVolume: string;
  competition: 'low' | 'medium' | 'high';
  businessFitScore: number;
  keywordType: 'sales' | 'traffic' | 'authority';
  explanation: string;
}

function GeneratePageContent() {
  const searchParams = useSearchParams();
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState<KeywordResult[]>([]);
  const [filteredKeywords, setFilteredKeywords] = useState<KeywordResult[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [copiedText, setCopiedText] = useState<string>('');

  // Filters
  const [lengthFilter, setLengthFilter] = useState<string>('all');
  const [competitionFilter, setCompetitionFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('score');

  const platform = searchParams.get('platform');
  const goal = searchParams.get('goal');
  const strategy = searchParams.get('strategy');

  useEffect(() => {
    if (!platform || !goal || !strategy) {
      setNeedsOnboarding(true);
    }
  }, [platform, goal, strategy]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...keywords];

    if (lengthFilter !== 'all') {
      filtered = filtered.filter(kw => kw.length === lengthFilter);
    }

    if (competitionFilter !== 'all') {
      filtered = filtered.filter(kw => kw.competition === competitionFilter);
    }

    if (sortBy === 'score') {
      filtered.sort((a, b) => b.businessFitScore - a.businessFitScore);
    } else if (sortBy === 'volume') {
      filtered.sort((a, b) => {
        const parseVolume = (vol: string) => {
          const num = parseFloat(vol.replace(/[^\d.]/g, ''));
          return vol.includes('K') ? num * 1000 : num;
        };
        return parseVolume(b.searchVolume) - parseVolume(a.searchVolume);
      });
    } else if (sortBy === 'competition') {
      const compOrder = { low: 1, medium: 2, high: 3 };
      filtered.sort((a, b) => compOrder[a.competition] - compOrder[b.competition]);
    }

    setFilteredKeywords(filtered);
  }, [keywords, lengthFilter, competitionFilter, sortBy]);

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

      setKeywords(data.keywords || []);
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
    const headers = ['Keyword', 'Length', 'Search Volume', 'Competition', 'Score', 'Type', 'Explanation'];
    const rows = filteredKeywords.map(kw => [
      kw.keyword,
      kw.length,
      kw.searchVolume,
      kw.competition,
      kw.businessFitScore,
      kw.keywordType,
      kw.explanation
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
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

  const copyAllKeywords = () => {
    const text = filteredKeywords.map(kw => kw.keyword).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedText('all');
    setTimeout(() => setCopiedText(''), 2000);
  };

  const getLengthColor = (length: string) => {
    if (length === 'short') return 'bg-green-100 text-green-700';
    if (length === 'medium') return 'bg-blue-100 text-blue-700';
    return 'bg-purple-100 text-purple-700';
  };

  const getCompetitionColor = (competition: string) => {
    if (competition === 'low') return 'bg-green-500';
    if (competition === 'medium') return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getTypeIcon = (type: string) => {
    if (type === 'sales') return '📈';
    if (type === 'traffic') return '🚀';
    return '💼';
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
            {/* ✅ FREE TRIAL WARNING BANNER */}
            <SignedOut>
              {!keywords.length && !error && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-4">
                  <p className="text-sm font-medium text-gray-800">
                    🎁 <strong>Try it free:</strong> Get <strong>30 personalized keywords</strong>, no signup required!
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Want more? Create a free account after for additional keywords.
                  </p>
                </div>
              )}
            </SignedOut>

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
                  <span className="text-sm">🔍 Analyzing... 🎯 Personalizing...</span>
                </span>
              ) : (
                '🚀 Generate Personalized Keywords'
              )}
            </button>

            {/* ✅ IMPROVED ERROR WITH SOFT PAYWALL */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="font-semibold mb-2">⚠️ {error}</p>
                {(error.includes('Free trial used') || error.includes('Daily limit')) && (
                  <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                    <p className="text-gray-900 font-semibold mb-2">
                      💡 Want more keyword ideas?
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      Create a free account to unlock <strong>30 more keywords</strong> — or upgrade for unlimited access.
                    </p>
                    <div className="flex gap-2">
                      <SignedOut>
                        <SignInButton mode="modal">
                          <button className="flex-1 bg-green-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-700 font-semibold transition">
                            Get 30 More (Free) →
                          </button>
                        </SignInButton>
                      </SignedOut>
                      <Link href="/pricing" className="flex-1">
                        <button className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg hover:bg-indigo-700 font-semibold transition">
                          Go Pro (Unlimited)
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {keywords.length > 0 && (
            <div className="mt-8">
              {/* Header with Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h3 className="text-2xl font-bold">
                  {filteredKeywords.length} Keywords 🎉
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={copyAllKeywords}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition text-sm"
                  >
                    {copiedText === 'all' ? '✓ Copied!' : '📋 Copy All'}
                  </button>
                  <button
                    onClick={downloadCSV}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm"
                  >
                    📥 CSV
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Length</label>
                    <select
                      value={lengthFilter}
                      onChange={(e) => setLengthFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                    >
                      <option value="all">All</option>
                      <option value="short">Short</option>
                      <option value="medium">Medium</option>
                      <option value="long">Long</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Competition</label>
                    <select
                      value={competitionFilter}
                      onChange={(e) => setCompetitionFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                    >
                      <option value="all">All</option>
                      <option value="low">🟢 Low</option>
                      <option value="medium">🟡 Medium</option>
                      <option value="high">🔴 High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                    >
                      <option value="score">Score (High to Low)</option>
                      <option value="volume">Volume (High to Low)</option>
                      <option value="competition">Competition (Low to High)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Keywords List */}
              <div className="space-y-3">
                {filteredKeywords.map((kw, idx) => (
                  <div
                    key={idx}
                    className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-md transition cursor-pointer group"
                    onClick={() => copyKeyword(kw.keyword)}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-lg group-hover:text-indigo-600 transition">
                            {kw.keyword}
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${getLengthColor(kw.length)}`}>
                            {kw.length}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyKeyword(kw.keyword);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition text-indigo-600 hover:text-indigo-800 text-sm font-semibold"
                      >
                        {copiedText === kw.keyword ? '✓' : '📋'}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold mb-1">🎯</div>
                        <div className={`text-xl font-bold ${getScoreColor(kw.businessFitScore)}`}>
                          {kw.businessFitScore}
                        </div>
                        <div className="text-xs text-gray-600">Score</div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold mb-1">📊</div>
                        <div className="text-lg font-bold text-gray-900">
                          {kw.searchVolume}
                        </div>
                        <div className="text-xs text-gray-600">Volume</div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${getCompetitionColor(kw.competition)}`} />
                        <div className="text-lg font-bold capitalize text-gray-900">
                          {kw.competition}
                        </div>
                        <div className="text-xs text-gray-600">Competition</div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold mb-1">{getTypeIcon(kw.keywordType)}</div>
                        <div className="text-lg font-bold capitalize text-gray-900">
                          {kw.keywordType}
                        </div>
                        <div className="text-xs text-gray-600">Type</div>
                      </div>
                    </div>

                    <details className="mt-3">
                      <summary className="text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer font-semibold flex items-center gap-1">
                        💡 Why this works?
                      </summary>
                      <p className="mt-2 text-sm text-gray-700 pl-4 border-l-2 border-indigo-200">
                        {kw.explanation}
                      </p>
                    </details>
                  </div>
                ))}
              </div>

              {filteredKeywords.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-2">🔍</div>
                  <p>No keywords match your filters</p>
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
                        <strong>Free tier:</strong> You've used your free run.
                        <Link href="/pricing">
                          <span className="text-indigo-600 hover:underline ml-1 cursor-pointer font-semibold">
                            Upgrade to Pro
                          </span>
                        </Link> for unlimited keywords!
                      </>
                    )}
                  </p>
                </div>
              </SignedIn>

              <SignedOut>
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    💡 <strong>Sign up for free</strong> to get more personalized keywords!
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