import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;

    const db = await dbConnect();

    const result = await db.collection("user").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          isBlocked: true,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      modifiedCount: result.modifiedCount,
      message: "User blocked successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}