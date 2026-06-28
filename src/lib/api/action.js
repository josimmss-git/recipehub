"use server";

import { serverMutation } from "./server";

export const addRecipe = async (data) => {
  try {
    const resData = await serverMutation("/api/recipes", "POST", data);
    return resData;
  } catch (error) {
    console.error("Add Recipe Error:", error);
    throw error;
  }
};