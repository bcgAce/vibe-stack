'use client';

import Link from 'next/link';

function AuthButtons() {
  // Dynamically import Clerk components only when needed
  const { SignedIn, SignedOut, SignInButton, UserButton } = require('@clerk/nextjs');
  return (
    <>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}

export default function Header({ authEnabled = false }: { authEnabled?: boolean }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <span className="text-lg font-bold text-primary-foreground">V</span>
          </div>
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">vibe</span>
            <span className="text-xl font-bold text-primary ml-1">stack</span>
          </Link>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-4">
        {authEnabled && <AuthButtons />}
      </div>
    </header>
  );
}
