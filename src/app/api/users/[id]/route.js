import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;

    const db = await dbConnect();

    const result = await db.collection("user").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          role: "admin",
        },
      }
    );

    return NextResponse.json({
      success: true,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error(error);

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