import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function PATCH(req, { params }) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const db = await dbConnect();

    await db.collection("reports").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          status: "Dismissed",
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Report dismissed.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}