"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@heroui/react";
import { FaImage } from "react-icons/fa";
import { uploadImage } from "@/lib/imgbb";

export default function AddRecipePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImageUploadError("");
    setImagePreview(URL.createObjectURL(file));

    try {
      setIsUploadingImage(true);

      const imageUrl = await uploadImage(file);

      setValue("image", imageUrl);

      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error(error);
      setImageUploadError("Image upload failed");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const recipe = {
        title: data.title,
        image: data.image,
        category: data.category,
        cuisine: data.cuisine,
        difficulty: data.difficulty,
        preparationTime: Number(data.preparationTime),
        ingredients: data.ingredients,
        instructions: data.instructions,
      };

      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Recipe added successfully");
        reset();
        setImagePreview("");
        router.push("/dashboard/my-recipes");
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Recipe Name */}
      <div>
        <input
          {...register("title", {
            required: "Recipe name is required",
          })}
          placeholder="Recipe Name"
          className="w-full border rounded-lg p-3"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Recipe Image */}
      <div>
        <label className="block mb-2 font-medium">Recipe Image</label>

        <input
          type="hidden"
          {...register("image", {
            required: "Recipe image is required",
          })}
        />

        <div className="flex items-center gap-3">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-16 h-16 rounded-lg object-cover border"
            />
          )}

          <label
            htmlFor="imageFile"
            className="flex items-center gap-2 border rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-100"
          >
            <FaImage />

            {isUploadingImage
              ? "Uploading..."
              : imagePreview
              ? "Change Image"
              : "Choose Image"}
          </label>

          <input
            id="imageFile"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            disabled={isUploadingImage}
          />
        </div>

        {imageUploadError && (
          <p className="text-red-500 text-sm mt-2">{imageUploadError}</p>
        )}

        {errors.image && !imageUploadError && (
          <p className="text-red-500 text-sm mt-2">{errors.image.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
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
          <p className="text-red-500 text-sm mt-1">
            {errors.category.message}
          </p>
        )}
      </div>

      {/* Cuisine */}
      <div>
        <input
          {...register("cuisine", {
            required: "Cuisine type is required",
          })}
          placeholder="Cuisine Type"
          className="w-full border rounded-lg p-3"
        />

        {errors.cuisine && (
          <p className="text-red-500 text-sm mt-1">
            {errors.cuisine.message}
          </p>
        )}
      </div>

      {/* Difficulty */}
      <div>
        <select
          {...register("difficulty", {
            required: "Difficulty level is required",
          })}
          className="w-full border rounded-lg p-3 bg-black"
        >
          <option value="">Difficulty Level</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        {errors.difficulty && (
          <p className="text-red-500 text-sm mt-1">
            {errors.difficulty.message}
          </p>
        )}
      </div>

      {/* Preparation Time */}
      <div>
        <input
          type="number"
          {...register("preparationTime", {
            required: "Preparation time is required",
          })}
          placeholder="Preparation Time (minutes)"
          className="w-full border rounded-lg p-3"
        />

        {errors.preparationTime && (
          <p className="text-red-500 text-sm mt-1">
            {errors.preparationTime.message}
          </p>
        )}
      </div>

      {/* Ingredients */}
      <div>
        <textarea
          rows={5}
          {...register("ingredients", {
            required: "Ingredients are required",
          })}
          placeholder="Ingredients"
          className="w-full border rounded-lg p-3"
        />

        {errors.ingredients && (
          <p className="text-red-500 text-sm mt-1">
            {errors.ingredients.message}
          </p>
        )}
      </div>

      {/* Instructions */}
      <div>
        <textarea
          rows={8}
          {...register("instructions", {
            required: "Instructions are required",
          })}
          placeholder="Instructions"
          className="w-full border rounded-lg p-3"
        />

        {errors.instructions && (
          <p className="text-red-500 text-sm mt-1">
            {errors.instructions.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        color="primary"
        className="w-full"
        isLoading={loading || isUploadingImage}
      >
        Add Recipe
      </Button>
    </form>
  );
}