import { NextResponse } from "next/server";
import { headers } from "next/headers";

import dbConnect from "@/lib/dbConnect";
import { auth } from "@/lib/auth";

export async function POST(request) {
  try {
    // Get logged in user session
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

    const body = await request.json();

    const db = await dbConnect();

    const recipeData = {
      title: body.title,
      image: body.image,
      category: body.category,
      ingredients: body.ingredients,
      instructions: body.instructions,

      userName: session.user.name,
      userEmail: session.user.email,
      userImage: session.user.image || "",

      likeCount: 0,
      likedBy: [],
      createdAt: new Date(),
    };

    const result = await db.collection("recipes").insertOne(recipeData);

    return NextResponse.json({
      success: true,
      insertedId: result.insertedId,
      message: "Recipe added successfully",
    });
  } catch (error) {
    console.error("POST /api/recipes Error:", error);

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