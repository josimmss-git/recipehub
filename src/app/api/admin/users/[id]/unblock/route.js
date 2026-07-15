import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function PATCH(req, { params }) {
  try {
    const currentUser = await getCurrentUser();

    // Not logged in
    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // Only admin
    if (currentUser.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied",
        },
        { status: 403 }
      );
    }

    // ✅ Next.js 16
    const { id } = await params;

    // ✅ Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid User ID",
        },
        { status: 400 }
      );
    }

    const db = await dbConnect();

    const result = await db.collection("user").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          isBlocked: false,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User unblocked successfully.",
    });
  } catch (error) {
    console.error("Unblock User Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}