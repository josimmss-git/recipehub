import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const db = await dbConnect();

    const recipes = await db
      .collection("recipes")
      .find({ userEmail: user.email })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(recipes);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}