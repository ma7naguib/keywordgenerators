import Groq from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (!topic || typeof topic !== 'string') {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a keyword research expert. Generate relevant long-tail keywords for SEO and content marketing.',
        },
        {
          role: 'user',
          content: `Generate 30 keyword ideas for: "${topic}"

Requirements:
- Long-tail keywords (3-6 words)
- Include question-based keywords (how to, what is, etc.)
- Include buying intent keywords (best, top, review, etc.)
- Return ONLY keywords, one per line
- No numbering, no explanations, no extra text

Example format:
best yoga mats for beginners
how to start yoga at home
yoga poses for back pain`,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 600,
    });

    const text = completion.choices[0]?.message?.content || '';

    const keywords = text
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
      .slice(0, 30);

    if (keywords.length === 0) {
      throw new Error('No keywords generated');
    }

    return NextResponse.json({
      keywords,
      count: keywords.length,
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