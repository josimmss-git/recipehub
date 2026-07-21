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
        { status: 401 }
      );
    }

    const body = await req.json();

    const db = await dbConnect();

    // Collections
    const usersCollection = db.collection("users");
    const recipesCollection = db.collection("recipes");

    // Get Current User From Database
    const dbUser = await usersCollection.findOne({
      email: session.user.email,
    });

    // Count User Recipes
    const totalRecipes = await recipesCollection.countDocuments({
      userEmail: session.user.email,
    });

    // Business Logic
    if (!dbUser?.isPremium && totalRecipes >= 2) {
      return NextResponse.json(
        {
          success: false,
          premiumRequired: true,
          message:
            "You have reached the maximum limit of 2 recipes. Upgrade to Premium to create unlimited recipes.",
        },
        {
          status: 403,
        }
      );
    }

    // Create Recipe
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

    await recipesCollection.insertOne(recipe);

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