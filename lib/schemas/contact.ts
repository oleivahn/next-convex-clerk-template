import { z } from "zod";

/**
 * Contact form validation schema
 * Fields: name and message
 */
export const contactSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  message: z.string().min(1, {
    message: "The message area cannot be empty, please add a message.",
  }),
});

// - Export the inferred type for use in components and data layer
export type ContactFormData = z.infer<typeof contactSchema>;
