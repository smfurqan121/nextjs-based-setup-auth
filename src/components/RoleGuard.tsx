'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useProtectedRoute } from '../auth/hooks';

export const RoleGuard = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) => {
  const hasAccess = useProtectedRoute(allowedRoles);
  const router = useRouter();

  useEffect(() => {
    if (hasAccess === false) {
      router.push('/unauthorized');
    }
  }, [hasAccess, router]);

  if (hasAccess === true) {
    return <>{children}</>;
  }

  return null; // or a loading spinner
};