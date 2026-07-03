import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(request) {
  try {
    const body = await request.json();

    const db = await dbConnect();

    const exists = await db.collection("favorites").findOne({
      recipeId: body.recipeId,
      userEmail: body.userEmail,
    });

    if (exists) {
      return NextResponse.json(
        {
          success: false,
          message: "Recipe already added to favorites.",
        },
        { status: 400 }
      );
    }

    const result = await db.collection("favorites").insertOne({
      recipeId: body.recipeId,
      userEmail: body.userEmail,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      insertedId: result.insertedId,
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

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    const db = await dbConnect();

    const result = await db.collection("favorites").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({
      success: true,
      deletedCount: result.deletedCount,
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