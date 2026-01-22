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

// Retry function
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      console.log(`⚠️ Attempt ${i + 1} failed: ${error.message}`);
      
      if (i < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, i);
        console.log(`⏳ Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

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

    if (user && !usage.isAdmin) {
      await incrementUsage();
    }

    const config = platformConfigs[platform as keyof typeof platformConfigs] || platformConfigs['default'];
    const keywordCount = usage.isPro ? 50 : 30;
    
    const shortCount = Math.round(keywordCount * config.distribution.short / 100);
    const mediumCount = Math.round(keywordCount * config.distribution.medium / 100);
    const longCount = keywordCount - shortCount - mediumCount;

    const prompt = `Generate EXACTLY ${keywordCount} keywords for: "${topic}"
Platform: ${platform}

Distribution:
- ${shortCount} SHORT (1-2 words)
- ${mediumCount} MEDIUM (3-4 words)  
- ${longCount} LONG (5+ words)

Rules:
1. NO numbers at end of keywords
2. Natural, realistic keywords
3. Focus: ${config.focus}
4. Examples: ${config.examples}

Return ONLY a valid JSON array with this exact format (no markdown, no extra text):
[{"keyword":"example keyword","length":"short","searchVolume":"12K","competition":"low","businessFitScore":85,"explanation":"Why it works"}]`;

    // Call AI with retry
    const keywords = await retryWithBackoff(async () => {
      console.log('🤖 Calling Groq API...');
      
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a keyword research expert. Return ONLY valid JSON arrays. No markdown, no code blocks, no explanations - just the JSON array.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.3,
        max_tokens: 4000,
      });

      const aiResponse = completion.choices[0]?.message?.content || '';
      console.log('📝 AI Response length:', aiResponse.length);
      console.log('📝 AI Response preview:', aiResponse.substring(0, 200));

      // Clean response
      let cleaned = aiResponse
        .trim()
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .replace(/^\s*[\r\n]/gm, '')
        .trim();

      // Find JSON array
      const startIndex = cleaned.indexOf('[');
      const endIndex = cleaned.lastIndexOf(']');
      
      if (startIndex === -1 || endIndex === -1) {
        throw new Error('No JSON array found in response');
      }
      
      cleaned = cleaned.substring(startIndex, endIndex + 1);

      // Parse JSON
      let parsed;
      try {
        parsed = JSON.parse(cleaned);
      } catch (e) {
        console.log('❌ JSON parse error. Cleaned string:', cleaned.substring(0, 500));
        throw new Error('Invalid JSON from AI');
      }

      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('Empty or invalid array');
      }

      return parsed;
    }, 3, 1000);

    // Process keywords
    let processedKeywords = keywords.slice(0, keywordCount).map((kw: any) => {
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

    // Pad if needed
    while (processedKeywords.length < keywordCount && processedKeywords.length > 0) {
      const base = processedKeywords[processedKeywords.length % processedKeywords.length];
      processedKeywords.push({
        ...base,
        keyword: `${base.keyword} tips`,
        explanation: `Related: ${base.explanation}`
      });
    }

    processedKeywords = processedKeywords.slice(0, keywordCount);
    processedKeywords.sort((a: any, b: any) => b.businessFitScore - a.businessFitScore);

    console.log(`✅ Returning ${processedKeywords.length} keywords`);

    return NextResponse.json({
      keywords: processedKeywords,
      count: processedKeywords.length,
      remaining: usage.remaining,
      isPro: usage.isPro,
      isAdmin: usage.isAdmin,
      userProfile: { platform, goal, strategy },
    });

  } catch (error: any) {
    console.error('💥 Final Error:', error.message);

    return NextResponse.json(
      { error: 'Failed to generate keywords. Please try again.' },
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