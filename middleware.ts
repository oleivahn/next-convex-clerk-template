import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// - Public routes that don't require authentication
// - These routes will show the splash page for non-authenticated users
const isPublicRoute = createRouteMatcher([
  "/", // - Home page (shows splash for non-auth, app for auth)
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
  "/contact-us(.*)", // - Allow contact page to be public
]);

// - Routes that require admin role
const isAdminRoute = createRouteMatcher(["/admin(.*)", "/database(.*)"]);

export default clerkMiddleware((auth, req) => {
  const { userId, sessionClaims } = auth();

  // - Protect all routes except public ones
  if (!isPublicRoute(req)) {
    auth().protect();
  }

  // - Check admin role for admin routes
  if (isAdminRoute(req)) {
    const role = (sessionClaims?.metadata as { role?: string })?.role;

    if (role !== "admin") {
      // - Redirect non-admins to home page
      return Response.redirect(new URL("/", req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
