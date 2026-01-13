export type Platform = 
  | 'google-seo'
  | 'amazon-products'
  | 'youtube-content'
  | 'etsy-digital'
  | 'social-media'
  | 'app-store'
  | 'not-sure';

export type Goal = 
  | 'sell-products'
  | 'sell-digital'
  | 'affiliate'
  | 'ads-revenue'
  | 'services'
  | 'exploring';

export type Strategy = 
  | 'easy-wins'      // Low competition, easier to rank
  | 'moderate'       // Balanced approach
  | 'hard-mode'      // High competition, high volume
  | 'auto';          // Let us decide

export type UserLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserProfile {
  platform: Platform;
  goal: Goal;
  strategy: Strategy;
  level: UserLevel;
}

/**
 * Auto-detect user level based on their choices
 */
export function detectUserLevel(
  platform: Platform,
  goal: Goal,
  strategy: Strategy
): UserLevel {
  // Beginner indicators
  const beginnerSignals = [
    platform === 'not-sure',
    goal === 'exploring',
    strategy === 'auto',
  ];
  
  const beginnerScore = beginnerSignals.filter(Boolean).length;
  
  // Advanced indicators
  const advancedSignals = [
    platform === 'amazon-products' || platform === 'google-seo',
    goal === 'services' || goal === 'affiliate',
    strategy === 'hard-mode',
  ];
  
  const advancedScore = advancedSignals.filter(Boolean).length;
  
  // Decision logic
  if (beginnerScore >= 2) return 'beginner';
  if (advancedScore >= 2) return 'advanced';
  return 'intermediate';
}

/**
 * Get platform display name
 */
export function getPlatformName(platform: Platform): string {
  const names: Record<Platform, string> = {
    'google-seo': 'Google / SEO',
    'amazon-products': 'Amazon Products',
    'youtube-content': 'YouTube',
    'etsy-digital': 'Etsy',
    'social-media': 'TikTok / Instagram',
    'app-store': 'App Store',
    'not-sure': 'Not sure yet',
  };
  return names[platform];
}

/**
 * Get goal display name
 */
export function getGoalName(goal: Goal): string {
  const names: Record<Goal, string> = {
    'sell-products': 'Selling products',
    'sell-digital': 'Selling digital products',
    'affiliate': 'Affiliate marketing',
    'ads-revenue': 'Ads revenue',
    'services': 'Selling services',
    'exploring': 'Just exploring',
  };
  return names[goal];
}

/**
 * Get strategy display name
 */
export function getStrategyName(strategy: Strategy): string {
  const names: Record<Strategy, string> = {
    'easy-wins': 'Easy wins (low competition)',
    'moderate': 'Balanced approach',
    'hard-mode': 'High volume (more competitive)',
    'auto': "Let AI decide for me",
  };
  return names[strategy];
}