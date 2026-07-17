"use server";

import dbConnect from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function getMyRecipes() {
  const user = await getCurrentUser();

  if (!user) {
    return {
      totalRecipes: 0,
      totalFavorites: 0,
      totalLikes: 0,
      premium: false,
      recentRecipes: [],
    };
  }

  const db = await dbConnect();

  const recipesCollection = db.collection("recipes");
  const favoritesCollection = db.collection("favorites");
  const usersCollection = db.collection("users");

  const totalRecipes = await recipesCollection.countDocuments({
    userEmail: user.email,
  });

  const totalFavorites = await favoritesCollection.countDocuments({
    userEmail: user.email,
  });

  const recipes = await recipesCollection
    .find({ userEmail: user.email })
    .toArray();

  const totalLikes = recipes.reduce(
    (sum, recipe) => sum + (recipe.likeCount || 0),
    0
  );

  const recentRecipes = await recipesCollection
    .find({ userEmail: user.email })
    .sort({ createdAt: -1 })
    .limit(5)
    .toArray();

  const dbUser = await usersCollection.findOne({
    email: user.email,
  });

  return {
    totalRecipes,
    totalFavorites,
    totalLikes,
    premium: dbUser?.isPremium || false,
    recentRecipes,
  };
}

// =============================
// Get All Recipes of Logged-in User (for My Recipes page)
// =============================
export async function getAllMyRecipes() {
  const user = await getCurrentUser();

  if (!user) {
    return [];
  }

  const db = await dbConnect();

  const recipes = await db
    .collection("recipes")
    .find({ userEmail: user.email })
    .sort({ createdAt: -1 })
    .toArray();

  return JSON.parse(JSON.stringify(recipes));
}

// =============================
// Get All Recipes (public, with filters)
// =============================
export async function getAllRecipes(filters = {}) {
  const { search = "", category = "", cuisine = "", difficulty = "", sort = "Newest" } = filters;

  const db = await dbConnect();
  const query = {};

  if (search) query.title = { $regex: search, $options: "i" };
  if (category && category !== "All Categories") query.category = category;
  if (cuisine && cuisine !== "All Cuisines") query.cuisine = cuisine;
  if (difficulty && difficulty !== "All Difficulties") query.difficulty = difficulty;

  let sortOption = {};
  switch (sort) {
    case "Most Liked":
      sortOption = { likeCount: -1 };
      break;
    case "Preparation Time":
      sortOption = { preparationTime: 1 };
      break;
    default:
      sortOption = { createdAt: -1 };
  }

  const recipes = await db.collection("recipes").find(query).sort(sortOption).toArray();
  return JSON.parse(JSON.stringify(recipes));
}

