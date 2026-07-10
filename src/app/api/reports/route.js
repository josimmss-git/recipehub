import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function POST(req) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login first.",
        },
        { status: 401 }
      );
    }

    const body = await req.json();

    const db = await dbConnect();

    const report = {
      recipeId: body.recipeId,
      recipeTitle: body.recipeTitle,
      recipeImage: body.recipeImage,
      recipeOwnerEmail: body.recipeOwnerEmail,

      reporterName: user.name,
      reporterEmail: user.email,

      reason: body.reason,
      details: body.details,

      status: "pending",

      createdAt: new Date(),
    };

    await db.collection("reports").insertOne(report);

    return NextResponse.json({
      success: true,
      message: "Recipe reported successfully.",
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