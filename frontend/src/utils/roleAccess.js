const ROLE_RANK = { user: 1, admin: 2, super_admin: 3 };

export function hasMinimumRole(role, minRole) {
  return (ROLE_RANK[role] ?? 0) >= (ROLE_RANK[minRole] ?? 0);
}

const PAGE_ACCESS = {
  '/': ['user', 'admin', 'super_admin'],
  '/analytics': ['user', 'admin', 'super_admin'],
  '/patients': ['admin', 'super_admin'],
  '/command-centre': ['user', 'admin', 'super_admin'],
  '/bed-management': ['user', 'admin', 'super_admin'],
  '/ward-census': ['user', 'admin', 'super_admin'],
  '/csc-census': ['admin', 'super_admin'],
  '/discharge-workflow': ['user', 'admin', 'super_admin'],
  '/accounts': ['super_admin'],
  '/reports': ['admin', 'super_admin'],
  '/settings': ['user', 'admin', 'super_admin']
};

export function canAccessPage(role, path) {
  const allowed = PAGE_ACCESS[path];
  if (!allowed) return false;
  return allowed.includes(role);
}
