/**
 * Role-based access control helpers for Clerk.
 *
 * Setup: In your Clerk dashboard, go to Organizations → Roles
 * and create roles like "admin", "member", "viewer".
 *
 * Usage in Server Components / API routes:
 *
 *   import { requireRole, getUserRole } from '@/lib/rbac';
 *
 *   // Throw if user doesn't have the role
 *   await requireRole('admin');
 *
 *   // Check role without throwing
 *   const role = await getUserRole();
 *   if (role === 'admin') { ... }
 *
 * Usage in Client Components:
 *
 *   import { RoleGate } from '@/lib/rbac';
 *
 *   <RoleGate allowedRoles={['admin']}>
 *     <AdminPanel />
 *   </RoleGate>
 */

const clerkEnabled =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !!process.env.CLERK_SECRET_KEY;

export type AppRole = 'admin' | 'member' | 'viewer';

export async function getUserRole(): Promise<AppRole | null> {
  if (!clerkEnabled) return null;

  const { auth } = await import('@clerk/nextjs/server');
  const { sessionClaims } = await auth();

  return (sessionClaims?.metadata as { role?: AppRole } | undefined)?.role ?? null;
}

export async function requireRole(role: AppRole): Promise<void> {
  const userRole = await getUserRole();

  if (!userRole) {
    throw new Error('Unauthorized: not signed in');
  }

  const hierarchy: Record<AppRole, number> = {
    viewer: 0,
    member: 1,
    admin: 2,
  };

  if (hierarchy[userRole] < hierarchy[role]) {
    throw new Error(`Forbidden: requires ${role} role`);
  }
}

export async function hasRole(role: AppRole): Promise<boolean> {
  try {
    await requireRole(role);
    return true;
  } catch {
    return false;
  }
}
