'use client';

import { useAuth } from './context';

export const useRole = () => {
  const { state } = useAuth();
  return state.user?.role || null;
};

export const useProtectedRoute = (allowedRoles: string[]) => {
  const { state } = useAuth();
  const role = state.user?.role;

  if (state.isLoading) return false; // Still loading
  if (!role || !allowedRoles.includes(role)) return false; // No access
  return true; // Has access
};