"use client";

import { useUser } from "@clerk/nextjs";
import type { UserRole } from "@/lib/auth";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
}

/**
 * Client component that conditionally renders content based on user role
 * Usage:
 * <RoleGate allowedRoles={["admin", "moderator"]}>
 *   <AdminPanel />
 * </RoleGate>
 */
const RoleGate = ({
  children,
  allowedRoles,
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

  const userRole = (user?.publicMetadata?.role as UserRole) || "user";
  const hasAccess = allowedRoles.includes(userRole);

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default RoleGate;
