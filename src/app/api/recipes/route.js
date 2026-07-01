import dbConnect from "@/lib/dbConnect";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
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

    const body = await req.json();

    const db = await dbConnect();

    const recipe = {
      title: body.title,
      image: body.image,

      category: body.category,
      cuisine: body.cuisine,
      difficulty: body.difficulty,
      preparationTime: Number(body.preparationTime),

      ingredients: body.ingredients,
      instructions: body.instructions,

      userEmail: session.user.email,
      userName: session.user.name,

      likeCount: 0,
      createdAt: new Date(),
    };

    await db.collection("recipes").insertOne(recipe);

    return NextResponse.json({
      success: true,
      message: "Recipe added successfully",
    });
  } catch (error) {
    console.error(error);

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