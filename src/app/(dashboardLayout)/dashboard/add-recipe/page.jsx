"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, CardHeader, Input, TextArea, Form, Label } from "@heroui/react";
import { FaImage } from "react-icons/fa";

const AddRecipeForm = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  // ImgBB Upload Function
  const uploadToImgBB = async (file) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
      throw new Error("ImgBB API key is missing. Please add NEXT_PUBLIC_IMGBB_API_KEY in your .env.local file.");
    }

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data?.error?.message || "Failed to upload image");
    }

    return data.data.url;
  };

  // Handle Image Change
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploadError("");

    if (file.size > 32 * 1024 * 1024) {
      setImageUploadError("Image must be smaller than 32MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setImageUploadError("Please select a valid image file");
      return;
    }

    // Local Preview
    const localPreviewUrl = URL.createObjectURL(file);
    setImagePreview(localPreviewUrl);

    setIsUploadingImage(true);

    try {
      const uploadedUrl = await uploadToImgBB(file);
      setValue("image", uploadedUrl, { shouldValidate: true });
    } catch (err) {
      console.error("ImgBB upload error:", err);
      setImageUploadError(err.message || "Failed to upload image");
      setImagePreview("");
      setValue("image", "");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const onSubmit = (data) => {
    console.log("Recipe Submitted:", data);
    alert("Recipe submitted successfully! 🎉 Check console for data.");
    reset();
    setImagePreview("");
  };

  return (
    <div className="mt-6 space-y-6 max-w-3xl mx-auto p-4">
      <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl">
        <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
          <h3 className="text-xl font-bold text-white">Add New Recipe</h3>
          <p className="text-slate-400 text-sm">
            Share your delicious recipe with the RecipeHub community.
          </p>
        </CardHeader>

        <div className="p-6">
          <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <Input
              {...register("title", { required: "Recipe title is required" })}
              label="Recipe Title"
              labelPlacement="outside"
              placeholder="Creamy Chicken Pasta"
              isInvalid={!!errors.title}
              errorMessage={errors.title?.message}
            />

            {/* Image Upload */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="imageFile">Recipe Image</Label>

              <input
                type="hidden"
                {...register("image", { required: "Recipe image is required" })}
              />

              <div className="flex items-center gap-3">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-16 h-16 rounded-xl object-cover border border-white/10"
                  />
                )}

                <label
                  htmlFor="imageFile"
                  className="flex-1 cursor-pointer flex items-center gap-3 rounded-xl bg-slate-900/50 border border-white/10 hover:border-pink-500/50 text-slate-400 px-4 h-12 transition-colors"
                >
                  <FaImage className="text-xl" />
                  <span>
                    {isUploadingImage
                      ? "Uploading..."
                      : imagePreview
                      ? "Change Image"
                      : "Upload Recipe Image"}
                  </span>
                </label>

                <input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isUploadingImage}
                  className="hidden"
                />
              </div>

              {imageUploadError && <p className="text-red-400 text-sm">{imageUploadError}</p>}
              {errors.image && !imageUploadError && (
                <p className="text-red-400 text-sm">{errors.image.message}</p>
              )}
            </div>

            {/* Category */}
            <Input
              {...register("category", { required: "Category is required" })}
              label="Category"
              labelPlacement="outside"
              placeholder="Breakfast / Lunch / Dinner / Dessert"
              isInvalid={!!errors.category}
              errorMessage={errors.category?.message}
            />

            {/* Cooking Time & Servings */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                {...register("cookingTime", { required: "Cooking time is required", valueAsNumber: true })}
                type="number"
                label="Cooking Time (Minutes)"
                labelPlacement="outside"
                placeholder="30"
                isInvalid={!!errors.cookingTime}
                errorMessage={errors.cookingTime?.message}
              />

              <Input
                {...register("servings", { required: "Servings is required", valueAsNumber: true })}
                type="number"
                label="Servings"
                labelPlacement="outside"
                placeholder="4"
                isInvalid={!!errors.servings}
                errorMessage={errors.servings?.message}
              />
            </div>

            {/* Ingredients */}
            <TextArea
              {...register("ingredients", { required: "Ingredients are required" })}
              label="Ingredients"
              labelPlacement="outside"
              placeholder="2 Chicken Breasts\n200g Pasta\n1 tbsp Butter"
              isInvalid={!!errors.ingredients}
              errorMessage={errors.ingredients?.message}
              className="min-h-[120px]"
            />

            {/* Instructions */}
            <TextArea
              {...register("instructions", { required: "Instructions are required" })}
              label="Instructions"
              labelPlacement="outside"
              placeholder="1. Boil pasta...\n2. Cook chicken...\n3. Mix everything."
              isInvalid={!!errors.instructions}
              errorMessage={errors.instructions?.message}
              className="min-h-[150px]"
            />

            <Button
              type="submit"
              radius="lg"
              className="bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold h-12 w-full shadow-lg"
            >
              Publish Recipe
            </Button>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default AddRecipeForm;