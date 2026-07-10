import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function PUT(req) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (currentUser.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const { id, role } = await req.json();

    const db = await dbConnect();

    const result = await db.collection("user").updateOne(
      { _id: new ObjectId(id) }, // Change "user" to "users" if needed
      {
        $set: {
          role,
        },
      }
    );

    if (!result.modifiedCount) {
      return NextResponse.json({
        success: false,
        message: "No changes made.",
      });
    }

    return NextResponse.json({
      success: true,
      message: `User role updated to ${role}.`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}