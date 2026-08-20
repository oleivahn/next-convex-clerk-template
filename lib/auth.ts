import { currentUser } from "@clerk/nextjs/server";
import { meetsRoleRequirement, parseRole, type UserRole } from "@/lib/roles";

export type { UserRole };

/**
 * Get the current user's role from their public metadata
 * Returns null when the user has no elevated role (regular user)
 */
export const getUserRole = async (): Promise<UserRole | null> => {
  const user = await currentUser();
  return parseRole(user?.publicMetadata?.role);
};

/**
 * Check if the current user has at least the required role
 * Uses role hierarchy, so admin has access to moderator routes, etc.
 */
export const hasRole = async (requiredRole: UserRole): Promise<boolean> => {
  const userRole = await getUserRole();
  return meetsRoleRequirement(userRole, requiredRole);
};

/**
 * Check if the current user has exactly the specified role
 * Use this only when admins should be excluded, otherwise prefer hasRole
 */
export const isRole = async (role: UserRole): Promise<boolean> => {
  const userRole = await getUserRole();
  return userRole === role;
};

/**
 * Get role from auth session claims (for use in middleware)
 * This requires setting up custom session claims in Clerk dashboard
 */
export const getRoleFromSession = (sessionClaims: any): UserRole | null => {
  return parseRole(sessionClaims?.metadata?.role);
};
