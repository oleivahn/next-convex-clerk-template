// - Elevated roles only. A signed-in user with no role is a regular user.
export type UserRole = "admin" | "moderator";

// - Role hierarchy for permission checking (higher number = more permissions)
const roleHierarchy: Record<UserRole, number> = {
  moderator: 1,
  admin: 2,
};

/**
 * Normalize a raw role value from Clerk metadata into a known role
 * Returns null for a regular user or an unrecognized value
 */
export const parseRole = (value: unknown): UserRole | null => {
  return typeof value === "string" && value in roleHierarchy
    ? (value as UserRole)
    : null;
};

/**
 * Check a role against a minimum required rank
 * Anything above the requirement passes, so admin satisfies every gate
 */
export const meetsRoleRequirement = (
  userRole: UserRole | null,
  requiredRole?: UserRole
): boolean => {
  if (!requiredRole) return true;
  if (!userRole) return false;
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};
