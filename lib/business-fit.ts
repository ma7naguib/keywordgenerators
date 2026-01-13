import { Platform, Goal, Strategy, UserLevel } from './user-profile';

export interface BusinessFitBreakdown {
  intentMatch: number;      // 0-100
  competitionFit: number;   // 0-100
  volumePotential: number;  // 0-100
  monetizationFit: number;  // 0-100
  levelMatch: number;       // 0-100
}

export interface KeywordWithFit {
  text: string;
  businessFitScore: number;
  breakdown: BusinessFitBreakdown;
  type: 'buying' | 'question' | 'informational' | 'comparison';
  competition: 'low' | 'medium' | 'high';
  volumeEstimate: number;
  volumeLabel: 'low' | 'medium' | 'high';
  moneyLabel: string;
  reasoning: string;
}

/**
 * Calculate Business Fit Score for a keyword
 */
export function calculateBusinessFit(
  keyword: string,
  platform: Platform,
  goal: Goal,
  strategy: Strategy,
  level: UserLevel
): KeywordWithFit {
  // Analyze keyword characteristics
  const type = detectKeywordType(keyword);
  const competition = estimateCompetition(keyword, strategy);
  const volumeEstimate = estimateVolume(keyword);
  const volumeLabel = getVolumeLabel(volumeEstimate);
  
  // Calculate fit components
  const intentMatch = calculateIntentMatch(type, goal);
  const competitionFit = calculateCompetitionFit(competition, strategy);
  const volumePotential = calculateVolumePotential(volumeEstimate, strategy);
  const monetizationFit = calculateMonetizationFit(type, goal);
  const levelMatch = calculateLevelMatch(keyword, level);
  
  // Calculate overall Business Fit Score (weighted average)
  const businessFitScore = Math.round(
    intentMatch * 0.30 +
    competitionFit * 0.25 +
    volumePotential * 0.20 +
    monetizationFit * 0.15 +
    levelMatch * 0.10
  );
  
  const breakdown: BusinessFitBreakdown = {
    intentMatch,
    competitionFit,
    volumePotential,
    monetizationFit,
    levelMatch,
  };
  
  const moneyLabel = getMoneyLabel(type, goal);
  const reasoning = generateReasoning(keyword, type, competition, businessFitScore, goal, strategy);
  
  return {
    text: keyword,
    businessFitScore,
    breakdown,
    type,
    competition,
    volumeEstimate,
    volumeLabel,
    moneyLabel,
    reasoning,
  };
}

/**
 * Detect keyword type based on patterns
 */
function detectKeywordType(keyword: string): 'buying' | 'question' | 'informational' | 'comparison' {
  const lower = keyword.toLowerCase();
  
  // Buying intent patterns
  const buyingPatterns = ['best', 'top', 'buy', 'purchase', 'price', 'cheap', 'affordable', 'review', 'deal'];
  if (buyingPatterns.some(pattern => lower.includes(pattern))) {
    return 'buying';
  }
  
  // Question patterns
  const questionPatterns = ['how to', 'what is', 'why', 'when', 'where', 'can i', 'should i'];
  if (questionPatterns.some(pattern => lower.includes(pattern))) {
    return 'question';
  }
  
  // Comparison patterns
  const comparisonPatterns = ['vs', 'versus', 'or', 'compared', 'comparison', 'difference between'];
  if (comparisonPatterns.some(pattern => lower.includes(pattern))) {
    return 'comparison';
  }
  
  return 'informational';
}

/**
 * Estimate competition level
 */
function estimateCompetition(keyword: string, strategy: Strategy): 'low' | 'medium' | 'high' {
  const wordCount = keyword.split(' ').length;
  
  // Longer keywords = typically lower competition
  if (wordCount >= 5) return 'low';
  if (wordCount >= 3) return 'medium';
  
  // Adjust based on strategy
  if (strategy === 'easy-wins') return 'low';
  if (strategy === 'hard-mode') return 'high';
  
  return 'medium';
}

/**
 * Estimate search volume (realistic ranges)
 */
function estimateVolume(keyword: string): number {
  const wordCount = keyword.split(' ').length;
  
  // Shorter keywords = higher volume (generally)
  if (wordCount <= 2) {
    return Math.floor(Math.random() * (50000 - 5000) + 5000);
  } else if (wordCount <= 4) {
    return Math.floor(Math.random() * (5000 - 500) + 500);
  } else {
    return Math.floor(Math.random() * (1000 - 50) + 50);
  }
}

/**
 * Get volume label
 */
function getVolumeLabel(volume: number): 'low' | 'medium' | 'high' {
  if (volume >= 5000) return 'high';
  if (volume >= 500) return 'medium';
  return 'low';
}

/**
 * Calculate Intent Match score
 */
