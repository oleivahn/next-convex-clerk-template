import { NextResponse } from "next/server";
import connectDB from "@/lib/database-connection";
import { User } from "@/lib/models";
import { contactSchema } from "@/lib/schemas";

// - Submit the form to the API
export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    // backend data validation once more before sending to the database
    const parsed = contactSchema.safeParse({
      ...body,
      shiftDate: new Date(body.shiftDate),
    });

    // if the data is invalid, return an error
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid form data", errors: parsed.error.errors },
        { status: 400 }
      );
    }

    console.log("📗 [ Sending form data to the API route /contact ]");

    // - Connect to the database
    await connectDB();

    // - Create object to save to the database
    const newUser = new User({
      ...parsed.data,
      shiftDate: parsed.data.shiftDate.toLocaleString(),
    });

    // - Save the new user/contact record to the database
    await newUser.save();

    // - Respond with the new user/contact record
    return NextResponse.json(
      { message: "Contact form submitted successfully", data: newUser },
      { status: 201 }
    );
  } catch (error) {
    // - If there is an error, return an error
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    console.error("Error submitting contact form:", errorMessage);

    return NextResponse.json(
      { message: "Error submitting contact form", error: errorMessage },
      { status: 500 }
    );
  }
};
