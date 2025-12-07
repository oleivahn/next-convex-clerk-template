import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // TODO: Add database integration here
    const records: unknown[] = [];

    console.log("📗 [ Data Retrieved ]:", records);

    return NextResponse.json(records, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";

    console.error("📕 [ Error ]:", message);

    return NextResponse.json(
      { message: "Error in fetching records", error: message },
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    // TODO: Add database integration here
    console.log("📗 [ Data Received ]:", body);

    return NextResponse.json(
      { message: "Record is created", data: body },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;

    console.error("📕 [ Error ]:", errorMessage);

    return NextResponse.json(
      { message: "Error creating record", error: errorMessage },
      { status: 500 }
    );
  }
};
