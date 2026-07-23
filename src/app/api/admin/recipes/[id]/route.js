
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function DELETE(req, context) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // Next.js 16
    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid recipe id.",
        },
        {
          status: 400,
        }
      );
    }

    const db = await dbConnect();

    const recipeId = new ObjectId(id);

    // Recipe খুঁজে বের করি
    const recipe = await db.collection("recipes").findOne({
      _id: recipeId,
    });

    if (!recipe) {
      return NextResponse.json(
        {
          success: false,
          message: "Recipe not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Admin অথবা Owner
    const isAdmin = currentUser.role === "admin";

    // আপনার Schema অনুযায়ী Field ঠিক করুন
    const isOwner =
      recipe.authorEmail === currentUser.email ||
      recipe.userEmail === currentUser.email;

    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to delete this recipe.",
        },
        {
          status: 403,
        }
      );
    }

    const result = await db.collection("recipes").deleteOne({
      _id: recipeId,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Delete failed.",
        },
        {
          status: 500,
        }
      );
    }

    // Reports Delete
    await db.collection("reports").deleteMany({
      recipeId: recipeId,
    });

    return NextResponse.json({
      success: true,
      message: "Recipe deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE Recipe Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}



// =========================
// UPDATE RECIPE
// =========================
export async function PATCH(req, context) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Recipe ID",
        },
        {
          status: 400,
        }
      );
    }

    const body = await req.json();

    const db = await dbConnect();

    const recipe = await db.collection("recipes").findOne({
      _id: new ObjectId(id),
    });

    if (!recipe) {
      return NextResponse.json(
        {
          success: false,
          message: "Recipe not found",
        },
        {
          status: 404,
        }
      );
    }

    const isAdmin = currentUser.role === "admin";

    const isOwner =
      recipe.authorEmail === currentUser.email ||
      recipe.userEmail === currentUser.email;

    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 403,
        }
      );
    }

    await db.collection("recipes").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          ...body,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Recipe Updated Successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}