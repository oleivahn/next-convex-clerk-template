import { auth, currentUser } from "@clerk/nextjs/server";

// - Define available roles in your app
export type UserRole = "admin" | "moderator" | "user";

// - Role hierarchy for permission checking (higher number = more permissions)
const roleHierarchy: Record<UserRole, number> = {
  user: 1,
  moderator: 2,
  admin: 3,
};

/**
 * Get the current user's role from their public metadata
 * Defaults to "user" if no role is set
 */
export const getUserRole = async (): Promise<UserRole> => {
  const user = await currentUser();
  const role = user?.publicMetadata?.role as UserRole | undefined;
  return role || "user";
};

/**
 * Check if the current user has at least the required role
 * Uses role hierarchy, so admin has access to moderator routes, etc.
 */
export const hasRole = async (requiredRole: UserRole): Promise<boolean> => {
  const userRole = await getUserRole();
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

/**
 * Check if the current user has exactly the specified role
 */
export const isRole = async (role: UserRole): Promise<boolean> => {
  const userRole = await getUserRole();
  return userRole === role;
};

/**
 * Get role from auth session claims (for use in middleware)
 * This requires setting up custom session claims in Clerk dashboard
 */
export const getRoleFromSession = (sessionClaims: any): UserRole => {
  return (sessionClaims?.metadata?.role as UserRole) || "user";
};

