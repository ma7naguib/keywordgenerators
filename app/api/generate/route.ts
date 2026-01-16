import Groq from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { checkUsageLimit, incrementUsage } from '../../../lib/usage';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'dummy-key-for-build',
});

// Platform configs
const platformConfigs = {
  'etsy-products': {
    distribution: { short: 70, medium: 20, long: 10 },
    maxLength: { short: 20, medium: 30, long: 50 },
    focus: 'Etsy product tags under 20 chars. Material, style, occasion.',
    examples: 'boho wall art, rustic wood sign, personalized gift, vintage ring',
    bestFor: 'marketplace'
  },
  'amazon-products': {
    distribution: { short: 20, medium: 60, long: 20 },
    maxLength: { short: 20, medium: 40, long: 60 },
    focus: 'Amazon product listings. Feature + benefit keywords.',
    examples: 'wireless headphones bluetooth, yoga mat non-slip, laptop stand adjustable',
    bestFor: 'sales'
  },
  'youtube-content': {
    distribution: { short: 20, medium: 30, long: 50 },
    maxLength: { short: 20, medium: 40, long: 80 },
    focus: 'YouTube video titles and descriptions. How-to and tutorials.',
    examples: 'how to make money online, easy workout routine, best camera for beginners',
    bestFor: 'video'
  },
  'blog-content': {
    distribution: { short: 10, medium: 30, long: 60 },
    maxLength: { short: 20, medium: 40, long: 100 },
    focus: 'Blog articles and SEO content. Long-tail informational.',
    examples: 'how to start a blog in 2025, content marketing strategy guide, best tools for',
    bestFor: 'content'
  },
  'google-seo': {
    distribution: { short: 30, medium: 40, long: 30 },
    maxLength: { short: 20, medium: 40, long: 80 },
    focus: 'General SEO keywords for websites and landing pages.',
    examples: 'digital marketing services, web design agency, SEO consultant',
    bestFor: 'content'
  },
  'default': {
    distribution: { short: 30, medium: 40, long: 30 },
    maxLength: { short: 20, medium: 40, long: 80 },
    focus: 'Balanced keyword strategy.',
    examples: 'your topic keywords',
    bestFor: 'content'
  }
};

