import { NextResponse } from "next/server";
import connectDB from "@/lib/database-connection";
import User from "@/models/user";
import { schema } from "@/components/Form/formSchema";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    // Validate the incoming data
    const parsed = schema.safeParse({
      ...body,
      shiftDate: new Date(body.shiftDate),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid form data", errors: parsed.error.errors },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectDB();

    // Create a new user/contact record
    const newUser = new User({
      ...parsed.data,
      shiftDate: parsed.data.shiftDate.toLocaleString(),
    });
    await newUser.save();

    return NextResponse.json(
      { message: "Contact form submitted successfully", data: newUser },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    console.error("Error submitting contact form:", errorMessage);

    return NextResponse.json(
      { message: "Error submitting contact form", error: errorMessage },
      { status: 500 }
    );
  }
};
