// src/actions/user/addNormalUser.js

"use server";

import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export const addNormalUser = async (userData) => {
  try {
    await dbConnect();

    const existingUser = await User.findOne({
      email: userData.email,
    });

    if (existingUser) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    const user = await User.create(userData);

    return {
      success: true,
      message: "User created successfully",
      data: JSON.parse(JSON.stringify(user)),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: error.message,
    };
  }
};