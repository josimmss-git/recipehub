import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";

import dbConnect from "@/lib/dbConnect";
import { auth } from "@/lib/auth";

// ==============================
// UPDATE RECIPE (PUT)
// ==============================
export async function PUT(req, { params }) {
  try {
    const { id } = await params;   // ← This is the required fix

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid recipe ID" },
        { status: 400 }
      );
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const db = await dbConnect();

    const recipe = await db.collection("recipes").findOne({
      _id: new ObjectId(id),
    });

    if (!recipe) {
      return NextResponse.json(
        { success: false, message: "Recipe not found" },
        { status: 404 }
      );
    }

    if (recipe.userEmail !== session.user.email) {
      return NextResponse.json(
        { success: false, message: "Forbidden: You can only update your own recipes" },
        { status: 403 }
      );
    }

    await db.collection("recipes").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: body.title,
          image: body.image,
          category: body.category,
          cuisine: body.cuisine,
          difficulty: body.difficulty,
          preparationTime: Number(body.preparationTime),
          ingredients: body.ingredients,
          instructions: body.instructions,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Recipe updated successfully",
    });
  } catch (error) {
    console.error("Recipe PUT Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ==============================
// DELETE RECIPE
// ==============================
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;     // ← This line must exist

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid recipe ID" },
        { status: 400 }
      );
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const db = await dbConnect();

    const recipe = await db.collection("recipes").findOne({
      _id: new ObjectId(id),
    });

    if (!recipe) {
      return NextResponse.json(
        { success: false, message: "Recipe not found" },
        { status: 404 }
      );
    }

    if (recipe.userEmail !== session.user.email) {
      return NextResponse.json(
        { success: false, message: "Forbidden: You can only delete your own recipes" },
        { status: 403 }
      );
    }

    await db.collection("recipes").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    console.error("Recipe DELETE Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}