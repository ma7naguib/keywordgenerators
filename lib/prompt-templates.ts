import { Platform, Goal, Strategy, UserLevel } from './user-profile';

/**
 * Generate AI prompt based on user profile
 */
export function generatePrompt(
  topic: string,
  platform: Platform,
  goal: Goal,
  strategy: Strategy,
  level: UserLevel,
  keywordLimit: number
): string {
  const baseContext = getBaseContext(level);
  const platformContext = getPlatformContext(platform);
  const goalContext = getGoalContext(goal);
  const strategyContext = getStrategyContext(strategy);
  
  return `${baseContext}

PLATFORM FOCUS: ${platformContext}

BUSINESS GOAL: ${goalContext}

STRATEGY: ${strategyContext}

TOPIC: "${topic}"

Generate EXACTLY ${keywordLimit} keyword ideas following this distribution:
- ${Math.floor(keywordLimit * 0.4)} BUYING INTENT keywords (2-4 words each) - commercial, transactional
- ${Math.floor(keywordLimit * 0.3)} QUESTION keywords (4-8 words each) - how to, what is, why, when
- ${Math.floor(keywordLimit * 0.3)} INFORMATIONAL/COMPARISON keywords (3-5 words mixed)

CRITICAL REQUIREMENTS:
1. VARIETY IN LENGTH: Mix short (2-3 words), medium (4-5 words), and long-tail (6+ words)
2. Return ONLY keywords, one per line
3. NO numbering, NO bullets, NO explanations
4. Each keyword must be unique and realistic
5. Keywords should be immediately usable for ${goal} on ${platform}

Generate ALL ${keywordLimit} keywords now (not less):`;
}

/**
 * Base context based on user level
 */
function getBaseContext(level: UserLevel): string {
  const contexts: Record<UserLevel, string> = {
    beginner: `You are a keyword strategist helping a BEGINNER. Use:
- Simple, clear keywords
- Lower competition terms
- Educational and foundational topics
- Avoid technical jargon
- Focus on easier wins`,
    
    intermediate: `You are a keyword strategist helping an INTERMEDIATE user. Use:
- Moderate complexity keywords
- Balanced competition levels
- Mix of educational and commercial terms
- Some niche-specific language
- Focus on sustainable growth`,
    
    advanced: `You are a keyword strategist helping an ADVANCED user. Use:
- Sophisticated, specific keywords
- Can include higher competition terms
- Commercial and technical language
- Niche expertise assumed
- Focus on competitive opportunities`,
  };
  
  return contexts[level];
}

/**
 * Platform-specific optimization context
 */
function getPlatformContext(platform: Platform): string {
  const contexts: Record<Platform, string> = {
    'google-seo': `Google SEO & Blog Content
- Focus on search intent and user questions
- Include informational and comparison keywords
- Consider featured snippet opportunities
- Mix of short and long-tail keywords`,
    
    'amazon-products': `Amazon Product Listings
- Focus on product-specific and buying intent keywords
- Include comparison and review keywords
- Consider backend search terms
- Price and feature qualifiers`,
    
    'youtube-content': `YouTube Video Optimization
- Focus on searchable video titles and topics
- Include how-to and tutorial keywords
- Consider video description optimization
- Engaging and click-worthy phrases`,
    
    'etsy-digital': `Etsy Digital Products
- Focus on printable, template, and digital keywords
- Include craft and design niches
- Consider seasonal and niche markets
- Instant download qualifiers`,
    
    'social-media': `TikTok / Instagram Content
- Focus on trending and viral topics
- Include hashtag-style keywords
- Consider short-form content ideas
- Engaging and shareable phrases`,
    
    'app-store': `App Store Optimization (ASO)
- Focus on app functionality keywords
- Include problem-solving terms
- Consider app category keywords
- Feature and benefit phrases`,
    
    'not-sure': `Multi-Platform Strategy
- Focus on versatile, cross-platform keywords
- Include both content and commercial terms
- Consider multiple use cases
- Broadly applicable keywords`,
  };
  
  return contexts[platform];
}

/**
 * Goal-based intent context
 */
function getGoalContext(goal: Goal): string {
  const contexts: Record<Goal, string> = {
    'sell-products': `Physical Product Sales
- Prioritize buying intent keywords
- Include product comparison terms
- Focus on commercial value
- Price and quality indicators`,
    
    'sell-digital': `Digital Product Sales
- Focus on digital product keywords
- Include download and instant access terms
- Niche and specific offerings
- Template and resource keywords`,
    
    'affiliate': `Affiliate Marketing
- Focus on review and comparison keywords
- Include best/top recommendation terms
- High buyer intent phrases
- Product category keywords`,
    
    'ads-revenue': `Ad Revenue / Traffic
- Focus on high-volume informational keywords
- Include question-based terms
- Viral and trending topics
- Broad appeal keywords`,
    
    'services': `Service-Based Business
- Focus on problem-solving keywords
- Include location and service-specific terms
- Professional and B2B keywords
- Consultation and expertise terms`,
    
    'exploring': `General Exploration
- Mix of all keyword types
- Educational foundation
- Broad market understanding
- Discovery-focused terms`,
  };
  
  return contexts[goal];
}

/**
 * Strategy-based competition context
 */
function getStrategyContext(strategy: Strategy): string {
  const contexts: Record<Strategy, string> = {
    'easy-wins': `LOW COMPETITION FOCUS
- Prioritize long-tail keywords (4-6 words)
- Specific niche terms
- Lower search volume but easier to rank
- Quick win opportunities`,
    
    'moderate': `BALANCED APPROACH
- Mix of medium-tail (3-4 words) and long-tail keywords
- Moderate competition acceptable
- Balance between volume and difficulty
- Sustainable growth focus`,
    
    'hard-mode': `HIGH VOLUME FOCUS
- Can include shorter, more competitive keywords
- Higher search volume targets
- Willing to compete in popular niches
- Aggressive growth strategy`,
    
    'auto': `AI-OPTIMIZED STRATEGY
- Analyze and mix all approaches
- Balance opportunity with competition
- Focus on best ROI keywords
- Smart difficulty distribution`,
  };
  
  return contexts[strategy];
}
