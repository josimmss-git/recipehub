import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const db = await dbConnect();

    const totalRecipes = await db.collection("recipes").countDocuments();

    const recipes = await db
      .collection("recipes")
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      success: true,
      recipes,
      totalRecipes,
      totalPages: Math.ceil(totalRecipes / limit),
      currentPage: page,
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