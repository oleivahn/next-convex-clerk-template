import { hasRole } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DatabaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // - Server-side role check - only admins can access database
  const isAdmin = await hasRole("admin");

  if (!isAdmin) {
    redirect("/");
  }

  return <>{children}</>;
}

