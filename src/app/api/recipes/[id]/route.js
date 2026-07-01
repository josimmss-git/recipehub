import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import dbConnect from "@/lib/dbConnect";
import { auth } from "@/lib/auth";

export async function DELETE(req, { params }) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
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

    const db = await dbConnect();

    const recipe = await db.collection("recipes").findOne({
      _id: new ObjectId(params.id),
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

    // Only the owner can delete
    if (recipe.userEmail !== session.user.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    await db.collection("recipes").deleteOne({
      _id: new ObjectId(params.id),
    });

    return NextResponse.json({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}