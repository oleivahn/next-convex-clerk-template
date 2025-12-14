import { NextResponse } from "next/server";
import { formTemplateValidationSchema } from "@/lib/formValidationSchemas";

// - Submit the form to the API
export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    // - Backend data validation once more before sending to the database
    const parsed = formTemplateValidationSchema.safeParse(body);

    // - If the data is invalid, return an error
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid form data", errors: parsed.error.errors },
        { status: 400 }
      );
    }

    console.log("📗 [ Sending form data to the API route /form-template ]");
    console.log("📗 [ Data Received ]:", parsed.data);

    // TODO: Add database integration here

    // - Respond with success
    return NextResponse.json(
      { message: "Form template submitted successfully", data: parsed.data },
      { status: 201 }
    );
  } catch (error) {
    // - If there is an error, return an error
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    console.error("📕 [ Error ]:", errorMessage);

    return NextResponse.json(
      { message: "Error submitting form template", error: errorMessage },
      { status: 500 }
    );
  }
};
