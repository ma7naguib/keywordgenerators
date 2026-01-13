import { currentUser } from '@clerk/nextjs/server';

const FREE_LIMIT = 1; // 1 run for everyone

export async function checkUsageLimit() {
  const user = await currentUser();
  
  // Check if Pro user
  const isPro = user?.publicMetadata?.isPro === true;
  
  if (isPro) {
    return { allowed: true, remaining: -1, isPro: true }; // Unlimited
  }

  // If signed in, check Clerk metadata
  if (user) {
    const hasUsedFreeRun = user.publicMetadata?.freeRunUsed === true;
    
    if (hasUsedFreeRun) {
      return { allowed: false, remaining: 0, isPro: false };
    }
    
    return { allowed: true, remaining: 1, isPro: false };
  }

  // Anonymous users: Check will happen client-side
  return { allowed: true, remaining: 1, isPro: false };
}

export async function incrementUsage() {
  const user = await currentUser();
  const isPro = user?.publicMetadata?.isPro === true;
  
  if (isPro) return; // Pro users don't need tracking

  // If user is signed in, mark in Clerk
  if (user) {
    try {
      await fetch(`https://api.clerk.com/v1/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          public_metadata: {
            ...user.publicMetadata,
            freeRunUsed: true,
            freeRunDate: new Date().toISOString(),
          },
        }),
      });
    } catch (error) {
      console.error('Failed to update Clerk metadata:', error);
    }
  }
}