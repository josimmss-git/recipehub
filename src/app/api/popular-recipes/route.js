import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function GET() {
  try {
    const db = await dbConnect();

    const recipes = await db
      .collection("recipes")
      .find({})
      .sort({ likes: -1 }) // Highest likes first
      .limit(6) // Show top 6 recipes
      .toArray();

    return NextResponse.json(recipes);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch popular recipes" },
      { status: 500 }
    );
  }
}