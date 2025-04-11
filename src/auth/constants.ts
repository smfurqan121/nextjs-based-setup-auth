export const ROLES = {
    USER: 'user',
    ADMIN: 'admin',
    VENDOR: 'vendor',
  } as const;
  
  export type Role = keyof typeof ROLES;
  
  export const PROTECTED_ROUTES = {
    [ROLES.USER]: ['/profile', '/orders'],
    [ROLES.ADMIN]: ['/dashboard', '/dashboard/users', '/dashboard/settings'],
    [ROLES.VENDOR]: ['/dashboard', '/dashboard/products'],
  };
  
  export const PUBLIC_ROUTES = ['/', '/login', '/register'];