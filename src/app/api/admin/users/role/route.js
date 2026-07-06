import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function PUT(req) {
  try {
    // Current logged-in user
    const currentUser = await getCurrentUser();

    // Not logged in
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Not an admin
    if (currentUser.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Access denied" },
        { status: 403 }
      );
    }

    // Request body
    const { id, role } = await req.json();

    // Validation
    if (!id || !role) {
      return NextResponse.json(
        { success: false, message: "User ID and role are required." },
        { status: 400 }
      );
    }

    // Only allow valid roles
    if (!["user", "admin"].includes(role)) {
      return NextResponse.json(
        { success: false, message: "Invalid role." },
        { status: 400 }
      );
    }

    const db = await dbConnect();

    // Prevent changing your own role
    if (currentUser.id === id) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot change your own role.",
        },
        { status: 400 }
      );
    }

    // Update role
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          role,
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `User role updated to ${role}.`,
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