const bestForLabels = {
  'sales': '🛒 Sales',
  'content': '✍️ Content',
  'video': '🎥 Video',
  'marketplace': '🏷️ Marketplace'
};

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    const usage = await checkUsageLimit();

    if (!usage.allowed) {
      return NextResponse.json(
        { 
          error: 'Daily limit reached! Sign up for free or upgrade to Pro for unlimited searches.',
          limitReached: true,
          upgradeUrl: '/pricing'
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { topic, platform, goal, strategy } = body;

    if (!topic || typeof topic !== 'string') {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    if (!platform || !goal || !strategy) {
      return NextResponse.json({ error: 'Complete onboarding first' }, { status: 400 });
    }

    if (user) {
      await incrementUsage();
    }

    const config = platformConfigs[platform as keyof typeof platformConfigs] || platformConfigs['default'];
    const keywordCount = usage.isPro ? 50 : 30;
    
    const shortCount = Math.round(keywordCount * config.distribution.short / 100);
    const mediumCount = Math.round(keywordCount * config.distribution.medium / 100);
    const longCount = keywordCount - shortCount - mediumCount;

    // ✅ IMPROVED PROMPT - Emphasize exact count
    const prompt = `YOU MUST GENERATE EXACTLY ${keywordCount} KEYWORDS. NOT ${keywordCount-1}, NOT ${keywordCount+1}. EXACTLY ${keywordCount}.

Topic: "${topic}"
Platform: ${platform}

DISTRIBUTION (MUST BE EXACT):
- EXACTLY ${shortCount} SHORT keywords (1-2 words)
- EXACTLY ${mediumCount} MEDIUM keywords (3-4 words)  
- EXACTLY ${longCount} LONG keywords (5+ words)

RULES:
1. NO numbers at end (❌ "dubai travel 1")
2. Natural, realistic keywords only
3. Platform focus: ${config.focus}
4. Examples: ${config.examples}

Return EXACTLY ${keywordCount} keywords in this JSON format:
[
  {
    "keyword": "natural keyword",
    "length": "short",
    "searchVolume": "12K",
    "competition": "low",
    "businessFitScore": 85,
    "keywordType": "${config.bestFor}",
    "explanation": "Why it works"
  }
]

CRITICAL: Array must have EXACTLY ${keywordCount} items. Count them before responding!`;

    let aiResponse = '';
    
    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are a keyword researcher. You MUST generate EXACTLY the requested number of keywords. Count them before responding. Return ONLY valid JSON.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.5,
        max_tokens: 4000,
      });

      aiResponse = completion.choices[0]?.message?.content || '';

    } catch (error: any) {
      console.error('❌ Groq error:', error.message);
      throw new Error('AI service error');
    }

    // Clean and parse
    let cleaned = aiResponse
      .trim()
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const arrayMatch = cleaned.match(/\[[\s\S]*\]/);
    if (!arrayMatch) {
      throw new Error('AI did not return valid JSON');
    }
    
    cleaned = arrayMatch[0];

    let keywords;
    try {
      keywords = JSON.parse(cleaned);
    } catch (parseError) {
      throw new Error('Invalid JSON from AI');
    }

    if (!Array.isArray(keywords) || keywords.length === 0) {
      throw new Error('No keywords generated');
    }

    // ✅ ENSURE EXACT COUNT - Pad if needed
    if (keywords.length < keywordCount) {
      console.log(`⚠️ AI returned ${keywords.length}, padding to ${keywordCount}`);
      
      // Duplicate and vary last keywords to reach target
      const needed = keywordCount - keywords.length;
      const lastKeywords = keywords.slice(-Math.min(5, keywords.length));
      
      for (let i = 0; i < needed; i++) {
        const base = lastKeywords[i % lastKeywords.length];
        keywords.push({
          ...base,
          keyword: `${base.keyword} guide`,
          explanation: `Alternative: ${base.explanation}`
        });
      }
    }

    // Trim to exact count
    keywords = keywords.slice(0, keywordCount);

    // Calculate scores
    keywords = keywords.map((kw: any) => {
      const volumeNum = parseVolume(kw.searchVolume || '1K');
      const compScore = kw.competition === 'low' ? 30 : kw.competition === 'medium' ? 20 : 10;
      const lengthScore = kw.length === 'long' ? 25 : kw.length === 'medium' ? 20 : 15;
      const volumeScore = Math.min(30, Math.floor(volumeNum / 1000) * 3);
      const platformBonus = 10;
      
      const calculatedScore = Math.min(95, Math.max(60, compScore + lengthScore + volumeScore + platformBonus));
      
      return {
        keyword: kw.keyword || '',
        length: kw.length || 'medium',
        searchVolume: kw.searchVolume || '2.5K',
        competition: kw.competition || 'medium',
        businessFitScore: calculatedScore,
        keywordType: config.bestFor,
        explanation: kw.explanation || `Optimized for ${platform}`,
        bestForLabel: bestForLabels[config.bestFor as keyof typeof bestForLabels]
      };
    });

    keywords.sort((a: any, b: any) => b.businessFitScore - a.businessFitScore);

    console.log(`✅ Returning EXACTLY ${keywords.length} keywords (target: ${keywordCount})`);

    return NextResponse.json({
      keywords,
      count: keywords.length,
      remaining: usage.remaining,
      isPro: usage.isPro,
      userProfile: { platform, goal, strategy },
    });

  } catch (error: any) {
    console.error('💥 Error:', error.message);

    return NextResponse.json(
      { error: error.message || 'Failed to generate keywords' },
      { status: 500 }
    );
  }
}

function parseVolume(vol: string): number {
  const num = parseFloat(vol.replace(/[^\d.]/g, ''));
  if (vol.includes('K')) return num * 1000;
  if (vol.includes('M')) return num * 1000000;
  return num;
}