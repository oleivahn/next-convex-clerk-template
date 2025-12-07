import { contactSchema, type ContactFormData } from "@/lib/schemas";

// - Re-export type for convenience
export type { ContactFormData };

export type ContactResponse = {
  message: string;
  data: ContactFormData | null;
  error?: boolean;
};

// - API base URL - uses relative path for same-origin requests
const API_BASE = "/api";

/**
 * Submit contact form data to the API
 */
export const submitContactForm = async (
  data: ContactFormData
): Promise<ContactResponse> => {
  // - Validate data first
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: "Invalid form data",
      data: null,
      error: true,
    };
  }

  // - Submit the form to the API
  try {
    const response = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        message: result.message || "Failed to submit form",
        data: null,
        error: true,
      };
    }

    return {
      message: "Form submitted successfully!",
      data: data,
      error: false,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return {
      message: errorMessage,
      data: null,
      error: true,
    };
  }
};
