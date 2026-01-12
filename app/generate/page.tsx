'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GeneratePage() {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateKeywords = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');
    setKeywords([]);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate keywords');
      }

      setKeywords(data.keywords);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    const csv = keywords.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `keywords-${topic.replace(/\s+/g, '-')}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-3xl font-bold text-indigo-600 cursor-pointer">
              KeywordGenerators
            </h1>
          </Link>
          <div className="flex gap-4">
            <Link href="/">
              <button className="text-gray-600 hover:text-gray-900">
                Home
              </button>
            </Link>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-2">Generate Keywords</h2>
          <p className="text-gray-600 mb-8">
            Enter any topic and our AI will generate dozens of keyword ideas
          </p>

          {/* Input Form */}
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
                placeholder="e.g., fitness for beginners, keto recipes, yoga..."
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
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Generating...
                </span>
              ) : (
                '🚀 Generate Keywords'
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                ⚠️ {error}
              </div>
            )}
          </div>

          {/* Results */}
          {keywords.length > 0 && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  Generated {keywords.length} Keywords 🎉
                </h3>
                <button
                  onClick={downloadCSV}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  📥 Download CSV
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
                <ul className="space-y-2">
                  {keywords.map((keyword, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition"
                    >
                      <span className="text-indigo-600 font-bold">
                        {index + 1}.
                      </span>
                      <span className="text-gray-800">{keyword}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Upgrade Prompt for Free Users */}
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  💡 <strong>Free tier:</strong> Limited to 10 keywords per search, 5 searches/day.
                  <Link href="/pricing">
                    <span className="text-indigo-600 hover:underline ml-1 cursor-pointer">
                      Upgrade to Pro
                    </span>
                  </Link> for unlimited searches and 50+ keywords!
                </p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && keywords.length === 0 && !error && (
            <div className="mt-12 text-center text-gray-400">
              <div className="text-6xl mb-4">🔍</div>
              <p>Enter a topic above to generate keywords</p>
            </div>
          )}
        </div>

        {/* Example Topics */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
          <h4 className="font-bold mb-3">💡 Try these example topics:</h4>
          <div className="flex flex-wrap gap-2">
            {[
              'fitness for beginners',
              'healthy breakfast recipes',
              'digital marketing tips',
              'home workout routines',
              'productivity apps',
            ].map((example) => (
              <button
                key={example}
                onClick={() => setTopic(example)}
                className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition text-sm"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}