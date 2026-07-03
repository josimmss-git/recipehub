import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function POST(request) {
  try {
    const body = await request.json();

    const db = await dbConnect();

    // একই User যেন একই Recipe একাধিকবার Purchase না করতে পারে
    const alreadyPurchased = await db.collection("purchases").findOne({
      recipeId: body.recipeId,
      userEmail: body.userEmail,
    });

    if (alreadyPurchased) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already purchased this recipe.",
        },
        { status: 400 }
      );
    }

    const result = await db.collection("purchases").insertOne({
      recipeId: body.recipeId,
      recipeTitle: body.recipeTitle,
      recipeImage: body.recipeImage,
      userEmail: body.userEmail,
      userName: body.userName,
      purchasedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      insertedId: result.insertedId,
      message: "Recipe purchased successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}