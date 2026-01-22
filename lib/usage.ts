import { currentUser } from '@clerk/nextjs/server';

const FREE_LIMIT = 1; // 1 run for everyone

// Admin emails - unlimited access
const ADMIN_EMAILS = ['ma7.naguib@gmail.com'];

export async function checkUsageLimit() {
  const user = await currentUser();
  
  // Check if Admin
  const isAdmin = user?.emailAddresses?.some(
    email => ADMIN_EMAILS.includes(email.emailAddress.toLowerCase())
  );
  
  if (isAdmin) {
    return { allowed: true, remaining: -1, isPro: true, isAdmin: true }; // Unlimited
  }
  
  // Check if Pro user
  const isPro = user?.publicMetadata?.isPro === true;
  
  if (isPro) {
    return { allowed: true, remaining: -1, isPro: true, isAdmin: false }; // Unlimited
  }

  // If signed in, check Clerk metadata
  if (user) {
    const hasUsedFreeRun = user.publicMetadata?.freeRunUsed === true;
    
    if (hasUsedFreeRun) {
      return { allowed: false, remaining: 0, isPro: false, isAdmin: false };
    }
    
    return { allowed: true, remaining: 1, isPro: false, isAdmin: false };
  }

  // Anonymous users: Check will happen client-side
  return { allowed: true, remaining: 1, isPro: false, isAdmin: false };
}

export async function incrementUsage() {
  const user = await currentUser();
  
  // Check if Admin
  const isAdmin = user?.emailAddresses?.some(
    email => ADMIN_EMAILS.includes(email.emailAddress.toLowerCase())
  );
  
  if (isAdmin) return; // Admins don't need tracking
  
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