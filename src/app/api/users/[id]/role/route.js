import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function PATCH(req, { params }) {
  try {
    const currentUser = await getCurrentUser();

    // User not logged in
    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // Only Admin
    if (currentUser.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied",
        },
        { status: 403 }
      );
    }

    const { id } = params;

    // Check ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid user id.",
        },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { role } = body;

    // Validate role
    if (!["user", "admin"].includes(role)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid role.",
        },
        { status: 400 }
      );
    }

    const db = await dbConnect();

    // Find user
    const user = await db.collection("user").findOne({
      _id: new ObjectId(id),
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    // Prevent changing your own role
    if (currentUser._id.toString() === id) {
      return NextResponse.json(
        {
          success: false,
          message: "You can't change your own role.",
        },
        { status: 400 }
      );
    }

    // Update role
    const result = await db.collection("user").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          role,
          updatedAt: new Date(),
        },
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No changes were made.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        role === "admin"
          ? "User promoted to Admin successfully."
          : "Admin removed successfully.",
    });
  } catch (error) {
    console.error("Role Update Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}