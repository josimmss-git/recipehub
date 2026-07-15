import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function DELETE(req, { params }) {
  try {
    const currentUser = await getCurrentUser();

    // Not Logged In
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

    // Invalid ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid user id.",
        },
        { status: 400 }
      );
    }

    const db = await dbConnect();

    // User Exists?
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

    // Prevent deleting yourself
    if (currentUser._id.toString() === id) {
      return NextResponse.json(
        {
          success: false,
          message: "You can't delete your own account.",
        },
        { status: 400 }
      );
    }

    // Prevent deleting another admin
    if (user.role === "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "You can't delete another admin.",
        },
        { status: 403 }
      );
    }

    // Delete User
    const result = await db.collection("user").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete user.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error("Delete User Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}