function calculateIntentMatch(type: string, goal: Goal): number {
  const matches: Record<Goal, Record<string, number>> = {
    'sell-products': { buying: 95, comparison: 85, informational: 60, question: 70 },
    'sell-digital': { buying: 90, comparison: 80, informational: 65, question: 70 },
    'affiliate': { buying: 95, comparison: 90, informational: 60, question: 65 },
    'ads-revenue': { buying: 70, comparison: 75, informational: 90, question: 95 },
    'services': { buying: 85, comparison: 75, informational: 80, question: 90 },
    'exploring': { buying: 75, comparison: 75, informational: 80, question: 80 },
  };
  
  return matches[goal][type] || 70;
}

/**
 * Calculate Competition Fit score
 */
function calculateCompetitionFit(competition: string, strategy: Strategy): number {
  const fits: Record<Strategy, Record<string, number>> = {
    'easy-wins': { low: 95, medium: 60, high: 30 },
    'moderate': { low: 85, medium: 90, high: 60 },
    'hard-mode': { low: 70, medium: 85, high: 95 },
    'auto': { low: 90, medium: 85, high: 70 },
  };
  
  return fits[strategy][competition] || 70;
}

/**
 * Calculate Volume Potential score
 */
function calculateVolumePotential(volume: number, strategy: Strategy): number {
  if (strategy === 'hard-mode') {
    // Prefer high volume
    if (volume >= 5000) return 95;
    if (volume >= 1000) return 75;
    return 50;
  } else if (strategy === 'easy-wins') {
    // Lower volume is okay
    if (volume >= 100 && volume <= 1000) return 90;
    if (volume > 1000) return 70;
    return 85;
  } else {
    // Balanced
    if (volume >= 500 && volume <= 5000) return 90;
    if (volume > 5000) return 80;
    return 70;
  }
}

/**
 * Calculate Monetization Fit score
 */
function calculateMonetizationFit(type: string, goal: Goal): number {
  const commercialGoals = ['sell-products', 'sell-digital', 'affiliate'];
  const trafficGoals = ['ads-revenue'];
  
  if (commercialGoals.includes(goal)) {
    return type === 'buying' || type === 'comparison' ? 90 : 65;
  }
  
  if (trafficGoals.includes(goal)) {
    return type === 'question' || type === 'informational' ? 90 : 70;
  }
  
  return 75;
}

/**
 * Calculate Level Match score
 */
function calculateLevelMatch(keyword: string, level: UserLevel): number {
  const wordCount = keyword.split(' ').length;
  
  if (level === 'beginner') {
    // Prefer longer, easier keywords
    return wordCount >= 4 ? 90 : 70;
  } else if (level === 'advanced') {
    // Can handle any length
    return 85;
  } else {
    // Intermediate - balanced
    return wordCount >= 3 ? 90 : 75;
  }
}

/**
 * Get money label based on type and goal
 */
function getMoneyLabel(type: string, goal: Goal): string {
  if (goal === 'sell-products' || goal === 'sell-digital') {
    if (type === 'buying') return '🛒 Product Sales';
    if (type === 'comparison') return '🛒 Product Sales';
    return '📈 Traffic / Awareness';
  }
  
  if (goal === 'affiliate') {
    if (type === 'buying') return '💰 Affiliate Commissions';
    if (type === 'comparison') return '💰 Affiliate Commissions';
    return '📈 Traffic / Content';
  }
  
  if (goal === 'ads-revenue') {
    return '📈 Ad Revenue';
  }
  
  if (goal === 'services') {
    if (type === 'question') return '🧲 Lead Generation';
    return '🧲 Service Inquiry';
  }
  
  return '💡 Traffic';
}

/**
 * Generate reasoning for why this keyword was picked
 */
function generateReasoning(
  keyword: string,
  type: string,
  competition: string,
  score: number,
  goal: Goal,
  strategy: Strategy
): string {
  const reasons: string[] = [];
  
  // Competition reason
  if (competition === 'low') {
    reasons.push('Low competition');
  } else if (competition === 'high' && strategy === 'hard-mode') {
    reasons.push('High volume opportunity');
  }
  
  // Intent reason
  if (type === 'buying' && (goal === 'sell-products' || goal === 'sell-digital')) {
    reasons.push('Strong buying intent');
  } else if (type === 'question' && goal === 'ads-revenue') {
    reasons.push('High engagement potential');
  }
  
  // Strategy match
  if (strategy === 'easy-wins' && keyword.split(' ').length >= 4) {
    reasons.push('Long-tail opportunity');
  }
  
  // Goal alignment
  const goalDescriptions: Record<Goal, string> = {
    'sell-products': 'Perfect for product listings',
    'sell-digital': 'Great for digital products',
    'affiliate': 'High affiliate potential',
    'ads-revenue': 'Strong traffic potential',
    'services': 'Lead generation opportunity',
    'exploring': 'Good discovery keyword',
  };
  
  if (score >= 85) {
    reasons.push(goalDescriptions[goal]);
  }
  
  return reasons.join(' • ') || 'Good opportunity for your niche';
}