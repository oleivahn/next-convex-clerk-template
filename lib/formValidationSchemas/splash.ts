import { z } from "zod";

/**
 * Splash page contact form validation schema
 * Fields: name, email, and message
 */
export const splashFormValidationSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

// - Export the inferred type for use in components and data layer
export type SplashFormData = z.infer<typeof splashFormValidationSchema>;

