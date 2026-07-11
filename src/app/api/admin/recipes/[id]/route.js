import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function DELETE(req, { params }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const db = await dbConnect();

    const recipeId = new ObjectId(params.id);

    // Delete recipe
    const recipeResult = await db.collection("recipes").deleteOne({
      _id: recipeId,
    });

    if (recipeResult.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Recipe not found.",
        },
        { status: 404 }
      );
    }

    // Delete all reports related to this recipe
    await db.collection("reports").deleteMany({
      recipeId: recipeId,
    });

    return NextResponse.json({
      success: true,
      message: "Recipe removed successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}