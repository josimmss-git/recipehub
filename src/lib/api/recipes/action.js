"use server";

import dbConnect from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function getMyRecipes() {
  const user = await getCurrentUser();

  if (!user) {
    return [];
  }

  const db = await dbConnect();

  const recipes = await db
    .collection("recipes")
    .find({
      userEmail: user.email,
    })
    .sort({ createdAt: -1 })
    .toArray();

  return recipes;
}