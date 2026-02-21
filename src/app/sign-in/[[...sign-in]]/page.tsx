import Link from 'next/link';

export default async function SignInPage() {
  const clerkEnabled =
    !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !!process.env.CLERK_SECRET_KEY;

  if (!clerkEnabled) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="bg-card text-card-foreground max-w-md rounded-lg border p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">Auth is not configured</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            This starter works without auth. To enable sign-in, add Clerk keys to
            <code className="bg-muted ml-1 rounded px-1 py-0.5">.env.development.local</code>.
          </p>
          <div className="mt-4">
            <Link
              className="text-primary text-sm font-medium underline-offset-4 hover:underline"
              href="/"
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { SignIn } = await import('@clerk/nextjs');
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  );
}
