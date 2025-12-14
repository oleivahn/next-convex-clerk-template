import {
  formTemplateValidationSchema,
  type FormTemplateData,
} from "@/lib/formValidationSchemas";

// - Re-export type for convenience
export type { FormTemplateData };

export type FormTemplateResponse = {
  message: string;
  data: FormTemplateData | null;
  error?: boolean;
};

// - API base URL - uses relative path for same-origin requests
const API_BASE = "/api";

/**
 * Submit form template data to the API
 */
export const submitFormTemplate = async (
  data: FormTemplateData
): Promise<FormTemplateResponse> => {
  // - Validate data first
  const parsed = formTemplateValidationSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: "Invalid form data",
      data: null,
      error: true,
    };
  }

  // - Submit the form to the API
  try {
    const response = await fetch(`${API_BASE}/form-template`, {
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
