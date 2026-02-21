import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)']);

const clerkEnabled =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !!process.env.CLERK_SECRET_KEY;

// WARNING: When active, ALL auth is bypassed. Only safe in local dev.
// Cannot activate in production (NODE_ENV must not be 'production').
const isPlaywrightTesting =
  process.env.NODE_ENV !== 'production' && process.env.PLAYWRIGHT_TESTING === 'true';

// When Clerk is configured, protect non-public routes
const authedMiddleware = clerkMiddleware(async (auth, request) => {
  if (isPlaywrightTesting) {
    return NextResponse.next();
  }

  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  return NextResponse.next();
});

// When Clerk is NOT configured, let everything through
export default clerkEnabled ? authedMiddleware : () => NextResponse.next();

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
