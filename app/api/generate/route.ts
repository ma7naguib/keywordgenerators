import Groq from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { checkUsageLimit, incrementUsage } from '../../../lib/usage';
import { generatePrompt } from '../../../lib/prompt-templates';
import { calculateBusinessFit, KeywordWithFit } from '../../../lib/business-fit';
import { Platform, Goal, Strategy, UserLevel, detectUserLevel } from '../../../lib/user-profile';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'dummy-key-for-build',
});

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    
    // Check usage limit
    const usage = await checkUsageLimit();
    
    if (!usage.allowed) {
      return NextResponse.json(
        { 
          error: 'Daily limit reached!',
          limitReached: true,
          upgradeUrl: '/pricing'
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { topic, platform, goal, strategy } = body;

    // Validation
    if (!topic || typeof topic !== 'string') {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    if (!platform || !goal || !strategy) {
      return NextResponse.json(
        { error: 'Please complete the onboarding questions' },
        { status: 400 }
      );
    }

    // Detect user level
    const userLevel: UserLevel = detectUserLevel(
      platform as Platform,
      goal as Goal,
      strategy as Strategy
    );

    // Increment usage if user is logged in
    if (user) {
      await incrementUsage();
    }

    // Determine keyword limit based on plan
    const keywordLimit = usage.isPro ? 50 : 30;

    // Generate personalized prompt
    const prompt = generatePrompt(
      topic,
      platform as Platform,
      goal as Goal,
      strategy as Strategy,
      userLevel,
      keywordLimit
    );

    // Call AI
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert keyword strategist. Generate high-quality, actionable keywords based on the user profile.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 800,
    });

    const text = completion.choices[0]?.message?.content || '';

    // Parse keywords
    const rawKeywords = text
      .split('\n')
      .map((line: string) => line.replace(/^\d+[\.\)]\s*/, '').trim())
      .filter((line: string) => {
        return (
          line.length > 0 &&
          line.length < 100 &&
          !line.match(/^[\*\-\•#]/) &&
          !line.toLowerCase().includes('generate') &&
          !line.toLowerCase().includes('keyword')
        );
      })
      .slice(0, keywordLimit);

    if (rawKeywords.length === 0) {
      throw new Error('No keywords generated');
    }

    // Calculate Business Fit for each keyword
    const keywords: KeywordWithFit[] = rawKeywords.map(keyword =>
      calculateBusinessFit(
        keyword,
        platform as Platform,
        goal as Goal,
        strategy as Strategy,
        userLevel
      )
    );

    // Sort by Business Fit Score (highest first)
    keywords.sort((a, b) => b.businessFitScore - a.businessFitScore);

    // Group keywords by type
    const grouped = {
      buying: keywords.filter(k => k.type === 'buying'),
      question: keywords.filter(k => k.type === 'question'),
      comparison: keywords.filter(k => k.type === 'comparison'),
      informational: keywords.filter(k => k.type === 'informational'),
    };

    return NextResponse.json({
      keywords,
      grouped,
      count: keywords.length,
      remaining: usage.remaining,
      isPro: usage.isPro,
      userProfile: {
        platform,
        goal,
        strategy,
        level: userLevel,
      },
    });
  } catch (error: any) {
    console.error('Generation error:', error);

    return NextResponse.json(
      {
        error: error.message || 'Failed to generate keywords',
      },
      { status: 500 }
    );
  }
}