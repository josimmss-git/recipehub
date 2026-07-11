import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { ObjectId } from "mongodb";

// POST - Create Report
export async function POST(req) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { recipeId, reason } = await req.json();

    if (!recipeId || !reason) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    const db = await dbConnect();

    // Prevent duplicate reports
    const alreadyReported = await db.collection("reports").findOne({
      recipeId: new ObjectId(recipeId),
      reporterEmail: user.email,
    });

    if (alreadyReported) {
      return NextResponse.json(
        { success: false, message: "You already reported this recipe." },
        { status: 400 }
      );
    }

    await db.collection("reports").insertOne({
      recipeId: new ObjectId(recipeId),
      reporterEmail: user.email,
      reason,
      status: "Pending",
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Recipe reported successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// GET - Admin
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const db = await dbConnect();

    const reports = await db
      .collection("reports")
      .aggregate([
        {
          $lookup: {
            from: "recipes",
            localField: "recipeId",
            foreignField: "_id",
            as: "recipe",
          },
        },
        {
          $unwind: {
            path: "$recipe",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ])
      .toArray();

    return NextResponse.json(reports);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}