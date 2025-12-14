import { z } from "zod";

/**
 * Form template validation schema
 * Fields: name and message
 * Validation rules match backend (convex/formTemplate.ts)
 */
export const formTemplateValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name cannot exceed 100 characters." }),
  message: z
    .string()
    .trim()
    .min(1, {
      message: "The message area cannot be empty, please add a message.",
    })
    .max(5000, { message: "Message cannot exceed 5000 characters." }),
});

// - Export the inferred type for use in components and data layer
export type FormTemplateData = z.infer<typeof formTemplateValidationSchema>;
