import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";

export async function PATCH(req, { params }) {
  try {
    const db = await dbConnect();

    await db.collection("reports").updateOne(
      {
        _id: new ObjectId(params.id),
      },
      {
        $set: {
          status: "Reviewed",
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