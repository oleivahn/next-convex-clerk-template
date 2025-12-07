import { schema } from "@/components/Form/formSchema";
import { z } from "zod";

// Types
export type ContactFormData = z.infer<typeof schema>;

export type ContactResponse = {
  message: string;
  data: ContactFormData | null;
  error?: boolean;
};

// API base URL - uses relative path for same-origin requests
const API_BASE = "/api";

/**
 * Submit contact form data to the API
 */
export const submitContactForm = async (
  data: ContactFormData
): Promise<ContactResponse> => {
  // Validate data before sending
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    return {
      message: "Invalid form data",
      data: null,
      error: true,
    };
  }

  try {
    const response = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        shiftDate: data.shiftDate.toISOString(),
      }),
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
