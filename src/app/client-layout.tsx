'use client';

import { AppSidebar } from '@/components/app-sidebar';
import Header from '@/components/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

interface ClientLayoutProps {
  children: React.ReactNode;
  isSignedIn: boolean;
  authEnabled: boolean;
}

export default function ClientLayout({ children, isSignedIn, authEnabled }: ClientLayoutProps) {
  const pathname = usePathname();

  // When auth is disabled, always show the full layout
  // When auth is enabled, hide layout for unauthenticated users and sign-in page
  const showLayout = !authEnabled || (isSignedIn && !pathname.startsWith('/sign-in'));

  return showLayout ? (
    <SidebarProvider>
      <Header authEnabled={authEnabled} />
      <AppSidebar />
      <SidebarInset>
        <main className="w-full max-w-[1920px] mx-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  ) : (
    children
  );
}
