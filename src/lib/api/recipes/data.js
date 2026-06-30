"use server";

import { serverFetch } from "./server";

export const fetchMyRecipes = async (email) => {
  try {
    const result = await serverFetch(`/api/recipes?authorEmail=${email}`);
    return result;
  } catch (error) {
    console.error("Fetch My Recipes Error:", error);
    throw error;
  }
};