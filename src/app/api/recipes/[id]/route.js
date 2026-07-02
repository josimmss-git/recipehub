import dbConnect from "@/lib/dbConnect";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(req, { params }) {
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

    const { id } = await params;

    const body = await req.json();

    const db = await dbConnect();

    const result = await db.collection("recipes").updateOne(
      {
        _id: new ObjectId(id),
        userEmail: session.user.email,
      },
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
        },
      }
    );

    return NextResponse.json({
      success: true,
      modifiedCount: result.modifiedCount,
      message: "Recipe updated successfully",
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
        { status: 401 }
      );
    }

    const { id } = await params;

    const db = await dbConnect();

    const result = await db.collection("recipes").deleteOne({
      _id: new ObjectId(id),
      userEmail: session.user.email,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Recipe not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Recipe deleted successfully.",
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