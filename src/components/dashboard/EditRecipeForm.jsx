"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@heroui/react";

export default function EditRecipeForm({ recipe }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: recipe.title,
      image: recipe.image,
      category: recipe.category,
      cuisine: recipe.cuisine,
      difficulty: recipe.difficulty,
      preparationTime: recipe.preparationTime,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const res = await fetch(`/api/recipes/${recipe._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Recipe updated successfully");
        router.push("/dashboard/my-recipes");
        router.refresh();
      } else {
        toast.error(result.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <input
        {...register("title", {
          required: "Recipe name is required",
        })}
        placeholder="Recipe Name"
        className="w-full border rounded-lg p-3"
      />
      {errors.title && (
        <p className="text-red-500">{errors.title.message}</p>
      )}

      <input
        {...register("image", {
          required: "Image URL is required",
        })}
        placeholder="Image URL"
        className="w-full border rounded-lg p-3"
      />
      {errors.image && (
        <p className="text-red-500">{errors.image.message}</p>
      )}
<select
  {...register("category", {
    required: "Category is required",
  })}
  className="w-full border rounded-lg p-3 bg-black"
>
  <option value="">Select Category</option>
  <option value="Breakfast">Breakfast</option>
  <option value="Lunch">Lunch</option>
  <option value="Dinner">Dinner</option>
  <option value="Dessert">Dessert</option>
  <option value="Snack">Snack</option>
</select>
      {errors.category && (
        <p className="text-red-500">{errors.category.message}</p>
      )}

      <input
        {...register("cuisine", {
          required: "Cuisine Type is required",
        })}
        placeholder="Cuisine Type"
        className="w-full border rounded-lg p-3"
      />
      {errors.cuisine && (
        <p className="text-red-500">{errors.cuisine.message}</p>
      )}

      <select
        {...register("difficulty", {
          required: "Difficulty is required",
        })}
        className="w-full border rounded-lg p-3"
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <input
        type="number"
        {...register("preparationTime", {
          required: "Preparation time is required",
        })}
        placeholder="Preparation Time (minutes)"
        className="w-full border rounded-lg p-3"
      />

      <textarea
        rows={5}
        {...register("ingredients", {
          required: "Ingredients are required",
        })}
        placeholder="Ingredients"
        className="w-full border rounded-lg p-3"
      />

      <textarea
        rows={8}
        {...register("instructions", {
          required: "Instructions are required",
        })}
        placeholder="Instructions"
        className="w-full border rounded-lg p-3"
      />

      <Button
        type="submit"
        color="primary"
        isLoading={loading}
        className="w-full"
      >
        Update Recipe
      </Button>
    </form>
  );
}