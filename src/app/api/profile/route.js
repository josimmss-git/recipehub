import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function PATCH(request) {
  try {
    const body = await request.json();

    const db = await dbConnect();

    await db.collection("users").updateOne(
      {
        email: body.email,
      },
      {
        $set: {
          name: body.name,
          image: body.image,
        },
      }
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}