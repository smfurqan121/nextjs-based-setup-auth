'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useProtectedRoute } from '../auth/hooks';
import { useAuth } from '../auth/context'; // <-- import context

export const RoleGuard = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) => {
  const { state } = useAuth();
  const hasAccess = useProtectedRoute(allowedRoles);
  const router = useRouter();

  // Redirect unauthorized
  useEffect(() => {
    if (hasAccess === false && !state.isLoading) {
      router.push('/unauthorized');
    }
  }, [hasAccess, state.isLoading, router]);

  // 🚫 While loading auth state, don't render anything
  if (state.isLoading) {
    return null; // or show a spinner
  }

  // ✅ Authorized
  if (hasAccess === true) {
    return <>{children}</>;
  }

  // ⏳ Access not confirmed yet
  return null;
};
