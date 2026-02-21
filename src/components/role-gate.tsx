'use client';

import { useUser } from '@clerk/nextjs';
import type { AppRole } from '@/lib/rbac';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: AppRole[];
  fallback?: React.ReactNode;
}

/**
 * Client-side role gate. Shows children only if user has an allowed role.
 *
 * Usage:
 *   <RoleGate allowedRoles={['admin']}>
 *     <AdminPanel />
 *   </RoleGate>
 *
 *   <RoleGate allowedRoles={['admin', 'member']} fallback={<p>Access denied</p>}>
 *     <Dashboard />
 *   </RoleGate>
 *
 * Note: This is a client-side check for UI purposes. Always validate
 * roles server-side in API routes using requireRole() from @/lib/rbac.
 */
export function RoleGate({ children, allowedRoles, fallback = null }: RoleGateProps) {
  const { user } = useUser();
  const role = (user?.publicMetadata as { role?: AppRole } | undefined)?.role;

  if (!role || !allowedRoles.includes(role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
