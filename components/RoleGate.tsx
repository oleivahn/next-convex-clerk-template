"use client";

import { useUser } from "@clerk/nextjs";
import { meetsRoleRequirement, parseRole, type UserRole } from "@/lib/roles";

interface RoleGateProps {
  children: React.ReactNode;
  requiredRole: UserRole;
  fallback?: React.ReactNode;
}

/**
 * Client component that conditionally renders content based on user role
 * The role is a minimum rank, so an admin passes a moderator gate
 * Usage:
 * <RoleGate requiredRole="moderator">
 *   <AdminPanel />
 * </RoleGate>
 */
const RoleGate = ({
  children,
  requiredRole,
  fallback = null,
}: RoleGateProps) => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const userRole = parseRole(user?.publicMetadata?.role);

  if (!meetsRoleRequirement(userRole, requiredRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default RoleGate;
