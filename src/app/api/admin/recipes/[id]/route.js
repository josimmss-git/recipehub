import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function DELETE(request, { params }) {
  try {
    // Next.js 16
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid recipe ID.",
        },
        { status: 400 }
      );
    }

    // Current User
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    // Only Admin
    if (currentUser.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Only admin can delete recipes.",
        },
        { status: 403 }
      );
    }

    const db = await dbConnect();

    const result = await db.collection("recipes").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Recipe not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Recipe deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE RECIPE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}