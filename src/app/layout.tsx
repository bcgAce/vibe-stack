import { PostHogProvider } from '@/components/posthog-provider';
import { MyThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { getBaseUrl } from '@/lib/site-url';
import { Inter } from 'next/font/google';
import type React from 'react';
import ClientLayout from './client-layout';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const clerkEnabled =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !!process.env.CLERK_SECRET_KEY;

export const metadata = {
  title: {
    default: 'vibe-stack',
    template: '%s | vibe-stack',
  },
  description: 'Build cool stuff fast',
  metadataBase: new URL(getBaseUrl()),
  openGraph: {
    title: 'vibe-stack',
    description: 'Build cool stuff fast',
    type: 'website',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let isSignedIn = false;

  if (clerkEnabled) {
    const { auth } = await import('@clerk/nextjs/server');
    const { userId } = await auth();
    isSignedIn = !!userId;
  }

  const content = (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <PostHogProvider>
          <MyThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClientLayout isSignedIn={isSignedIn} authEnabled={clerkEnabled}>
              {children}
            </ClientLayout>
            <Toaster />
          </MyThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );

  if (clerkEnabled) {
    const { ClerkProvider } = await import('@clerk/nextjs');
    return <ClerkProvider>{content}</ClerkProvider>;
  }

  return content;
}
