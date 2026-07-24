import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function PATCH(req, context) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid Report ID" },
        { status: 400 }
      );
    }

    const db = await dbConnect();

    const report = await db.collection("reports").findOne({
      _id: new ObjectId(id),
    });

    if (!report) {
      return NextResponse.json(
        { success: false, message: "Report not found" },
        { status: 404 }
      );
    }

    await db.collection("reports").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: "dismissed",
          dismissedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Report dismissed.",
    });
  } catch (error) {
    console.error("PATCH Report Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}